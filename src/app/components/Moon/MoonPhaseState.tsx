export default function MoonPhaseState(moonPhase: string) {
  let phase = Number(moonPhase);
  if (phase > 1 && phase <= 23) {
    return 'растущая';
  }

  if (phase > 23 && phase <= 25) {
    return 'первая четверть';
  }
  if (phase > 25 && phase <= 48) {
    return 'растущая';
  }

  if (phase > 48 && phase <= 50) {
    return 'полнолуние';
  }
  if (phase > 50 && phase <= 72) {
    return 'убывающая ';
  }

  if (phase > 72 && phase <= 75) {
    return 'последняя четверть';
  }
  if (phase > 75 && phase < 97) {
    return 'убывающая';
  }

  if ((phase >= 0 && phase <= 1) || (phase >= 98 && phase <= 100)) {
    return 'новолуние';
  }
}
