export type MenuTab =
  | 'beranda'
  | 'peta-konsep'
  | 'teori-dasar'
  | 'lab-visual'
  | 'latihan-soal'
  | 'progres'
  | 'rumus';

export type QuestionTierId =
  | 'fundamental'
  | 'penerapan'
  | 'analisis'
  | 'matematis'
  | 'olimpiade';

export interface CurveSegment {
  tStart: number;
  tEnd: number;
  kind: 'linear-v' | 'quadratic-v' | 'step-a';
  // For 'linear-v': v(t) = vStart + slope * (t - tStart)
  vStart?: number;
  vEnd?: number;
  // For 'quadratic-v': v(t) = c0 + c1 * t + c2 * t^2 (absolute t)
  c0?: number;
  c1?: number;
  c2?: number;
  // For 'step-a': constant acceleration aVal on [tStart, tEnd]
  aVal?: number;
}

export interface ObjectCurveSpec {
  id: string;
  label: string;
  color: string;
  initialX: number;
  initialV?: number;
  segments: CurveSegment[];
}

export interface StimulusSpec {
  mode: 'v-t' | 'a-t' | 'dual-v-t';
  xLabel: string;
  yLabel: string;
  tMin: number;
  tMax: number;
  tStepMajor: number;
  tStepGrid: number;
  yMin: number;
  yMax: number;
  yStepMajor: number;
  yStepGrid: number;
  /** Curves rendered in the question stimulus (may hide unknown symbolic peaks) */
  stimulusAnnotations?: Array<{
    t: number;
    y: number;
    text: string;
    anchor?: 'start' | 'middle' | 'end';
    dy?: number;
    dx?: number;
  }>;
  symbolicYLabel?: {
    yValue: number;
    label: string;
  };
  symbolicXLabels?: Array<{
    tValue: number;
    label: string;
  }>;
  /** True physical curves used for stimulus (or scaled schematic) and proof simulation */
  objects: ObjectCurveSpec[];
  /** Optional turning point highlight in simulation proof ONLY (never shown in question stimulus) */
  proofHighlight?: {
    tStar?: number;
    xStar?: number;
    label: string;
    phaseNotes: Array<{ tFrom: number; tTo: number; note: string }>;
  };
}

export interface TextbookExplanation {
  memahami: {
    fenomena: string;
    diketahui: string[];
    ditanyakan: string;
  };
  identifikasi: {
    prinsip: string;
    alasan: string;
  };
  visualisasi: {
    deskripsiDiagram: string;
    arahVektor: string;
    catatanFbd: string;
  };
  persamaanDasar: Array<{
    rumus: string;
    simbol: string;
    makna: string;
  }>;
  penurunanMatematis: string[];
  perhitungan: {
    langkah: string[];
    substitusiHighlight: string;
  };
  jawabanAkhir: {
    nilaiFormatted: string;
    satuan: string;
    interpretasi: string;
  };
  insightOlimpiade: {
    berpikirCepat: string;
    trikSahih: string;
    kesalahanUmum: string;
    polaSerupa: string;
  };
}

export interface QuestionFeedback {
  wrongHint: string;
  fixReasoning: string;
  recommendedModuleId: string;
  correctPraise: string;
}

export interface PhysicsQuestion {
  id: number;
  tier: QuestionTierId;
  tierLabel: string;
  title: string;
  prompt: string;
  unit: string;
  expectedValue: number;
  expectedFormatted: string;
  stimulus: StimulusSpec;
  explanation: TextbookExplanation;
  feedback: QuestionFeedback;
  narration: {
    soalDanDiketahui: string;
    pembahasanDanPenurunan: string;
    animasiDanInsight: string;
  };
}

export interface TheoryVisualConfig {
  type: 'area-vs-turning' | 'slope-acceleration' | 'distance-vs-displacement' | 'relative-1d';
  caption: string;
}

export interface TheoryModule {
  id: string;
  order: number;
  title: string;
  levelTag: string;
  summary: string;
  pengantar: {
    fenomenaNyata: string;
    definisiIlmiah: Array<{ istilah: string; definisi: string }>;
    besaranDanSatuan: Array<{
      besaran: string;
      simbol: string;
      satuanSI: string;
      dimensi: string;
      maknaFisis: string;
    }>;
  };
  teoriDasar: {
    prinsip: string[];
    penurunan: string[];
    asumsi: string[];
    hubunganPersamaan: string;
    kondisiBerlaku: string;
  };
  visualIlmiah: TheoryVisualConfig;
  pendalaman: {
    kasusSederhana: string;
    kasusMenengah: string;
    kasusKompleks: string;
    konsepPendukung: string;
    penerapanOlimpiade: string;
  };
  contohBertahap: Array<{
    judul: string;
    soal: string;
    langkah: string[];
    interpretasi: string;
  }>;
  narrationScript: string;
}

export interface FormulaEntry {
  id: string;
  kategori: string;
  nama: string;
  persamaan: string;
  variabel: Array<{ simbol: string; arti: string; satuan: string; dimensi: string }>;
  kondisiPenggunaan: string;
  catatanOlimpiade: string;
  narration: string;
}

export interface ConceptNode {
  id: string;
  title: string;
  category: 'inti' | 'turunan' | 'grafik' | 'olimpiade';
  shortDesc: string;
  detail: string;
  keyFormula: string;
  connections: string[];
  relatedModuleId: string;
  relatedQuestionIds: number[];
}

export interface QuestionAttemptState {
  lastInput: string;
  isCorrect: boolean;
  attempts: number;
  explanationOpened: boolean;
}

export interface ProgressState {
  completedTheoryIds: string[];
  questionAttempts: Record<number, QuestionAttemptState>;
}
