import React from "react";
import {Link} from "react-router-dom";
import './shared.css'

/**
 * The users information should appear in the navigation bar, the user can log in or out
 *
 */
export default class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/newquestion'>New Question</Link>
        <Link to='/leaderboard'>Leader Board</Link>

        <span>User Name</span>
        <img src='' alt='' />
        <Link to='/login'>Logout</Link>
      </nav>
    );
  }
}
