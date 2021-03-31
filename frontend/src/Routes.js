import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";
import SearchPage from "./Core/SearchPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" exact component={SearchPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;