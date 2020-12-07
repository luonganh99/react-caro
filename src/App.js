import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminRoutes from './pages/admin';
import UserRoutes from './pages/user';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/admin" component={AdminRoutes} />
                <Route path="/" component={UserRoutes} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
