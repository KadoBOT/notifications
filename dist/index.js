"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var Hello_1 = require("./components/Hello");
ReactDOM.render(React.createElement(Hello_1.default, {compiler: "TypeScript", framework: "React"}), document.querySelector(".container"));
