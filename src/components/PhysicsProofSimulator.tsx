import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';
import { StimulusSpec } from '../types/physics';
import {
  computeTotalDistance,
  evaluateObjectAt,
  formatIndonesianDecimal,
  sampleObjectSeries,
} from '../utils/kinematicsEngine';

interface PhysicsProofSimulatorProps {
  stimulus: StimulusSpec;
  title?: string;
}

const SPEEDS = [0.5, 1.0, 1.5, 2.0];

export const PhysicsProofSimulator: React.FC<PhysicsProofSimulatorProps> = ({
  stimulus,
  title = 'Simulasi Pembuktian Fisika',
}) => {
  const { tMin, tMax, objects, proofHighlight } = stimulus;
  const [currentTime, setCurrentTime] = useState<number>(tMin);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Precompute sampled trajectories for bounds and live graphs
  const seriesPerObj = useMemo(
    () => objects.map((obj) => sampleObjectSeries(obj, tMin, tMax, 220)),
    [objects, tMin, tMax]
  );

  const bounds = useMemo(() => {
    const allX = seriesPerObj.flatMap((s) => s.map((p) => p.x));
    const allV = seriesPerObj.flatMap((s) => s.map((p) => p.v));
    const minX = Math.min(0, ...allX);
    const maxX = Math.max(0, ...allX);
    const spanX = Math.max(maxX - minX, 4);
    const minV = Math.min(0, ...allV);
    const maxV = Math.max(0, ...allV);
    return {
      xLow: minX - spanX * 0.12,
      xHigh: maxX + spanX * 0.12,
      vLow: Math.floor(minV) - 1,
      vHigh: Math.ceil(maxV) + 1,
    };
  }, [seriesPerObj]);

  // Reset when stimulus changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(tMin);
  }, [stimulus, tMin]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastFrameRef.current = null;
      return;
    }

    const step = (timestamp: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = timestamp;
      }
      const dtReal = (timestamp - lastFrameRef.current) / 1000;
      lastFrameRef.current = timestamp;

      setCurrentTime((prev) => {
        const next = prev + dtReal * speed;
        if (next >= tMax) {
          setIsPlaying(false);
          return tMax;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, speed, tMax]);

  const currentStates = useMemo(
    () => objects.map((obj) => evaluateObjectAt(obj, currentTime)),
    [objects, currentTime]
  );

  const currentDistPrimary = useMemo(
    () => computeTotalDistance(objects[0], tMin, Math.max(tMin, currentTime)),
    [objects, tMin, currentTime]
  );

  // Draw 1D physical track on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = 640;
    const height = objects.length > 1 ? 148 : 118;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    const padX = 42;
    const trackW = width - padX * 2;
    const mapX = (xVal: number) =>
      padX + ((xVal - bounds.xLow) / (bounds.xHigh - bounds.xLow)) * trackW;

    // Ruler baseline
    const rulerY = height - 26;
    ctx.strokeStyle = '#D6D3D1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padX, rulerY);
    ctx.lineTo(width - padX, rulerY);
    ctx.stroke();

    // Ruler ticks
    const span = bounds.xHigh - bounds.xLow;
    const tickStep = span > 30 ? 5 : span > 14 ? 2 : 1;
    const startTick = Math.ceil(bounds.xLow / tickStep) * tickStep;
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    for (let xTick = startTick; xTick <= bounds.xHigh; xTick += tickStep) {
      const px = mapX(xTick);
      ctx.strokeStyle = xTick === 0 ? '#7A1228' : '#A8A29E';
      ctx.lineWidth = xTick === 0 ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(px, rulerY - 5);
      ctx.lineTo(px, rulerY + 5);
      ctx.stroke();

      ctx.fillStyle = xTick === 0 ? '#7A1228' : '#57534E';
      ctx.fillText(xTick === 0 ? 'O (0)' : `${xTick}m`, px, rulerY + 17);
    }

    // Turning point flag on track for single-object proof
    if (proofHighlight?.xStar !== undefined && objects.length === 1) {
      const starPx = mapX(proofHighlight.xStar);
      ctx.strokeStyle = '#B45309';
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(starPx, 16);
      ctx.lineTo(starPx, rulerY - 6);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#B45309';
      ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`Ekstrem (${formatIndonesianDecimal(proofHighlight.xStar)} m)`, starPx, 12);
    }

    // Draw each object car/particle on its lane
    objects.forEach((obj, idx) => {
      const st = currentStates[idx];
      const laneY = objects.length > 1 ? 44 + idx * 42 : 58;
      const cx = mapX(st.x);

      // Track rail
      ctx.strokeStyle = '#F5F5F4';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(padX, laneY + 12);
      ctx.lineTo(width - padX, laneY + 12);
      ctx.stroke();

      // Velocity arrow above body
      if (Math.abs(st.v) > 0.05) {
        const vLen = Math.min(Math.max(Math.abs(st.v) * 6.5, 14), 60);
        const dir = st.v > 0 ? 1 : -1;
        const ax1 = cx;
        const ax2 = cx + dir * vLen;
        const ay = laneY - 18;
        ctx.strokeStyle = obj.color;
        ctx.fillStyle = obj.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ax1, ay);
        ctx.lineTo(ax2, ay);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ax2, ay);
        ctx.lineTo(ax2 - dir * 6, ay - 3.5);
        ctx.lineTo(ax2 - dir * 6, ay + 3.5);
        ctx.closePath();
        ctx.fill();

        ctx.font = '600 10px "IBM Plex Mono", monospace';
        ctx.textAlign = dir > 0 ? 'left' : 'right';
        ctx.fillText(`v=${formatIndonesianDecimal(st.v)}`, ax2 + dir * 4, ay + 3);
      }

      // Car body
      ctx.fillStyle = obj.color;
      ctx.beginPath();
      ctx.roundRect(cx - 16, laneY - 9, 32, 16, 4);
      ctx.fill();

      // Wheels
      ctx.fillStyle = '#1C1917';
      ctx.beginPath();
      ctx.arc(cx - 9, laneY + 8, 4, 0, Math.PI * 2);
      ctx.arc(cx + 9, laneY + 8, 4, 0, Math.PI * 2);
      ctx.fill();

      // Label inside/beside
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 9px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(objects.length > 1 ? (idx === 0 ? 'A' : 'B') : 'm', cx, laneY + 2);
    });
  }, [bounds, currentStates, objects, proofHighlight]);

  const primary = currentStates[0];
  const activePhase =
    proofHighlight?.phaseNotes.find(
      (p) => currentTime >= p.tFrom - 1e-6 && currentTime <= p.tTo + 1e-6
    )?.note ?? 'Geser penggaris waktu atau tekan Putar untuk mengamati proses fisis.';

  const motionStateLabel = (() => {
    if (Math.abs(primary.v) < 0.08) return 'Berhenti Sesaat (Titik Balik v ≈ 0)';
    if (Math.abs(primary.a) < 0.05) return 'Gerak Lurus Beraturan (a = 0)';
    if (primary.v * primary.a > 0) {
      return primary.v > 0 ? 'Dipercepat Maju (+x)' : 'Dipercepat Mundur (-x)';
    }
    return primary.v > 0 ? 'Diperlambat Maju (a berlawanan v)' : 'Diperlambat Mundur (a berlawanan v)';
  })();

  // Synchronized V-T and X-T SVG dimensions
  const gW = 360;
  const gH = 155;
  const gpL = 40;
  const gpR = 16;
  const gpT = 16;
  const gpB = 26;
  const gPlotW = gW - gpL - gpR;
  const gPlotH = gH - gpT - gpB;
  const gToX = (t: number) => gpL + ((t - tMin) / (tMax - tMin)) * gPlotW;
  const gToYv = (v: number) =>
    gpT + ((bounds.vHigh - v) / (bounds.vHigh - bounds.vLow)) * gPlotH;
  const gToYx = (x: number) =>
    gpT + ((bounds.xHigh - x) / (bounds.xHigh - bounds.xLow)) * gPlotH;

  return (
    <div
      className="rounded-xl border border-stone-200 bg-[#FAF8F8] p-4 space-y-4"
      data-testid="physics-proof-simulator"
    >
      {/* Header + Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div>
          <div className="text-xs font-semibold text-[#7A1228]">{title}</div>
          <div className="text-xs text-stone-600 mt-0.5">{activePhase}</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (currentTime >= tMax - 1e-4) {
                setCurrentTime(tMin);
              }
              setIsPlaying((p) => !p);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7A1228] text-white text-xs font-semibold hover:bg-[#580B1C] transition-colors whitespace-nowrap cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Jeda' : currentTime >= tMax - 1e-4 ? 'Putar Ulang' : 'Putar'}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentTime(tMin);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-700 text-xs font-medium hover:bg-stone-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>

          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg p-0.5">
            <FastForward className="w-3 h-3 text-stone-400 ml-1" />
            {SPEEDS.map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => setSpeed(sp)}
                className={`px-2 py-1 rounded-md text-[11px] font-mono-num font-medium cursor-pointer ${
                  speed === sp
                    ? 'bg-[#7A1228] text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {sp.toFixed(1).replace('.', ',')}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Time Slider */}
      <div className="flex items-center gap-3">
        <label htmlFor="sim-time-slider" className="text-xs font-medium text-stone-700 whitespace-nowrap">
          Waktu t:
        </label>
        <input
          id="sim-time-slider"
          type="range"
          min={tMin}
          max={tMax}
          step={0.02}
          value={currentTime}
          onChange={(e) => {
            setIsPlaying(false);
            setCurrentTime(Number(e.target.value));
          }}
          className="w-full accent-[#7A1228] cursor-pointer"
        />
        <span className="text-xs font-mono-num font-semibold text-[#7A1228] w-16 text-right">
          {currentTime.toFixed(2).replace('.', ',')} s
        </span>
      </div>

      {/* 1D Track Canvas + FBD Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-lg p-2 overflow-hidden">
          <div className="text-[11px] font-medium text-stone-500 px-2 pb-1 flex items-center justify-between">
            <span>Lintasan Gerak Lurus 1D (Skala Meter)</span>
            <span className="font-mono-num text-stone-700">
              {objects.length === 1
                ? `x = ${formatIndonesianDecimal(primary.x)} m · s = ${formatIndonesianDecimal(
                    currentDistPrimary
                  )} m`
                : `|x_B - x_A| = ${formatIndonesianDecimal(
                    Math.abs(currentStates[1].x - currentStates[0].x)
                  )} m`}
            </span>
          </div>
          <canvas
            ref={canvasRef}
            className="w-full h-auto block"
            aria-label="Animasi lintasan gerak benda satu dimensi"
          />
        </div>

        {/* Live Free Body Diagram + Vector Inspector */}
        <div className="bg-white border border-stone-200 rounded-lg p-3 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-stone-700 mb-1">
              Free Body Diagram & Vektor ({objects[0].label})
            </div>
            <div className="text-[11px] text-[#7A1228] font-medium mb-2">
              {motionStateLabel}
            </div>
          </div>

          <svg viewBox="0 0 220 118" className="w-full h-auto" aria-label="Diagram gaya bebas dan vektor percepatan">
            <defs>
              <marker id="fbdArrowN" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#0369A1" />
              </marker>
              <marker id="fbdArrowW" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#475569" />
              </marker>
              <marker id="fbdArrowF" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#B45309" />
              </marker>
            </defs>
            {/* Ground */}
            <line x1="16" y1="80" x2="204" y2="80" stroke="#D6D3D1" strokeWidth="2" />
            {/* Block */}
            <rect x="92" y="52" width="36" height="26" rx="4" fill="#FDF2F4" stroke="#7A1228" strokeWidth="1.6" />
            <text x="110" y="69" fontSize="11" fontWeight="700" fill="#7A1228" textAnchor="middle">
              m
            </text>
            {/* Normal N */}
            <line x1="110" y1="52" x2="110" y2="20" stroke="#0369A1" strokeWidth="1.8" markerEnd="url(#fbdArrowN)" />
            <text x="116" y="26" fontSize="10" fontWeight="600" fill="#0369A1">N</text>
            {/* Weight W */}
            <line x1="110" y1="78" x2="110" y2="108" stroke="#475569" strokeWidth="1.8" markerEnd="url(#fbdArrowW)" />
            <text x="116" y="106" fontSize="10" fontWeight="600" fill="#475569">W = mg</text>
            {/* Net Horizontal Force / Acceleration */}
            {Math.abs(primary.a) > 0.05 ? (
              (() => {
                const dir = primary.a > 0 ? 1 : -1;
                const len = Math.min(Math.max(Math.abs(primary.a) * 10, 22), 54);
                const x1 = dir > 0 ? 130 : 90;
                const x2 = x1 + dir * len;
                return (
                  <g>
                    <line
                      x1={x1}
                      y1="65"
                      x2={x2}
                      y2="65"
                      stroke="#B45309"
                      strokeWidth="2.2"
                      markerEnd="url(#fbdArrowF)"
                    />
                    <text
                      x={dir > 0 ? x1 + 4 : x1 - 4}
                      y="46"
                      fontSize="10"
                      fontWeight="700"
                      fill="#B45309"
                      textAnchor={dir > 0 ? 'start' : 'end'}
                    >
                      F_net = ma
                    </text>
                  </g>
                );
              })()
            ) : (
              <text x="166" y="68" fontSize="10" fill="#64748B" textAnchor="middle">
                ΣF = 0
              </text>
            )}
          </svg>

          <div className="grid grid-cols-3 gap-1 pt-2 border-t border-stone-100 text-[11px] font-mono-num text-center">
            <div>
              <div className="text-stone-400">x(t)</div>
              <div className="font-semibold text-stone-800">{formatIndonesianDecimal(primary.x)} m</div>
            </div>
            <div>
              <div className="text-stone-400">v(t)</div>
              <div className="font-semibold text-[#7A1228]">{formatIndonesianDecimal(primary.v)} m/s</div>
            </div>
            <div>
              <div className="text-stone-400">a(t)</div>
              <div className="font-semibold text-amber-700">{formatIndonesianDecimal(primary.a)} m/s²</div>
            </div>
          </div>
        </div>
      </div>

      {/* Synchronized v-t and x-t Plots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Live v-t plot with area shading */}
        <div className="bg-white border border-stone-200 rounded-lg p-3">
          <div className="text-[11px] font-semibold text-stone-700 mb-1">
            Grafik Kecepatan v(t) & Luas Tersapu hingga t = {currentTime.toFixed(2).replace('.', ',')} s
          </div>
          <svg viewBox={`0 0 ${gW} ${gH}`} className="w-full h-auto">
            <line x1={gpL} y1={gToYv(0)} x2={gW - gpR} y2={gToYv(0)} stroke="#475569" strokeWidth={1.2} />
            <line x1={gpL} y1={gpT} x2={gpL} y2={gH - gpB} stroke="#475569" strokeWidth={1.2} />

            {/* Shaded swept area for primary object */}
            {(() => {
              const swept = seriesPerObj[0].filter((p) => p.t <= currentTime);
              const currPt = evaluateObjectAt(objects[0], currentTime);
              const pts = [...swept, currPt];
              if (pts.length < 2) return null;
              const y0 = gToYv(0);
              const pathD =
                `M ${gToX(pts[0].t)} ${y0} ` +
                pts.map((p) => `L ${gToX(p.t).toFixed(2)} ${gToYv(p.v).toFixed(2)}`).join(' ') +
                ` L ${gToX(currPt.t).toFixed(2)} ${y0} Z`;
              return <path d={pathD} fill="#7A1228" fillOpacity={0.14} />;
            })()}

            {/* Full curves */}
            {seriesPerObj.map((ser, idx) => (
              <path
                key={idx}
                d={ser
                  .map((p, i) => `${i === 0 ? 'M' : 'L'} ${gToX(p.t).toFixed(2)} ${gToYv(p.v).toFixed(2)}`)
                  .join(' ')}
                fill="none"
                stroke={objects[idx].color}
                strokeWidth={2}
              />
            ))}

            {/* Current time cursor */}
            <line
              x1={gToX(currentTime)}
              y1={gpT}
              x2={gToX(currentTime)}
              y2={gH - gpB}
              stroke="#B45309"
              strokeWidth={1.2}
              strokeDasharray="3 3"
            />
            {currentStates.map((st, idx) => (
              <circle
                key={idx}
                cx={gToX(currentTime)}
                cy={gToYv(st.v)}
                r={4}
                fill={objects[idx].color}
                stroke="#FFFFFF"
                strokeWidth={1.5}
              />
            ))}

            <text x={gpL - 4} y={gpT + 6} fontSize="9" fill="#64748B" textAnchor="end" className="font-mono-num">
              {formatIndonesianDecimal(bounds.vHigh)}
            </text>
            <text x={gpL - 4} y={gToYv(0) + 3} fontSize="9" fill="#64748B" textAnchor="end" className="font-mono-num">0</text>
            <text x={gpL - 4} y={gH - gpB} fontSize="9" fill="#64748B" textAnchor="end" className="font-mono-num">
              {formatIndonesianDecimal(bounds.vLow)}
            </text>
            <text x={gW - gpR} y={gH - 6} fontSize="9" fill="#64748B" textAnchor="end" className="font-mono-num">t = {formatIndonesianDecimal(tMax)} s</text>
          </svg>
        </div>

        {/* Live x-t plot */}
        <div className="bg-white border border-stone-200 rounded-lg p-3">
          <div className="text-[11px] font-semibold text-stone-700 mb-1">
            Grafik Posisi x(t) Real-Time (Integral Kurva v-t)
          </div>
          <svg viewBox={`0 0 ${gW} ${gH}`} className="w-full h-auto">
            <line x1={gpL} y1={gToYx(0)} x2={gW - gpR} y2={gToYx(0)} stroke="#475569" strokeWidth={1.2} />
            <line x1={gpL} y1={gpT} x2={gpL} y2={gH - gpB} stroke="#475569" strokeWidth={1.2} />

            {/* Full dashed preview + solid active trace */}
            {seriesPerObj.map((ser, idx) => {
              const fullD = ser
                .map((p, i) => `${i === 0 ? 'M' : 'L'} ${gToX(p.t).toFixed(2)} ${gToYx(p.x).toFixed(2)}`)
                .join(' ');
              const activePts = [...ser.filter((p) => p.t <= currentTime), currentStates[idx]];
              const activeD = activePts
                .map((p, i) => `${i === 0 ? 'M' : 'L'} ${gToX(p.t).toFixed(2)} ${gToYx(p.x).toFixed(2)}`)
                .join(' ');
              return (
                <g key={idx}>
                  <path
                    d={fullD}
                    fill="none"
                    stroke={objects[idx].color}
                    strokeWidth={1.2}
                    strokeDasharray="3 3"
                    opacity={0.35}
                  />
                  <path d={activeD} fill="none" stroke={objects[idx].color} strokeWidth={2.4} />
                </g>
              );
            })}

            {proofHighlight?.tStar !== undefined && objects.length === 1 && proofHighlight.xStar !== undefined && (
              <circle
                cx={gToX(proofHighlight.tStar)}
                cy={gToYx(proofHighlight.xStar)}
                r={3.5}
                fill="#B45309"
              />
            )}

            <line
              x1={gToX(currentTime)}
              y1={gpT}
              x2={gToX(currentTime)}
              y2={gH - gpB}
              stroke="#B45309"
              strokeWidth={1.2}
              strokeDasharray="3 3"
            />
            {currentStates.map((st, idx) => (
              <circle
                key={idx}
                cx={gToX(currentTime)}
                cy={gToYx(st.x)}
                r={4}
                fill={objects[idx].color}
                stroke="#FFFFFF"
                strokeWidth={1.5}
              />
            ))}

            <text x={gpL - 4} y={gpT + 6} fontSize="9" fill="#64748B" textAnchor="end" className="font-mono-num">
              {formatIndonesianDecimal(bounds.xHigh)}
            </text>
            <text x={gpL - 4} y={gToYx(0) + 3} fontSize="9" fill="#64748B" textAnchor="end" className="font-mono-num">0</text>
            <text x={gW - gpR} y={gH - 6} fontSize="9" fill="#64748B" textAnchor="end" className="font-mono-num">t = {formatIndonesianDecimal(tMax)} s</text>
          </svg>
        </div>
      </div>
    </div>
  );
};
