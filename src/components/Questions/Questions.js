//Questions class component
import React from "react";
import { connect } from "react-redux";

class Question extends React.Component {
  render() {
    return <div>tweets...</div>;
  }
}

const mapStateToProps = ({ authhUser, users, questions }, { id }) => {
    const question = questions[id]

    return{
        authhUser,
        users
    }
};

export default connect(mapStateToProps)(Question);
