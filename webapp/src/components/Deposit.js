import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Segment, Header, Checkbox, Form } from 'semantic-ui-react';

export default class Deposit extends React.Component {
    state = {}
    handleChange = (e, { value }) => this.setState({ value })
  
    
    render() {
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
                </Segment>
            </Container>
        )
    }
}