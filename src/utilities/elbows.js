import Vector from "eric-vector";

function getPolygonAngles(polygon) {
  const angles = [];
  for (let i = 0; i < polygon.length; i++) {
    const prev = polygon[(i - 1 + polygon.length) % polygon.length];
    const curr = polygon[i];
    const next = polygon[(i + 1) % polygon.length];
    const v1 = { x: prev.x - curr.x, y: prev.y - curr.y };
    const v2 = { x: next.x - curr.x, y: next.y - curr.y };
    let angle = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
    if (angle < 0) {
      angle += 2 * Math.PI;
    }
    angles.push(angle);
  }
  return angles;
}

/**
 *
 * @param {Array<Vector>} verts
 * @param {*} nums
 * @param {*} coeff
 * @param {*} type
 * @param {*} coeffs
 * @param {*} doFirst
 * @param {*} doLast
 * @param {*} angle
 * @param {*} deleteFlag
 * @param {*} limit
 */
export function Elbows(
  verts,
  nums = 11,
  coeff = 2,
  type = "normal",
  coeffs = [],
  doFirst = true,
  doLast = true,
  angle = 90,
  limit = false
) {
  let theArray = [];
  for (let i = 0; i < nums; i++) {
    let fraction = i / (nums - 1);
    let u = 1 - Math.sin(3.1416 * 0.5 * fraction);
    let v = 1 - Math.cos(3.1416 * 0.5 * fraction);
    theArray.push([u * 0.1, v * 0.1]);
  }

  const didElbow = [];
  const originalNum = [];

  let multiCoeff = 1;
  let isClosed = true;

  
let nVerts = verts.length;

const angles = getPolygonAngles(verts);

let newPoints = [];
for (let i = 0; i < nVerts; i++) {
    let p = verts[i];

    if (coeffs.length !== 0) {
    multiCoeff = coeffs[i];
    }

    console.log(verts[(i - 1 + nVerts) % nVerts]);

    //p.

    let d0 = Vector.subtract(verts[(i - 1 + nVerts) % nVerts], p);
    let d1 = Vector.subtract(verts[(i + 1) % nVerts], p);

    console.log("d1 = ");
    console.log(d1);

    let l0 = d0.length();
    let l1 = d1.length();

    //d0.normalize();
    //d1.normalize();

    let doPoint = false;
    if (type === "normal") {
        doPoint = true;
    } 
    else if (type === "angleSmallerThan") {
        if (angles[i] < angle) {
            doPoint = true;
        }
    } 
    else if (type === "angleGreaterThan") {
        if (angles[i] > angle) {
            doPoint = true;
        }
    }
    doPoint = true;

    function calculateNewPoint(j) {
    //console.log("d0 = ");
    //console.log(d0);

    console.log(coeff * multiCoeff * theArray[j][0]);
    let firstVector = Vector.scalar(
        coeff * multiCoeff * theArray[j][0],
        d0
    );
    let secondVector = Vector.scalar(
        coeff * multiCoeff * theArray[j][1],
        d1
    );
    //console.log("firstVector = " );
    //console.log(firstVector);

    let vector = Vector.add(p, firstVector);
    vector = Vector.add(vector, secondVector);
    return vector;
    }

    //#### FIRST ###
    if (i === 0) {
        if (doPoint && doFirst && isClosed && multiCoeff > 0.0001) {
            for (let j = 0; j < nums; j += 1) {
            newPoints.push(calculateNewPoint(j));

            //didElbow.append(1);
            //originalNum.append(i);
            }
    } else {
        newPoints.push(p);
        //didElbow.append(0);
        //originalNum.append(i);
    }
    }
    //#### LAST ###
    else if (i === nVerts - 1) {
        if (doPoint && doLast && isClosed && multiCoeff > 0.0001) {
            for (let j = 0; j < nums; j += 1) {
            newPoints.push(calculateNewPoint(j));
            //didElbow.append(1)
            //originalNum.append(i)
            }
    } 
        else {
            newPoints.push(p);
            //didElbow.append(0);
            //originalNum.append(i);
        }
    }
    //### MIDDLE ###
    if (i !== 0 && i !== nVerts - 1) {
        if (doPoint && multiCoeff > 0.0001) {
            for (let j = 0; j < nums; j += 1) {
            newPoints.push(calculateNewPoint(j));
            //didElbow.append(1);
            //originalNum.append(i);
        }
    } 
    else {
        newPoints.push(p);
        //didElbow.append(0);
        //originalNum.append(i);
    }
    }
    
    }
    return newPoints;
}
