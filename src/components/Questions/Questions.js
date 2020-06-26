import React from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { handleAnswerQuestion } from "../../actions/questions";
import { handleUpdateAnsweredQuestions } from "../../actions/users";
import { Col, Form } from "react-bootstrap";
import "./question.scss";
class QuestionToBeAnswered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "",
    };
  }

  handleSubmit(e, id) {
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
        id: id,
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
      <Col sm={6}>
        <div className="question-container">
          <span>
            <h3>{name} asks:</h3>
          </span>
   
        <div className="avatar">
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
        </div>

        <div className="details">
          <Form>
            <h2>Would you rather</h2>
            <Form.Group>
              <Form.Check
                type="radio"
                id="optionOne"
                value="optionOne"
                name="answer"
                label={optionOne.text}
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="radio"
                id="optionTwo"
                value="optionTwo"
                name="answer"
                label={optionTwo.text}
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>

            <br />
            <Link
              to={"/answeredquestions/" + id}
              className="btn btn-primary"
              onClick={(e) => {
                this.handleSubmit(e, id);
              }}
              style={{
                pointerEvents: this.state.option.length > 0 ? "auto" : "none",
              }}
            >
              Submit Answer
            </Link>
          </Form>
        </div>
        </div>
      </Col>
    );
  }
}

function QuestionPreview(props) {
  const { name, avatar, optionOne, id } = props.question;

  return (
    <div className="question-container">
      <span>
        <h3>{name} asks:</h3>
      </span>
      <div className="avatar">
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
      </div>

      <div className="details">
        <h2>Would you rather</h2>
        <p>{optionOne.text}</p>
        {props.unAnswered ? (
          <Link className="btn btn-primary" to={`/answeredquestions/${id}`}>
            View Poll
          </Link>
        ) : (
          <Link className="btn btn-primary" to={`/questions/${id}`}>
            View Poll
          </Link>
        )}
      </div>
    </div>
  );
}
class Question extends React.Component {
  render() {
    const { question, users, authUser } = this.props;
    let { unAnswered } = this.props;

    unAnswered = unAnswered === undefined ? true : false;

    if (question === null) {
      return;
    }

    const { id } = question;
    const { answers } = users[authUser.id];

    if (Object.keys(answers).indexOf(id) !== -1 && unAnswered === true) {
      return <QuestionPreview question={question} unAnswered={unAnswered} />;
    }

    if (unAnswered === false && Object.keys(answers).indexOf(id) === -1) {
      return <QuestionPreview question={question} unAnswered={unAnswered} />;
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
