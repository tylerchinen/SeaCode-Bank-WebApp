import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Grid, Header, Icon, Segment, Button, Statistic } from 'semantic-ui-react';

export default class Home extends React.Component {
    render() {
        return (
            <Container textAlign='center' fluid style ={{backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)`,
            height: '100vh', backgroundSize: 'cover'}}>
                <Header style={{paddingTop: '10px'}} as='h3'>Welcome to Seabank, Firstname Lastname</Header>
                <Statistic>
                    <Statistic.Value>$5,550</Statistic.Value>
                    <Statistic.Label>Account Balance</Statistic.Label>
                </Statistic>
                <Segment style ={{marginLeft: '100px', marginRight: '100px'}}>
                <Grid celled='internally' centered columns={2}>
                    <Grid.Row>
                    <Grid.Column textAlign='center'>
                    <Header as='h2' icon>
                        <Icon name='download' />
                        Deposit
                        <Header.Subheader>
                        Deposit cash or checks into your account.
                        </Header.Subheader>
                        <Button style={{marginTop: '10px'}} as={NavLink} exact to="/dashboard/deposit" key='deposit' >GO</Button>
                    </Header>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                    <Header as='h2' icon>
                        <Icon name='upload' />
                        Withdraw
                        <Header.Subheader>
                        Withdraw cash from your account.
                        </Header.Subheader>
                        <Button style={{marginTop: '10px'}}as={NavLink} exact to="/dashboard/withdraw" key='withdraw' >GO</Button>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column textAlign='center'>
                    <Header as='h2' icon>
                        <Icon name='exchange' />
                        Wire Funds
                        <Header.Subheader>
                        Transfer funds to another person.
                        </Header.Subheader>
                        <Button style={{marginTop: '10px'}}as={NavLink} exact to="/dashboard/wire" key='wire' >GO</Button>
                    </Header>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                    <Header as='h2' icon>
                        <Icon name='file alternate outline' />
                        Account History
                        <Header.Subheader>
                        See your transaction records.
                        </Header.Subheader>
                        <Button style={{marginTop: '10px'}}as={NavLink} exact to="/dashboard/history" key='history' >GO</Button>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>
            </Container>
        )
    }
}