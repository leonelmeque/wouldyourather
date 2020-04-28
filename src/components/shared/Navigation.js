import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticateUSer } from "../../actions/authUser";
import "./shared.css";

/**
 * Navigation Component
 */
class Navigation extends React.Component {
  render() {
    const { dispatch, users } = this.props;
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">New Question</Link>
        <Link to="/leaderboard">Leader Board</Link>

        {this.props.authUser.id && (
          <span
            style={{
              margin:'0px 10px'
            }}
          >Hello {users[this.props.authUser.id].name}</span>
        )}
        <img src="" alt="" />
        {this.props.authUser.id && (
          <Link
            to="/login"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(authenticateUSer(null));
            }}
          >
            Logout
          </Link>
        )}
      </nav>
    );
  }
}

const mapStateToProps = ({ authUser, users }) => {
  return {
    authUser,
    users,
  };
};

export default connect(mapStateToProps)(Navigation);
