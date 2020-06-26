import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Segment, Header, Input, Modal, Button, Icon, Message, Loader } from 'semantic-ui-react';

export default class Withdraw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      amount: 0,
      submitError: false,
      success: false,
      lastRequest: 0,
      loading: false,
    }
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });
  handleProceed = () => {
    const amount  = this.state.amount;
    this.setState({
      submitError: false,
      loading: true,
    });
    fetch('http://localhost:5000/api/users/protected/withdraw', {
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
          loading: false,
        });
      }
    );
  };

  render() {
    console.log(this.state);
    return (
      <Container textAlign='center' fluid style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)`,
        height: '100vh',
        backgroundSize: 'cover'
      }}>
        <Header style={{ paddingTop: '10px' }} as='h1'>Withdraw</Header>
        <Segment style={{
          marginLeft: '100px',
          marginRight: '100px'
        }}>
          <Header as='h3'>Enter an amount to withdraw:</Header>
          <Input focus placeholder='Enter an amount' name='amount' onChange={this.handleChange}/>
          <Modal trigger={<Button onClick={this.handleOpen}>Confirm</Button>}
                 open={this.state.modalOpen} onClose={this.handleClose} basic size='small'>
            <Header icon='archive' content='Confirm Amount'/>
            <Modal.Content>
              <p>
                Proceed to withdraw ${this.state.amount} from your account?
              </p>
              <Loader size='large' disabled={!this.state.loading}/>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleClose} basic color='red' inverted>
                <Icon name='remove'/> Cancel
              </Button>
              <Button onClick={this.handleProceed} color='green' inverted>
                <Icon name='checkmark'/> Proceed
              </Button>
            </Modal.Actions>
          </Modal>
        </Segment>
        <Message compact error hidden={!this.state.submitError}>Invalid withdraw request <br/> Please try again</Message>
        <Message compact positive hidden={!this.state.success}> Withdrew ${this.state.lastRequest} </Message>
      </Container>
    );
  }
}
