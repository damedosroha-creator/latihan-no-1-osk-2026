import {
  CurveSegment,
  ObjectCurveSpec,
  ProgressState,
  QuestionAttemptState,
} from '../types/physics';

export interface SamplePoint {
  t: number;
  x: number;
  v: number;
  a: number;
}

export interface ValidationResult {
  validFormat: boolean;
  isCorrect: boolean;
  parsedValue: number | null;
  errorReason?: 'empty' | 'uses-dot' | 'invalid-number' | 'wrong-decimal-count';
  message: string;
}

/**
 * Formats a number to Indonesian 1-decimal-comma format (e.g. 12.125 -> "12,1", -3.2 -> "-3,2").
 * Uses standard mathematical half-away-from-zero rounding to 1 decimal place.
 */
export function formatIndonesianDecimal(value: number): string {
  const factor = 10;
  const rounded =
    value >= 0
      ? Math.round((value + 1e-12) * factor) / factor
      : -Math.round((-value + 1e-12) * factor) / factor;
  const fixed = (Object.is(rounded, -0) ? 0 : rounded).toFixed(1);
  return fixed.replace('.', ',');
}

/**
 * Parses an Indonesian 1-decimal-comma numeric string.
 * Rejects dots as decimal separator so students strictly follow the Olympiad formatting rule.
 */
export function parseIndonesianDecimal(rawInput: string): {
  value: number | null;
  errorReason?: 'empty' | 'uses-dot' | 'invalid-number' | 'wrong-decimal-count';
} {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { value: null, errorReason: 'empty' };
  }
  if (trimmed.includes('.')) {
    return { value: null, errorReason: 'uses-dot' };
  }
  const match = /^([+-]?\d+)(?:,(\d+))?$/.exec(trimmed);
  if (!match) {
    return { value: null, errorReason: 'invalid-number' };
  }
  if (match[2] !== undefined && match[2].length !== 1) {
    return { value: null, errorReason: 'wrong-decimal-count' };
  }
  const normalized = trimmed.replace(',', '.');
  const num = Number(normalized);
  if (!Number.isFinite(num)) {
    return { value: null, errorReason: 'invalid-number' };
  }
  return { value: num };
}

/**
 * Validates student input against expected numeric value (rounded to 1 decimal place).
 */
export function validateAnswer(rawInput: string, expectedValue: number): ValidationResult {
  const parsed = parseIndonesianDecimal(rawInput);
  if (parsed.value === null) {
    if (parsed.errorReason === 'empty') {
      return {
        validFormat: false,
        isCorrect: false,
        parsedValue: null,
        errorReason: 'empty',
        message: 'Masukkan jawaban numerik terlebih dahulu sebelum memeriksa.',
      };
    }
    if (parsed.errorReason === 'uses-dot') {
      return {
        validFormat: false,
        isCorrect: false,
        parsedValue: null,
        errorReason: 'uses-dot',
        message:
          'Gunakan tanda koma (,) sebagai pemisah desimal, bukan titik (.). Contoh: 12,1 atau -3,2.',
      };
    }
    if (parsed.errorReason === 'wrong-decimal-count') {
      return {
        validFormat: false,
        isCorrect: false,
        parsedValue: null,
        errorReason: 'wrong-decimal-count',
        message:
          'Hasil akhir wajib tepat satu angka di belakang koma (misalnya 7,0 atau 12,1).',
      };
    }
    return {
      validFormat: false,
      isCorrect: false,
      parsedValue: null,
      errorReason: 'invalid-number',
      message: 'Format angka tidak valid. Masukkan bilangan dengan koma desimal, misalnya 12,1.',
    };
  }

  const expectedRounded = Number(
    formatIndonesianDecimal(expectedValue).replace(',', '.')
  );
  const diff = Math.abs(parsed.value - expectedRounded);
  const isCorrect = diff <= 0.05 + 1e-9;

  return {
    validFormat: true,
    isCorrect,
    parsedValue: parsed.value,
    message: isCorrect
      ? `Tepat! Jawaban ${formatIndonesianDecimal(parsed.value)} sesuai dengan analisis fisika.`
      : `Jawaban ${formatIndonesianDecimal(parsed.value)} belum tepat. Periksa kembali titik balik, tanda luas, atau pembulatan.`,
  };
}

