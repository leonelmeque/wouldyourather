import React from "react";
import { connect } from "react-redux";
import Questions from "../Questions/Questions";
import "./home.css";

class Home extends React.Component {
  render() {
    return (
      <>
        <h3>Answered Questions</h3>
        <div className="home-container">
          {this.props.questions.map((id) => {
            return (
              <div key={id}>
                <Questions id={id}  />
              </div>
            );
          })}
          <h3>Unanswered Questions</h3>
          {this.props.questions.map((id) => {
            return (
              <div key={id}>
                <Questions id={id} unAnswered={false} />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ questions }) => {
  return {
    questions: Object.keys(questions),
  };
};

export default connect(mapStateToProps)(Home);
