import React from "react";
import Home from "./components/Home/Home";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
// import connect
// import initial data

//change to cass component and dispatch init data when component mounts
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div className="App">
        {this.props.loading ? <>App Is Loading</> : <Home />}
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  return {
    loading: authUser === null,
  };
};

//connect the app with no state because we do not need it yet
export default connect(mapStateToProps)(App);
