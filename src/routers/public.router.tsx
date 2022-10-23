import React, {lazy} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

const IndexPage = lazy(() => import("../pages/index.page"))

const PublicRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<IndexPage/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
};

export default PublicRouter;