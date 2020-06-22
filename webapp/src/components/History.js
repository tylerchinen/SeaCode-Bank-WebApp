import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Segment, Header, Card, Pagination} from 'semantic-ui-react';

export default class History extends React.Component {
    render() {
        return (
            <Container textAlign='center' fluid style ={{backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)`,
            height: '100vh', backgroundSize: 'cover'}}>
                <Header style={{paddingTop: '10px'}} as='h1'>Account History</Header>
                <Segment style ={{marginLeft: '100px', marginRight: '100px'}}>
                <Card.Group>
                    <Card style={{marginTop: '-2px'}} fluid color='red' header='Deposit Check $500' meta='June 18, 2020 2:40 PM'/>
                    <Card style={{marginTop: '-2px'}} fluid color='orange' header='Withdraw Cash $200' meta='June 20, 2020 3:30 PM'/>
                    <Card style={{marginTop: '-2px'}} fluid color='yellow' header='Withdraw Cash $200 3' meta='June 22, 2020 5:20 PM'/>
                </Card.Group>
                <Pagination style={{marginTop: '10px'}} defaultActivePage={1} totalPages={2} />
                </Segment>
            </Container>
        )
    }
}