import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class Head extends Component {
  render() {
    return (
   <header style = {styleAtt}> 
          <h1 style = {headStyle}>Messaging</h1> 
          <Link style={linkStyle} to = "/">Compose a Message</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={linkStyle} to ="/inbox">Inbox</Link>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={linkStyle} to ="/sent">Sent</Link>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </header>

            
            
    )
  }
}
export default Head;
const styleAtt={
 padding : '10px',
 border : 'none' ,
 backgroundColor:'black',
 textAlign : 'Center',
 color : 'White'

}
const linkStyle={
  color: '#fff',
  textDecoration:'underline',
      
  
}

const headStyle={
  backgroundColor: 'rgb(22, 163, 139)',
  minHeight: '30vh',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  justifyContent: 'center',
  fontSize: 'calc(10px + 2vmin)',
  color: 'white'
}