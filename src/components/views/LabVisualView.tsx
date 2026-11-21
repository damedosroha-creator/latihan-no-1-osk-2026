import React, { useMemo, useState } from 'react';
import { Sliders } from 'lucide-react';
import { StimulusSpec } from '../../types/physics';
import { evaluateObjectAt, formatIndonesianDecimal } from '../../utils/kinematicsEngine';
import { MisterJoBar } from '../MisterJoBar';
import { PhysicsProofSimulator } from '../PhysicsProofSimulator';

type PresetId = 'osk-1' | 'simetris' | 'dua-mobil' | 'kustom';

export const LabVisualView: React.FC = () => {
  const [preset, setPreset] = useState<PresetId>('osk-1');

  // Custom interactive parameters
  const [v0, setV0] = useState<number>(3);
  const [a1, setA1] = useState<number>(2);
  const [tSwitch, setTSwitch] = useState<number>(1.5);
  const [a2, setA2] = useState<number>(-4);
  const [tTotal, setTTotal] = useState<number>(4.0);

  const activeStimulus = useMemo<StimulusSpec>(() => {
    if (preset === 'osk-1') {
      return {
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
            id: 'osk',
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
          label: 'Perpindahan Maksimum = 7,0 m di t = 2,5 s',
          phaseNotes: [
            { tFrom: 0, tTo: 1.0, note: 'Dipercepat +2 m/s² dari 2 ke 4 m/s.' },
            { tFrom: 1.0, tTo: 1.5, note: 'Melaju konstan 4 m/s selama 0,5 s.' },
            { tFrom: 1.5, tTo: 2.5, note: 'Diperlambat -4 m/s² hingga v = 0 pada t = 2,5 s (x = 7,0 m).' },
            { tFrom: 2.5, tTo: 3.0, note: 'Berbalik mundur 0,5 m sehingga x(3,0) = 6,5 m.' },
          ],
        },
      };
    }

    if (preset === 'simetris') {
      return {
        mode: 'v-t',
        xLabel: 't (s)',
        yLabel: 'v (m/s)',
        tMin: 0,
        tMax: 6.0,
        tStepMajor: 1.0,
        tStepGrid: 1.0,
        yMin: -6,
        yMax: 6,
        yStepMajor: 2,
        yStepGrid: 1,
        objects: [
          {
            id: 'sym',
            label: 'Partikel Bolak-Balik',
            color: '#7A1228',
            initialX: 0,
            segments: [
              { tStart: 0, tEnd: 1.5, kind: 'linear-v', vStart: 0, vEnd: 6 },
              { tStart: 1.5, tEnd: 4.5, kind: 'linear-v', vStart: 6, vEnd: -6 },
              { tStart: 4.5, tEnd: 6.0, kind: 'linear-v', vStart: -6, vEnd: 0 },
            ],
          },
        ],
        proofHighlight: {
          tStar: 3.0,
          xStar: 9.0,
          label: 'Puncak Simetris 9,0 m di t = 3,0 s',
          phaseNotes: [
            { tFrom: 0, tTo: 3.0, note: 'Maju dengan total luas segitiga atas +9,0 m hingga titik balik t = 3,0 s.' },
            { tFrom: 3.0, tTo: 6.0, note: 'Mundur -9,0 m kembali tepat ke posisi awal x = 0, namun jarak tempuh total 18,0 m.' },
          ],
        },
      };
    }

    if (preset === 'dua-mobil') {
      return {
        mode: 'dual-v-t',
        xLabel: 't (s)',
        yLabel: 'v (m/s)',
        tMin: 0,
        tMax: 6.0,
        tStepMajor: 1.0,
        tStepGrid: 0.5,
        yMin: -4,
        yMax: 7,
        yStepMajor: 2,
        yStepGrid: 1,
        objects: [
          {
            id: 'carA',
            label: 'Mobil A',
            color: '#7A1228',
            initialX: 0,
            segments: [
              { tStart: 0, tEnd: 2.0, kind: 'linear-v', vStart: 4, vEnd: 4 },
              { tStart: 2.0, tEnd: 6.0, kind: 'linear-v', vStart: 4, vEnd: -4 },
            ],
          },
          {
            id: 'carB',
            label: 'Mobil B',
            color: '#0369A1',
            initialX: 0,
            segments: [
              { tStart: 0, tEnd: 4.0, kind: 'linear-v', vStart: 0, vEnd: 6 },
              { tStart: 4.0, tEnd: 6.0, kind: 'linear-v', vStart: 6, vEnd: 6 },
            ],
          },
        ],
        proofHighlight: {
          tStar: 16 / 7,
          xStar: 36 / 7,
          label: 'Jarak Pisah Maksimum 5,1 m di t = 2,29 s',
          phaseNotes: [
            { tFrom: 0, tTo: 16 / 7, note: 'v_A > v_B: Mobil A memperlebar jarak dari Mobil B.' },
            { tFrom: 16 / 7, tTo: 4.0, note: 'v_B > v_A: Mobil B mengejar dan menyusul tepat pada t = 4,0 s.' },
            { tFrom: 4.0, tTo: 6.0, note: 'Mobil B terus maju sementara Mobil A berbalik arah.' },
          ],
        },
      };
    }

    // Custom sandbox mode
    const vSwitch = v0 + a1 * tSwitch;
    const vEnd = vSwitch + a2 * (tTotal - tSwitch);
    const customSpec = {
      id: 'kustom',
      label: 'Benda Uji Kustom',
      color: '#7A1228',
      initialX: 0,
      segments: [
        { tStart: 0, tEnd: tSwitch, kind: 'linear-v' as const, vStart: v0, vEnd: vSwitch },
        { tStart: tSwitch, tEnd: tTotal, kind: 'linear-v' as const, vStart: vSwitch, vEnd: vEnd },
      ],
    };

    // Compute exact turning point if v crosses 0 in segment 2
    let tStar: number | undefined;
    let xStar: number | undefined;
    if (vSwitch * vEnd < 0 && a2 !== 0) {
      tStar = tSwitch + -vSwitch / a2;
      xStar = evaluateObjectAt(customSpec, tStar).x;
    }

    return {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: tTotal,
      tStepMajor: 1.0,
      tStepGrid: 0.5,
      yMin: Math.min(-4, Math.floor(Math.min(v0, vSwitch, vEnd)) - 1),
      yMax: Math.max(6, Math.ceil(Math.max(v0, vSwitch, vEnd)) + 1),
      yStepMajor: 2,
      yStepGrid: 1,
      objects: [customSpec],
      proofHighlight: {
        tStar,
        xStar,
        label:
          tStar !== undefined && xStar !== undefined
            ? `Titik Balik t* = ${formatIndonesianDecimal(tStar)} s (x = ${formatIndonesianDecimal(xStar)} m)`
            : 'Tidak ada pembalikan arah pada segmen 2',
        phaseNotes: [
          {
            tFrom: 0,
            tTo: tSwitch,
            note: `Fase 1: Percepatan konstan ${formatIndonesianDecimal(a1)} m/s² selama ${formatIndonesianDecimal(tSwitch)} s.`,
          },
          {
            tFrom: tSwitch,
            tTo: tTotal,
            note: `Fase 2: Percepatan konstan ${formatIndonesianDecimal(a2)} m/s² hingga t = ${formatIndonesianDecimal(tTotal)} s.`,
          },
        ],
      },
    };
  }, [preset, v0, a1, tSwitch, a2, tTotal]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold text-[#7A1228]">
          Laboratorium Visual Kinematika
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
          Eksperimen Gerak Lurus, Vektor FBD &amp; Grafik Terhubung
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl">
          Pilih skenario preset atau atur parameter percepatan secara langsung untuk
          mengamati hubungan antara posisi, vektor kecepatan, gaya total FBD, dan luas kurva v-t.
        </p>
      </div>

      <MisterJoBar
        narrationId="lab-visual"
        title="Panduan Eksperimen Lab Visual"
        script="Di Laboratorium Visual ini, kamu bebas bereksperimen. Cobalah mode Kustom dan ubah percepatan kedua menjadi negatif sementara kecepatan awal positif. Perhatikan bagaimana panah gaya total langsung mengarah ke kiri meskipun mobil masih melaju ke kanan, hingga kecepatan tepat nol di titik balik. Amati pula luas kurva yang terarsir dan grafik posisi x terhadap t di bawahnya."
        compact
      />

      {/* Preset Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            ['osk-1', 'Preset 1: Soal OSK 2026 #1'],
            ['simetris', 'Preset 2: Maju-Mundur Simetris'],
            ['dua-mobil', 'Preset 3: Gerak Relatif 2 Mobil'],
            ['kustom', 'Mode Kustom Interaktif'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setPreset(id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
              preset === id
                ? 'bg-[#7A1228] text-white border-[#7A1228]'
                : 'bg-white text-stone-700 border-stone-200 hover:border-[#7A1228]/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Interactive Parameter Sliders for Kustom mode */}
      {preset === 'kustom' && (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
            <Sliders className="w-4 h-4 text-[#7A1228]" />
            <span>Panel Parameter Eksperimen Kustom</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label htmlFor="slider-v0" className="font-medium text-stone-700">
                  Kecepatan Awal v₀
                </label>
                <span className="font-mono-num font-semibold text-[#7A1228]">
                  {formatIndonesianDecimal(v0)} m/s
                </span>
              </div>
              <input
                id="slider-v0"
                type="range"
                min={-4}
                max={6}
                step={0.5}
                value={v0}
                onChange={(e) => setV0(Number(e.target.value))}
                className="w-full accent-[#7A1228] cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label htmlFor="slider-a1" className="font-medium text-stone-700">
                  Percepatan a₁
                </label>
                <span className="font-mono-num font-semibold text-[#7A1228]">
                  {formatIndonesianDecimal(a1)} m/s²
                </span>
              </div>
              <input
                id="slider-a1"
                type="range"
                min={-3}
                max={4}
                step={0.5}
                value={a1}
                onChange={(e) => setA1(Number(e.target.value))}
                className="w-full accent-[#7A1228] cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label htmlFor="slider-tswitch" className="font-medium text-stone-700">
                  Waktu Transisi t₁
                </label>
                <span className="font-mono-num font-semibold text-[#7A1228]">
                  {formatIndonesianDecimal(tSwitch)} s
                </span>
              </div>
              <input
                id="slider-tswitch"
                type="range"
                min={0.5}
                max={3.0}
                step={0.5}
                value={tSwitch}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTSwitch(val);
                  if (tTotal <= val + 0.5) setTTotal(val + 1.0);
                }}
                className="w-full accent-[#7A1228] cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label htmlFor="slider-a2" className="font-medium text-stone-700">
                  Percepatan a₂
                </label>
                <span className="font-mono-num font-semibold text-[#7A1228]">
                  {formatIndonesianDecimal(a2)} m/s²
                </span>
              </div>
              <input
                id="slider-a2"
                type="range"
                min={-6}
                max={2}
                step={0.5}
                value={a2}
                onChange={(e) => setA2(Number(e.target.value))}
                className="w-full accent-[#7A1228] cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label htmlFor="slider-ttotal" className="font-medium text-stone-700">
                  Durasi Total T
                </label>
                <span className="font-mono-num font-semibold text-[#7A1228]">
                  {formatIndonesianDecimal(tTotal)} s
                </span>
              </div>
              <input
                id="slider-ttotal"
                type="range"
                min={Math.max(2.0, tSwitch + 0.5)}
                max={7.0}
                step={0.5}
                value={tTotal}
                onChange={(e) => setTTotal(Number(e.target.value))}
                className="w-full accent-[#7A1228] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Simulator Stage */}
      <PhysicsProofSimulator
        stimulus={activeStimulus}
        title={
          preset === 'osk-1'
            ? 'Simulasi Soal Sumber OSK 2026 Nomor 1'
            : preset === 'simetris'
            ? 'Simulasi Gerak Maju-Mundur Simetris'
            : preset === 'dua-mobil'
            ? 'Simulasi Gerak Relatif Dua Kendaraan'
            : 'Simulasi Kustom Dua Fase'
        }
      />
    </div>
  );
};
