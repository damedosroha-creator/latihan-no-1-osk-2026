import React, { useState } from 'react';
import { BookOpen, Target, ArrowRight } from 'lucide-react';
import { CONCEPT_NODES } from '../../data/theoryData';
import { MenuTab } from '../../types/physics';
import { MathText } from '../MathText';
import { MisterJoBar } from '../MisterJoBar';

interface PetaKonsepViewProps {
  onOpenTheory: (moduleId: string) => void;
  onOpenQuestion: (questionId: number) => void;
  onNavigate: (tab: MenuTab) => void;
}

const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  'node-inti': { x: 350, y: 175 },
  'node-luas': { x: 135, y: 72 },
  'node-jarak': { x: 135, y: 278 },
  'node-balik': { x: 350, y: 315 },
  'node-gradien': { x: 565, y: 72 },
  'node-awal': { x: 135, y: 175 },
  'node-multi': { x: 350, y: 52 },
  'node-relatif': { x: 565, y: 278 },
  'node-optimasi': { x: 565, y: 175 },
};

const CATEGORY_STYLES: Record<string, string> = {
  inti: 'bg-[#7A1228] text-white border-[#7A1228]',
  grafik: 'bg-white text-stone-900 border-[#7A1228]/40',
  turunan: 'bg-white text-stone-900 border-stone-300',
  olimpiade: 'bg-[#FDF2F4] text-[#580B1C] border-[#7A1228]/50',
};

export const PetaKonsepView: React.FC<PetaKonsepViewProps> = ({
  onOpenTheory,
  onOpenQuestion,
}) => {
  const [selectedId, setSelectedId] = useState<string>('node-inti');
  const selectedNode =
    CONCEPT_NODES.find((n) => n.id === selectedId) ?? CONCEPT_NODES[0];

  const edges: Array<[string, string]> = [];
  const seen = new Set<string>();
  for (const node of CONCEPT_NODES) {
    for (const target of node.connections) {
      const key = [node.id, target].sort().join('--');
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([node.id, target]);
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#7A1228]">
            Peta Konsep Terstruktur
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Arsitektur Konsep Soal Nomor 1 hingga Tantangan Olimpiade
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Klik setiap simpul konsep untuk menelusuri hukum fisika, persamaan utama,
            serta tautan langsung ke modul teori dan nomor soal latihan terkait.
          </p>
        </div>
      </div>

      <MisterJoBar
        narrationId="peta-konsep"
        title="Penjelasan Peta Konsep Kinematika"
        script="Perhatikan peta konsep ini. Seluruh cabang berpusat pada Soal OSK Nomor 1 tentang kurva kecepatan terhadap waktu dan perpindahan maksimum. Dari pusat itu, kamu belajar membedakan luas bertanda sebagai perpindahan dan luas mutlak sebagai jarak tempuh, mencari titik balik di mana kecepatan nol, membaca gradien sebagai percepatan, lalu mengembangkannya ke gerak relatif dua benda dan optimasi amplop kurva pada soal tingkat olimpiade."
        compact
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Graph Canvas */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-4 sm:p-6">
          <div className="text-xs font-medium text-stone-500 mb-3 flex flex-wrap gap-4">
            <span>Klik simpul untuk memilih konsep</span>
            <span aria-hidden="true">·</span>
            <span>Garis menghubungkan konsep yang saling bergantung</span>
          </div>

          <div className="relative w-full overflow-x-auto">
            <div className="min-w-[580px]">
              <svg
                viewBox="0 0 700 370"
                className="w-full h-auto"
                aria-label="Diagram jaringan peta konsep kinematika"
              >
                {edges.map(([fromId, toId]) => {
                  const p1 = NODE_POSITIONS[fromId];
                  const p2 = NODE_POSITIONS[toId];
                  if (!p1 || !p2) return null;
                  const isHighlighted =
                    fromId === selectedId || toId === selectedId;
                  return (
                    <line
                      key={`${fromId}-${toId}`}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke={isHighlighted ? '#7A1228' : '#D6D3D1'}
                      strokeWidth={isHighlighted ? 2.4 : 1.4}
                      strokeDasharray={isHighlighted ? undefined : '4 3'}
                    />
                  );
                })}
              </svg>

              {/* Clickable HTML node buttons overlaid on SVG coordinates */}
              <div className="absolute inset-0">
                {CONCEPT_NODES.map((node) => {
                  const pos = NODE_POSITIONS[node.id];
                  if (!pos) return null;
                  const isSelected = node.id === selectedId;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setSelectedId(node.id)}
                      style={{
                        left: `${(pos.x / 700) * 100}%`,
                        top: `${(pos.y / 370) * 100}%`,
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-[170px] px-3 py-2 rounded-xl border text-left transition-all cursor-pointer ${
                        CATEGORY_STYLES[node.category]
                      } ${
                        isSelected
                          ? 'ring-2 ring-[#7A1228] ring-offset-2 shadow-md scale-[1.03]'
                          : 'hover:border-[#7A1228] shadow-xs'
                      }`}
                    >
                      <div className="text-[11px] font-semibold leading-snug line-clamp-2">
                        {node.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Node Inspector */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 space-y-5">
          <div>
            <div className="text-xs font-semibold text-[#7A1228]">
              Detail Simpul Konsep
            </div>
            <h2 className="text-xl font-bold text-stone-900 mt-1">
              {selectedNode.title}
            </h2>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              <MathText text={selectedNode.detail} />
            </p>
          </div>

          <div className="rounded-xl bg-[#FAF8F8] border border-stone-200 p-4">
            <div className="text-xs font-medium text-stone-500 mb-1">
              Persamaan Kunci
            </div>
            <div className="text-stone-900">
              <MathText text={selectedNode.keyFormula} />
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-stone-500 mb-2">
              Terhubung dengan Konsep:
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedNode.connections.map((connId) => {
                const target = CONCEPT_NODES.find((c) => c.id === connId);
                if (!target) return null;
                return (
                  <button
                    key={connId}
                    type="button"
                    onClick={() => setSelectedId(connId)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 bg-[#FAF8F8] text-xs font-medium text-stone-700 hover:border-[#7A1228] hover:text-[#7A1228] transition-colors cursor-pointer"
                  >
                    {target.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 space-y-3">
            <button
              type="button"
              onClick={() => onOpenTheory(selectedNode.relatedModuleId)}
              className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#7A1228] text-white text-sm font-semibold hover:bg-[#580B1C] transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Pelajari Teori Terkait
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div>
              <div className="text-xs font-medium text-stone-500 mb-2">
                Latihan Soal yang Menguji Konsep Ini:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedNode.relatedQuestionIds.map((qId) => (
                  <button
                    key={qId}
                    type="button"
                    onClick={() => onOpenQuestion(qId)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#7A1228]/30 bg-[#FDF2F4] text-[#7A1228] text-xs font-semibold hover:bg-[#7A1228] hover:text-white transition-colors cursor-pointer"
                  >
                    <Target className="w-3.5 h-3.5" />
                    Soal #{qId}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
