import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleSaveNewQuestion } from "../../actions/questions";
import { newformatQuestion } from "../../utils/helpers";


class QuestionAddNew extends React.Component {
  constructor(props) {
    super(props);
    this.questionOne = React.createRef();
    this.questionTwo = React.createRef();
  }

  
  handleSubmit() {
    const optionOneText = this.questionOne.current.value;
    const optionTwoText = this.questionTwo.current.value;
    const author = this.props.authUser.id;
    const { dispatch } = this.props;

    const question = newformatQuestion({
      optionOneText,
      optionTwoText,
      author,
    });

    if (optionOneText !== "" && optionTwoText !== "") {
      dispatch(handleSaveNewQuestion(question));
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
    user,
    questions,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionAddNew));
