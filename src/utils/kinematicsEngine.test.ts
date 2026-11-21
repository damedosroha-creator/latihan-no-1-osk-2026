import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeMasterySummary,
  computeTotalDistance,
  evaluateObjectAt,
  formatIndonesianDecimal,
  sampleObjectSeries,
  validateAnswer,
} from './kinematicsEngine';
import { QUESTIONS_DATA } from '../data/questionsData';

test('Indonesian decimal formatter & parser enforce comma rule', () => {
  assert.equal(formatIndonesianDecimal(12.125), '12,1');
  assert.equal(formatIndonesianDecimal(-3.24), '-3,2');
  assert.equal(formatIndonesianDecimal(7), '7,0');
  assert.equal(formatIndonesianDecimal(-0.01), '0,0');

  const dotAttempt = validateAnswer('12.1', 12.125);
  assert.equal(dotAttempt.validFormat, false);
  assert.equal(dotAttempt.errorReason, 'uses-dot');

  const twoDecimals = validateAnswer('12,12', 12.125);
  assert.equal(twoDecimals.validFormat, false);
  assert.equal(twoDecimals.errorReason, 'wrong-decimal-count');

  const exactPass = validateAnswer('12,1', 12.125);
  assert.equal(exactPass.validFormat, true);
  assert.equal(exactPass.isCorrect, true);

  const integerAttempt = validateAnswer('7', 7.0);
  assert.equal(integerAttempt.validFormat, true);
  assert.equal(integerAttempt.isCorrect, true);
});

