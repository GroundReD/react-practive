// jsx
import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";
import ttt from "./TicTacToe";
// import lotto from "./LottoHooks";

const Hot = hot(ttt);
ReactDom.render(<Hot />, document.getElementById("root"));

export default Hot;
