import React, { useContext, useCallback, memo } from "react";
import { CODE, TableContext } from "./MineSearch";

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return {
                background: "#444",
            };

        case CODE.OPENED:
            return {
                background: "#fff",
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
        default:
            return "";
    }
};

const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData } = useContext(TableContext);
    const onClickTd = useCallback(() => {}, []);
    return (
        <>
            <td style={getTdStyle(tableData[rowIndex][cellIndex])} onClick={onClickTd}>
                {getTdText(tableData[rowIndex][cellIndex])}
            </td>
        </>
    );
});

export default Td;
