import "./styles.css";
import styled from "@emotion/styled";
import { Star } from "@mui/icons-material";

const GradientIcon2 = styled(Star)(({ theme }) => ({
  background: "linear-gradient(to right, #00c3ff, #ffff1c)",
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent"
}));

export default function App() {
  return (
    <>
      <RotatingContainer degrees={-40} top={300} left={-170}>
        <RotatingContainer>
          <Gradient width={400} />
          <Gradient height={20} />
          <Gradient height={20} />
          <Gradient />
          <Gradient />
          <Gradient />
          <Gradient />
        </RotatingContainer>

        <RotatingContainer top={3} left={15}>
          <Gradient width={400} />
          <Gradient height={20} width={400} />
          <Gradient height={20} width={380} />
          <Gradient />
          <Gradient width={200} />
        </RotatingContainer>
      </RotatingContainer>
    </>
  );
}

const ClippedBox = styled.div`
  background-color: #ccc;
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
`;

const ClippedHole = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  width: 100px;
  height: 100px;
  clip-path: circle(50px at center);
`;

export function Rectangle({}) {
  const style = {
    width: "100px",
    height: "100px",
    borderStyle: "solid",
    borderWidth: "10px"
  };
  return <div style={style}></div>;
}

export const RotatingContainer = ({
  degrees = 0,
  left = 0,
  top = 0,
  children
}) => {
  const rotation = degrees;
  console.log(left);

  const style = {
    position: "absolute",
    left: left + "px",
    top: top + "px",
    transform: `rotate(${rotation}deg)`
  };
  console.log(style);

  return <div style={style}>{children}</div>;
};

export class LinearGradient {
  constructor(colors, stopPositions = null) {
    this.colors = colors;
    if (!stopPositions) {
      stopPositions = [];
      for (let i = 0; i < colors.length; i += 1) {
        stopPositions.push(i / (colors.length - 1));
      }
    }
    this.stops = stopPositions;
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
    //
  }
}

export function Gradient({ height = 40, width = 300 }) {
  const colors = [
    [200, 255, 255, 0.01],
    [230, 255, 255, 0.025]
  ];
  const gradient = new LinearGradient(colors);

  const gstring = gradient.toCSSString("to right");
  console.log(gstring);

  const style = {
    background: gstring,
    height: height + "px",
    width: width + "px",
    color: "white",
    marginBottom: "6px"
  };

  return <div style={style}></div>;
}
