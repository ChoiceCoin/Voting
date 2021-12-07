import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Features } from "./containers";
import { Home, News,  Sales, Whitepaper } from "./Pages";


function App() {
  return (
    <Router>
       <div className="app">
         <Switch>
           <Route exact path="/" component={Home} />
           <Route path="/sales" component={Sales} />
           <Route path="/community" component={Features} />
           <Route path="/blog" component={News} />
           <Route path="/whitepaper" component={Whitepaper} />
           
         </Switch>
       </div>
     </Router>
  );
}

export default App;

