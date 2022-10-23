import {Image, StyleSheet} from 'react-native';
import React from 'react';

import Moon from '../../../assets/index.moon';

type phaseProps = {moonPhase: string};

const styles = StyleSheet.create({
  moonIcon: {
    width: 350,
    height: 350,
  },
});

export default function MoonPhaseIcon({moonPhase}: phaseProps) {
  function GetMoonPhaseIcon(moomPh: string) {
    const phase: number = Number(Number(moomPh).toFixed(1));

    if (phase > 0 && phase <= 4) {
      return Moon.moon4;
    }
    if (phase > 4 && phase <= 8) {
      return Moon.moon8;
    }
    if (phase > 8 && phase <= 12) {
      return Moon.moon12;
    }
    if (phase > 12 && phase <= 16) {
      return Moon.moon16;
    }
    if (phase > 16 && phase <= 23) {
      return Moon.moon20;
    }

    if (phase > 23 && phase <= 25) {
      return Moon.moon25;
    } //первая четверть

    if (phase > 25 && phase <= 29) {
      return Moon.moon29;
    }
    if (phase > 29 && phase <= 33) {
      return Moon.moon33;
    }
    if (phase > 33 && phase <= 37) {
      return Moon.moon37;
    }
    if (phase > 37 && phase <= 41) {
      return Moon.moon37;
    }
    if (phase > 41 && phase <= 48) {
      return Moon.moon45;
    }

    if (phase > 48 && phase <= 50) {
      return Moon.moon50;
    } //полнолуние

    if (phase > 50 && phase <= 54) {
      return Moon.moon54;
    }
    if (phase > 54 && phase <= 58) {
      return Moon.moon58;
    }
    if (phase > 58 && phase <= 62) {
      return Moon.moon62;
    }
    if (phase > 62 && phase <= 66) {
      return Moon.moon66;
    }
    if (phase > 66 && phase <= 72) {
      return Moon.moon70;
    }

    if (phase > 72 && phase <= 75) {
      return Moon.moon75;
    } //последняя четверть

    if (phase > 75 && phase <= 79) {
      return Moon.moon79;
    }
    if (phase > 79 && phase <= 83) {
      return Moon.moon83;
    }
    if (phase > 83 && phase <= 87) {
      return Moon.moon87;
    }
    if (phase > 87 && phase <= 91) {
      return Moon.moon91;
    }
    if (phase > 91 && phase <= 97) {
      return Moon.moon95;
    }
    if ((phase >= 0 && phase <= 1) || (phase >= 98 && phase <= 100)) {
      return Moon.moon0;
    } //новолунье
  }

  return <Image style={styles.moonIcon} source={GetMoonPhaseIcon(moonPhase)} />;
}
