import React, { PureComponent, memo } from 'react';

// hooks 사용할 때는 memo 사용
// Component를 memo로 감쌈
const Try = memo (({tryInfo}) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
});

// Class Try
// Component를 잘게 쪼갤 수록 PureComponent 쓰기가 편해짐
// class Try extends PureComponent {
//     shouldComponentUpdate(nextProps, nextState, nextContext) {

//     }
//     render() {
//         const {tryInfo} = this.props;
//         return ( 
//             <li>
//                 <div>{tryInfo.try}</div>
//                 <div>{tryInfo.result}</div>
//             </li>
//         );
//     }
// }

export default Try;





