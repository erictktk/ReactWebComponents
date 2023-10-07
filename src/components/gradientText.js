export const GradientText = styled.span`
  background: linear-gradient(to right, #17b8c2, #5dab62);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-right: 10px; /*for fixing cutting off italics*/

  font-size: 36px;
  font-weight: 1000;
  font-style: italic;
  &::after {
    content: "";
    position: absolute;
    left: -5px;
    bottom: -5px;
    width: 110%;
    height: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: -1;
    padding-right: 10px;
    filter: blur(2px);
  }
`;