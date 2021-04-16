// import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from "history";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Validation from './components/validation';
const  App = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <div>
        {/* <Layout histCurrent={history} className={styles.layout} /> */}
        <Switch>
          <div >
            {/* <Route exact path="/" component={Main} /> */}
            <Route exact path="/validation/:link" component={Validation} />
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
