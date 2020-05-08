import React, { useState, useReducer, useCallback } from "react";
import Table from "./Table";

const initialState = {
    winner: "",
    turn: "O",
    tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ],
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner 이렇게 하면 안됨.
            // 항상 새로운 객체를 만들어서 바뀔 부분만 바꿔서 리턴
            // 기존 state의 얕은 복사
            return {
                ...state,
                winner: action.winner,
            };
            break;
        case CLICK_CELL:
            // 불변성을 위해 객체들을 모두 얕은 복사
            // immer라는 라이브러리로 가독성 해결
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
            };
            break;
        case CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === "O" ? "X" : "O",
            };
            break;
        default:
            break;
    }
};
const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // const [winner, setWinner] = useState("");
    // const [turn, setTurn] = useState("");
    // const [tableData, setTableData] = useState([
    //     ["", "", ""],
    //     ["", "", ""],
    //     ["", "", ""],
    // ]);

    const onClickTable = useCallback(() => {
        // action을 dispatch 할 때마다 reducer가 실행됨.
        dispatch({ type: SET_WINNER, winner: "O" });
    }, []);

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}></Table>
            {state.winner && <div>{state.winner} 님의 승리</div>}
        </>
    );
};

export default TicTacToe;
