const react = require('react');
const ReactDOM = require('react-dom');
const {useState, useRef} = React;


const GuGuDan = () => {
    // 함수 컴포넌트
    const GuGuDan = () => {
        // 무조건 컴포넌트 안에 위치
        const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
        const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
        const [value, setValue] = useState('');
        const [result, setResult] = useState('');
        const inputRef = useRef(null);

        const onChangeInput = (e) => {
            setValue(e.target.value);
        }

        const onSubmitForm = (e) => {
            e.preventDefault();
            if (parseInt(this.state.value) === this.state.first * this.state.second) {
                setResult('correct : ', value);
                setFirst(Math.ceil(Math.random() * 9));
                setSecond(Math.ceil(Math.random() * 9));
                setValue('');

                inputRef.current.focus();
            } else {
                setResult('Oops...');
                setValue('');
                inputRef.current.focus();
            }
        }
        return ( 
            <>
                <div>{first} * {second} = ?</div>
                <form onSubmit={onSubmitForm}>
                    <input ref={inputRef} onChange={onChangeInput} value={value}/>
                    <button className="button" htmlFor="">submit</button>
                </form>
                <p> react에선 html 속성 중 자바스크립트와 겹치는 class, for 등을 못씀. className, htmlFor로 사용</p>
                <div id="result">{result}</div>
            </>
        )
    }
  }

module.exports = GuGuDan;