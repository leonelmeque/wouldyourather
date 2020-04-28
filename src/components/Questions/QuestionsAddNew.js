import React from "react";
import { connect } from "react-redux";


//TODO User can only vote once per question
 function QuestionAddNew(props) {



  return (
    <div>
       Add New Question
    </div>
  );
}


const mapStateToProps = ({ authUser, users, questions }) => {
  return {
    authUser,   
  };
};

export default connect(mapStateToProps)(QuestionAddNew);
