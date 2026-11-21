import React, { useEffect, useState } from 'react';
import { Volume2, Play, Pause, Square, RotateCcw, FileText } from 'lucide-react';
import { misterJoNarrator, NarratorSnapshot } from '../utils/ttsNarrator';

interface MisterJoBarProps {
  narrationId: string;
  title: string;
  script: string;
  compact?: boolean;
}

const SPEED_OPTIONS = [0.85, 1.0, 1.15, 1.3];

export const MisterJoBar: React.FC<MisterJoBarProps> = ({
  narrationId,
  title,
  script,
  compact = false,
}) => {
  const [snap, setSnap] = useState<NarratorSnapshot>(() => misterJoNarrator.getSnapshot());
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    return misterJoNarrator.subscribe(setSnap);
  }, []);

  const isThisActive = snap.activeId === narrationId && snap.status !== 'idle';
  const isSpeaking = snap.activeId === narrationId && snap.status === 'speaking';
  const isPaused = snap.activeId === narrationId && snap.status === 'paused';

  const handlePlayOrResume = () => {
    if (isPaused) {
      misterJoNarrator.resume();
    } else {
      misterJoNarrator.speak(narrationId, title, script);
    }
  };

  return (
    <div
      className={`rounded-xl border border-[#7A1228]/20 bg-[#FDF2F4]/60 ${
        compact ? 'p-3' : 'p-4'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#7A1228] text-white flex items-center justify-center shrink-0">
            <Volume2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-[#7A1228] tracking-wide">
              Narator Fisika · Mister Jo
            </div>
            <div className="text-sm font-medium text-stone-800 truncate">
              {title}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isSpeaking ? (
            <button
              type="button"
              onClick={handlePlayOrResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7A1228] text-white text-xs font-semibold hover:bg-[#580B1C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={`Putar narasi ${title}`}
            >
              <Play className="w-3.5 h-3.5" />
              {isPaused ? 'Lanjutkan' : 'Dengarkan'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => misterJoNarrator.pause()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={`Jeda narasi ${title}`}
            >
              <Pause className="w-3.5 h-3.5" />
              Jeda
            </button>
          )}

          <button
            type="button"
            onClick={() => misterJoNarrator.stop()}
            disabled={!isThisActive}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-700 text-xs font-medium hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label={`Hentikan narasi ${title}`}
          >
            <Square className="w-3 h-3" />
            Stop
          </button>

          <button
            type="button"
            onClick={() => misterJoNarrator.speak(narrationId, title, script)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-700 text-xs font-medium hover:bg-stone-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label={`Ulangi narasi ${title}`}
          >
            <RotateCcw className="w-3 h-3" />
            Ulangi
          </button>

          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg p-0.5">
            {SPEED_OPTIONS.map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => misterJoNarrator.setRate(spd)}
                className={`px-2 py-1 rounded-md text-[11px] font-mono-num font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  Math.abs(snap.rate - spd) < 0.01
                    ? 'bg-[#7A1228] text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
                aria-label={`Kecepatan suara ${spd}x`}
              >
                {spd.toFixed(spd === 1 ? 0 : 2).replace('.', ',')}x
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowTranscript((v) => !v)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-700 text-xs font-medium hover:bg-stone-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-expanded={showTranscript}
          >
            <FileText className="w-3.5 h-3.5" />
            Teks
          </button>
        </div>
      </div>

      {isThisActive && (
        <div className="mt-2.5 pt-2 border-t border-[#7A1228]/15 flex items-center justify-between text-xs text-[#7A1228]">
          <span className="font-medium">
            {isSpeaking
              ? `Mister Jo sedang menjelaskan (${snap.rate.toFixed(1).replace('.', ',')}x)...`
              : 'Narasi dijeda.'}
          </span>
          <span className="text-stone-500 hidden sm:inline">{snap.voiceName}</span>
        </div>
      )}

      {showTranscript && (
        <div className="mt-3 p-3 rounded-lg bg-white border border-stone-200 text-xs leading-relaxed text-stone-700">
          {script}
        </div>
      )}
    </div>
  );
};
