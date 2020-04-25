import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "click start",
    result: [],
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>
          avrage time:{" "}
          {this.state.result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <ul>
          {this.state.result.map((v, i) => {
            return (
              <li key={i}>
                {i + 1}차 시도 : {v}{" "}
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  timeout;
  startTime;
  endTime;

  onReset = () => {
    this.setState({
      result: [],
    });
  };
  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "click when it is green.",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "click now",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      clearTimeout(this.timeout);
      // 미리 클릭
      this.setState({
        state: "waiting",
        message: "too quick!",
        result: [],
      });
    } else if (state === "now") {
      this.endTime = new Date();
      // 반응속도체크
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "click and start",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  render() {
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        <button onClick={this.onReset}>Resst</button>
        <div>{this.renderAverage()}</div>
      </>
    );
  }
}

export default ResponseCheck;
