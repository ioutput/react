import React from 'react';
import ReactDOM from 'react-dom';
import Route from './Route';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import { LocaleProvider } from 'antd-mobile'
import enUS from 'antd-mobile/lib/locale-provider/en_US'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
//import { Provider } from 'react-redux';
//import { createStore } from 'redux'
ReactDOM.render(
    <BrowserRouter>
        <LocaleProvider locale={enUS}>
            <Route />
        </LocaleProvider>
        
    </BrowserRouter>
    ,
    document.getElementById('root')
    );
serviceWorker.unregister();
