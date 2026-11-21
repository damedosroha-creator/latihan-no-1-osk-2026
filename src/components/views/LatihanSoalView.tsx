import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  AlertCircle,
  BookOpen,
  Lightbulb,
} from 'lucide-react';
import { QUESTIONS_DATA } from '../../data/questionsData';
import {
  QuestionAttemptState,
  QuestionTierId,
} from '../../types/physics';
import { validateAnswer, ValidationResult } from '../../utils/kinematicsEngine';
import { MathText } from '../MathText';
import { MisterJoBar } from '../MisterJoBar';
import { PhysicsProofSimulator } from '../PhysicsProofSimulator';
import { StimulusDiagram } from '../StimulusDiagram';

interface LatihanSoalViewProps {
  activeQuestionId: number;
  onSelectQuestion: (id: number) => void;
  questionAttempts: Record<number, QuestionAttemptState>;
  onRecordAttempt: (
    questionId: number,
    input: string,
    isCorrect: boolean
  ) => void;
  onMarkExplanationOpened: (questionId: number) => void;
  onOpenTheoryModule: (moduleId: string) => void;
}

const TIER_FILTERS: Array<{ id: 'all' | QuestionTierId; label: string }> = [
  { id: 'all', label: 'Semua (15)' },
  { id: 'fundamental', label: '1–3 Fundamental' },
  { id: 'penerapan', label: '4–6 Penerapan' },
  { id: 'analisis', label: '7–9 Analisis' },
  { id: 'matematis', label: '10–12 Matematis' },
  { id: 'olimpiade', label: '13–15 Olimpiade' },
];

