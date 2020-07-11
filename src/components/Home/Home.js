import React from "react";
import { connect } from "react-redux";
import Questions from "../Questions/Questions";
import Login from "../Login/Login";
import "./home.css";
import {Col} from "react-bootstrap";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleList: false,
    };
  }

  handleToggle(e, toggle) {
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
        {this.props.authUser !== null ? (
              <Col md={6}>
                <div className="justify-content-center">
                <h3 className="text-center">Timeline</h3>
                  <div id="home">
                    <div style={{ display: "flex" }}>
                      <div>
                        <input type="radio" id="unanswered" name="question-section" value="unanswered" defaultChecked onChange={(e)=>{this.handleToggle(e,false)}} />
                        <label htmlFor="unanswered">
                        <h3>Unanswered Questions</h3>
                        </label>
                         
                  
                      </div>
                      <div>
                        <input type="radio" id="answered" name="question-section" value="answered" onChange={(e)=>{this.handleToggle(e,true)}} />
                        <label htmlFor="answered">
                        <h3>Answered Questions</h3>
                        </label>
                        
                       
                      </div>
                    </div>

                    <div className="home-container">
                      {this.state.toggleList
                        ? questions.map((obj) => {
                            return (
                              <div key={obj.id} className="question-animation">
                                <Questions.Question id={obj.id} />
                              </div>
                            );
                          })
                        : questions.map((obj) => {
                         
                            return (
                              <div key={obj.id} className="question-animation">
                                <Questions.Question
                                  id={obj.id}
                                  unAnswered={false}
                                />
                                
                              </div>
                             
                            );
                          })}
                    </div>
                  </div>
                </div>
              </Col>
        ) : (
          <Login />
        )}
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
