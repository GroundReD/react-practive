import React, { PureComponent } from 'react'

class Test extends PureComponent {
    state = {
        counter: 0,
        string : 'hello',
        number : 1,
        boolean : true,
        array: []
    };

    onClick = () => {
        this.setState({
            array: [...this.state.array]
        });
    }

    render () {
        console.log('rendering', this.state);
        return (
            <>
                <div>
                    <button onClick={this.onClick}>Click</button>
                </div>
                <p>
                    props나 state가 변경되었을 때 react는 새로 화면을 렌더링 하게 된다.
                    근데 리액트가 그렇게까지 똑똑하지 않으므로, state가 바뀌지 않았는데 새로 랜더링을 할 수도 있고, 바뀌었는데 렌더링을 안할 수 도 있다.
                    이 때 렌더링을 컨트롤 할 수 있는 방법이 2개가 있다.
                </p>
                <ol>
                    <li>
                        shouldComponentUpdate method
                        <p>sholudComponentUpdate 메소드를 사용해서,현재 state와 nextState를 비교해서 렌더링 새로 할거면 true, 아니면 false를 return.</p>
                    </li>
                    <li>
                        PureComponent
                        <p>Component대신에 PureComponent를 쓰면 변화를 자동으로 감지하고 렌더링 할지 안할지를 결정한다.
                            but 얘도 그렇게 똑똑하진 않아서, 배열, 객체 내부의 state가 변화를 감지를 못할 때가 있다.
                            그래서 배열이나 객체를 쓸때는 꼭 array [...this.array, 1] 와 같은식으로 원래 array나 object를 가져온다음 바꿔줘야 한다.
                        </p>
                    </li>
                </ol>
                <ul>
                    <li>
                        객체 내부에 배열을 넣거나, 배열 내부에 객체를 넣는거를 지양하자.
                    </li>

                </ul>

                
            </>
        );
    }
}

export default Test;