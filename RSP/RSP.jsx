import React, { Component } from "react";

/* 컴포넌트 라이프 사이클
 * 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
 * ->(setState/props) 바뀔때 -> shouldComponentUpdate - >render -> componentDidUpdate
 * 부모가 나를 없앴을때
 * -> componentWillUnmount -> 소멸
 */

const rspCoords = {
  rock: 0,
  scissor: "-142px",
  paper: "-284px",
};

const scores = {
  rock: -1,
  scissor: 0,
  paper: 1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => {
    return v[1] === imgCoord;
  })[0];
};

class RSP extends Component {
  state = {
    result: "",
    imgCoord: 0,
    score: 0,
  };

  interval;

  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.rock) {
      this.setState({
        imgCoord: rspCoords.scissor,
      });
    } else if (imgCoord === rspCoords.scissor) {
      this.setState({
        imgCoord: rspCoords.paper,
      });
    } else if (imgCoord === rspCoords.paper) {
      this.setState({
        imgCoord: rspCoords.rock,
      });
    }
  };
  componentDidMount() {
    // 컴포넌트 첫 렌더링 된후
    // 주로 비동기 요청을 함
    this.interval = setInterval(this.changeHand, 300);
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }

  componentDidUpdate() {
    // 리렌더링 후
  }
  componentWillUnmount() {
    // 컴포넌트 제거되기 직전
    clearInterval(this.interval);
  }

  onClickBtn = (choice) => {
    clearInterval(this.interval);
    const { imgCoord } = this.state;
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        reesult: "Draw",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "you Win",
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "you lose..",
          score: prevState.score - 1,
        };
      });
    }

    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 300);
    }, 2000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        ></div>
        <button
          id="scissor"
          className="btn"
          onClick={() => {
            this.onClickBtn("scissor");
          }}
        >
          가위
        </button>
        <button
          id="rock"
          className="btn"
          onClick={() => {
            this.onClickBtn("rock");
          }}
        >
          바위
        </button>
        <button
          id="paper"
          className="btn"
          onClick={() => {
            this.onClickBtn("paper");
          }}
        >
          보
        </button>
        <div>{result}</div>
        <div>current Score : {score}</div>
      </>
    );
  }
}

export default RSP;
