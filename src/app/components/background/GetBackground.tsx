import Background from '../../../assets/index.back';
import IsItDayOrNight from './IsItDayOrNight';

export default function GetBackground(cloudiness: number, time: string) {
  // Узнаем день сейчас или ночь - true день
  if (IsItDayOrNight(time)) {
    if (cloudiness < 10) {
      return Background.day0;
    } else if (cloudiness >= 10 && cloudiness < 20) {
      return Background.day10;
    } else if (cloudiness >= 20 && cloudiness < 40) {
      return Background.day20;
    } else if (cloudiness >= 40 && cloudiness < 50) {
      return Background.day40;
    } else if (cloudiness >= 50 && cloudiness < 70) {
      return Background.day50;
    } else if (cloudiness >= 70 && cloudiness < 90) {
      return Background.day70;
    } else {
      return Background.day100;
    }
  } else {
    if (cloudiness < 10) {
      return Background.night0;
    } else if (cloudiness >= 10 && cloudiness < 20) {
      return Background.night10;
    } else if (cloudiness >= 20 && cloudiness < 40) {
      return Background.night20;
    } else if (cloudiness >= 40 && cloudiness < 50) {
      return Background.night40;
    } else if (cloudiness >= 50 && cloudiness < 70) {
      return Background.night50;
    } else if (cloudiness >= 70 && cloudiness < 90) {
      return Background.night70;
    } else {
      return Background.night100;
    }
  }
}
