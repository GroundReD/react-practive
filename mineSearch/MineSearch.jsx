import React, { useReducer, createContext, useMemo } from "react";
import Form from "./Form";
import Table from "./Table";

export const START_GAME = "START_GAME";
export const CODE = {
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    MINE: -7,
    OPENED: 0, // 0 이상이면 다 opened
};
export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
});

const plantMine = (row, cell, mine) => {
    console.log("plantMine", row, cell, mine);
    const candidate = Array(row * cell)
        .fill()
        .map((arr, i) => {
            return i;
        });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const row = Math.floor(shuffle[k] / cell);
        const col = shuffle[k] % cell;
        data[row][col] = CODE.MINE;
    }

    console.log(data);

    return data;
};
const initialState = {
    tableData: [],
    timer: 0,
    result: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
            };
        default:
            return state;
    }
};
const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({ tableData: state.tableData, dispatch }), [state.tableData]); // dispatch는 안바뀜
    return (
        <>
            {/* contextAPI의 값이 전달되는 곳 하위 컴포넌트에서 데이터 접근 가능
             * 새로운 객체가 생기면 매번 새로운 객체를 생성하기 때문에 useMemo로 캐싱해야함.
             */}
            <TableContext.Provider value={value}>
                <Form></Form>
                <div>{state.timer}</div>
                <Table></Table>
                <div>{state.result}</div>
            </TableContext.Provider>
        </>
    );
};

export default MineSearch;
