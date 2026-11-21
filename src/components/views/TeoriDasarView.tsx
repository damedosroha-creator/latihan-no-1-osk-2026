import React, { useMemo, useState } from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { THEORY_MODULES } from '../../data/theoryData';
import { StimulusSpec } from '../../types/physics';
import { MathText } from '../MathText';
import { MisterJoBar } from '../MisterJoBar';
import { PhysicsProofSimulator } from '../PhysicsProofSimulator';

interface TeoriDasarViewProps {
  activeModuleId: string;
  onSelectModule: (id: string) => void;
  completedTheoryIds: string[];
  onToggleTheoryComplete: (id: string) => void;
  onGoToPractice: () => void;
}

const MODULE_SIM_STIMULI: Record<string, StimulusSpec> = {
  'mod-1': {
    mode: 'v-t',
    xLabel: 't (s)',
    yLabel: 'v (m/s)',
    tMin: 0,
    tMax: 4.0,
    tStepMajor: 1.0,
    tStepGrid: 0.5,
    yMin: -4,
    yMax: 5,
    yStepMajor: 2,
    yStepGrid: 1,
    objects: [
      {
        id: 'm1',
        label: 'Benda Uji Modul 1',
        color: '#7A1228',
        initialX: 0,
        segments: [
          { tStart: 0, tEnd: 2.0, kind: 'linear-v', vStart: 0, vEnd: 4 },
          { tStart: 2.0, tEnd: 4.0, kind: 'linear-v', vStart: 4, vEnd: -4 },
        ],
      },
    ],
    proofHighlight: {
      tStar: 3.0,
      xStar: 6.0,
      label: 'Titik Balik t = 3,0 s (Δx = 6 m, s = 8 m)',
      phaseNotes: [
        { tFrom: 0, tTo: 3.0, note: 'Luas di atas sumbu-t (+6,0 m) menambah baik perpindahan maupun jarak.' },
        { tFrom: 3.0, tTo: 4.0, note: 'Luas di bawah sumbu-t (-2,0 m) mengurangi perpindahan menjadi 4,0 m, tetapi menambah jarak tempuh menjadi 8,0 m.' },
      ],
    },
  },
  'mod-2': {
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
    yStepGrid: 1,
    objects: [
      {
        id: 'osk-source',
        label: 'Mobil Mainan OSK #1',
        color: '#7A1228',
        initialX: 0,
        segments: [
          { tStart: 0, tEnd: 1.0, kind: 'linear-v', vStart: 2, vEnd: 4 },
          { tStart: 1.0, tEnd: 1.5, kind: 'linear-v', vStart: 4, vEnd: 4 },
          { tStart: 1.5, tEnd: 3.0, kind: 'linear-v', vStart: 4, vEnd: -2 },
        ],
      },
    ],
    proofHighlight: {
      tStar: 2.5,
      xStar: 7.0,
      label: 'Titik Balik Soal OSK #1: Δx_maks = 7,0 m',
      phaseNotes: [
        { tFrom: 0, tTo: 1.0, note: 'Dipercepat ke kanan dari 2 ke 4 m/s (luas = 3,0 m).' },
        { tFrom: 1.0, tTo: 1.5, note: 'Melaju konstan 4 m/s selama 0,5 s (luas = 2,0 m).' },
        { tFrom: 1.5, tTo: 2.5, note: 'Melambat hingga v = 0 di t = 2,5 s; perpindahan maksimum tepat 7,0 m!' },
        { tFrom: 2.5, tTo: 3.0, note: 'Berbalik mundur 0,5 m sehingga perpindahan akhir di t = 3,0 s turun menjadi 6,5 m.' },
      ],
    },
  },
  'mod-3': {
    mode: 'a-t',
    xLabel: 't (s)',
    yLabel: 'a (m/s²)',
    tMin: 0,
    tMax: 6.0,
    tStepMajor: 1.0,
    tStepGrid: 1.0,
    yMin: -3,
    yMax: 2,
    yStepMajor: 1,
    yStepGrid: 1,
    objects: [
      {
        id: 'm3',
        label: 'Partikel (v₀ = +4 m/s)',
        color: '#7A1228',
        initialX: 0,
        initialV: 4.0,
        segments: [
          { tStart: 0, tEnd: 2.0, kind: 'step-a', aVal: 0 },
          { tStart: 2.0, tEnd: 6.0, kind: 'step-a', aVal: -2.0 },
        ],
      },
    ],
    proofHighlight: {
      tStar: 4.0,
      xStar: 12.0,
      label: 'Titik Balik t* = 4,0 s (Δx_maks = 12,0 m)',
      phaseNotes: [
        { tFrom: 0, tTo: 2.0, note: 'a = 0: partikel melaju konstan +4 m/s.' },
        { tFrom: 2.0, tTo: 4.0, note: 'a = -2 m/s² mengerem partikel hingga berhenti sesaat di t = 4,0 s.' },
        { tFrom: 4.0, tTo: 6.0, note: 'a = -2 m/s² kini mempercepat partikel ke arah kiri (mundur).' },
      ],
    },
  },
  'mod-4': {
    mode: 'dual-v-t',
    xLabel: 't (s)',
    yLabel: 'v (m/s)',
    tMin: 0,
    tMax: 6.0,
    tStepMajor: 1.0,
    tStepGrid: 1.0,
    yMin: 0,
    yMax: 12,
    yStepMajor: 2,
    yStepGrid: 2,
    objects: [
      {
        id: 'm4-a',
        label: 'Mobil A (6 m/s)',
        color: '#7A1228',
        initialX: 0,
        segments: [{ tStart: 0, tEnd: 6.0, kind: 'linear-v', vStart: 6, vEnd: 6 }],
      },
      {
        id: 'm4-b',
        label: 'Mobil B (a = 2 m/s²)',
        color: '#0369A1',
        initialX: 0,
        segments: [{ tStart: 0, tEnd: 6.0, kind: 'linear-v', vStart: 0, vEnd: 12 }],
      },
    ],
    proofHighlight: {
      tStar: 3.0,
      xStar: 9.0,
      label: 'Jarak Pisah Maksimum 9,0 m saat v_A = v_B (t = 3,0 s)',
      phaseNotes: [
        { tFrom: 0, tTo: 3.0, note: 'v_A > v_B: Mobil A menjauhi B hingga selisih jarak mencapai 9,0 m di t = 3,0 s.' },
        { tFrom: 3.0, tTo: 6.0, note: 'v_B > v_A: Mobil B mengejar dan menyusul tepat di t = 6,0 s.' },
      ],
    },
  },
};

