//Questions class component
import React from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { handleAnswerQuestion } from "../../actions/questions";

/*
TODO: build a form to make user post a new question using the route /add 
It should show the text "Would You Rather" and have two options, once submited
the question should show up in a new pool and the user should be sent to the home page
*/

export function QuestionToBeAnswered(props) {
  const { name, avatar, optionOne, optionTwo, id } = props.question;
  const [state, setState] = React.useState({
    option: "",
  });

  const handleChange = (e) => {
    setState({
      option: e.target.value,
    });
  };

  return (
    <div>
      <span>
        <h3>{name} asks:</h3>
      </span>
      <img
        src={avatar}
        alt={name}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          objectFit: "cover",
        }}
      />

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            props.dispatch(
              handleAnswerQuestion({
                authUser: props.authUser.id,
                id: id,
                answer: state.option,
              })
            );
          }}
        >
          <h2>Would you rather</h2>
          <input
            type="radio"
            id="optionOne"
            value="optionOne"
            name="answer"
            onChange={handleChange}
          />
          <label htmlFor="optionOne">{optionOne.text}</label>
          <br />
          <input
            type="radio"
            id="optionTwo"
            value="optionTwo"
            name="answer"
            onChange={handleChange}
          />
          <label htmlFor="optionTwo">{optionTwo.text}</label>
          <br />
          <button type="submit">Submit Answer</button>
        </form>
      </div>
    </div>
  );
}

function QuestionPreview(props) {
  const { name, avatar, optionOne, id } = props.question;

  return (
    <>
      <span>
        <h3>{name} asks:</h3>
      </span>
      <img
        src={avatar}
        alt={name}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          objectFit: "cover",
        }}
      />
      <div>
        <h2>Would you rather</h2>
        <p>{optionOne.text}</p>
        <Link to={`/questions/${id}`}>View Poll</Link>
      </div>
    </>
  );
}
class Question extends React.Component {
  render() {
    const { question, dispatch, users, authUser } = this.props;
    let { unlockOptions, unAnswered } = this.props;

    unlockOptions = unlockOptions === undefined ? true : false;
    unAnswered = unAnswered === undefined ? true : false;

    if (question === null) {
      return;
    }

    const { id } = question;
    const { answers } = users[authUser.id];

    if (Object.keys(answers).indexOf(id) !== -1 && unAnswered === true) {
      return (
        <div>
          {unlockOptions === true ? (
            <QuestionPreview question={question} />
          ) : (
            <QuestionToBeAnswered
              authUser={authUser}
              question={question}
              dispatch={dispatch}
            />
          )}
        </div>
      );
    }

    if (unAnswered === false && unAnswered === false) {
      return (
        <div>
          {unlockOptions === true ? (
            <QuestionPreview question={question} />
          ) : (
            <QuestionToBeAnswered
              authUser={authUser}
              question={question}
              dispatch={dispatch}
            />
          )}
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = ({ authUser, users, questions }, { id }) => {
  const question = questions[id];

  return {
    authUser,
    users,
    question: formatQuestion(question, users[question.author], authUser),
  };
};

export default connect(mapStateToProps)(Question);
