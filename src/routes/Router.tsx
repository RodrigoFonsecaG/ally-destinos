import React from 'react';
import { Route, Routes,} from 'react-router-dom';
import CreateDestination from '../pages/CreateDestination';
import Destination from '../pages/Destination';

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<CreateDestination />} />
            <Route path="/destination" element={<Destination />} />
        </Routes>
    );
};

export default Router;
