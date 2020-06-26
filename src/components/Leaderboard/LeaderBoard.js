import React from "react";
import { connect } from "react-redux";
import "./leaderBoard.scss";

class LeaderBoard extends React.Component {
  formatUsers() {
    const { users } = this.props;
    const formatedUsers = Object.values(users).map((user) => {
      return {
        name: user.name,
        id: user.id,
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
      <div>
        {rankingUsers.map((user) => {
          return (
            <div key={user.name} className="lead-card">
              <div className="left-column">
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
              </div>

              <div className="right-column">
                
                <h3>
                  {user.name}{" "}
                  {user.id === this.props.authUser.id && (
                    <span role="img" aria-label="Smilling Emoji">
                      😀
                    </span>
                  )}
                </h3>

                <p>
                  <span role="img" aria-label="Check Mark Button">
                    ✅
                  </span>{" "}
                  Answered questions <span>{user.totalAnsweredQuestions}</span>
                </p>
                <p>
                  <span role="img" aria-label="Pen">
                    🖊️
                  </span>{" "}
                  Created questions <span>{user.totalAskedQuestions}</span>
                </p>
                <p>
                  Score : <span>{user.rankingPoints}</span>
                </p>
              </div>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ users, authUser }) => {
  return {
    users,
    authUser,
  };
};
export default connect(mapStateToProps)(LeaderBoard);
