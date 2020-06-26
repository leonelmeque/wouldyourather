import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleSaveNewQuestion } from "../../actions/questions";
import { newformatQuestion } from "../../utils/helpers";
import { Row, Col, Button, Form } from "react-bootstrap";

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
      <Row>
        <Col sm={12}>
          <h2>Create New Question</h2>
          <p>Complete the question</p>
        </Col>
        <Col sm={12}>
          <Form>
            <h3>Would you rather...</h3>

            <Form.Group controlId="firstQuestion">
              <Form.Label> <span role="img" aria-label="Nerd Emoji">🤓</span>Write your first question...</Form.Label>
              <Form.Control
                type="text"
                ref={this.questionOne}
                id="firstQuestion"
                placeholder="Enter your first question"
              />
            </Form.Group>
            <p>OR</p>

            <Form.Group controlId="secondQuestion">
              <Form.Label> <span role="img" aria-label="Nerd Emoji">🤓</span>Write your second question...</Form.Label>
              <Form.Control
                type="text"
                ref={this.questionTwo}
                id="secondQuestion"
                placeholder="Enter your second question"
              />
            </Form.Group>

            <Button
              type="button"
              value="Submit"
              as="input"
              onClick={(e) => {
                e.preventDefault();
                this.handleSubmit();
              }}
            />
          </Form>
        </Col>
      </Row>
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
