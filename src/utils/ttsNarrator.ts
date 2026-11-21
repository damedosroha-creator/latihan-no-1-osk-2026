export type NarratorStatus = 'idle' | 'speaking' | 'paused';

export interface NarratorSnapshot {
  status: NarratorStatus;
  rate: number;
  activeId: string | null;
  activeTitle: string;
  currentText: string;
  supported: boolean;
  voiceName: string;
}

type Listener = (snap: NarratorSnapshot) => void;

/**
 * Converts LaTeX/math symbols into clear spoken Indonesian physics prose
 * so Mister Jo reads equations naturally rather than raw symbol gibberish.
 */
export function prepareSpokenIndonesian(rawText: string): string {
  return rawText
    .replace(/\$\$/g, ' ')
    .replace(/\$/g, ' ')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 dibagi $2')
    .replace(/\\sqrt\{([^}]+)\}/g, 'akar dari $1')
    .replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, 'integral dari $1 sampai $2')
    .replace(/\\int/g, 'integral')
    .replace(/\\Delta x/g, 'delta x atau perpindahan')
    .replace(/\\Delta t/g, 'delta t atau selang waktu')
    .replace(/\\Delta/g, 'delta')
    .replace(/\\vec\{([^}]+)\}/g, 'vektor $1')
    .replace(/\\bar\{v\}/g, 'kecepatan rata-rata')
    .replace(/\\le/g, 'kurang dari atau sama dengan')
    .replace(/\\ge/g, 'lebih dari atau sama dengan')
    .replace(/\\neq/g, 'tidak sama dengan')
    .replace(/\\approx/g, 'kira-kira sama dengan')
    .replace(/\\implies/g, 'maka')
    .replace(/\\cdot/g, 'dikali')
    .replace(/\\times/g, 'dikali')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/m\/s\^2/g, 'meter per detik kuadrat')
    .replace(/m\/s²/g, 'meter per detik kuadrat')
    .replace(/m\/s/g, 'meter per detik')
    .replace(/v\(t\)/g, 'kecepatan v sebagai fungsi waktu t')
    .replace(/x\(t\)/g, 'posisi x sebagai fungsi waktu t')
    .replace(/a\(t\)/g, 'percepatan a sebagai fungsi waktu t')
    .replace(/\|x\|/g, 'nilai mutlak x')
    .replace(/\|v\(t\)\|/g, 'nilai mutlak kecepatan')
    .replace(/_\{([^}]+)\}/g, ' indeks $1')
    .replace(/\^2/g, ' kuadrat')
    .replace(/\^3/g, ' pangkat tiga')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function pickIndonesianMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;
  const idVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('id'));
  if (idVoices.length > 0) {
    const maleHint = idVoices.find((v) =>
      /male|pria|ardi|damayanti|andika|google bahasa indonesia/i.test(v.name)
    );
    return maleHint ?? idVoices[0];
  }
  const enFallback = voices.find((v) => v.lang.toLowerCase().startsWith('en'));
  return enFallback ?? voices[0];
}

class MisterJoNarratorController {
  private status: NarratorStatus = 'idle';
  private rate = 1.0;
  private activeId: string | null = null;
  private activeTitle = '';
  private currentText = '';
  private listeners = new Set<Listener>();
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private fallbackTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const refreshVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        this.selectedVoice = pickIndonesianMaleVoice(voices);
        this.emit();
      };
      refreshVoices();
      window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
    }
  }

  private clearFallbackTimer() {
    if (this.fallbackTimer !== null) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
  }

  public getSnapshot(): NarratorSnapshot {
    const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    return {
      status: this.status,
      rate: this.rate,
      activeId: this.activeId,
      activeTitle: this.activeTitle,
      currentText: this.currentText,
      supported,
      voiceName: this.selectedVoice?.name ?? 'Mister Jo (Bahasa Indonesia)',
    };
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getSnapshot());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    const snap = this.getSnapshot();
    this.listeners.forEach((l) => l(snap));
  }

  public speak(id: string, title: string, rawText: string) {
    this.stop();
    const spoken = prepareSpokenIndonesian(rawText);
    this.activeId = id;
    this.activeTitle = title;
    this.currentText = spoken;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(spoken);
      utterance.lang = 'id-ID';
      utterance.rate = this.rate;
      // Slightly deeper pitch for Mister Jo's authoritative adult male physics teacher persona
      utterance.pitch = 0.9;
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      this.status = 'speaking';
      this.emit();

      utterance.onend = () => {
        if (this.activeId === id) {
          this.status = 'idle';
          this.clearFallbackTimer();
          this.emit();
        }
      };

      utterance.onerror = () => {
        // Keep caption/audio-guide state gracefully if headless browser has no audio daemon
        this.clearFallbackTimer();
      };

      synth.speak(utterance);

      // Safety fallback in environments where speechSynthesis neither fires onend nor outputs audio
      const voicesAvailable = synth.getVoices().length > 0;
      if (!voicesAvailable) {
        const estimatedMs = Math.min(Math.max(spoken.length * 45, 2500), 18000) / this.rate;
        this.fallbackTimer = setTimeout(() => {
          if (this.activeId === id && this.status === 'speaking') {
            this.status = 'idle';
            this.emit();
          }
        }, estimatedMs);
      }
    } else {
      this.status = 'speaking';
      this.emit();
    }
  }

  public pause() {
    if (this.status !== 'speaking') return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    this.clearFallbackTimer();
    this.status = 'paused';
    this.emit();
  }

  public resume() {
    if (this.status !== 'paused') return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    this.status = 'speaking';
    this.emit();
  }

  public stop() {
    this.clearFallbackTimer();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.status = 'idle';
    this.emit();
  }

  public replay() {
    if (!this.activeId || !this.currentText) return;
    const id = this.activeId;
    const title = this.activeTitle;
    const text = this.currentText;
    this.speak(id, title, text);
  }

  public setRate(newRate: number) {
    this.rate = newRate;
    if (this.status === 'speaking' && this.activeId && this.currentText) {
      this.replay();
    } else {
      this.emit();
    }
  }
}

export const misterJoNarrator = new MisterJoNarratorController();
