import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Ball from "./ball";

function getWinNumbers() {
    console.log("getWinnumbers");
    const candidate = Array(45)
        .fill()
        .map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    // 새로 렌더링 될때 usememo 를 사용하면 hooks가 해당 변수를 기억하고있음
    // useMemo => 값을 기억

    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeout = useRef([]);

    //useState는 조건문, useEffect 내부에서 웬만하면 쓰지 말것.
    //hooks는 웬만하면 최상단에서 실행순서 같게 선언

    // use callback
    // 함수를 기억
    // useCallback 안에서 쓰이는 state는 input에 넣어줘야함.
    // input 내의 변수가 바뀌면 새로 실행
    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumbers());
        console.log(winNumbers);
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeout.current = [];
    }, [winNumbers]);

    const runTimeouts = () => {
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeout.current[i] = setTimeout(() => {
                setWinBalls((prevState) => [...prevState, winNumbers[i]]);
            }, (i + 1) * 1000);
        }

        timeout.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
    };

    // 화면이 완전히 바뀌고 나서
    useEffect(() => {
        console.log("componentDidMount");
        runTimeouts();

        return () => {
            console.log("componentWillUnmount");
            timeout.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeout.current]);
    // input엔 무언가 바뀌는 시점의 것을 넣어준다.
    // input 배열이 비어있으면 => componentDidMount
    // 들어있으면 그 컴포넌트가 바뀌면 재실행 => componentDidMount, componentDidUpdate 둘다

    return (
        <>
            <div>당첨 숫자</div>
            <div id='result'>
                {winBalls.map((v) => (
                    <Ball key={v} number={v} />
                ))}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한번 더!</button>}
        </>
    );
};

export default Lotto;
