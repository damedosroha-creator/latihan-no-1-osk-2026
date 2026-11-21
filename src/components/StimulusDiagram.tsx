import React from 'react';
import { StimulusSpec } from '../types/physics';
import { evaluateObjectAt, sampleObjectSeries } from '../utils/kinematicsEngine';

interface StimulusDiagramProps {
  stimulus: StimulusSpec;
  title?: string;
  hideNumericOnSymbolicAxes?: boolean;
}

function fmtTick(n: number): string {
  if (Math.abs(n) < 1e-9) return '0';
  if (Number.isInteger(n)) return String(n);
  return String(Number(n.toFixed(1))).replace('.', ',');
}

export const StimulusDiagram: React.FC<StimulusDiagramProps> = ({
  stimulus,
  title,
  hideNumericOnSymbolicAxes = true,
}) => {
  const W = 540;
  const H = 310;
  const padL = 62;
  const padR = 34;
  const padT = 30;
  const padB = 46;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const { tMin, tMax, yMin, yMax, tStepGrid, tStepMajor, yStepGrid, yStepMajor } = stimulus;
  const toX = (t: number) => padL + ((t - tMin) / (tMax - tMin)) * plotW;
  const toY = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * plotH;

  const zeroY = toY(0);
  const zeroX = toX(0);

  // Build grid lines
  const tGridLines: number[] = [];
  for (let t = tMin; t <= tMax + 1e-9; t += tStepGrid) {
    tGridLines.push(Number(t.toFixed(4)));
  }

  const yGridLines: number[] = [];
  for (let y = yMin; y <= yMax + 1e-9; y += yStepGrid) {
    yGridLines.push(Number(y.toFixed(4)));
  }

  const tMajorTicks: number[] = [];
  for (let t = tMin; t <= tMax + 1e-9; t += tStepMajor) {
    tMajorTicks.push(Number(t.toFixed(4)));
  }

  const yMajorTicks: number[] = [];
  for (let y = yMin; y <= yMax + 1e-9; y += yStepMajor) {
    yMajorTicks.push(Number(y.toFixed(4)));
  }

  const hasSymbolicY = Boolean(stimulus.symbolicYLabel && hideNumericOnSymbolicAxes);
  const hasSymbolicX = Boolean(
    stimulus.symbolicXLabels && stimulus.symbolicXLabels.length > 0 && hideNumericOnSymbolicAxes
  );

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-4">
      {title && (
        <div className="text-xs font-medium text-stone-500 mb-2">
          {title}
        </div>
      )}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto max-h-[340px] select-none"
        role="img"
        aria-label={`Diagram stimulus ${stimulus.yLabel} terhadap ${stimulus.xLabel}`}
      >
        <defs>
          <marker
            id="axisArrowStim"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 7 3.5, 0 7" fill="#334155" />
          </marker>
        </defs>

        {/* Subtle grid */}
        {tGridLines.map((t) => (
          <line
            key={`tg-${t}`}
            x1={toX(t)}
            y1={padT}
            x2={toX(t)}
            y2={H - padB}
            stroke="#E7E5E4"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        ))}
        {yGridLines.map((y) => (
          <line
            key={`yg-${y}`}
            x1={padL}
            y1={toY(y)}
            x2={W - padR}
            y2={toY(y)}
            stroke="#E7E5E4"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        ))}

        {/* Coordinate axes */}
        <line
          x1={padL}
          y1={zeroY}
          x2={W - padR + 14}
          y2={zeroY}
          stroke="#334155"
          strokeWidth={1.6}
          markerEnd="url(#axisArrowStim)"
        />
        <line
          x1={zeroX}
          y1={H - padB + 4}
          x2={zeroX}
          y2={padT - 14}
          stroke="#334155"
          strokeWidth={1.6}
          markerEnd="url(#axisArrowStim)"
        />

        {/* Axis titles */}
        <text
          x={W - padR + 12}
          y={zeroY - 8}
          fontSize="12"
          fontWeight="600"
          fill="#1C1917"
          textAnchor="end"
          fontStyle="italic"
        >
          {stimulus.xLabel}
        </text>
        <text
          x={zeroX + 8}
          y={padT - 10}
          fontSize="12"
          fontWeight="600"
          fill="#1C1917"
          textAnchor="start"
          fontStyle="italic"
        >
          {stimulus.yLabel}
        </text>

        {/* X ticks */}
        {!hasSymbolicX &&
          tMajorTicks.map((t) => {
            if (Math.abs(t) < 1e-6) return null;
            return (
              <g key={`xt-${t}`}>
                <line
                  x1={toX(t)}
                  y1={zeroY - 3}
                  x2={toX(t)}
                  y2={zeroY + 3}
                  stroke="#334155"
                  strokeWidth={1.2}
                />
                <text
                  x={toX(t)}
                  y={zeroY + 16}
                  fontSize="11"
                  fill="#44403C"
                  textAnchor="middle"
                  className="font-mono-num"
                >
                  {fmtTick(t)}
                </text>
              </g>
            );
          })}

        {/* Symbolic X labels when unknowns exist (e.g. Soal 9) */}
        {hasSymbolicX && (
          <>
            {stimulus.symbolicXLabels!.map((lbl, idx) => (
              <g key={`symx-${idx}`}>
                <line
                  x1={toX(lbl.tValue)}
                  y1={padT}
                  x2={toX(lbl.tValue)}
                  y2={zeroY}
                  stroke="#7A1228"
                  strokeWidth={1}
                  strokeDasharray="4 3"
                  opacity={0.5}
                />
                <text
                  x={toX(lbl.tValue)}
                  y={zeroY + 16}
                  fontSize="11"
                  fontWeight="600"
                  fill="#7A1228"
                  textAnchor="middle"
                >
                  {lbl.label}
                </text>
              </g>
            ))}
            <text
              x={toX(tMax)}
              y={zeroY + 16}
              fontSize="11"
              fill="#44403C"
              textAnchor="middle"
              className="font-mono-num"
            >
              {fmtTick(tMax)}
            </text>
          </>
        )}

        {/* Y ticks */}
        {!hasSymbolicY &&
          yMajorTicks.map((y) => {
            if (Math.abs(y) < 1e-6) return null;
            return (
              <g key={`yt-${y}`}>
                <line
                  x1={zeroX - 3}
                  y1={toY(y)}
                  x2={zeroX + 3}
                  y2={toY(y)}
                  stroke="#334155"
                  strokeWidth={1.2}
                />
                <text
                  x={zeroX - 8}
                  y={toY(y) + 4}
                  fontSize="11"
                  fill="#44403C"
                  textAnchor="end"
                  className="font-mono-num"
                >
                  {fmtTick(y)}
                </text>
              </g>
            );
          })}

        {/* Symbolic Y label (never leak true unknown value on Soal 5 & 15) */}
        {hasSymbolicY && stimulus.symbolicYLabel && (
          <>
            <line
              x1={zeroX}
              y1={toY(stimulus.symbolicYLabel.yValue)}
              x2={W - padR}
              y2={toY(stimulus.symbolicYLabel.yValue)}
              stroke="#7A1228"
              strokeWidth={1}
              strokeDasharray="4 3"
              opacity={0.4}
            />
            <text
              x={zeroX - 8}
              y={toY(stimulus.symbolicYLabel.yValue) + 4}
              fontSize="12"
              fontWeight="700"
              fill="#7A1228"
              textAnchor="end"
              fontStyle="italic"
            >
              {stimulus.symbolicYLabel.label}
            </text>
            {/* Show origin & known boundary v values like v(0)=2 in Soal 5 or v(9)=-3 in Soal 9 */}
            {stimulus.objects[0]?.segments[0]?.vStart !== undefined &&
              stimulus.objects[0].segments[0].vStart !== 0 && (
                <text
                  x={zeroX - 8}
                  y={toY(stimulus.objects[0].segments[0].vStart) + 4}
                  fontSize="11"
                  fill="#44403C"
                  textAnchor="end"
                  className="font-mono-num"
                >
                  {fmtTick(stimulus.objects[0].segments[0].vStart)}
                </text>
              )}
            {(() => {
              const lastSeg =
                stimulus.objects[0]?.segments[stimulus.objects[0].segments.length - 1];
              if (lastSeg?.vEnd !== undefined && lastSeg.vEnd < 0) {
                return (
                  <text
                    x={zeroX - 8}
                    y={toY(lastSeg.vEnd) + 4}
                    fontSize="11"
                    fill="#44403C"
                    textAnchor="end"
                    className="font-mono-num"
                  >
                    {fmtTick(lastSeg.vEnd)}
                  </text>
                );
              }
              return null;
            })()}
          </>
        )}

        {/* Origin 0 */}
        <text
          x={zeroX - 8}
          y={zeroY + 15}
          fontSize="11"
          fill="#44403C"
          textAnchor="end"
          className="font-mono-num"
        >
          0
        </text>

        {/* Render Curves */}
        {stimulus.mode === 'a-t'
          ? stimulus.objects.map((obj) => (
              <g key={obj.id}>
                {obj.segments.map((seg, idx) => {
                  const yVal = seg.aVal ?? 0;
                  const x1 = toX(seg.tStart);
                  const x2 = toX(seg.tEnd);
                  const y = toY(yVal);
                  const prevSeg = idx > 0 ? obj.segments[idx - 1] : null;
                  return (
                    <g key={idx}>
                      {prevSeg && (
                        <line
                          x1={x1}
                          y1={toY(prevSeg.aVal ?? 0)}
                          x2={x1}
                          y2={y}
                          stroke={obj.color}
                          strokeWidth={1.3}
                          strokeDasharray="3 3"
                          opacity={0.65}
                        />
                      )}
                      <line
                        x1={x1}
                        y1={y}
                        x2={x2}
                        y2={y}
                        stroke={obj.color}
                        strokeWidth={2.6}
                      />
                      <circle cx={x1} cy={y} r={3.5} fill={obj.color} />
                      <circle
                        cx={x2}
                        cy={y}
                        r={3.5}
                        fill={idx === obj.segments.length - 1 ? obj.color : '#FFFFFF'}
                        stroke={obj.color}
                        strokeWidth={2}
                      />
                    </g>
                  );
                })}
              </g>
            ))
          : stimulus.objects.map((obj) => {
              const pts = sampleObjectSeries(obj, tMin, tMax, 140);
              const d = pts
                .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${toX(p.t).toFixed(2)} ${toY(p.v).toFixed(2)}`)
                .join(' ');
              const keyTimes = Array.from(
                new Set(obj.segments.flatMap((s) => [s.tStart, s.tEnd]))
              );
              return (
                <g key={obj.id}>
                  <path
                    d={d}
                    fill="none"
                    stroke={obj.color}
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {obj.segments[0]?.kind !== 'quadratic-v' &&
                    keyTimes.map((kt) => {
                      const pt = evaluateObjectAt(obj, kt);
                      return (
                        <circle
                          key={`${obj.id}-${kt}`}
                          cx={toX(pt.t)}
                          cy={toY(pt.v)}
                          r={3.2}
                          fill={obj.color}
                        />
                      );
                    })}
                </g>
              );
            })}

        {/* Annotations */}
        {stimulus.stimulusAnnotations?.map((ann, idx) => (
          <text
            key={idx}
            x={toX(ann.t) + (ann.dx ?? 0)}
            y={toY(ann.y) + (ann.dy ?? 0)}
            fontSize="11"
            fontWeight="600"
            fill="#580B1C"
            textAnchor={ann.anchor ?? 'middle'}
          >
            {ann.text}
          </text>
        ))}
      </svg>

      {/* Dual curve legend if 2 objects */}
      {stimulus.objects.length > 1 && (
        <div className="mt-2 pt-2 border-t border-stone-100 flex flex-wrap items-center gap-5 text-xs text-stone-700">
          {stimulus.objects.map((obj) => (
            <div key={obj.id} className="flex items-center gap-2 font-medium">
              <span
                className="inline-block w-5 h-0.5 rounded"
                style={{ backgroundColor: obj.color }}
              />
              <span>{obj.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
