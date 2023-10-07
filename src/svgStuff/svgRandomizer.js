import * as Vector from 'eric-vector';
import * as HSVUtils from 'eric-hsvutils/HSVUtils';

//HSVUtils.

/**
 * 
 * @param {Array<Array<Number>>} svgCoords 
 */
export function TextInsideSVG({svgCoords, svgElement, choice=null}){
    // refactor out later
    const [xCoords, yCoords] = [svgCoords.map(e => e[0]), svgCoords.map(e => e[1])];
    const [xMin, xMax, yMin, yMax] = [Math.min(xCoords), Math.max(xCoords), Math.min(yCoords), Math.max(yCoords)];

    const [xSize, ySize] = [xMax - xMin, yMax-yMin];

    //change this later
    const fontSize = ySize-4;

    //padding: default padding = 4px
    //placement: 

    const absStyle = {
        position: "absolute",
        left:
        font:    
    }

    return (
        <div style={{position: "relative"}}>
            {svgElement}

        </div>
    )
}