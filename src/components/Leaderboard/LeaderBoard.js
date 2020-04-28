import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class LeaderBoard extends React.Component {
  formatUsers() {
    const { users } = this.props;
    const formatedUsers = Object.values(users).map((user) => {
      return {
        name: user.name,
        avatar: user.avatarURL,
        totalAskedQuestions: Object.keys(user.answers).length,
        totalAnsweredQuestions: user.questions.length,
        rankingPoints: Object.keys(user.answers).length + user.questions.length,
      };
    });

    formatedUsers.sort((a, b) => b.rankingPoints - a.rankingPoints);
    return formatedUsers;
  }

  render() {
    const rankingUsers = this.formatUsers();
    return (
      <>
        {rankingUsers.map((user) => {
          return (
            <>
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  objectFit: "cover",
                }}
              />

              <h3>{user.name}</h3>

              <p>
                Answered questions <span>{user.totalAnsweredQuestions}</span>
              </p>
              <p>
                Created questions <span>{user.totalAskedQuestions}</span>
              </p>

              <h5>Score</h5>
              <span>{user.rankingPoints}</span>
              <br/>
            </>
          );
        })}
      </>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(LeaderBoard);
