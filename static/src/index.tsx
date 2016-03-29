import * as React from "react";
import * as ReactDOM from "react-dom";
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import BonAppetour from "./components/BonAppetour";

injectTapEventPlugin();

ReactDOM.render(
    <BonAppetour />,
    document.querySelector(".container")
);
