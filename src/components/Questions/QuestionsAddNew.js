import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//TODO User can only vote once per question
class QuestionAddNew extends React.Component {
  constructor(props) {
    super(props);
    this.questionOne = React.createRef();
    this.questionTwo = React.createRef();
  }
  handleSubmit() {
    const valueOne = this.questionOne.current;
    const valueTwo = this.questionTwo.current;
    const { authUser, user, questions } = this.props;

    if (valueOne.value !== "" && valueTwo.value !== "") {
      this.props.history.push("/");
    } else {
      alert("Something is missing");
    }
  }

  render() {
    return (
      <div>
        <h2>Create New Question</h2>
        <p>Complete the question</p>
        <form>
          <h3>Would you rather...</h3>
          <input
            type="text"
            ref={this.questionOne}
            placeholder="Enter your first question"
          />
          <p>OR</p>
          <input
            type="text"
            ref={this.questionTwo}
            placeholder="Enter your second question"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              this.handleSubmit();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, users, questions }) => {
  const user = users[authUser.id];
  return {
    authUser,
    users,
    questions,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionAddNew));
