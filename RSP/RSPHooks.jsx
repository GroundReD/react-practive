import React, { useState, useRef, useEffect, useMemo } from "react";

// hooks 생명주기 관리는 useEffect를 사용한다.
/* 비교
 * class -> 한번에
 * componentDidMount() {
 *    this.setState({
 *        imgCoord:3,
 *        score: 1,
 *        result: 2,
 *    })
 * }
 * hooks -> 각각 state를 따로따로
 * useEffect( () => {
 *   setImgCoord();
 *    setScore();
 * }, [imgCoord, score]);
 * useEffect( () => {
 *    setResult();
 * }, [result]);
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

const RSP = () => {
    const [result, setResult] = useState("");
    const [imgCoord, setImgCoord] = useState(0);
    const [score, setScore] = useState(0);
    const interval = useRef();

    // 화면이 완전히 바뀌고 나서
    useEffect(() => {
        // componentDidMount, componentDidUpdtae 역할
        console.log("다시 실행");
        interval.current = setInterval(changeHand, 100);
        return () => {
            // componentWillUnmount 역할
            console.log("종료");
            clearInterval(interval.current, 100);
        };
    }, []);
    // input 배열이 비어있으면 처음한번만 딱 실행 => componentDidMount
    // 들어있으면 그 컴포넌트가 바뀌면 재실행 => componentDidUpdate
    // 배열에는 꼭 다시 실행할 값만 넣을 것.
    // useEffect는 여러번 사용 가능

    // useLayoutEffect 화면 리사이징 등 레이아웃 바뀌기 전
    // useLayoutEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     };
    // }, [input])
    const changeHand = () => {
        if (imgCoord === rspCoords.rock) {
            setImgCoord(rspCoords.scissor);
        } else if (imgCoord === rspCoords.scissor) {
            setImgCoord(rspCoords.paper);
        } else if (imgCoord === rspCoords.paper) {
            setImgCoord(rspCoords.rock);
        }
    };

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult("Draw");
        } else if ([-1, 2].includes(diff)) {
            setResult("you Win");
            setScore((prevScore) => prevScore + 1);
        } else {
            setScore((prevScore) => prevScore - 1);
        }

        setTimeout(() => {
            interval.current = setInterval(changeHand, 300);
        }, 2000);
    };

    return (
        <>
            <div
                id='computer'
                style={{
                    background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
                }}></div>
            <button id='scissor' className='btn' onClick={onClickBtn("scissor")}>
                가위
            </button>
            <button id='rock' className='btn' onClick={onClickBtn("rock")}>
                바위
            </button>
            <button id='paper' className='btn' onClick={onClickBtn("paper")}>
                보
            </button>
            <div>{result}</div>
            <div>current Score : {score}</div>
        </>
    );
};

export default RSP;
