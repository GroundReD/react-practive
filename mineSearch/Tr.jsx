import React, { useContext, memo } from "react";
import { TableContext } from "./MineSearch";
import Td from "./Td";

const Tr = memo(({ rowIndex }) => {
    const { tableData } = useContext(TableContext);

    console.log(tableData[0]);
    return (
        <>
            <tr>
                {tableData[0] &&
                    Array(tableData[0].length)
                        .fill()
                        .map((td, i) => <Td key={"td" + i} rowIndex={rowIndex} cellIndex={i}></Td>)}
            </tr>
        </>
    );
});

export default Tr;
