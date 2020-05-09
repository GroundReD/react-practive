import React, { useCallback, useRef, useEffect, memo } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
    console.log("td render");

    // 최적화 할때 뭐가 변해서 렌더링되는지 확인하는 방법
    const ref = useRef([]);
    useEffect(() => {
        console.log(
            "td",
            rowIndex === ref.current[0],
            cellIndex === ref.current[1],
            dispatch === ref.current[2],
            cellData === [ref.current[3]]
        );
        ref.current = [rowIndex, cellIndex, dispatch, cellData];
    }, [rowIndex, cellIndex, dispatch, cellData]);

    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if (cellData) {
            return;
        }
        // useReducer의 dispatch는 비동기
        // Redux는 동기
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }, [cellData]);
    return (
        <>
            <td onClick={onClickTd}>{cellData}</td>
        </>
    );
});

export default Td;
