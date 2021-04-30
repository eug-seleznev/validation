// import logo from './logo.svg';
import './App.css';
import styles from './styles/app.module.sass'
import { createBrowserHistory } from "history";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Validation from './components/validation';
import Layout from './components/layout';
const  App = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <div className={styles.appContainer}>
          <Switch>
              <Route exact path="/validation/:link" component={Validation} />
          </Switch>
          <Layout />
      </div>
    </Router>
  );
}

export default App;
