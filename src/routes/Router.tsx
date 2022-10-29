import React from 'react';
import { Route, Routes,} from 'react-router-dom';
import CreateDestination from '../pages/CreateDestination';

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<CreateDestination />} />
        </Routes>
    );
};

export default Router;
