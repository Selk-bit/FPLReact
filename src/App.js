import './App.css';
import Layout from './Containers/Layout';
import Add from './Components/addPlayer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/">
            <Layout />
          </Route>
        </Switch>
    </Router>


    );
}

export default App;
