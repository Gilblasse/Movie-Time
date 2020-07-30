import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import MainProvider from './Config/MainProvider';
import {
    BrowserRouter as Router,
  } from "react-router-dom";


render(<Router><MainProvider><App /></MainProvider></Router>, document.getElementById('root'));