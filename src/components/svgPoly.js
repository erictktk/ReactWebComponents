//import Vector from "eric-vector";

function roundedPath(points, radius = 5) {
    const path = ["M", points[0].x, points[0].y + radius];
    for (let i = 0; i < points.length - 1; i += 1) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      if (dx === 0 || dy === 0) {
        path.push("L", p2.x, p2.y);
      } else {
        const r = Math.min(radius, Math.abs(dx) / 2, Math.abs(dy) / 2);
        const signX = dx > 0 ? 1 : -1;
        const signY = dy > 0 ? 1 : -1;
        path.push("L", p1.x + signX * r, p1.y);
        path.push("A", r, r, 0, 0, signX * signY, p1.x, p1.y + signY * r);
        path.push("L", p1.x, p1.y + signY * r);
      }
    }
    path.push("Z");
    return path.join(" ");
  }
  
  const points = [
    [0, 0],
    [10, 100],
    [95, 100],
    [100, 0]
  ];
  
  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  
  function toVectors(points) {
    const vectors = points.map((p) => new Vector(p[0], p[1]));
    console.log(vectors);
    return vectors;
  }
  
  export function SvgPath({ d, stroke, fill, strokeWidth, ...props }) {
    fill = "blue";
    d = roundedPath(toVectors(points));
    console.log(d);
    return (
      <svg width="200" height="200">
        <path
          d={d}
          stroke={"red"}
          //strokeWidth={strokeWidth}
          fill={fill}
          {...props}
        />
      </svg>
    );
  }
  