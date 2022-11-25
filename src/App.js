import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["C", "inv", "bsp", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [".", 0, "="],
];

function App() {
  const [calc, setCalc] = useState({ sign: "", num: 0, res: 0 });

  const numHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (calc.num.toString().length < 15) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === 0
            ? 0
            : calc.num % 1 === 0
            ? Number(calc.num + value)
            : calc.num + value,
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const dotHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "x"
          ? a * b
          : a / b;
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Not Possible"
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  const invertHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const resetHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const backspaceHandler = () => {
    setCalc({
      ...calc,
      num: Number(calc.num.toString().slice(0, -1)),
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "button equals" : "button"}
              value={btn}
              onClick={
                btn === "C"
                  ? resetHandler
                  : btn === "inv"
                  ? invertHandler
                  : btn === "bsp"
                  ? backspaceHandler
                  : btn === "="
                  ? equalsHandler
                  : btn === "/" || btn === "x" || btn === "+" || btn === "-"
                  ? signHandler
                  : btn === "."
                  ? dotHandler
                  : numHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
