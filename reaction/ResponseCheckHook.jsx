import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("click start");
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  // useRef : 값이 바뀌기는 하지만 화면에는 영향을 끼치고 싶지 않을 때

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("click when it is green.");

      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("click now");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      clearTimeout(timeout.current);
      // 미리 클릭
      setState("waiting");
      setMessage("too quick!");
      setResult([]);
    } else if (state === "now") {
      endTime.current = new Date();
      // 반응속도체크
      setState("waiting");
      setMessage("click and start");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>
          avrage time: {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <ul>
          {result.map((v, i) => {
            return (
              <li key={i}>
                {i + 1}차 시도 : {v}ms
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      <button onClick={onReset}>Resst</button>
      <div>{renderAverage()}</div>
    </>
  );
};

export default ResponseCheck;
