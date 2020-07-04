import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Segment, Header, Form, Button, Input, Dimmer, Loader, Message, Divider } from 'semantic-ui-react';

export default class Wire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modalOpen: false,
          amount: 0,
          submitError: false,
          success: false,
          lastRequest: 0,
          withdrawLoading: false,
          sessionLoading: true,
          loggedIn: false,
          secondPartyEmail: '',
        }
        this.loginCheck();
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
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
      handleProceed = () => {
        const amount  = this.state.amount;
        const secondemail = this.state.secondPartyEmail;
        this.setState({
          submitError: false,
          withdrawLoading: true,
        });
        fetch('http://localhost:5000/api/users/protected/wire', {
          method: 'POST',
          body: JSON.stringify({ amount: amount, secondPartyEmail: secondemail }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }).then((response) => {
            if (response.ok) {
              this.setState({
                success: true,
                lastRequest: amount,
              });
            } else {
              this.setState({
                submitError: true,
              });
            }
            this.setState({
              modalOpen: false,
              withdrawLoading: false,
            });
          }
        );
      };
      renderContent() {
        return (
            <Container textAlign='center' fluid style ={{backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)`,
            height: '100vh', backgroundSize: 'cover'}}>
                <Header style={{paddingTop: '10px'}} as='h1'>Wire Funds</Header>
                <Segment style ={{marginLeft: '100px', marginRight: '100px'}}>
                <Form>
                    <Form.Field>
                    <Form.Input fluid onChange={this.handleChange} name='secondPartyEmail' label='Email of Recieving Party' placeholder='Email Address' />
                    </Form.Field>
                    <Form.Field>
                    <Form.Input fluid onChange={this.handleChange} name='amount' label='Amount' placeholder='Enter an Amount' />
                    </Form.Field>
                    <Form.Field>
                    </Form.Field>
                    <Button type='submit' onClick={this.handleProceed} >Submit</Button>
                </Form>
                <Divider />
                <Message compact error hidden={!this.state.submitError}>Invalid Wire request <br/> Please try again</Message>
                <Message compact positive hidden={!this.state.success}> Wired ${this.state.lastRequest} </Message>
               
                </Segment>
            </Container>
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

          return (this.state.loggedIn)
          ? this.renderContent()
          : <Container textAlign='center' fluid style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)`,
            height: '100vh',
            backgroundSize: 'cover',
          }}>
            <Header as='h1' content='Login Required'/>
            <Header as='h2' content='Please log in'/>
          </Container>;
    }
}