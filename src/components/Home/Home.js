import React from "react";
import {connect} from 'react-redux';

class Home extends React.Component {
  render() {
    return (
      <>
        {this.props.questions.map((q) => {
          return <div key={q}>{q}</div>;
        })}
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
