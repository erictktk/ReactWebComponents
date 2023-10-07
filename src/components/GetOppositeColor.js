import * as HSVUtils from "eric-hsvutils/HSVUtils";
import * as rw from "eric-random-wrapper";

/**
 * 
 * @param {Array<Int>} color 
 */
export function GetOppositeLightOrDark(color, midVal=50){
    const hsv = HSVUtils.rgb_to_hsv(color);

    if (hsv[2] >= midVal){
        return [0, 0, 0]
    }
    else{
        return [255, 255, 255];
    }
}

export function ClassyColors(num = 5){
    const rng = rw.RandomWrapper();

    const orange = [255, 165, 0];
    const teal = [0, 128, 128];
    const blue = [0, 255, 255];

    const choices = [orange, teal, blue];

    const choice = rng.choice(choices);

    const allColors = [];
    const oBrightness = HSVUtils.rgb_to_hsv(choice)[2];
    for(let i = 0; i < num; i += 1){
        const curDesaturate = rng.random(10, 30);
        let color = HSVUtils.RGBDesaturate(choice, curDesaturate);
        if (i === 0){
            allColors.push(color);
        }
        else{
            let bnessPercent = (1-i/(num-1))*100;  //if num = 5 and i === 4 => result=1-4/4 = 

            if (i === (num-1)){
                bnessPercent += rng.random(5, 20);
            }
            else{
                bnessPercent += rng.random(-20, 20);
            }

            color = HSVUtils.RGBSetBrightness(bnessPercent);

            allColors.push(color);
        }
    }

    return allColors;
}