import React from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Navigation from "./components/shared/Navigation";
import Routes from "./components/shared/Routes";
import "./App.css";
import Login from "./components/Login/Login";

class App extends React.Component {
  componentDidMount() {
   
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div className="App">
        {this.props.loading ? (
          <div
            style={{
              width: 800,
              height: "100vh",
              margin: "0px auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2>App Is Loading...</h2>
          </div>
        ) : (
          <>
            <Navigation username={this.props.authUser} />
            <div className="App-container">
              {this.props.authUser.id===undefined || this.props.authUser.id===null ? <Login /> : <Routes authUser={this.props.authUser} />}
              
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({authUser}) => {
  return {
    loading: authUser === null,
    authUser,
  };
};


export default connect(mapStateToProps)(App);