function integrateSegment(
  seg: CurveSegment,
  tQuery: number,
  vAtSegStart: number
): { dt: number; dx: number; vEnd: number; aVal: number } {
  const tClamped = Math.min(Math.max(tQuery, seg.tStart), seg.tEnd);
  const dt = tClamped - seg.tStart;
  const duration = seg.tEnd - seg.tStart;

  if (seg.kind === 'linear-v') {
    const v0 = seg.vStart ?? vAtSegStart;
    const v1 = seg.vEnd ?? v0;
    const a = duration > 0 ? (v1 - v0) / duration : 0;
    const vNow = v0 + a * dt;
    const dx = 0.5 * (v0 + vNow) * dt;
    return { dt, dx, vEnd: vNow, aVal: a };
  }

  if (seg.kind === 'step-a') {
    const a = seg.aVal ?? 0;
    const v0 = vAtSegStart;
    const vNow = v0 + a * dt;
    const dx = v0 * dt + 0.5 * a * dt * dt;
    return { dt, dx, vEnd: vNow, aVal: a };
  }

  // 'quadratic-v': v(t) = c0 + c1*t + c2*t^2
  const c0 = seg.c0 ?? 0;
  const c1 = seg.c1 ?? 0;
  const c2 = seg.c2 ?? 0;
  const antideriv = (t: number) => c0 * t + 0.5 * c1 * t * t + (c2 / 3) * t * t * t;
  const dx = antideriv(tClamped) - antideriv(seg.tStart);
  const vNow = c0 + c1 * tClamped + c2 * tClamped * tClamped;
  const a = c1 + 2 * c2 * tClamped;
  return { dt, dx, vEnd: vNow, aVal: a };
}

/**
 * Analytically evaluates position x(t), velocity v(t), and acceleration a(t)
 * for any object curve specification at time t.
 */
export function evaluateObjectAt(spec: ObjectCurveSpec, t: number): SamplePoint {
  let x = spec.initialX;
  let v = spec.initialV ?? spec.segments[0]?.vStart ?? 0;
  let a = 0;

  if (spec.segments.length === 0) {
    return { t, x, v, a };
  }

  const firstStart = spec.segments[0].tStart;
  if (t <= firstStart) {
    const first = spec.segments[0];
    if (first.kind === 'linear-v' && first.tEnd > first.tStart) {
      a = ((first.vEnd ?? v) - (first.vStart ?? v)) / (first.tEnd - first.tStart);
    } else if (first.kind === 'step-a') {
      a = first.aVal ?? 0;
    } else if (first.kind === 'quadratic-v') {
      a = (first.c1 ?? 0) + 2 * (first.c2 ?? 0) * firstStart;
    }
    return { t: firstStart, x, v, a };
  }

  for (const seg of spec.segments) {
    if (t <= seg.tStart) break;
    const res = integrateSegment(seg, t, v);
    x += res.dx;
    v = res.vEnd;
    a = res.aVal;
    if (t <= seg.tEnd) {
      return { t, x, v, a };
    }
  }

  const lastSeg = spec.segments[spec.segments.length - 1];
  return { t: Math.min(t, lastSeg.tEnd), x, v, a };
}

/**
 * Generates uniform time-series samples plus exact segment boundary points
 * for high-precision plotting and physics simulations.
 */
export function sampleObjectSeries(
  spec: ObjectCurveSpec,
  tMin: number,
  tMax: number,
  steps = 160
): SamplePoint[] {
  const timeSet = new Set<number>();
  for (let i = 0; i <= steps; i++) {
    timeSet.add(Number((tMin + ((tMax - tMin) * i) / steps).toFixed(6)));
  }
  for (const seg of spec.segments) {
    if (seg.tStart >= tMin && seg.tStart <= tMax) timeSet.add(seg.tStart);
    if (seg.tEnd >= tMin && seg.tEnd <= tMax) timeSet.add(seg.tEnd);
    // Include zero-crossing of velocity inside linear-v or step-a segments
    if (seg.kind === 'linear-v') {
      const v0 = seg.vStart ?? 0;
      const v1 = seg.vEnd ?? 0;
      if (v0 * v1 < 0 && seg.tEnd > seg.tStart) {
        const tZero = seg.tStart + (Math.abs(v0) / Math.abs(v1 - v0)) * (seg.tEnd - seg.tStart);
        if (tZero >= tMin && tZero <= tMax) timeSet.add(tZero);
      }
    }
  }
  const times = Array.from(timeSet).sort((p, q) => p - q);
  return times.map((t) => evaluateObjectAt(spec, t));
}

/**
 * Computes exact total distance traveled (integral of |v(t)| dt) over [tMin, tMax].
 */
export function computeTotalDistance(spec: ObjectCurveSpec, tMin: number, tMax: number): number {
  const samples = sampleObjectSeries(spec, tMin, tMax, 600);
  let dist = 0;
  for (let i = 1; i < samples.length; i++) {
    const prev = samples[i - 1];
    const curr = samples[i];
    const dt = curr.t - prev.t;
    if (dt <= 0) continue;
    // Check if sign changed between prev.v and curr.v
    if (prev.v * curr.v < 0) {
      const frac = Math.abs(prev.v) / (Math.abs(prev.v) + Math.abs(curr.v));
      const dt1 = dt * frac;
      const dt2 = dt * (1 - frac);
      dist += 0.5 * Math.abs(prev.v) * dt1 + 0.5 * Math.abs(curr.v) * dt2;
    } else {
      dist += 0.5 * (Math.abs(prev.v) + Math.abs(curr.v)) * dt;
    }
  }
  return dist;
}

