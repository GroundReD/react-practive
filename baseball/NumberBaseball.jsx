import React, { useState, memo } from 'react';
import Try from './Try';

function getNumbers() {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0 ; i < 4 ; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];    
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = memo(() => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('Home Run!');
            setTries( (prevTries) => {return [...prevTries, {try: value, result: 'Home Run!'}];});
            alert('New Game');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9) {
                setResult(`over 10 tries, fail! The answer is ${answer.join(',')}`);
                alert('New Game');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for(let i = 0; i <4; i+= 1) {
                    if (answerArray[i] === answer[i]) {
                        strike +=1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries( (prevTries) => {return [...prevTries, {try: value, result: `${strike} strikes, ${ball} ball`}]});
            }
        }
    };

    const onChangeInput = (e) => {
        console.log(answer);
        setValue(e.target.value);
    };


    return (
        <>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
            <input maxLength={4} value={value} onChange={onChangeInput} />
        </form>
        <div>시도: {tries.length}</div>
        <ul>
            {tries.map( (v,i) => {
                return (
                    <Try key={`${i+1}차시도 :`} tryInfo={v} />
                )
            })}
        </ul>
        {/* react 주석처리 
            기록해야할 것
                - pureComponent, memo
                - createRef
                - class, hooks가 언제 사용되면 좋은지
                - 자식 component에서 props를 바꿔야할 경우, 어쩔수없을땐 자식 state에서 props 변환
        */}
        </>
    );
});

export default NumberBaseball;