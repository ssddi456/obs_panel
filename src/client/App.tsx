// react app
// if has admin in query, then render admin page
// else render detail page

import * as React from 'react';
import { Admin } from './Admin';
import { Detail } from './Detail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;
export const App = () => (
    <ConfigProvider theme={{
        algorithm: [compactAlgorithm, darkAlgorithm]
    }}>
        <BrowserRouter>
            <Routes>
                <Route path="/detail" Component={Detail} />
                <Route path="/admin" Component={Admin} />
                <Route path="/" Component={Admin} />
            </Routes>
        </BrowserRouter>
    </ConfigProvider>
);
