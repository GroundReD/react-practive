const React = require('react');
const { Component } = React;

class WordChain extends Component {
    state = {
        word: 'gred',
        value: '',
        result: '',
    };

    input;

    onSubmitForm = (e) => {
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

    onChangeInput = (e) => {
        this.setState({value: e.currentTarget.value});
    };

    onRefInput = ( c ) => {
        this.input = c;
    };

    render(){
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit = {this.onSubmitForm}>
                    <input ref={this.onRefInput} value ={this.state.value} onChange={this.onChangeInput} />
                    <button>submit</button>
                </form>
                <div>{this.state.result}</div>
                <p>react에서 input을 쓸때는 value와 onChange를 같이 쓰거나 defaultValue를 써줘야함. (defaultValue는 확인)</p>
            </>
        );
    };
}

module.exports = WordChain;