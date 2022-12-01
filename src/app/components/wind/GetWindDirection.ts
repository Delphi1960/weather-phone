export default function GetWindDirection(direction: number) {
  // console.log(Wind.w010)
  if (direction < 10 && direction > 350) {
    return 'северный';
  } //ветер ссевера
  if (direction >= 10 && direction < 80) {
    return 'северо-восточный';
  }
  if (direction >= 80 && direction <= 90) {
    return 'восточный';
  }
  if (direction > 90 && direction < 180) {
    return 'юго-восточный';
  }
  if (direction > 170 && direction < 200) {
    return 'южный';
  }
  if (direction >= 200 && direction < 260) {
    return 'юго-западный';
  }
  if (direction >= 260 && direction < 280) {
    return 'западный';
  }
  if (direction >= 280 && direction < 350) {
    return 'северо-западный';
  }
}
