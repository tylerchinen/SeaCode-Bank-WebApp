import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Segment, Header, Button, Form, Grid, Message } from 'semantic-ui-react';

export default class Deposit extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
        // eslint-disable-next-line max-len
        <Container textAlign='center' fluid style={{
          // eslint-disable-next-line max-len
          backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)',
          height: '100vh',
          backgroundSize: 'cover',
        }}>
          <Header style={{ paddingTop: '10px' }} as='h1'>Sign In</Header>
          <Grid textAlign='center' style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
                  <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                  />

                  <Button as={NavLink} exact to="/dashboard" key='dashboard' primary color='teal' fluid size='large'>
                    Sign In
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <a href='signup'>Sign Up</a>
              </Message>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}
