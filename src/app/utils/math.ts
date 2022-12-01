export namespace MathFunc {
  export function min(array: number[]): number {
    // let min = NaN
    let minTemperature = 2000000;
    for (let i = 0; i < array.length; i++) {
      if (minTemperature > array[i]) {
        minTemperature = array[i];
      }
    }
    return minTemperature;
  }

  export function max(array: number[]): number {
    // let max = NaN
    let maxTemperature = -2000000;
    for (let i = 0; i < array.length; i++) {
      if (maxTemperature < array[i]) {
        maxTemperature = array[i];
      }
    }
    return maxTemperature;
  }

  export function mean(array: number[]): number {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
      result = result + array[i];
    }
    return result / array.length;
  }
}
