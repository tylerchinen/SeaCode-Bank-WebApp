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
          balance: '',
          logoutError: false,
        }
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
              this.props.history.push('/');
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
                <Menu.Item position="right">
                <Menu.Item position="right" text="Log out" onItemClick={this.submit} key='dashboard'>Log Out</Menu.Item>
                </Menu.Item>
            </Menu>
        )
    }
    render() {
        return (this.state.loggedin) ? this.renderContent() 
        :   <Menu style={{ paddingBottom: '15px' }} attached="top" borderless inverted>
                <Menu.Item as={NavLink} exact to="/" key='home'>Home</Menu.Item>
                <Menu.Item as={NavLink} exact to="/dashboard" key='dashboard'>Dashboard</Menu.Item>
                <Menu.Item position="right">
                    <Dropdown text="Login" pointing="top right" icon={'user'}>
                    <Dropdown.Menu>
                        <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                        <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                    </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Menu>
    }
}