export interface MasterySummary {
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  theoryCompletedCount: number;
  totalTheoryCount: number;
  accuracyPercent: number;
  masteryPercent: number;
  stageIndex: number;
  stageName:
    | 'Pemula'
    | 'Memahami Konsep'
    | 'Mampu Mengaplikasikan'
    | 'Analitis'
    | 'Mahir Olimpiade';
  stageDescription: string;
  recommendations: Array<{
    title: string;
    reason: string;
    targetModuleId: string;
  }>;
}

export function computeMasterySummary(
  progress: ProgressState,
  totalQuestions = 15,
  totalTheoryCount = 4
): MasterySummary {
  const attempts: QuestionAttemptState[] = Object.values(progress.questionAttempts);
  const attemptedCount = attempts.length;
  const correctCount = attempts.filter((a) => a.isCorrect).length;
  const theoryCompletedCount = progress.completedTheoryIds.length;
  const accuracyPercent =
    attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  // Weighted mastery: 25% theory study + 75% solved questions
  const theoryScore = (Math.min(theoryCompletedCount, totalTheoryCount) / totalTheoryCount) * 25;
  const questionScore = (Math.min(correctCount, totalQuestions) / totalQuestions) * 75;
  const masteryPercent = Math.round(theoryScore + questionScore);

  let stageIndex = 0;
  let stageName: MasterySummary['stageName'] = 'Pemula';
  let stageDescription =
    'Mulai dari Pusat Pembelajaran Konsep Fisika untuk menguasai makna gradien, luas grafik v-t, dan titik balik.';

  if (correctCount >= 13 && theoryCompletedCount >= 3) {
    stageIndex = 4;
    stageName = 'Mahir Olimpiade';
    stageDescription =
      'Anda mampu memecahkan persoalan optimasi, gerak relatif 1D, dan grafik bertingkat standar OSK tingkat kota.';
  } else if (correctCount >= 9) {
    stageIndex = 3;
    stageName = 'Analitis';
    stageDescription =
      'Penalaran multi-kondisi dan perbandingan titik ekstrem sudah terbentuk. Lanjutkan ke soal tantangan #10–#15.';
  } else if (correctCount >= 5) {
    stageIndex = 2;
    stageName = 'Mampu Mengaplikasikan';
    stageDescription =
      'Anda terampil menggunakan luas kurva v-t dan persamaan GLBB. Latih soal invers dan gerak multi-fase.';
  } else if (theoryCompletedCount >= 1 || correctCount >= 1) {
    stageIndex = 1;
    stageName = 'Memahami Konsep';
    stageDescription =
      'Konsep dasar perpindahan vs jarak mulai dikuasai. Selesaikan modul teori dan latihan tingkat fundamental #1–#3.';
  }

  const recommendations: MasterySummary['recommendations'] = [];
  if (!progress.completedTheoryIds.includes('mod-1')) {
    recommendations.push({
      title: 'Modul 1: Jembatan Grafik v-t, Perpindahan & Jarak',
      reason: 'Fondasi wajib untuk membedakan luas bertanda dan luas mutlak.',
      targetModuleId: 'mod-1',
    });
  }
  if (!progress.completedTheoryIds.includes('mod-2')) {
    recommendations.push({
      title: 'Modul 2: Titik Balik (v = 0) & Perpindahan Maksimum',
      reason: 'Kunci utama soal OSK nomor 1 untuk menentukan kapan posisi mencapai maksimum.',
      targetModuleId: 'mod-2',
    });
  }
  if (correctCount >= 3 && !progress.completedTheoryIds.includes('mod-3')) {
    recommendations.push({
      title: 'Modul 3: Gradien Percepatan, Kurva a-t & Persamaan Garis',
      reason: 'Diperlukan untuk menurunkan grafik v-t dari a-t dan interpolasi titik potong.',
      targetModuleId: 'mod-3',
    });
  }
  if (correctCount >= 6 && !progress.completedTheoryIds.includes('mod-4')) {
    recommendations.push({
      title: 'Modul 4: Gerak Relatif 1D & Optimasi Kurva Olimpiade',
      reason: 'Membekali strategi mencari jarak pisah maksimum dan amplop kecepatan.',
      targetModuleId: 'mod-4',
    });
  }

  return {
    totalQuestions,
    attemptedCount,
    correctCount,
    theoryCompletedCount,
    totalTheoryCount,
    accuracyPercent,
    masteryPercent,
    stageIndex,
    stageName,
    stageDescription,
    recommendations,
  };
}
