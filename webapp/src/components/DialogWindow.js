import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class DialogBox extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Modal show={this.props.show}>
          <Modal.Header>
            <Modal.Title>
              {this.props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.content}
          </Modal.Body>
          <Modal.Footer>
            <Button
                variant='primary'
                size='lg'
                onClick={this.props.closeHandler}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