export const TeoriDasarView: React.FC<TeoriDasarViewProps> = ({
  activeModuleId,
  onSelectModule,
  completedTheoryIds,
  onToggleTheoryComplete,
  onGoToPractice,
}) => {
  const [sectionTab, setSectionTab] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');

  const mod = useMemo(
    () => THEORY_MODULES.find((m) => m.id === activeModuleId) ?? THEORY_MODULES[0],
    [activeModuleId]
  );
  const isCompleted = completedTheoryIds.includes(mod.id);
  const simStimulus = MODULE_SIM_STIMULI[mod.id] ?? MODULE_SIM_STIMULI['mod-1'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#7A1228]">
            Pusat Pembelajaran Konsep Fisika
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Materi Bertahap Kinematika Gerak Lurus &amp; Grafik
          </h1>
        </div>

        <button
          type="button"
          onClick={() => onToggleTheoryComplete(mod.id)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
            isCompleted
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-white border-stone-300 text-stone-800 hover:border-[#7A1228] hover:text-[#7A1228]'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <Circle className="w-4 h-4 text-stone-400" />
          )}
          {isCompleted ? 'Selesai Dipelajari' : 'Tandai Selesai Dipelajari'}
        </button>
      </div>

      {/* Module Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {THEORY_MODULES.map((m) => {
          const active = m.id === mod.id;
          const done = completedTheoryIds.includes(m.id);
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectModule(m.id)}
              className={`text-left rounded-xl border p-4 transition-all cursor-pointer ${
                active
                  ? 'border-[#7A1228] bg-[#FDF2F4]'
                  : 'border-stone-200 bg-white hover:border-[#7A1228]/40'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-medium text-stone-500">
                <span>{m.levelTag}</span>
                {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
              </div>
              <div
                className={`text-sm font-bold mt-1.5 leading-snug ${
                  active ? 'text-[#7A1228]' : 'text-stone-900'
                }`}
              >
                {m.order}. {m.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Narrator Bar */}
      <MisterJoBar
        narrationId={`theory-${mod.id}`}
        title={`Penjelasan ${mod.title}`}
        script={mod.narrationScript}
      />

      {/* Module Content Workspace */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-stone-200 pb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-[#7A1228]">{mod.levelTag}</div>
            <h2 className="text-xl font-bold text-stone-900 mt-0.5">{mod.title}</h2>
            <p className="text-sm text-stone-600 mt-1">{mod.summary}</p>
          </div>

          {/* Sub-section navigation A-E */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FAF8F8] border border-stone-200 rounded-xl">
            {(
              [
                ['A', 'A. Pengantar'],
                ['B', 'B. Teori Dasar'],
                ['C', 'C. Visual Ilmiah'],
                ['D', 'D. Pendalaman'],
                ['E', 'E. Contoh Soal'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSectionTab(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  sectionTab === key
                    ? 'bg-[#7A1228] text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Section A */}
        {sectionTab === 'A' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Fenomena Fisika dalam Kehidupan Nyata
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                <MathText text={mod.pengantar.fenomenaNyata} />
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-stone-900 mb-3">
                Definisi Istilah Ilmiah
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mod.pengantar.definisiIlmiah.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-4"
                  >
                    <div className="text-sm font-bold text-[#7A1228]">
                      <MathText text={item.istilah} />
                    </div>
                    <p className="text-sm text-stone-700 mt-1.5 leading-relaxed">
                      <MathText text={item.definisi} />
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-stone-900 mb-3">
                Besaran Fisis, Satuan SI, dan Dimensi
              </h3>
              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#FAF8F8] text-xs font-semibold text-stone-700 border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-4">Besaran</th>
                      <th className="py-2.5 px-4">Simbol</th>
                      <th className="py-2.5 px-4">Satuan SI</th>
                      <th className="py-2.5 px-4">Dimensi</th>
                      <th className="py-2.5 px-4">Makna Fisis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {mod.pengantar.besaranDanSatuan.map((row, idx) => (
                      <tr key={idx} className="bg-white">
                        <td className="py-2.5 px-4 font-medium text-stone-900">{row.besaran}</td>
                        <td className="py-2.5 px-4">
                          <MathText text={row.simbol} />
                        </td>
                        <td className="py-2.5 px-4">
                          <MathText text={row.satuanSI} />
                        </td>
                        <td className="py-2.5 px-4 font-mono-num">
                          <MathText text={row.dimensi} />
                        </td>
                        <td className="py-2.5 px-4 text-stone-600">{row.maknaFisis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Section B */}
        {sectionTab === 'B' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Hukum dan Prinsip Fisika
              </h3>
              <ul className="space-y-2 text-sm text-stone-700 list-disc pl-5">
                {mod.teoriDasar.prinsip.map((p, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <MathText text={p} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#7A1228]/20 bg-[#FDF2F4]/50 p-5 space-y-3">
              <h3 className="text-base font-bold text-[#7A1228]">
                Penurunan Matematis Runtut
              </h3>
              {mod.teoriDasar.penurunan.map((step, idx) => (
                <div key={idx} className="text-sm text-stone-800 leading-relaxed">
                  <MathText text={step} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-4">
                <div className="text-xs font-bold text-stone-800 mb-2">
                  Asumsi &amp; Idealisasi
                </div>
                <ul className="space-y-1.5 text-sm text-stone-700 list-disc pl-4">
                  {mod.teoriDasar.asumsi.map((a, idx) => (
                    <li key={idx}>
                      <MathText text={a} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-4 space-y-2">
                <div className="text-xs font-bold text-stone-800">
                  Hubungan Persamaan &amp; Kondisi Berlaku
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">
                  <MathText text={mod.teoriDasar.hubunganPersamaan} />
                </p>
                <p className="text-xs text-stone-600 pt-2 border-t border-stone-200">
                  <strong>Syarat berlaku:</strong>{' '}
                  <MathText text={mod.teoriDasar.kondisiBerlaku} />
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section C */}
        {sectionTab === 'C' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-4 text-sm text-stone-700">
              <MathText text={mod.visualIlmiah.caption} />
            </div>
            <PhysicsProofSimulator
              stimulus={simStimulus}
              title={`Laboratorium Konsep · ${mod.title}`}
            />
          </div>
        )}

        {/* Section D */}
        {sectionTab === 'D' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-4">
              <div className="text-xs font-bold text-[#7A1228]">Kasus Sederhana</div>
              <p className="text-sm text-stone-700 mt-1.5 leading-relaxed">
                <MathText text={mod.pendalaman.kasusSederhana} />
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-4">
              <div className="text-xs font-bold text-[#7A1228]">Kasus Menengah</div>
              <p className="text-sm text-stone-700 mt-1.5 leading-relaxed">
                <MathText text={mod.pendalaman.kasusMenengah} />
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-4">
              <div className="text-xs font-bold text-[#7A1228]">Kasus Kompleks</div>
              <p className="text-sm text-stone-700 mt-1.5 leading-relaxed">
                <MathText text={mod.pendalaman.kasusKompleks} />
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-4">
              <div className="text-xs font-bold text-[#7A1228]">Konsep Pendukung &amp; Olimpiade</div>
              <p className="text-sm text-stone-700 mt-1.5 leading-relaxed">
                <MathText text={mod.pendalaman.konsepPendukung} />
              </p>
              <p className="text-sm text-stone-800 mt-2 pt-2 border-t border-stone-200">
                <MathText text={mod.pendalaman.penerapanOlimpiade} />
              </p>
            </div>
          </div>
        )}

        {/* Section E */}
        {sectionTab === 'E' && (
          <div className="space-y-5">
            {mod.contohBertahap.map((ex, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-5 space-y-4"
              >
                <div>
                  <div className="text-xs font-semibold text-[#7A1228]">
                    Contoh Pembahasan Bertahap
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mt-0.5">{ex.judul}</h3>
                  <p className="text-sm text-stone-800 mt-2 leading-relaxed">
                    <MathText text={ex.soal} />
                  </p>
                </div>

                <ol className="space-y-2 list-decimal pl-5 text-sm text-stone-700">
                  {ex.langkah.map((l, i) => (
                    <li key={i} className="leading-relaxed">
                      <MathText text={l} />
                    </li>
                  ))}
                </ol>

                <div className="rounded-lg bg-white border border-[#7A1228]/25 p-3.5 text-sm text-stone-800">
                  <strong className="text-[#7A1228]">Interpretasi Hasil: </strong>
                  <MathText text={ex.interpretasi} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            Bagian {sectionTab} dari 5 · Gunakan tab di atas untuk membaca A sampai E
          </div>
          <button
            type="button"
            onClick={onGoToPractice}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7A1228] text-white text-xs font-semibold hover:bg-[#580B1C] transition-colors cursor-pointer"
          >
            Terapkan di 15 Soal Latihan
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
