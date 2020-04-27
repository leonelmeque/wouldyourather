import React from "react";
import { connect } from "react-redux";
import Questions from "../Questions/Questions";
import "./home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleList: false,
    };
  }

  componentDidMount() {
    if (this.props.authUser.id.lenght > 0) {
      this.forceUpdate();
    }
  }

  handleToggle(e, toggle) {
    e.preventDefault();
    this.setState(() => ({
      toggleList: toggle,
    }));
  }

  render() {
    const questions = this.props.questions.sort(
      (a, b) => b.timestamp - a.timestamp
    );

    return (
      <>
        <div>
          <div>
            <button onClick={(e) => this.handleToggle(e, true)}>
              <h3>Answered Questions</h3>
            </button>
          </div>
          <div>
            <button onClick={(e) => this.handleToggle(e, false)}>
              <h3>Unanswered Questions</h3>
            </button>
          </div>

          <div className="home-container">
            {this.state.toggleList
              ? questions.map((obj) => {
                  return (
                    <div key={obj.id}>
                      <Questions.Question id={obj.id} />
                    </div>
                  );
                })
              : questions.map((obj) => {
                  return (
                    <div key={obj.id}>
                      <Questions.Question id={obj.id} unAnswered={false} />
                    </div>
                  );
                })}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ questions, authUser }) => {
  return {
    questions: Object.values(questions).map((ob) => ob),
    authUser,
  };
};

export default connect(mapStateToProps)(Home);
