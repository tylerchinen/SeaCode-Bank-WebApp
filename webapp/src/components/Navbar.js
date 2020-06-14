import React from 'react';
import { NavLink } from 'react-router-dom';
import {Menu, Dropdown, Header} from 'semantic-ui-react';

export default class Navbar extends React.Component {
    render() {
        return (
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
                </Menu.Item>
            </Menu>
        )
    }
}