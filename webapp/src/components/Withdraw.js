import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Segment, Header, Input, Modal, Button, Icon } from 'semantic-ui-react';

export default class Withdraw extends React.Component {
    state = { modalOpen: false }
    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })
    render() {
        return (
            <Container textAlign='center' fluid style ={{backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80)`,
            height: '100vh', backgroundSize: 'cover'}}>
                <Header style={{paddingTop: '10px'}} as='h1'>Withdraw</Header>
                <Segment style ={{marginLeft: '100px', marginRight: '100px'}}>
                <Header as='h3'>Enter an amount to withdraw:</Header>
                <Input focus placeholder='Enter an amount' />
                    <Modal trigger={<Button onClick={this.handleOpen}>Confirm</Button>} 
                    open={this.state.modalOpen} onClose={this.handleClose} basic size='small'>
                        <Header icon='archive' content='Confirm Amount' />
                        <Modal.Content>
                        <p>
                            Proceed to withdraw $100 from your account?
                        </p>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button onClick={this.handleClose} basic color='red' inverted>
                            <Icon name='remove' /> Cancel
                        </Button>
                        <Button color='green' inverted>
                            <Icon name='checkmark' /> Proceed
                        </Button>
                        </Modal.Actions>
                    </Modal>
                </Segment>
            </Container>
        )
    }
}