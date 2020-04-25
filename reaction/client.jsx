import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

// import ResponseCheck from "./ResponseCheck";
import ResponseCheckHook from "./ResponseCheckHook";

// const Hot = hot(ResponseCheck);
// ReactDOM.render(<Hot />, document.querySelector("#root"));

const Hot = hot(ResponseCheckHook);
ReactDOM.render(<Hot />, document.querySelector("#root"));
