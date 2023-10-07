import { LinearGradient } from "./linearGradient";

export function TopGradient({ height = 600 }) {
  const colors = [
    [0, 255, 255, 1],
    [230, 255, 255, 1]
  ];
  const gradient = new LinearGradient(colors);

  const gstring = gradient.toCSSString("to bottom");
  console.log(gstring);

  const style = {
    position: "absolute",
    zIndex: -1,
    background: gstring,
    height: height + "px",
    width: "100%"
  };

  return <div style={style}></div>;
}