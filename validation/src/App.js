// import logo from './logo.svg';
import './App.css';
import styles from './styles/app.module.sass'
import {background} from './styles/colors'
import { createBrowserHistory } from "history";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Validation from './components/validation';
import Layout from './components/layout';
import WinAnimation from './components/winner';
const  App = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <div className={styles.appContainer}>
        {/* <Layout histCurrent={history} className={styles.layout} /> */}
        <div className={styles.margin}>
          <Switch>
              {/* <Route exact path="/" component={Main} /> */}
              <Route exact path="/validation/:link" component={Validation} />
              {/* <Route exact path='/validation/:link/winner' component={WinAnimation} /> */}
          </Switch>
          <Layout />
        </div>
        
      </div>
    </Router>
  );
}

export default App;
