import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticateUSer } from "../../actions/authUser";

class Login extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      users: ["sarahedo", "tylermcginnis", "johndoe"],
      selectedUser: "none",
    };
  }

  handleUserSelection(value) {
    this.setState(() => ({
      selectedUser: value,
    }));
  }

  render() {
    const { dispatch } = this.props;

    return (
      <>
        <h2>Login</h2>
        <select
          value={this.state.selectedUser}
          onChange={(e) => {
            e.stopPropagation();
            this.handleUserSelection(e.target.value);
          }}
        >
          <option value="none" defaultChecked>
            Please Select A User
          </option>
          {this.state.users.map((obj) => {
            return (
              <option key={obj} value={obj}>
                {obj}
              </option>
            );
          })}
        </select>
        <Link
          to="/"
          onClick={(e) => {
            dispatch(authenticateUSer(this.state.selectedUser));
          }}
          style={{
            pointerEvents: this.state.selectedUser !== "none" ? "auto" : "none",
          }}
        >
          Login
        </Link>
      </>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps)(Login);
