const React = require('react');
const { useRef, useState } = React;

const WordChain = () = {
    
    const [word, setWord] = useState('gred');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);
    input;

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                result: 'correct',
                word: value,
                value : '',
            });
            this.input.focus();
        } else {
            this.setState( {
                result : 'wrong..',
                value: '',
            });
        }
    };

    const onChangeInput = (e) => {
        this.setState({value: e.currentTarget.value});
    };

    const onRefInput = ( c ) => {
        this.input = c;
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit = {onSubmitForm}>
                <input ref={inputRef} value ={value} onChange={onChangeInput} />
                <button>submit</button>
            </form>
            <div>{result}</div>
            <p>react에서 input을 쓸때는 value와 onChange를 같이 쓰거나 defaultValue를 써줘야함. (defaultValue는 확인)</p>
        </>
    );
}

module.exports = WordChain;