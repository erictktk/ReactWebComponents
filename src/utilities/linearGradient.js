import * as HSVUtils from "eric-hsvutils";
import * as PixArrUtils from "eric-pixelarrayutils";

export class LinearGradient {
  constructor(colors, stopPositions = null, angleInDeg=0) {
    /**Array<Number> */
    this.colors = colors;
    if (!stopPositions) {
      stopPositions = [];
      for (let i = 0; i < colors.length; i += 1) {
        stopPositions.push(i / (colors.length - 1));
      }
    }
    this.stops = stopPositions;
    this.angleInDeg = angleInDeg;
  }

  getAvgDifference(){
    let sumTotal = 0;
    //HSVUtils.HSVUtils.
    for(let i = 0; i < this.colors.length-1; i += 1){
      sumTotal += 
    }
  }
  
  getAvgDarkness(){
    PixArrUtils.HSVUtils
  }

  isDark(){

  }

  isLight(){

  }

  toCSSString(direction) {
    const linearGradient = `linear-gradient(${direction}, ${this.colors
      .map((color, i) => {
        if (typeof color === "string") {
          return `${color} ${this.stops[i] * 100 + "%"}`;
        } else {
          const colorValue =
            color.length === 4
              ? `rgba(${color.join(",")})`
              : `rgb(${color.join(",")})`;
          return `${colorValue} ${this.stops[i] * 100 + "%"}`;
        }
      })
      .join(", ")})`;

    return linearGradient;
  }

  toSVGComponent(direction) {
    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
    const stops = this.stops.map((position, index) => {
      const color = this.colors[index];
      return `<stop offset="${position}" stop-color="${color}" />`;
    }).join('\n');

    return `
      <linearGradient id="${gradientId}" gradientUnits="userSpaceOnUse">
        ${stops}
      </linearGradient>
    `;
  
  }
}
  