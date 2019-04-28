import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'


export class Head extends Component {
  render() {
    return (
   <header style = {styleAtt}> 
          <NavLink style={linkStyle} to = "/PM/Compose">Compose a Message</NavLink>
          <NavLink style={linkStyle} to ="/PM">Inbox</NavLink>
          <NavLink style={linkStyle} to ="/Sent">Sent</NavLink>
    </header>

            
            
    )
  }
}
export default Head;
const styleAtt={
 padding : '1em',
 border : 'none' ,
 backgroundColor:'#fff',
 textAlign : 'Center',
 color : '#333',
 display: "flex",
 width: "100%",
 justifyContent: "space-between"
}
const linkStyle={
  color :'#333',
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