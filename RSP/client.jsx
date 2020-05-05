// jsx
import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";
// import rsp from "./RSP";
import rsp from "./RSPHooks";

const Hot = hot(rsp);
ReactDom.render(<Hot />, document.getElementById("root"));

export default Hot;
