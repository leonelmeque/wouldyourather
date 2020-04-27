//Questions class component
import React from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { handleAnswerQuestion } from "../../actions/questions";
import { handleUpdateAnsweredQuestions } from "../../actions/users";

/*
TODO: build a form to make user post a new question using the route /add 
It should show the text "Would You Rather" and have two options, once submited
the question should show up in a new pool and the user should be sent to the home page
*/

class QuestionToBeAnswered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "",
    };
  }

  handleSubmit(e,id) {
    e.stopPropagation();
    const { dispatch, authUser } = this.props;
    dispatch(
      handleAnswerQuestion({
        authUser: authUser.id,
        id: id,
        answer: this.state.option,
      })
    );

    dispatch(
      handleUpdateAnsweredQuestions({
        authUser: authUser.id,
        qId: id,
        answer: this.state.option,
      })
    );
  }

  handleChange = (e) => {
    this.setState({
      option: e.target.value,
    });
  };

  render() {
    const { name, avatar, optionOne, optionTwo, id } = this.props.question;
    
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
           
          >
            <h2>Would you rather</h2>
            <input
              type="radio"
              id="optionOne"
              value="optionOne"
              name="answer"
              onChange={(e)=>this.handleChange(e)}
            />
            <label htmlFor="optionOne">{optionOne.text}</label>
            <br />
            <input
              type="radio"
              id="optionTwo"
              value="optionTwo"
              name="answer"
              onChange={(e)=>this.handleChange(e)}
            />
            <label htmlFor="optionTwo">{optionTwo.text}</label>
            <br />
            <Link
              to={"/answeredquestions/" + id}
            
              onClick={(e)=>{this.handleSubmit(e,id)}}
              style={{
                pointerEvents: this.state.option.length > 0 ? "auto" : "none",
              }}
            >
              Submit Answer
            </Link>
          </form>
        </div>
      </div>
    );
  }
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

    if (unAnswered === false && Object.keys(answers).indexOf(id) === -1) {
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

export default {
  Question: connect(mapStateToProps)(Question),
  QuestionToBeAnswered: connect(mapStateToProps)(QuestionToBeAnswered),
};
