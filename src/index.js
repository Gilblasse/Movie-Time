import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import MainProvider from './Config/MainProvider';


render(<MainProvider><App /></MainProvider>, document.getElementById('root'));