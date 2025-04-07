function singleEcgWaveShape(t: number): number {
  let amp = 0;

  // P wave
  if (t >= 0.15 && t <= 0.22) {
    const center = 0.185;
    const dist = (t - center) / 0.025;
    amp += 0.15 * Math.exp(-dist * dist * 4);
  }

  // Q wave
  if (t >= 0.24 && t <= 0.26) {
    const center = 0.25;
    const dist = (t - center) / 0.01;
    amp -= 0.3 * Math.exp(-dist * dist * 5);
  }

  // R wave
  if (t >= 0.265 && t <= 0.285) {
    const center = 0.275;
    const dist = (t - center) / 0.006;
    amp += 1.0 * Math.exp(-dist * dist * 5);
  }

  // S wave
  if (t >= 0.28 && t <= 0.34) {
    const center = 0.31;
    const dist = (t - center) / 0.015;
    amp -= 0.25 * Math.exp(-dist * dist * 5);
  }

  // T wave
  if (t >= 0.4 && t <= 0.52) {
    const center = 0.45;
    const dist = (t - center) / 0.04;
    amp += 0.4 * Math.exp(-dist * dist * 3);
  }

  return amp;
}

/**
 * Generate an ECG-like wave for multiple beats.
 * @param samplesPerBeat Number of samples in one heartbeat
 * @param numBeats How many beats to generate
 */
export function generateEcgData(samplesPerBeat = 300, numBeats = 10): number[] {
  const totalSamples = samplesPerBeat * numBeats;
  const data: number[] = [];

  for (let i = 0; i < totalSamples; i++) {
    const withinBeatIdx = i % samplesPerBeat;
    const t = withinBeatIdx / samplesPerBeat;
    data.push(singleEcgWaveShape(t));
  }
  return data;
}
