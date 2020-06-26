import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Grid, Header, Icon, Segment, Button, Statistic, Dimmer, Loader } from 'semantic-ui-react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doneLoading: false,
      loggedIn: false,
      firstname: '',
      lastname: '',
      balance: '',
    };
    this.userBalance();
  }

  userBalance() {
    fetch('http://localhost:5000/api/users/protected/balance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          this.setState({
            loggedIn: true,
          });
          response.json()
            .then((data) => {
              this.setState({
                firstname: data.firstname,
                lastname: data.lastname,
                balance: data.balance,
              });
            });
        }
        this.setState({ doneLoading: true });
      });
  }

  renderContent() {
    return (
      <Container textAlign='center' fluid style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)`,
        height: '100vh',
        backgroundSize: 'cover',
      }}>
        <Header style={{ paddingTop: '10px' }} as='h3'>Welcome to Seabank, {this.state.firstname} {this.state.lastname}</Header>
        <Statistic>
          <Statistic.Value>${this.state.balance}</Statistic.Value>
          <Statistic.Label>Account Balance</Statistic.Label>
        </Statistic>
        <Segment style={{
          marginLeft: '100px',
          marginRight: '100px',
        }}>
          <Grid celled='internally' centered columns={2}>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Header as='h2' icon>
                  <Icon name='download'/>
                  Deposit
                  <Header.Subheader>
                    Deposit cash or checks into your account.
                  </Header.Subheader>
                  <Button style={{ marginTop: '10px' }} as={NavLink} exact to="/deposit" key='deposit'>GO</Button>
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Header as='h2' icon>
                  <Icon name='upload'/>
                  Withdraw
                  <Header.Subheader>
                    Withdraw cash from your account.
                  </Header.Subheader>
                  <Button style={{ marginTop: '10px' }} as={NavLink} exact to="/withdraw" key='withdraw'>GO</Button>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Header as='h2' icon>
                  <Icon name='exchange'/>
                  Wire Funds
                  <Header.Subheader>
                    Transfer funds to another person.
                  </Header.Subheader>
                  <Button style={{ marginTop: '10px' }} as={NavLink} exact to="/wire" key='wire'>GO</Button>
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Header as='h2' icon>
                  <Icon name='file alternate outline'/>
                  Account History
                  <Header.Subheader>
                    See your transaction records.
                  </Header.Subheader>
                  <Button style={{ marginTop: '10px' }} as={NavLink} exact to="/history" key='history'>GO</Button>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }

  render() {
    if (!this.state.doneLoading) {
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
