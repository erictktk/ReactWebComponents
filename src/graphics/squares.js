import "./styles.css";
import streets from "./assets/streets.jpg";

export default function App() {
  const style = {
    transform: "rotate(30deg)",
    position: "absolute",
    left: -40,
    top: -100,
    opacity: 0.5
  };

  const style2 = { ...style };
  style2.top += 40;

  return (
    <div className="App">
      <Background />
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div style={style}>
        <Squares />
        <Squares doOffset={true} height={10} />
        <Squares />
        <Squares doOffset={true} height={10} />
        <Squares />
        <Squares doOffset={true} height={20} />
        <Squares />
        <Squares doOffset={true} height={60} />
        <Squares />
        <Squares doOffset={true} height={20} />
        <Squares height={10} />
        <Squares />
        <Squares doOffset={true} height={10} />
        <Squares />
        <Squares doOffset={true} height={10} />
      </div>
      <div style={style2}>
        <Squares />
        <Squares doOffset={true} height={10} />
        <Squares />
        <Squares doOffset={true} height={10} />
        <Squares />
        <Squares doOffset={true} height={20} />
        <Squares />
      </div>
      <div style={style2}>
        <Squares />
        <Squares doOffset={true} height={10} />
        <Squares />
        <Squares doOffset={true} height={10} />
        <Squares />
        <Squares doOffset={true} height={20} />
        <Squares />
      </div>
    </div>
  );
}

export function Background({}) {
  const style = {
    backgroundImage: `url(${streets})`,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    opacity: 0.025
  };
  return <div style={style}></div>;
}

//widths, height
export function Squares({ doOffset = false, widths = [120, 40], height = 40 }) {
  const amount = 6;
  const c = [255, 155, 255];
  const c1 = `rgba(${c[0]}, ${c[1]}, ${c[2]}, .05)`;
  const c2 = `rgba(${c[0]}, ${c[1]}, ${c[2]}, .01)`;
  const bgStr = `linear-gradient( to right, ${c1}, ${c2} )`;

  //console.log(bgStr);

  let content = [];
  for (let i = 0; i < amount; i += 1) {
    let style = { margin: "0px" };
    style.height = height + "px";
    if ((i % 2 === 0) !== doOffset) {
      style.width = widths[0] + "px";
      style.backgroundImage = bgStr;
    } else {
      style.width = widths[1] + "px";
      style.backgroundColor = "rgba(200, 255, 255, .00)";
    }
    //console.log(style);
    content.push(<div style={style}></div>);
  }
  //console.log(content);
  return <div style={{ display: "flex" }}>{content}</div>;
}

export function Squares2({
  doOffset = false,
  widths = [100, 30],
  height = 40
}) {
  const amount = 5;
  const c = [255, 225, 255];
  const c1 = `rgba(${c[0]}, ${c[1]}, ${c[2]}, .05)`;
  const c2 = `rgba(${c[0]}, ${c[1]}, ${c[2]}, .01)`;
  const bgStr = `linear-gradient( to right, ${c1}, ${c2} )`;

  //console.log(bgStr);

  let content = [];
  for (let i = 0; i < amount; i += 1) {
    let style = { margin: "0px" };
    style.height = height + "px";

    if (i % 2 === 0) {
      style.width = widths[0] + "px";
    } else {
      style.width = widths[1] + "px";
    }

    if ((i % 2 === 0) === doOffset) {
      style.backgroundImage = bgStr;
    } else {
      style.backgroundColor = "rgba(255, 225, 255, .00)";
    }

    //console.log(style);
    content.push(<div style={style}></div>);
  }
  //console.log(content);
  return <div style={{ display: "flex" }}>{content}</div>;
}
