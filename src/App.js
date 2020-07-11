import React from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Navigation from "./components/shared/Navigation";
import Footer from "./components/shared/Footer";
import Routes from "./components/shared/Routes";
import "./App.css";
import "./main.scss";
import Login from "./components/Login/Login";
import { Container } from "react-bootstrap";
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <>
      <div className="App">
        {this.props.loading ? (
          <Container>
            <h2>App Is Loading...</h2>
          </Container>
        ) : (
          <>
            <Navigation username={this.props.authUser} />

            {this.props.authUser.id === undefined ||
            this.props.authUser.id === null ? (
              <Container>
                <Login />
              </Container>
            ) : (
              <Routes authUser={this.props.authUser} />
            )}
           
          </>
        )}
      </div>
       <Footer />
       </>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  return {
    loading: authUser === null,
    authUser,
  };
};

export default connect(mapStateToProps)(App);
