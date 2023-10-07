import React from "react";
import styled from "@emotion/styled";

const strings = ["Home", "About", "Services", "Faq", "Contact", "Demo"];

const string = `
  border-radius: .7rem;
  padding: 0.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  outline: None;
  padding: 0.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin: 0.25rem;
  margin-right: .1rem;
  margin-left: .1rem;
`;

//props darken, lighten, background-color
const StyledButton = styled.button`
  background-color: rgb(0, 255, 255);

  ${string}

  border-style: none;
  outline: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  font-size: 0.9rem;
  font-weight: bold;

  &:hover {
    background-color: blue;
  }

  &:active {
    background-color: light-blue;
    transform: scale(0.95);
  }
`;

const TextButton = styled.button`
  color: white;
  background-color: transparent;
  border-style: none;
  border-radius: 1rem;

  ${string}

  font-size: .9rem;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgb(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgb(0, 0, 0, 0.2);
    transform: scale(0.95);
  }
`;

export function StickyDiv({...props}){
  //
}

export function TopBar({
  bgColor = [255, 0, 255],
  color,
  fontSize = 24,
  capEnum = 0,
  topSticky = false
}) {
  let actualStrings;
  if (capEnum === 0) {
    actualStrings = strings;
  } else if (capEnum === 1) {
    actualStrings = strings.map((e) => e.toUpperCase());
  } else if (capEnum === 2) {
    actualStrings = strings.map((e) => e.toLowerCase());
  }

  const style = {
    backgroundColor: `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`,
    color: "white",
    fontSize: fontSize + "px".length,
    display: "flex",
    justifyContent: "right",
    margin: "0px",

    width: "100%"
  };

  const enums = actualStrings.map((e) => 0);
  enums[0] = 1;

  const elements = [];
  for (let i = 0; i < actualStrings.length; i += 1) {
    let element;
    if (enums[i] === 1) {
      element = <StyledButton>{actualStrings[i]}</StyledButton>;
    } else if (enums[i] === 0) {
      elements.push(<TextButton>{actualStrings[i]}</TextButton>);
    }
    elements.push(element);
  }

  return <div style={style}>{elements}</div>;
}