export const LatihanSoalView: React.FC<LatihanSoalViewProps> = ({
  activeQuestionId,
  onSelectQuestion,
  questionAttempts,
  onRecordAttempt,
  onMarkExplanationOpened,
  onOpenTheoryModule,
}) => {
  const [tierFilter, setTierFilter] = useState<'all' | QuestionTierId>('all');
  const [inputVal, setInputVal] = useState<string>('');
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const currentQuestion = useMemo(
    () =>
      QUESTIONS_DATA.find((q) => q.id === activeQuestionId) ?? QUESTIONS_DATA[0],
    [activeQuestionId]
  );

  const filteredQuestions = useMemo(
    () =>
      tierFilter === 'all'
        ? QUESTIONS_DATA
        : QUESTIONS_DATA.filter((q) => q.tier === tierFilter),
    [tierFilter]
  );

  // Sync input box when switching questions
  useEffect(() => {
    const prevAttempt = questionAttempts[currentQuestion.id];
    setInputVal(prevAttempt?.lastInput ?? '');
    setValidation(null);
    setShowExplanation(false);
  }, [currentQuestion.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateAnswer(inputVal, currentQuestion.expectedValue);
    setValidation(res);
    if (res.validFormat) {
      onRecordAttempt(currentQuestion.id, inputVal.trim(), res.isCorrect);
    }
  };

  const handleToggleExplanation = () => {
    const next = !showExplanation;
    setShowExplanation(next);
    if (next) {
      onMarkExplanationOpened(currentQuestion.id);
    }
  };

  const attemptState = questionAttempts[currentQuestion.id];

  return (
    <div className="space-y-6">
      {/* Header + Tier Filter */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#7A1228]">
            15 Soal Latihan OSK Tingkat Kota · Isian Singkat Numerik
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Latihan Kinematika Berbasis Soal Nomor 1
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-white border border-stone-200 rounded-xl">
          {TIER_FILTERS.map((tf) => (
            <button
              key={tf.id}
              type="button"
              onClick={() => setTierFilter(tf.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                tierFilter === tf.id
                  ? 'bg-[#7A1228] text-white'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question Selector Grid (All 15 unlocked) */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4">
        <div className="text-xs font-medium text-stone-500 mb-3 flex flex-wrap items-center justify-between gap-2">
          <span>Pilih Nomor Soal (seluruh 15 soal terbuka sejak awal)</span>
          <span className="font-mono-num">
            Terjawab benar:{' '}
            {Object.values(questionAttempts).filter((a) => a.isCorrect).length} / 15
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-15 gap-2">
          {filteredQuestions.map((q) => {
            const isActive = q.id === currentQuestion.id;
            const att = questionAttempts[q.id];
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectQuestion(q.id)}
                aria-label={`Pilih Soal ${q.id}${
                  att?.isCorrect ? ' (Sudah Benar)' : att ? ' (Sudah Dicoba)' : ''
                }`}
                className={`h-10 rounded-xl border text-xs font-mono-num font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#7A1228] text-white border-[#7A1228] ring-2 ring-[#7A1228]/25'
                    : att?.isCorrect
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:border-emerald-500'
                    : att
                    ? 'bg-amber-50 text-amber-800 border-amber-300 hover:border-amber-500'
                    : 'bg-[#FAF8F8] text-stone-700 border-stone-200 hover:border-[#7A1228]'
                }`}
              >
                <span>{q.id}</span>
                {att?.isCorrect && !isActive && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Workspace */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Question Title & Metadata */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#7A1228]">
              <span>Soal {currentQuestion.id} dari 15</span>
              <span aria-hidden="true">·</span>
              <span>{currentQuestion.tierLabel}</span>
              {attemptState?.isCorrect && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-semibold">Status: Benar</span>
                </>
              )}
            </div>
            <h2 className="text-xl font-bold text-stone-900">
              {currentQuestion.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentQuestion.id <= 1}
              onClick={() => onSelectQuestion(currentQuestion.id - 1)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Soal sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
              Sebelumnya
            </button>
            <button
              type="button"
              disabled={currentQuestion.id >= 15}
              onClick={() => onSelectQuestion(currentQuestion.id + 1)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Soal berikutnya"
            >
              Berikutnya
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Narrator Bar for Question */}
        <MisterJoBar
          narrationId={`q-${currentQuestion.id}-prompt`}
          title={`Bacakan Soal #${currentQuestion.id} & Data Diketahui`}
          script={currentQuestion.narration.soalDanDiketahui}
          compact
        />

        {/* Two-column Question Prompt + Stimulus Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-base text-stone-800 leading-relaxed">
              <MathText text={currentQuestion.prompt} />
            </div>

            {/* Numeric Answer Input Form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-5 space-y-3"
            >
              <div>
                <label
                  htmlFor={`answer-input-${currentQuestion.id}`}
                  className="block text-xs font-bold text-stone-800"
                >
                  Jawaban Numerik (Isian Singkat — 1 Angka di Belakang Koma)
                </label>
                <p className="text-xs text-stone-500 mt-0.5">
                  Wajib menggunakan tanda koma (,) untuk desimal, bukan titik (.). Contoh:
                  12,1 atau -3,2.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center bg-white border border-stone-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-[#7A1228] focus-within:border-[#7A1228]">
                  <input
                    id={`answer-input-${currentQuestion.id}`}
                    type="text"
                    inputMode="decimal"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Contoh: 12,1"
                    className="w-36 font-mono-num text-base font-semibold text-stone-900 focus:outline-none bg-transparent"
                  />
                  <span className="text-sm font-semibold text-stone-500 pl-2 border-l border-stone-200">
                    {currentQuestion.unit}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#7A1228] text-white text-sm font-semibold hover:bg-[#580B1C] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Periksa Jawaban
                </button>
              </div>

              {/* Validation & Pedagogical Feedback */}
              {validation && (
                <div
                  role="status"
                  className={`rounded-xl border p-4 text-sm space-y-2 ${
                    !validation.validFormat
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : validation.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-start gap-2.5 font-semibold">
                    {validation.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div>
                        {validation.isCorrect
                          ? currentQuestion.feedback.correctPraise
                          : validation.message}
                      </div>
                      {validation.isCorrect && (
                        <div className="text-xs font-normal mt-1 text-emerald-800">
                          Kunci jawaban terkonfirmasi:{' '}
                          <span className="font-mono-num font-bold">
                            {currentQuestion.expectedFormatted} {currentQuestion.unit}
                          </span>
                          . Buka pembahasan dan jalankan animasi pembuktian untuk memperdalam
                          pemahaman!
                        </div>
                      )}
                    </div>
                  </div>

                  {validation.validFormat && !validation.isCorrect && (
                    <div className="pt-2 border-t border-rose-200/70 space-y-2 text-xs text-rose-900 leading-relaxed">
                      <div>
                        <strong>Petunjuk Konsep: </strong>
                        <MathText text={currentQuestion.feedback.wrongHint} />
                      </div>
                      <div>
                        <strong>Perbaikan Penalaran: </strong>
                        <MathText text={currentQuestion.feedback.fixReasoning} />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenTheoryModule(currentQuestion.feedback.recommendedModuleId)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-rose-300 text-[#7A1228] font-semibold hover:bg-rose-100/50 transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Pelajari Teori Pendukung
                      </button>
                    </div>
                  )}
                </div>
              )}
            </form>

            {/* LIHAT PEMBAHASAN Toggle Button */}
            <div>
              <button
                type="button"
                onClick={handleToggleExplanation}
                aria-expanded={showExplanation}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#7A1228] bg-white text-[#7A1228] text-sm font-bold hover:bg-[#FDF2F4] transition-colors cursor-pointer"
              >
                {showExplanation ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    TUTUP PEMBAHASAN
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    LIHAT PEMBAHASAN
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Stimulus Visual */}
          <div className="lg:col-span-6">
            <StimulusDiagram
              stimulus={currentQuestion.stimulus}
              title={`Stimulus Grafik Soal #${currentQuestion.id} (${currentQuestion.stimulus.yLabel} vs ${currentQuestion.stimulus.xLabel})`}
            />
          </div>
        </div>

        {/* Collapsible 8-Step Textbook Explanation + Proof Animation */}
        {showExplanation && (
          <div
            className="pt-6 border-t border-stone-200 space-y-6"
            data-testid="explanation-panel"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-[#7A1228]">
                Pembahasan Buku Teks &amp; Pembuktian Animasi — Soal #{currentQuestion.id}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MisterJoBar
                narrationId={`q-${currentQuestion.id}-explain`}
                title="Narasi Pembahasan & Penurunan"
                script={currentQuestion.narration.pembahasanDanPenurunan}
                compact
              />
              <MisterJoBar
                narrationId={`q-${currentQuestion.id}-insight`}
                title="Narasi Animasi & Strategi Olimpiade"
                script={currentQuestion.narration.animasiDanInsight}
                compact
              />
            </div>

            {/* 1. Memahami Permasalahan & 2. Identifikasi Konsep */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <section className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-5 space-y-3">
                <h4 className="text-sm font-bold text-stone-900">
                  1. Memahami Permasalahan
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  <MathText text={currentQuestion.explanation.memahami.fenomena} />
                </p>
                <div className="rounded-lg bg-white border border-amber-200 p-3.5 space-y-1.5">
                  <div className="text-xs font-bold text-amber-800">
                    Besaran yang Diketahui
                  </div>
                  <ul className="text-xs text-stone-800 space-y-1 list-disc pl-4">
                    {currentQuestion.explanation.memahami.diketahui.map((d, i) => (
                      <li key={i}>
                        <MathText text={d} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm text-stone-800">
                  <strong>Ditanyakan: </strong>
                  <MathText text={currentQuestion.explanation.memahami.ditanyakan} />
                </div>
              </section>

              <section className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-5 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    2. Identifikasi Konsep
                  </h4>
                  <p className="text-sm font-semibold text-[#7A1228] mt-1.5">
                    <MathText text={currentQuestion.explanation.identifikasi.prinsip} />
                  </p>
                  <p className="text-sm text-stone-700 mt-1 leading-relaxed">
                    <MathText text={currentQuestion.explanation.identifikasi.alasan} />
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 space-y-1.5">
                  <h4 className="text-sm font-bold text-stone-900">
                    3. Visualisasi &amp; Arah Vektor / FBD
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    <MathText text={currentQuestion.explanation.visualisasi.deskripsiDiagram} />
                  </p>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    <strong>Arah Vektor: </strong>
                    <MathText text={currentQuestion.explanation.visualisasi.arahVektor} />
                  </p>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    <strong>Catatan FBD: </strong>
                    <MathText text={currentQuestion.explanation.visualisasi.catatanFbd} />
                  </p>
                </div>
              </section>
            </div>

            {/* 4. Persamaan Dasar */}
            <section className="rounded-xl border border-[#7A1228]/25 bg-[#FDF2F4]/60 p-5 space-y-3">
              <h4 className="text-sm font-bold text-[#7A1228]">
                4. Persamaan Dasar (Highlight Persamaan Utama)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.explanation.persamaanDasar.map((eq, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-white border border-[#7A1228]/20 p-4 space-y-1.5"
                  >
                    <div className="text-stone-900">
                      <MathText text={eq.rumus} />
                    </div>
                    <div className="text-xs text-stone-600">
                      <strong>Simbol: </strong>
                      <MathText text={eq.simbol} />
                    </div>
                    <div className="text-xs text-stone-700">
                      <strong>Makna fisis: </strong>
                      <MathText text={eq.makna} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Penurunan Matematis & 6. Perhitungan */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
                <h4 className="text-sm font-bold text-stone-900">
                  5. Penurunan Matematis Langkah demi Langkah
                </h4>
                <ol className="space-y-2 list-decimal pl-5 text-sm text-stone-800">
                  {currentQuestion.explanation.penurunanMatematis.map((step, i) => (
                    <li key={i} className="leading-relaxed">
                      <MathText text={step} />
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
                <h4 className="text-sm font-bold text-stone-900">
                  6. Perhitungan Numerik (Satuan SI &amp; Pembulatan)
                </h4>
                <ul className="space-y-2 list-disc pl-5 text-sm text-stone-800">
                  {currentQuestion.explanation.perhitungan.langkah.map((step, i) => (
                    <li key={i} className="leading-relaxed">
                      <MathText text={step} />
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm font-semibold text-amber-950">
                  <MathText text={currentQuestion.explanation.perhitungan.substitusiHighlight} />
                </div>
              </section>
            </div>

            {/* 7. Jawaban Akhir & 8. Insight Olimpiade */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <section className="lg:col-span-4 rounded-xl bg-[#7A1228] text-white p-5 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-rose-100">
                    7. Jawaban Akhir (1 Angka Desimal)
                  </div>
                  <div className="text-4xl font-bold font-mono-num mt-2">
                    {currentQuestion.explanation.jawabanAkhir.nilaiFormatted}{' '}
                    <span className="text-xl font-medium">
                      {currentQuestion.explanation.jawabanAkhir.satuan}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-rose-100 leading-relaxed mt-4 pt-3 border-t border-white/20">
                  <MathText text={currentQuestion.explanation.jawabanAkhir.interpretasi} />
                </p>
              </section>

              <section className="lg:col-span-8 rounded-xl border border-stone-200 bg-[#FAF8F8] p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                  <Lightbulb className="w-4 h-4 text-[#7A1228]" />
                  <span>8. Insight &amp; Strategi Olimpiade</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 leading-relaxed">
                  <div className="bg-white border border-stone-200 rounded-lg p-3">
                    <strong className="text-[#7A1228]">Berpikir Cepat: </strong>
                    <MathText text={currentQuestion.explanation.insightOlimpiade.berpikirCepat} />
                  </div>
                  <div className="bg-white border border-stone-200 rounded-lg p-3">
                    <strong className="text-[#7A1228]">Trik Matematis Sahih: </strong>
                    <MathText text={currentQuestion.explanation.insightOlimpiade.trikSahih} />
                  </div>
                  <div className="bg-white border border-stone-200 rounded-lg p-3">
                    <strong className="text-[#7A1228]">Kesalahan Umum: </strong>
                    <MathText text={currentQuestion.explanation.insightOlimpiade.kesalahanUmum} />
                  </div>
                  <div className="bg-white border border-stone-200 rounded-lg p-3">
                    <strong className="text-[#7A1228]">Mengenali Pola Serupa: </strong>
                    <MathText text={currentQuestion.explanation.insightOlimpiade.polaSerupa} />
                  </div>
                </div>
              </section>
            </div>

            {/* Mandatory Physics Proof Animation */}
            <div className="space-y-2">
              <div className="text-sm font-bold text-stone-900">
                Animasi Pembuktian Fenomena Fisika — Soal #{currentQuestion.id}
              </div>
              <PhysicsProofSimulator
                stimulus={currentQuestion.stimulus}
                title={
                  currentQuestion.stimulus.proofHighlight?.label ??
                  `Pembuktian Fisis Soal #${currentQuestion.id}`
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
