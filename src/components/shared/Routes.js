import React from "react";
import QuestionOveview from "../../components/Questions/QuestionsOverview";
import QuestionAddNew from "../../components/Questions/QuestionsAddNew";
import LeaderBoard from "../../components/Leaderboard/LeaderBoard";
import Questions from "../../components/Questions/Questions";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../../components/Login/Login";
import Home from "../../components/Home/Home";
import { Container, Row } from "react-bootstrap";

/**
 * Routes Component
 */
export default class Routes extends React.Component {
  render() {
    const { authUser } = this.props;
    return (
      <Container>
        <Row className="justify-content-center">
          <Switch>
            {authUser.id === undefined || authUser.id ===null ? 
            (<Login />) : 
            (<><Route exact path="/">
              {authUser.id === undefined || authUser.id === null ? (
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
            /></>)}
            
          </Switch>
        </Row>
      </Container>
    );
  }
}
