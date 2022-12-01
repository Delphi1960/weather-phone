import Wind from '../../../assets/index.wind';

export default function GetIconWindDirection(direction: number) {
  // console.log(Wind.w010)
  if (direction === 0) {
    return Wind.w000;
  } //ветер ссевера
  if (direction > 0 && direction <= 10) {
    return Wind.w010;
  }
  if (direction > 10 && direction <= 20) {
    return Wind.w020;
  }
  if (direction > 20 && direction <= 30) {
    return Wind.w030;
  }
  if (direction > 30 && direction <= 40) {
    return Wind.w040;
  }
  if (direction > 40 && direction <= 50) {
    return Wind.w050;
  }
  if (direction > 50 && direction <= 60) {
    return Wind.w060;
  }
  if (direction > 60 && direction <= 70) {
    return Wind.w070;
  }
  if (direction > 70 && direction <= 80) {
    return Wind.w080;
  }
  if (direction > 80 && direction <= 90) {
    return Wind.w090;
  }
  if (direction > 90 && direction <= 100) {
    return Wind.w100;
  }
  if (direction > 100 && direction <= 110) {
    return Wind.w110;
  }
  if (direction > 110 && direction <= 120) {
    return Wind.w120;
  }
  if (direction > 120 && direction <= 130) {
    return Wind.w130;
  }
  if (direction > 130 && direction <= 140) {
    return Wind.w140;
  }
  if (direction > 140 && direction <= 150) {
    return Wind.w150;
  }
  if (direction > 150 && direction <= 160) {
    return Wind.w160;
  }
  if (direction > 160 && direction <= 170) {
    return Wind.w170;
  }
  if (direction > 170 && direction <= 180) {
    return Wind.w180;
  }
  if (direction > 180 && direction <= 190) {
    return Wind.w190;
  }
  if (direction > 190 && direction <= 200) {
    return Wind.w200;
  }
  if (direction > 200 && direction <= 210) {
    return Wind.w210;
  }
  if (direction > 210 && direction <= 220) {
    return Wind.w220;
  }
  if (direction > 220 && direction <= 230) {
    return Wind.w230;
  }
  if (direction > 230 && direction <= 240) {
    return Wind.w240;
  }
  if (direction > 240 && direction <= 250) {
    return Wind.w250;
  }
  if (direction > 250 && direction <= 260) {
    return Wind.w260;
  }
  if (direction > 260 && direction <= 270) {
    return Wind.w270;
  }
  if (direction > 270 && direction <= 280) {
    return Wind.w280;
  }
  if (direction > 280 && direction <= 290) {
    return Wind.w290;
  }
  if (direction > 290 && direction <= 300) {
    return Wind.w300;
  }
  if (direction > 300 && direction <= 310) {
    return Wind.w310;
  }
  if (direction > 310 && direction <= 320) {
    return Wind.w320;
  }
  if (direction > 320 && direction <= 330) {
    return Wind.w330;
  }
  if (direction > 330 && direction <= 340) {
    return Wind.w340;
  }
  if (direction > 340 && direction <= 350) {
    return Wind.w350;
  }
  if (direction > 350 && direction <= 360) {
    return Wind.w000;
  }
}
