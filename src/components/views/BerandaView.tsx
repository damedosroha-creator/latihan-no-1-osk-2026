import React from 'react';
import { ArrowRight, BookOpen, Compass, FlaskConical, Target } from 'lucide-react';
import { MenuTab, StimulusSpec } from '../../types/physics';
import { MasterySummary } from '../../utils/kinematicsEngine';
import { MisterJoBar } from '../MisterJoBar';
import { StimulusDiagram } from '../StimulusDiagram';

interface BerandaViewProps {
  mastery: MasterySummary;
  onNavigate: (tab: MenuTab) => void;
}

const OSK_SOURCE_STIMULUS: StimulusSpec = {
  mode: 'v-t',
  xLabel: 't (s)',
  yLabel: 'v (m/s)',
  tMin: 0,
  tMax: 3.0,
  tStepMajor: 1.0,
  tStepGrid: 0.5,
  yMin: -2,
  yMax: 4,
  yStepMajor: 2,
  yStepGrid: 2,
  objects: [
    {
      id: 'osk1',
      label: 'Mobil Mainan OSK 2026 #1',
      color: '#7A1228',
      initialX: 0,
      segments: [
        { tStart: 0, tEnd: 1.0, kind: 'linear-v', vStart: 2, vEnd: 4 },
        { tStart: 1.0, tEnd: 1.5, kind: 'linear-v', vStart: 4, vEnd: 4 },
        { tStart: 1.5, tEnd: 3.0, kind: 'linear-v', vStart: 4, vEnd: -2 },
      ],
    },
  ],
};

const STAGES = [
  'Pemula',
  'Memahami Konsep',
  'Mampu Mengaplikasikan',
  'Analitis',
  'Mahir Olimpiade',
];

