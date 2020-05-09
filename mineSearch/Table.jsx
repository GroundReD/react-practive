import React, { useContext } from "react";
import { TableContext } from "./MineSearch";
import Tr from "./Tr";

const Table = () => {
    const { tableData } = useContext(TableContext);
    console.log("table", tableData);
    const onClick = () => {};
    return (
        <>
            <table onClick={onClick}>
                <tbody>
                    {Array(tableData.length)
                        .fill()
                        .map((tr, i) => (
                            <Tr key={"tr" + i} rowIndex={i}></Tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;
