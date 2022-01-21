import { Switch, Route } from "react-router";
import { Header } from "./components";
import { Home, Cart } from "./pages";

function App() {
   return (
      <div className="wrapper">
         <Header />
         <div className="content">
            <Switch>
               <Route exact path="/">
                  <Home />
               </Route>
               <Route path="/cart">
                  <Cart />
               </Route>
            </Switch>
         </div>
      </div>
   );
}

export default App;
