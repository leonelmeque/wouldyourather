import React from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../../utils/helpers";
import { Col } from "react-bootstrap";
//TODO User can only vote once per question
function QuestionOveview(props) {
  const { name, avatar, optionOne, optionTwo, id } = props.question;

  return (
    <Col sm={6}>
      <div key={id} className="question-container">
        <span>
          <h3>Asked by {name}</h3>
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
          <h4>Result</h4>
          <div>
            <p>
              Would you rather {optionOne.text}{" "}
              {props.answer === "optionOne" && <>You Selected</>}
            </p>
            {/*TODO: Make a percentage view*/}
            <div>
              {`${(
                (optionOne.votes.length /
                  (optionOne.votes.length + optionTwo.votes.length)) *
                100
              ).toFixed(2)}%`}
            </div>
            <p>
              {optionOne.votes.length} out of {optionOne.votes.length + optionTwo.votes.length}
            </p>
          </div>
          <div>
            <p>
              Would you rather {optionTwo.text}{" "}
              {props.answer === "optionTwo" && <>You Selected</>}
            </p>
            {/*TODO: Make a percentage view*/}
            {`${(
              (optionTwo.votes.length /
                (optionOne.votes.length + optionTwo.votes.length)) *
              100
            ).toFixed(2)}%`}
            <p>
              {optionTwo.votes.length} out of{" "}
              {optionOne.votes.length + optionTwo.votes.length}
            </p>
          </div>
        </div>
      </div>
    </Col>
  );
}

const mapStateToProps = ({ authUser, users, questions }, { id }) => {
  const question = questions[id];
  // const user = users[authUser.id];

  // console.log('A :' + JSON.stringify(users[authUser.id].answers[id]));
  return {
    authUser,
    answer: users[authUser.id].answers[id],
    question: formatQuestion(question, users[question.author], authUser),
  };
};

export default connect(mapStateToProps)(QuestionOveview);
