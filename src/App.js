import "./styles.css";
import { AppBar } from "@material-ui/core";
import React from "react";
import SearchPage from "./components/SearchPage.js";
import TopList from "./components/TopList.js";
import MainPage from "./AnimeInfo/MainPage.js";
import "./Home.css";
import { useHistory } from "react-router";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <AppBar position="static">
        <div className="root">
          <div className="title">
            <Link to={`/toplist`}>
              <h1>Animapp</h1>
            </Link>
          </div>
          <div className="tabs">
            <Link to={"/toplist"}>
              <h2> Top</h2>
            </Link>
            <Link to={"/search"}>
              <h2> Search</h2>
            </Link>
          </div>
        </div>
      </AppBar>
      <Switch>
        {/* <Redirect exact from="/" to={`/toplist`} /> */}
        <Route exact path={`/`} render={(props) => <TopList />} />
        <Route exact path={`/toplist`} render={(props) => <TopList />} />
        <Route exact path={`/search`} render={(props) => <SearchPage />} />
        <Route exact path={`/animeinfo/:id`} render={(props) => <MainPage />} />
      </Switch>
    </Router>
  );
}
