import React from "react";

export default class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)
        this.state={hasError:false}
    }

    componentDidCatch(error, info){
        this.setState({hasError:true});
        alert("yes")
      //  logErrorToMyService(error,info)
    }

    render(){
        if(this.state.hasError){
            return <h2>Opss...Something went wrong</h2>
        }

        return this.props.children;
    }
}