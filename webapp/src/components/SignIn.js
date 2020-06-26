import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Segment, Header, Button, Form, Grid, Message } from 'semantic-ui-react';

export default class Deposit extends React.Component {
  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      redirectToReferer: false,
      loginError: false,
    };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  errorDisplay() {
    if (this.state.loginError) {
      return (
        <Message
          negative
          header='Unable to Login'
          content='Invalid email address or password'
        />
      );
    }
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    const signinUser = { email, password };
    this.setState({ loginError: false});
    fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      body: JSON.stringify(signinUser),
        headers: {
          'Content-Type': 'application/json',
        },
      credentials: 'include',
      }).then((response) => {
        if (response.ok) {
          this.props.history.push('/dashboard');
        } else {
          this.setState({ loginError: true });
        }
      }
    );
  }

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
              <Form size='large' onSubmit={this.submit}>
                <Segment stacked>
                  <Form.Input
                    fluid icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                    name='email'
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name='password'
                    onChange={this.handleChange}
                  />

                  <Form.Button>
                    Sign In
                  </Form.Button>
                  {this.errorDisplay()}
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
