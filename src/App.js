import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminRoutes from './pages/admin';
import UserRoutes from './pages/user';
import AuthContextProvider from './context/AuthContext';

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Switch>
                    <Route path="/admin" component={AdminRoutes} />
                    <Route path="/" component={UserRoutes} />
                </Switch>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
