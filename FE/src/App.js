import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import "./App.css";
import { MainRoutes } from "./routes";
import store from './store';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <MainRoutes />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
