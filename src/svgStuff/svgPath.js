import Vector from 'eric-vector';


/**
 * 
 * @param {Array<Vector>} obj.vectors
 * @returns 
 */
export function VectorsToSvgPath({ vectors }) {
    const path = vectors.reduce((acc, vector, index) => {
      if (vector.length === 2) {
        const [x, y] = vector;
        if (index === 0) {
          return `M ${x},${y}`;
        }
        return `${acc} L ${x},${y}`;
      }
      return acc;
    }, '');
  
    return <path d={path} />;
  }