import React from "react";
import QuestionOveview from "../../components/Questions/QuestionsOverview";
import QuestionAddNew from "../../components/Questions/QuestionsAddNew";
import LeaderBoard from "../../components/Leaderboard/LeaderBoard";
import Questions from "../../components/Questions/Questions";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "../../components/Login/Login";
import Home from "../../components/Home/Home";
import history from "../../utils/history";

export default class Routes extends React.Component {
  render() {
    return (
     
      <Switch>
        <Route exact path="/">
          {this.props.authUser.id === undefined ||
          this.props.authUser.id === null ? (
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
            <Questions.QuestionToBeAnswered
              id={props.match.params.questionId}
            />
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
}
