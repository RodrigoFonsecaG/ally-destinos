import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ToastContainer
                toastClassName="toast"
                theme="dark"
            />
            <Router />
        </BrowserRouter>
    );
};

export default App;
