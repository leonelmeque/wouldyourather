import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticateUSer } from "../../actions/authUser";
import "./shared.css";

/**
 * The users information should appear in the navigation bar, the user can log in or out
 *
 */
class Navigation extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <nav>
        <Link to="/">Home</Link>

        {this.props.authUser.id && <Link to="/add">New Question</Link>}
        {this.props.authUser.id && <Link to="/leaderboard">Leader Board</Link>}

        {this.props.authUser.id && <span>{this.props.authUser.id}</span>}
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

const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps)(Navigation);
