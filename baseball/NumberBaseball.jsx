import React, { Component } from 'react';
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

class NumberBaseball extends Component {
    state = {
        value:'',
        result:'',
        answer: getNumbers(),
        tries: [], //배열에 값 넣을 때 push 쓰면 안됨
    }

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState( {
            value: e.target.value,
        })
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) {
            this.setState( {
                result: 'Home Run!',
                tries: [...this.state.tries, {try: this.state.value, result: 'Home Run!'}],
            });
            alert('New Game');
                this.setState( {
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });   
        } else {
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9) {
                this.setState( {
                    result: `over 10 tries, fail! The answer is ${answer.join(',')}`,
                });
                alert('New Game');
                this.setState( {
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });   
            } else {
                for(let i = 0; i <4; i+= 1) {
                    if (answerArray[i] === this.state.answer[i]) {
                        strike +=1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState( {
                    tries: [...this.state.tries, {try: this.state.value, result: `${strike} strikes, ${ball} ball`}],
                    value: '',
                });
            }
        }
    };
    render() {
        return (
            <>
            <h1>{this.state.result}</h1>
            <form onSubmit={this.onSubmitForm}>
                <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
            </form>
            <div>시도: {this.state.tries.length}</div>
            <ul>
                {this.state.tries.map( (v,i) => {
                    return (
                        <Try key={`${i+1}차시도 :`} tryInfo={v} />
                    )
                })}
            </ul>
            {/* react 주석처리 */}
            </>
        )
    }
}

export default NumberBaseball;