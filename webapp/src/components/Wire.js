import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Segment, Header, Form, Button, Input } from 'semantic-ui-react';

export default class Wire extends React.Component {
    render() {
        return (
            <Container textAlign='center' fluid style ={{backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)`,
            height: '100vh', backgroundSize: 'cover'}}>
                <Header style={{paddingTop: '10px'}} as='h1'>Wire Funds</Header>
                <Segment style ={{marginLeft: '100px', marginRight: '100px'}}>
                <Form>
                    <Form.Field>
                    <Form.Input fluid label='Email of Recieving Party' placeholder='Email Address' />
                    </Form.Field>
                    <Form.Field>
                    <Form.Input fluid label='Amount' placeholder='Enter an Amount' />
                    </Form.Field>
                    <Form.Field>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
                </Segment>
            </Container>
        )
    }
}