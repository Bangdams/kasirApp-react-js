import React from 'react'
import { Modal, Button } from 'react-bootstrap'


const ModalMenu = (handleClose, showModal) => {
	return (
		<Modal show={showModal} onHide={handleClose}>
		    <Modal.Header closeButton>
		      <Modal.Title></Modal.Title>
		    </Modal.Header>
		    <Modal.Body>Kosong</Modal.Body>
		    <Modal.Footer>
		      <Button variant="secondary" onClick={handleClose}>
		        Close
		      </Button>
		      <Button variant="primary" onClick={handleClose}>
		        Save Changes
		      </Button>
		    </Modal.Footer>
		</Modal>
	)
}

export default ModalMenu