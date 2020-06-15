import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Segment, Header, Grid, Form, Button, Message, Divider, Checkbox } from 'semantic-ui-react';

export default class Deposit extends React.Component {
  state = {
    Agree: false
  }

  handleCheckboxChange = (e, { checked, name }) =>
      this.setState({[name]: checked})

  // eslint-disable-next-line class-methods-use-this
  render() {
    const {
      Agree
    } = this.state
    return (
        <Container textAlign='center' fluid style={{
          // eslint-disable-next-line max-len
          backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)',
          height: '100vh',
          backgroundSize: 'cover',
        }}>
          <Header style={{ paddingTop: '10px' }} as='h1'>Sign Up</Header>
          <Grid textAlign='center' style={{ height: '200vh' }}>
            <Grid.Column style={{ maxWidth: 800 }}>
              <Form size='large'>
                <Segment>
                  <Grid columns='equal'>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input focus placeholder='First Name'/>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input focus placeholder='Last Name'/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Divider/>
                      <Grid.Column>
                        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password'/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Form.Group inline style={{marginTop: '10px'}}>
                    <Form.Checkbox
                        checked={Agree}
                        label='I agree to the Terms and Conditions'
                        name='Agree'
                        onChange={this.handleCheckboxChange}
                    /><a href='publicdisclosure'>(See Terms and Conditions)</a>
                    </Form.Group>
                  {/* eslint-disable-next-line max-len */}
                  <Button as={NavLink} exact to="/dashboard" key='dashboard' primary color='teal' center size='large' paddingTop={'30 px'}>
                    Create Account
                  </Button>
                </Segment>
              </Form>
              <Message>
                Already have an account? <a href='signin'>Sign In</a>
              </Message>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}
