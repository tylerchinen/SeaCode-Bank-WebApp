import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Segment, Header, Card, Pagination, Dimmer, Loader } from 'semantic-ui-react';

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identityLoading: true,
      loggedIn: false,
      currentPage: 1,
      contentError: false,
      history: [],
      totalPage: 0,
      hasMore: false,
    };
    this.loginCheck();
  }

  loginCheck() {
    fetch('http://localhost:5000/api/users/sessioncheck', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }

        this.setState({ identityLoading: false });
        this.fetchTransactionHistory({}, { activePage: 1 });
      });
  }

  fetchTransactionHistory = (e, { activePage }) => {
    this.setState({ fetchLoading: true });
    fetch('http://localhost:5000/api/users/protected/transactionHistory', {
      method: 'POST',
      body: JSON.stringify({ currentPage: activePage }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        console.log(response.status);
        if (response.ok) {
          response.json().then((data) => {
            this.setState({
              contentError: false,
              history: data.transactionHistory,
              totalPage: data.totalPage,
              hasMore: data.hasMore,
            });
          });
        } else {
          this.setState({ contentError: true });
        }

        this.setState({ fetchLoading: false });
      });
  }

  renderHistory() {
    return (
      <Card.Group>
        {
          this.state.history.map((item, index) => {
            let color = 'blue';
            switch(item.transactionType) {
              case 'Deposit':
                color = 'green';
                break;
              case 'Withdraw':
                color = 'blue';
                break;
              case 'Wire':
                color = 'red';
                break;
            }
            let headerString = `${item.transactionType} $${item.amount}`;
            if (item.transactionType === 'Wire') {
              if (item.from === 'self') {
                headerString = `${item.transactionType} $${item.amount} to ${item.recipient}`;
              } else if (item.recipient === 'self') {
                headerString = `${item.from} wired $${item.amount}`;
              }
            }

            return (
              <Card style={{ marginTop: '-2px' }} fluid color={color}
                    header={headerString} meta={Date(item.date).toLocaleString()}/>
            );
          })
        }
      </Card.Group>
    );
  }

  renderContent() {
    console.log(this.state);
    return (
      <Container textAlign='center' fluid style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)`,
        height: '100vh',
        backgroundSize: 'cover',
      }}>
        <Header style={{ paddingTop: '10px' }} as='h1'>Account History</Header>
        <Segment style={{
          marginLeft: '100px',
          marginRight: '100px',
        }}>
          {
            (this.state.fetchLoading)
            ? <Card style={{ marginTop: '-2px' }} fluid color='blue'>
                <Loader size='Large' active/>
              </Card>
            : this.renderHistory()
          }
          <Pagination style={{ marginTop: '10px' }} defaultActivePage={1}
                      onPageChange={this.fetchTransactionHistory} totalPages={this.state.totalPage}/>
        </Segment>
      </Container>
    );
  }

  render() {
    if (this.state.identityLoading) {
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
