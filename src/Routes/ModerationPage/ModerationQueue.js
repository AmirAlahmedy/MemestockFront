import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'


class ModerationQueue extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
      
          Reports: [],
        isLoading: true,
        errors: null
        
        }
      

    };
    render (){
        return (
<div>
    <p1>HELLO</p1>
</div>
        );
    }
    }

    export default ModerationQueue;