// jsx
import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";
// import lotto from "./Lotto";
import lotto from "./LottoHooks";

const Hot = hot(lotto);
ReactDom.render(<Hot />, document.getElementById("root"));

export default Hot;
