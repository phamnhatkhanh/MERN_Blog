import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { useContext } from "react";
import { Context } from "./context/Context";
function App() {
  const { user } = useContext(Context);
  
  return (
    <Router>
      <div>
        <Topbar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/register">
            {user ? <Homepage /> : <Register />}
          </Route>
          <Route path="/login">{user ? <Homepage /> : <Login />}</Route>
          <Route path="/post/:id">
            <Single />
          </Route> 
          <Route path="/write">{user ? <Write /> : <Login />}</Route>
          <Route path="/settings">
            {user ? <Settings /> : <Login />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
