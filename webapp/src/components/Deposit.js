import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Segment, Header, Checkbox, Form, Button, Input, Dimmer, Loader } from 'semantic-ui-react';

export default class Deposit extends React.Component {
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
        this.setState({
          submitError: false,
          withdrawLoading: true,
        });
        fetch('http://localhost:5000/api/users/protected/deposit', {
          method: 'POST',
          body: JSON.stringify({ amount: amount }),
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
                <Header style={{paddingTop: '10px'}} as='h1'>Deposit</Header>
                <Segment style ={{marginLeft: '100px', marginRight: '100px'}}>
                <Header style={{paddingTop: '10px'}} as='h3'>Step 1: Cash or Check</Header>
                <Form>
                    <Form.Field>
                    I am depositing: <b>{this.state.value}</b>
                    </Form.Field>
                    <Form.Field>
                    <Checkbox
                        radio
                        label='Cash'
                        name='checkboxRadioGroup'
                        value='cash'
                        checked={this.state.value === 'cash'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    <Form.Field>
                    <Checkbox
                        radio
                        label='Check'
                        name='checkboxRadioGroup'
                        value='check'
                        checked={this.state.value === 'check'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                </Form>
                <Header style={{paddingTop: '10px'}} as='h3'>Step 2: Amount</Header>
                <Input focus placeholder='Enter an amount' name='amount' onChange={this.handleChange} />
                <Button onClick={this.handleProceed}>Confirm</Button>
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