import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticateUSer } from "../../actions/authUser";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./shared.css";

/**
 * Navigation Component
 */
class Navigation extends React.Component {
  render() {
    const { dispatch, users } = this.props;
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Would Your Rather</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/add">
                New Question
              </Link>
              <Link className="nav-link" to="/leaderboard">
                Leader Board
              </Link>
              {this.props.authUser.id && (
                <span
                  style={{
                    margin: "auto 10px",
                  }}
                >
                  Hi{" "}
                  <span role="img" aria-label="Waving Hand">
                    👋
                  </span>{" "}
                  {users[this.props.authUser.id].name}
                </span>
              )}
              <img src="" alt="" />
              {this.props.authUser.id && (
                <Link
                  className="nav-link"
                  to="/login"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(authenticateUSer(null));
                  }}
                >
                  Logout
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
