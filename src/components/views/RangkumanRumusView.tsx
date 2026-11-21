import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { FORMULA_COMPENDIUM } from '../../data/theoryData';
import { misterJoNarrator } from '../../utils/ttsNarrator';
import { MathText } from '../MathText';
import { MisterJoBar } from '../MisterJoBar';

export const RangkumanRumusView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    ...Array.from(new Set(FORMULA_COMPENDIUM.map((f) => f.kategori))),
  ];

  const items =
    selectedCategory === 'Semua'
      ? FORMULA_COMPENDIUM
      : FORMULA_COMPENDIUM.filter((f) => f.kategori === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#7A1228]">
            Rangkuman Rumus &amp; Analisis Dimensi
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Kompendium Persamaan Kinematika 1D Soal Nomor 1
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-white border border-stone-200 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#7A1228] text-white'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <MisterJoBar
        narrationId="rumus-intro"
        title="Cara Menggunakan Rumus Kinematika dengan Benar"
        script="Ingat pesan penting Mister Jo: jangan menghafal rumus tanpa tahu syarat berlakunya! Rumus rata-rata v nol tambah v satu bagi dua hanya berlaku pada satu segmen yang percepatannya konstan. Untuk gerak multi-fase pada kurva v terhadap t, kembalilah selalu pada definisi utama, yaitu perpindahan sebagai luas bertanda di bawah grafik."
        compact
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-medium text-[#7A1228]">
                    {item.kategori}
                  </div>
                  <h2 className="text-lg font-bold text-stone-900 mt-0.5">
                    {item.nama}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    misterJoNarrator.speak(
                      `formula-${item.id}`,
                      item.nama,
                      item.narration
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#7A1228]/30 bg-[#FDF2F4] text-[#7A1228] text-xs font-semibold hover:bg-[#7A1228] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  aria-label={`Dengarkan penjelasan ${item.nama}`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Dengarkan
                </button>
              </div>

              <div className="rounded-xl bg-[#FAF8F8] border border-stone-200 p-4 text-stone-900">
                <MathText text={item.persamaan} />
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF8F8] text-stone-600 border-b border-stone-200">
                    <tr>
                      <th className="py-2 px-3">Variabel</th>
                      <th className="py-2 px-3">Keterangan</th>
                      <th className="py-2 px-3">Satuan SI</th>
                      <th className="py-2 px-3">Dimensi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {item.variabel.map((v, i) => (
                      <tr key={i}>
                        <td className="py-2 px-3 font-semibold text-stone-900">
                          <MathText text={v.simbol} />
                        </td>
                        <td className="py-2 px-3 text-stone-700">{v.arti}</td>
                        <td className="py-2 px-3">
                          <MathText text={v.satuan} />
                        </td>
                        <td className="py-2 px-3 font-mono-num">
                          <MathText text={v.dimensi} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-700">
              <div>
                <strong className="text-stone-900">Kondisi Penggunaan: </strong>
                <MathText text={item.kondisiPenggunaan} />
              </div>
              <div>
                <strong className="text-[#7A1228]">Catatan Olimpiade: </strong>
                <MathText text={item.catatanOlimpiade} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
