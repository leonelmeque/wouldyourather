import React from "react";
import Home from "./components/Home/Home";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { authenticateUSer } from "./actions/authUser";
import Navigation from "./components/shared/Navigation";
import { Switch, Route, Redirect } from "react-router-dom";
import Questions from "./components/Questions/Questions";
import QuestionOveview from "./components/Questions/QuestionsOverview";
import QuestionAddNew from "./components/Questions/QuestionsAddNew";
import LeaderBoard from "./components/Leaderboard/LeaderBoard";
import Login from "./components/Login/Login";
import "./App.css";

function Routes(props) {
  //TODO: make a 404 page redirect
  return (
    <Switch>
      <Route exact path="/">
        {props.authUser.id === undefined || props.authUser.id === null ? (
          <Redirect to="/login" />
        ) : (
          <Home />
        )}
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/add" component={() => <QuestionAddNew />} />
      <Route path="/leaderboard" component={LeaderBoard} />
      <Route
        path="/questions/:questionId"
        render={(props) => (
          <Questions.QuestionToBeAnswered id={props.match.params.questionId} />
        )}
      />
      <Route
        path="/answeredquestions/:questionId"
        render={(props) => (
          <QuestionOveview id={props.match.params.questionId} />
        )}
      />
    </Switch>
  );
}

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(authenticateUSer(null));
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div className="App">
        {this.props.loading ? (
          <div
            style={{
              width: 800,
              height: "100vh",
              margin: "0px auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2>App Is Loading...</h2>
          </div>
        ) : (
          <>
            <Navigation username={this.props.authUser} />
            <div className="App-container">
              <Routes authUser={this.props.authUser} />
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  return {
    loading: authUser === null,
    authUser,
  };
};

//connect the app with no state because we do not need it yet
export default connect(mapStateToProps)(App);
