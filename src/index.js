import React from "react";
import {render} from "react-dom";
import Main from "./main";
import ReactGA from 'react-ga';

ReactGA.initialize('UA-55635298-7');

render(<Main/>, document.getElementById("root"));
