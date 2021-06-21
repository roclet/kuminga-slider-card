import logo from './logo.svg';
import './App.css';
import {Router, Route, Switch} from 'react-router';
import NotFoundPage from "./pages/NotFoundPage";
import GoodProgress from "./pages/GoodProgress";
const createHistory = require("history").createHashHistory;
const history = createHistory();

function App() {
    return (
        <Router history={history}>
        <Switch>
            <Route exact path="/slider" component={GoodProgress}/>
            <Route exact path="/" component={GoodProgress}/>
            <Route exact path="*" component={NotFoundPage}/>
        </Switch>
        </Router>
    );
    return (
        <div className="App"></div>
    );
}

export default App;
