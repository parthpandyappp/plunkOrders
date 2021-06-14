import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import Reveal from "./components/reveal";

export default function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route exact path="/reveal" component={Reveal} />
          <Route exact path="/" component={Main} />
        </Switch>
      </main>
    </Router>
  );
}
