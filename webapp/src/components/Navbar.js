import React from 'react';
import { NavLink } from 'react-router-dom';
import {Menu, Dropdown, Header, Dimmer, Loader, Message} from 'semantic-ui-react';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          doneLoading: false,
          loggedIn: false,
          firstname: '',
          lastname: '',
          logoutError: false,
        }
        this.loginCheck();
      }

      loginCheck() {
        fetch('http://localhost:5000/api/users/sessioncheck', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }).then((response) => {
            if (response.ok) {
              this.setState({ loggedIn: true });
            } else {
              this.setState({ loggedIn: false });
            }
    
          this.setState({ sessionLoading: false });
          }
        );
      }

      errorDisplay() {
        if (this.state.logoutError) {
          return (
            <Message
              negative
              header='Unable to Login'
              content='Invalid email address or password'
            />
          );
        }
      }

      submit = () => {
        this.setState({ logoutError: false});
        fetch('http://localhost:5000/api/users/logout', {
          method: 'GET',
          }).then((response) => {
            if (response.ok) {

            } else {
              this.setState({ logoutError: true });
            }
          }
        );
      }

    renderContent() {
        return (
     
          <Menu style={{ paddingBottom: '15px' }} attached="top" borderless inverted>
          <Menu.Item as={NavLink} exact to="/" key='home'>Home</Menu.Item>
          <Menu.Item as={NavLink} exact to="/dashboard" key='dashboard'>Dashboard</Menu.Item>
          
          <Menu.Item position="right" text="Log out" as={NavLink} exact to="/"  onClick={this.submit} key='logout'>Log Out</Menu.Item>
        
      </Menu>
        )
    }
    render() {

      if (this.state.sessionLoading) {
        return (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        );
      }

        return (this.state.loggedin) ? this.renderContent() 
        : 
        <Menu style={{ paddingBottom: '15px' }} attached="top" borderless inverted>
        <Menu.Item as={NavLink} exact to="/" key='home'>Home</Menu.Item>
        <Menu.Item as={NavLink} exact to="/dashboard" key='dashboard'>Dashboard</Menu.Item>
        <Menu.Item position="right">
            <Dropdown text="Login" pointing="top right" icon={'user'}>
            <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
            </Dropdown.Menu>
            </Dropdown>
            <Menu.Item position="right" text="Log out" as={NavLink} exact to="/"   onClick={this.submit} key='logout'>Log Out</Menu.Item>

        </Menu.Item>
      </Menu>
      
    }
}