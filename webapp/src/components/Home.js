import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import CookieConsent from 'react-cookie-consent';

export default class Home extends React.Component {
  render() {
    return (
        <Container fluid style={{
          // eslint-disable-next-line max-len
          backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)`,
          height: '100vh',
          backgroundSize: 'cover'
        }}>
          <Grid centered columns={2}>
            <Grid.Column textAlign='center'>
              <Icon style={{ marginTop: '100px' }} name='money bill alternate outline' size='huge'/>
              <Header as='h1'>SeaBank</Header>
              <Header as='h3'>Banking Made Easy</Header>
              <Button as={NavLink} exact to="/signin" key='signin' primary>Sign In</Button>
              <Button as={NavLink} exact to="/signup" key='signup' secondary>Sign Up</Button>
            </Grid.Column>
          </Grid>
          {/* eslint-disable-next-line max-len */}
          <CookieConsent location="bottom" style={{ background: 'lightslategray' }} buttonStyle={{ background: 'teal', color: 'white', fontSize: '13px', fontWeight: 'bold' }} >This website uses cookies to enhance the user experience.</CookieConsent>
        </Container>
    );
  }
}
