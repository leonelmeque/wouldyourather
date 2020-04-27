import React from "react";
import Home from "./components/Home/Home";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Navigation from "./components/shared/Navigation";
import { Switch, Route, Redirect } from "react-router-dom";
import Questions from "./components/Questions/Questions";
import LeaderBoard from './components/Leaderboard/LeaderBoard'
import "./App.css";

function Routes() {
  //TODO: make a 404 page redirect
  return (
    <Switch>
      <Route exact path="/" component={() => <Home />} />
      <Route path="/newquestions" component={() => <Home />} />
      <Route path="/leaderboard" component={LeaderBoard} />
      <Route
        path="/questions/:questionId"
        render={(props) => <Questions id={props.match.params.questionId} unlockOptions={true} />}
      />
     
    </Switch>
  );
}

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="App-container">
          {this.props.loading ? (
            <div style={{ width: 800, margin: "0px auto" }}>App Is Loading</div>
          ) : (
            <Routes />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  return {
    loading: authUser === null,
  };
};

//connect the app with no state because we do not need it yet
export default connect(mapStateToProps)(App);
