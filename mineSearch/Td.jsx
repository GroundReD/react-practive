import React, { useContext, useCallback, memo } from "react";
import {
    CODE,
    TableContext,
    OPEN_CELL,
    CLICK_MINE,
    QUESTION_CELL,
    NORMALIZE_CELL,
    FLAG_CELL,
} from "./MineSearch";

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: "#444",
            };

        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: "#fff",
            };

        case CODE.FLAG_MINE:
            return {
                background: "#ff5b59",
            };
        case CODE.FLAG:
            return {
                background: "#f00",
            };

        case CODE.QUESTION_MINE:
            return {
                background: "#feed52",
            };
        case CODE.QUESTION:
            return {
                background: "#ff0",
            };
        default:
            return {
                background: "#fff",
            };
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return "";

        case CODE.MINE:
            return "X";

        case CODE.CLICKED_MINE:
            return "펑";

        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return "!";

        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return "?";
        default:
            return code !== 0 ? code : "";
    }
};

const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        console.log(halted);

        if (halted) {
            return;
        }
        console.log(tableData[rowIndex][cellIndex]);
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback(
        (e) => {
            e.preventDefault();
            if (halted) {
                return;
            }
            switch (tableData[rowIndex][cellIndex]) {
                case CODE.FLAG:
                case CODE.FLAG_MINE:
                    dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                    return;
                case CODE.QUESTION:
                case CODE.QUESTION_MINE:
                    dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                    return;
                case CODE.NORMAL:
                case CODE.MINE:
                    dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                    return;
                default:
                    return;
            }
        },
        [tableData[rowIndex][cellIndex]]
    );

    console.log("td rendered");
    return (
        <>
            <td
                style={getTdStyle(tableData[rowIndex][cellIndex])}
                onClick={onClickTd}
                onContextMenu={onRightClickTd}>
                {getTdText(tableData[rowIndex][cellIndex])}
            </td>
        </>
    );
});

export default Td;
