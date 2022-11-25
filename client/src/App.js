import './App.css';
import {useRoutes} from './routes.js';
import {useAuth} from "./hooks/auth.hook.js";
import {AuthContext} from "./context/AuthContext.js";

function App() {
    const {login, logout, token, id, isReady} = useAuth();
    const isLogin = !!token;
    const routes = useRoutes(isLogin);
    return (
        <AuthContext.Provider value={{login, logout, token, id, isReady}}>
            <div className="app">
                {routes}
            </div>
        </AuthContext.Provider>

    );
}

export default App;
