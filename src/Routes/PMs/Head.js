import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'


export class Head extends Component {
  render() {
    return (
   <header style = {styleAtt}> 
          <h1 style = {headStyle}>Messaging</h1> 
          <NavLink style={linkStyle} to = "/PM/Compose">Compose a Message</NavLink>
          <NavLink style={linkStyle} to ="/PM">Inbox</NavLink>
          <NavLink style={linkStyle} to ="/Sent">Sent</NavLink>
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

  textDecoration:'underline',
  color :'yellow',
      
  
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