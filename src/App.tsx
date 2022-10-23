import React, {Suspense} from 'react';
import Loading from "./components/bases/loading";
import {Route, Routes} from "react-router-dom";
import PublicRouter from "./routers/public.router";
import MainWrapper from "./wrappers/main/main.wrapper";

const App = () => {
    return (
        <>
            <MainWrapper>
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route path="/*" element={<PublicRouter/>}/>
                    </Routes>
                </Suspense>
            </MainWrapper>

        </>
    );
};

export default App;