test('All 15 questions exist and produce exact expected 1-decimal comma answers from physics curves', () => {
  assert.equal(QUESTIONS_DATA.length, 15);

  const findMaxDisplacement = (qIdx: number) => {
    const q = QUESTIONS_DATA[qIdx];
    const samples = sampleObjectSeries(
      q.stimulus.objects[0],
      q.stimulus.tMin,
      q.stimulus.tMax,
      1200
    );
    return Math.max(...samples.map((s) => s.x - q.stimulus.objects[0].initialX));
  };

  // Q1: max displacement
  assert.equal(formatIndonesianDecimal(findMaxDisplacement(0)), '12,1');

  // Q2: total distance
  const q2Dist = computeTotalDistance(
    QUESTIONS_DATA[1].stimulus.objects[0],
    0,
    3.5
  );
  assert.equal(formatIndonesianDecimal(q2Dist), '10,9');

  // Q3: x_max - x_min
  const q3Samples = sampleObjectSeries(QUESTIONS_DATA[2].stimulus.objects[0], 0, 4.0, 1000);
  const q3Range =
    Math.max(...q3Samples.map((s) => s.x)) - Math.min(...q3Samples.map((s) => s.x));
  assert.equal(formatIndonesianDecimal(q3Range), '5,8');

  // Q4: average velocity up to t* = 3.75 s
  const q4Point = evaluateObjectAt(QUESTIONS_DATA[3].stimulus.objects[0], 3.75);
  assert.equal(formatIndonesianDecimal(q4Point.x / 3.75), '3,6');

  // Q5: inverse peak velocity v_p giving max displacement 24.0 m at t=5.5 s
  const q5Peak = evaluateObjectAt(QUESTIONS_DATA[4].stimulus.objects[0], 5.5);
  assert.ok(Math.abs(q5Peak.x - 24.0) < 1e-6);
  assert.equal(formatIndonesianDecimal(QUESTIONS_DATA[4].expectedValue), '6,3');

  // Q6: return to origin x = 0 around t = 4 + sqrt(12)
  const q6Return = evaluateObjectAt(
    QUESTIONS_DATA[5].stimulus.objects[0],
    4 + Math.sqrt(12)
  );
  assert.ok(Math.abs(q6Return.x) < 1e-6);
  assert.equal(formatIndonesianDecimal(4 + Math.sqrt(12)), '7,5');

  // Q7: multi-turning point max displacement
  assert.equal(formatIndonesianDecimal(findMaxDisplacement(6)), '9,1');

  // Q8: max |x| with initialX = -1.0 m
  const q8Samples = sampleObjectSeries(QUESTIONS_DATA[7].stimulus.objects[0], 0, 6.0, 1000);
  const q8MaxAbs = Math.max(...q8Samples.map((s) => Math.abs(s.x)));
  assert.equal(formatIndonesianDecimal(q8MaxAbs), '4,9');

  // Q9: 3-phase curve with v(9.0) = -3.0 m/s
  const q9End = evaluateObjectAt(QUESTIONS_DATA[8].stimulus.objects[0], 9.0);
  assert.ok(Math.abs(q9End.v - -3.0) < 1e-6);
  assert.equal(formatIndonesianDecimal(findMaxDisplacement(8)), '32,4');

  // Q10: dual cars max lead of Car A before Car B catches up
  const q10SamplesA = sampleObjectSeries(QUESTIONS_DATA[9].stimulus.objects[0], 0, 6.0, 1200);
  const q10SamplesB = sampleObjectSeries(QUESTIONS_DATA[9].stimulus.objects[1], 0, 6.0, 1200);
  let maxLead = -Infinity;
  for (let i = 0; i < q10SamplesA.length; i++) {
    const t = q10SamplesA[i].t;
    const xA = evaluateObjectAt(QUESTIONS_DATA[9].stimulus.objects[0], t).x;
    const xB = evaluateObjectAt(QUESTIONS_DATA[9].stimulus.objects[1], t).x;
    if (xA - xB > maxLead) maxLead = xA - xB;
  }
  assert.equal(q10SamplesB.length > 0, true);
  assert.equal(formatIndonesianDecimal(maxLead), '5,1');

  // Q11: step a-t integration to max displacement
  assert.equal(formatIndonesianDecimal(findMaxDisplacement(10)), '16,9');

  // Q12: quadratic v(t) = 3 + 4t - t^2 max displacement
  assert.equal(formatIndonesianDecimal(findMaxDisplacement(11)), '23,7');

  // Q13: optimal envelope max displacement
  const q13End = evaluateObjectAt(QUESTIONS_DATA[12].stimulus.objects[0], 10.0);
  assert.ok(Math.abs(q13End.v - -3.0) < 1e-6);
  assert.equal(formatIndonesianDecimal(findMaxDisplacement(12)), '29,9');

  // Q14: closest distance between Car A and Car B
  let minGap = Infinity;
  for (let i = 0; i <= 1400; i++) {
    const t = (7.0 * i) / 1400;
    const xA = evaluateObjectAt(QUESTIONS_DATA[13].stimulus.objects[0], t).x;
    const xB = evaluateObjectAt(QUESTIONS_DATA[13].stimulus.objects[1], t).x;
    minGap = Math.min(minGap, Math.abs(xB - xA));
  }
  assert.equal(formatIndonesianDecimal(minGap), '2,7');

  // Q15: net displacement -14.0 m at t = 10.0 s and positive peak 4.7 m
  const q15End = evaluateObjectAt(QUESTIONS_DATA[14].stimulus.objects[0], 10.0);
  assert.ok(Math.abs(q15End.x - -14.0) < 1e-6);
  assert.equal(formatIndonesianDecimal(findMaxDisplacement(14)), '4,7');

  // Also check every expectedFormatted matches formatIndonesianDecimal(expectedValue)
  for (const q of QUESTIONS_DATA) {
    assert.equal(
      q.expectedFormatted,
      formatIndonesianDecimal(q.expectedValue),
      `Mismatch formatting for Soal ${q.id}`
    );
  }
});

test('Mastery progression advances cleanly from Pemula to Mahir Olimpiade', () => {
  const initial = computeMasterySummary({
    completedTheoryIds: [],
    questionAttempts: {},
  });
  assert.equal(initial.stageName, 'Pemula');

  const mid = computeMasterySummary({
    completedTheoryIds: ['mod-1', 'mod-2'],
    questionAttempts: {
      1: { lastInput: '12,1', isCorrect: true, attempts: 1, explanationOpened: true },
      2: { lastInput: '10,9', isCorrect: true, attempts: 1, explanationOpened: false },
      3: { lastInput: '5,8', isCorrect: true, attempts: 1, explanationOpened: false },
      4: { lastInput: '3,6', isCorrect: true, attempts: 1, explanationOpened: false },
      5: { lastInput: '6,3', isCorrect: true, attempts: 1, explanationOpened: false },
    },
  });
  assert.equal(mid.stageName, 'Mampu Mengaplikasikan');
  assert.equal(mid.correctCount, 5);
});
