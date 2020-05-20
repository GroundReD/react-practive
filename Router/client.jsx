// jsx
import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";
import mine from "./MineSearch";
// import lotto from "./LottoHooks";

const Hot = hot(mine);
ReactDom.render(<Hot />, document.getElementById("root"));

export default Hot;
