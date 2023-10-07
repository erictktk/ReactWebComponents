import Vector from "eric-vector";

//tags: uneven, long
export const coords = [
    (0, 0),
    (90, 0),
    (100, 20),
    (90, 30),
    (0, 30)
];

//tags: uneven, long, bottom
export const coords2 = [
    (0, 0),
    (90, 0),
    (100, 30),
    (0, 30),
];

//tags: uneven, long, top
export const coords3 = [
    (0, 0),
    (100, 0),
    (90, 30),
    (0, 30),
];


// tags: diamond, rectangle
export const coords4 = [
    (0, 0),
    (50, 0),
    (50, 100),
    (0, 100)
];

export function coords4Rot(degrees=30, returnVectors=true){
    const vectors = coords4.map( c => new Vector(c[0], c[1]));

    const center = Vector.getCenter(vectors);

    if (returnVectors){
        return vectors.map( v => v.rotatedInPlace(degrees, center));
    }
}

export function ShowAllShapes(){
    //
}