export const BerandaView: React.FC<BerandaViewProps> = ({ mastery, onNavigate }) => {
  return (
    <div className="space-y-10">
      {/* Hero Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-7 sm:p-9 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#7A1228]">
              <span>OLYMPIAD PHYSICS LAB</span>
              <span aria-hidden="true">·</span>
              <span>City Level Training</span>
              <span aria-hidden="true">·</span>
              <span>Pengajar: MISTER JO</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-tight [text-wrap:balance]">
              Kuasai Kinematika Grafik Gerak Lurus Berbasis Soal OSK Fisika Nomor 1
            </h1>

            <p className="text-base text-stone-600 leading-relaxed max-w-2xl">
              Laboratorium latihan intensif Olimpiade Sains Nasional tingkat kota bersama
              Mister Jo. Seluruh 15 soal numerik, teori bertahap, simulasi vektor &amp;
              FBD, serta pembuktian animasi dirancang dari akar konsep kurva kecepatan-waktu
              dan perpindahan maksimum.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('teori-dasar')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7A1228] text-white text-sm font-semibold hover:bg-[#580B1C] transition-colors whitespace-nowrap cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Mulai Belajar
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('latihan-soal')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#7A1228]/30 bg-[#FDF2F4] text-[#7A1228] text-sm font-semibold hover:bg-[#7A1228]/10 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Target className="w-4 h-4" />
                Kerjakan 15 Soal Latihan
              </button>

              <button
                type="button"
                onClick={() => onNavigate('lab-visual')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <FlaskConical className="w-4 h-4" />
                Lab Visual
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100">
            <MisterJoBar
              narrationId="beranda-intro"
              title="Pengantar Belajar dari Mister Jo"
              script="Halo calon juara Olimpiade Sains Fisika! Saya Mister Jo. Selamat datang di Olympiad Physics Lab tingkat kota. Pada program ini, kita membedah tuntas kompetensi utama Soal OSK Nomor 1, yaitu kinematika gerak lurus melalui analisis grafik kecepatan terhadap waktu. Mulailah dari Pusat Pembelajaran Konsep Fisika, uji intuisimu di Laboratorium Visual, lalu taklukkan 15 soal isian numerik lengkap dengan pembuktian animasinya. Mari kita mulai!"
              compact
            />
          </div>
        </div>

        {/* Source Benchmark Card */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-[#7A1228]">Acuan Utama: OSK Fisika 2026</span>
              <span>Soal Nomor 1</span>
            </div>
            <h2 className="text-lg font-semibold text-stone-900">
              Kurva v(t) Mobil Mainan &amp; Titik Balik
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              &ldquo;Sebuah mobil mainan bergerak sepanjang garis lurus dan digambarkan dalam
              kurva kecepatan terhadap waktu. Perpindahan maksimum mobil mainan tersebut dari
              awal hingga waktu 3 detik adalah ... m.&rdquo;
            </p>
          </div>

          <div className="my-4">
            <StimulusDiagram
              stimulus={OSK_SOURCE_STIMULUS}
              title="Replikasi Grafik Sumber OSK #1 (Skala 0,5 s × 2 m/s)"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-stone-600 pt-2 border-t border-stone-100">
            <span>Titik balik: v = 0 di t = 2,5 s</span>
            <button
              type="button"
              onClick={() => onNavigate('peta-konsep')}
              className="inline-flex items-center gap-1 font-semibold text-[#7A1228] hover:underline cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              Lihat Peta Konsep
            </button>
          </div>
        </div>
      </section>

      {/* 4-column Summary Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs text-stone-500">Progres Soal Benar</div>
          <div className="text-2xl font-bold font-mono-num text-[#7A1228] mt-1">
            {mastery.correctCount} / {mastery.totalQuestions}
          </div>
          <div className="text-xs text-stone-600 mt-1">Isian singkat 1 desimal (koma)</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs text-stone-500">Modul Teori Dipelajari</div>
          <div className="text-2xl font-bold font-mono-num text-stone-900 mt-1">
            {mastery.theoryCompletedCount} / {mastery.totalTheoryCount}
          </div>
          <div className="text-xs text-stone-600 mt-1">Bertahap dari dasar ke OSK</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs text-stone-500">Tingkat Penguasaan</div>
          <div className="text-xl font-bold text-stone-900 mt-1 truncate">
            {mastery.stageName}
          </div>
          <div className="text-xs text-stone-600 mt-1 font-mono-num">
            Skor penguasaan: {mastery.masteryPercent}%
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs text-stone-500">Pembuktian &amp; Narasi</div>
          <div className="text-2xl font-bold font-mono-num text-stone-900 mt-1">
            15 Simulasi
          </div>
          <div className="text-xs text-stone-600 mt-1">Animasi fisis + suara Mister Jo</div>
        </div>
      </section>

      {/* Learning Pathway */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Alur Pembelajaran Bertahap Menuju Olimpiade Kota
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              {mastery.stageDescription}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('progres')}
            className="text-xs font-semibold text-[#7A1228] hover:underline whitespace-nowrap cursor-pointer"
          >
            Lihat Evaluasi Lengkap →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {STAGES.map((stage, idx) => {
            const isCurrent = idx === mastery.stageIndex;
            const isPassed = idx < mastery.stageIndex;
            return (
              <div
                key={stage}
                className={`rounded-xl border p-4 transition-colors ${
                  isCurrent
                    ? 'border-[#7A1228] bg-[#FDF2F4]'
                    : isPassed
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : 'border-stone-200 bg-[#FAF8F8]'
                }`}
              >
                <div className="text-[11px] font-mono-num text-stone-500">
                  Tahap {idx + 1}
                </div>
                <div
                  className={`text-sm font-semibold mt-1 ${
                    isCurrent ? 'text-[#7A1228]' : 'text-stone-900'
                  }`}
                >
                  {stage}
                </div>
                <div className="text-[11px] text-stone-600 mt-1">
                  {isCurrent ? 'Posisi Anda saat ini' : isPassed ? 'Terlampaui' : 'Target lanjutan'}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
