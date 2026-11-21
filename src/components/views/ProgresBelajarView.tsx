import React, { useState } from 'react';
import { Award, BookOpen, RotateCcw, Target } from 'lucide-react';
import { QUESTIONS_DATA } from '../../data/questionsData';
import { ProgressState, QuestionTierId } from '../../types/physics';
import { MasterySummary } from '../../utils/kinematicsEngine';
import { MisterJoBar } from '../MisterJoBar';

interface ProgresBelajarViewProps {
  progress: ProgressState;
  mastery: MasterySummary;
  onOpenTheoryModule: (moduleId: string) => void;
  onOpenQuestion: (questionId: number) => void;
  onResetProgress: () => void;
}

const TIERS: Array<{ id: QuestionTierId; label: string }> = [
  { id: 'fundamental', label: 'Soal 1–3 · Penguatan Konsep Fundamental' },
  { id: 'penerapan', label: 'Soal 4–6 · Penerapan Prinsip & Persamaan' },
  { id: 'analisis', label: 'Soal 7–9 · Analisis Beberapa Kondisi Fisis' },
  { id: 'matematis', label: 'Soal 10–12 · Penalaran Matematis & Kombinasi' },
  { id: 'olimpiade', label: 'Soal 13–15 · Tantangan Olimpiade Kompleks' },
];

export const ProgresBelajarView: React.FC<ProgresBelajarViewProps> = ({
  progress,
  mastery,
  onOpenTheoryModule,
  onOpenQuestion,
  onResetProgress,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#7A1228]">
            Evaluasi &amp; Progres Belajar
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Pemantauan Penguasaan Konsep Olimpiade
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setConfirmReset(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Progres
        </button>
      </div>

      {confirmReset && (
        <div
          role="alertdialog"
          aria-labelledby="reset-title"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <div id="reset-title" className="text-sm font-bold text-rose-900">
              Hapus seluruh riwayat latihan dan status modul teori?
            </div>
            <div className="text-xs text-rose-800 mt-0.5">
              Tindakan ini akan mengembalikan status latihan Anda ke awal.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-semibold text-stone-700 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => {
                onResetProgress();
                setConfirmReset(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#7A1228] text-white text-xs font-semibold cursor-pointer"
            >
              Ya, Reset Sekarang
            </button>
          </div>
        </div>
      )}

      <MisterJoBar
        narrationId="progres-evaluasi"
        title="Evaluasi Belajar dari Mister Jo"
        script={`Saat ini tingkat penguasaan Anda berada pada tahap ${mastery.stageName} dengan ${mastery.correctCount} dari 15 soal terjawab benar dan ${mastery.theoryCompletedCount} dari 4 modul teori selesai dipelajari. ${mastery.stageDescription}`}
        compact
      />

      {/* Top KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs text-stone-500">Status Penguasaan</div>
          <div className="text-xl font-bold text-[#7A1228] mt-1 flex items-center gap-2">
            <Award className="w-5 h-5 shrink-0" />
            <span>{mastery.stageName}</span>
          </div>
          <div className="text-xs text-stone-600 mt-1 font-mono-num">
            Indeks Penguasaan: {mastery.masteryPercent}%
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs text-stone-500">Soal Dikerjakan</div>
          <div className="text-2xl font-bold font-mono-num text-stone-900 mt-1">
            {mastery.attemptedCount} / {mastery.totalQuestions}
          </div>
          <div className="text-xs text-stone-600 mt-1">Isian numerik 1 desimal</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs text-stone-500">Jawaban Benar</div>
          <div className="text-2xl font-bold font-mono-num text-emerald-700 mt-1">
            {mastery.correctCount} Soal
          </div>
          <div className="text-xs text-stone-600 mt-1 font-mono-num">
            Akurasi percobaan: {mastery.accuracyPercent}%
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs text-stone-500">Modul Teori Selesai</div>
          <div className="text-2xl font-bold font-mono-num text-stone-900 mt-1">
            {mastery.theoryCompletedCount} / {mastery.totalTheoryCount}
          </div>
          <div className="text-xs text-stone-600 mt-1">Pusat Pembelajaran Konsep</div>
        </div>
      </div>

      {/* Tier Breakdown + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-stone-900">
            Rincian Penguasaan per Tingkat Kesulitan
          </h2>

          <div className="space-y-3">
            {TIERS.map((tier) => {
              const tierQs = QUESTIONS_DATA.filter((q) => q.tier === tier.id);
              const solved = tierQs.filter(
                (q) => progress.questionAttempts[q.id]?.isCorrect
              ).length;
              const pct = Math.round((solved / tierQs.length) * 100);
              return (
                <div
                  key={tier.id}
                  className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-4 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-stone-800">{tier.label}</span>
                    <span className="font-mono-num font-bold text-[#7A1228]">
                      {solved} / {tierQs.length} Benar ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className="h-full bg-[#7A1228] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {tierQs.map((q) => {
                      const att = progress.questionAttempts[q.id];
                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => onOpenQuestion(q.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-mono-num font-semibold cursor-pointer ${
                            att?.isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : att
                              ? 'bg-amber-50 border-amber-300 text-amber-800'
                              : 'bg-white border-stone-200 text-stone-700 hover:border-[#7A1228]'
                          }`}
                        >
                          <Target className="w-3 h-3" />
                          Soal #{q.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-stone-900">
            Rekomendasi Materi Berikutnya
          </h2>
          <p className="text-sm text-stone-600">{mastery.stageDescription}</p>

          {mastery.recommendations.length > 0 ? (
            <div className="space-y-3">
              {mastery.recommendations.map((rec) => (
                <div
                  key={rec.targetModuleId}
                  className="rounded-xl border border-[#7A1228]/20 bg-[#FDF2F4]/60 p-4 space-y-2"
                >
                  <div className="text-sm font-bold text-[#7A1228]">{rec.title}</div>
                  <div className="text-xs text-stone-700 leading-relaxed">
                    {rec.reason}
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenTheoryModule(rec.targetModuleId)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7A1228] text-white text-xs font-semibold hover:bg-[#580B1C] transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Buka Modul Teori
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              Seluruh modul teori telah selesai dipelajari! Fokuskan latihan pada soal
              tantangan #10–#15 untuk mempertajam kecepatan aljabar olimpiade.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
