import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Segment, Header } from 'semantic-ui-react';

export default class Withdraw extends React.Component {
    render() {
        return (
            <Container textAlign='center' fluid style ={{backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)`,
            height: '100vh', backgroundSize: 'cover'}}>
                <Header style={{paddingTop: '10px'}} as='h1'>Withdraw</Header>
                <Segment style ={{marginLeft: '100px', marginRight: '100px'}}>

                </Segment>
            </Container>
        )
    }
}