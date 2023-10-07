import React from "react";

export function SquaresGradient({rng=null, size=3, entireWidth=480, height=1000}){
    /** @type{Array<Number>} */
    const color = [225, 255, 255];
    

    const wAmount = Math.floor(entireWidth/size)+1;
    const hAmount = Math.floor(height/size)+1;

    const rowStyle = {display: "flex" };
    const elementStyle = {minHeight: size+"px", height: size+"px", minWidth: size+"px", width: size+"px"};

    const rows = [];

    const randomRange = .025;
    const halfRange = randomRange*.5;

    for(let i = 0; i < hAmount; i += 1){
        const rowElements = [];
        for(let j = 0; j < wAmount; j += 1){
            const curU = j/(wAmount-1);
            const curV = 1-curU + Math.random()*randomRange-halfRange;

            const curColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${curV}})`;

            const curStyle = {...elementStyle, backgroundColor: {curColor}};

            rowElements.push( <div style={curStyle}/>);

        }
        const row = <div style={rowStyle}>{rowElements}</div>
        rows.push(row);
    }

    const containerStyle = {};

    return (
        <div style={containerStyle}>
            {rows}
        </div>
    );
}