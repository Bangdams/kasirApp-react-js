import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { numberWithCommas } from '../untils/until';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'

const ModalKeranjang = ({hapusPesanan, totalHarga, handleSubmit, changeHendler, showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah, kurang}) => {
	if (keranjangDetail) {
		return (
		<Modal show={showModal} onHide={handleClose}>
		    <Modal.Header closeButton>
		      <Modal.Title>
		      	{ keranjangDetail.product.nama } {" "}
		      	<strong>
		      		(IDR. {numberWithCommas(keranjangDetail.product.harga)})
		      	</strong>
		      </Modal.Title>
		    </Modal.Header>
		    <Modal.Body>
		    	<Form onSubmit={handleSubmit}>
				  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				    <Form.Label>Total Harga :</Form.Label>
				    <p>
				    	<strong>
				    		IDR. {numberWithCommas(totalHarga)}
				    	</strong>
				    </p>
				  </Form.Group>

				  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				 	<Form.Label>Jumlah :</Form.Label>
				 	<br />
				  	<Button variant="primary" size="sm" onClick={() => kurang()}>
				  		<FontAwesomeIcon icon={faMinus} />
				  	</Button>
				  	{" "}
				  	<strong>{jumlah}</strong>
				  	{" "}
				  	<Button variant="primary" size="sm" onClick={() => tambah()}>
				  		<FontAwesomeIcon icon={faPlus} />
				  	</Button>
				  </Form.Group>

				  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				    <Form.Label>Keterangan</Form.Label>
				    <Form.Control as="textarea" rows={3}
				     name="keterangan" placeholder="Tulis Keterangan Contoh Pedas Sedang"
				     value={keterangan}
				     onChange={(event) => changeHendler(event)}
				      />
				  </Form.Group>
				  <Button variant="primary" type="submit">
			        Save Changes
			      </Button>
				</Form>
		    </Modal.Body>
		    <Modal.Footer>
		      <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
		        <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
		      </Button>
		    </Modal.Footer>
		  </Modal>
		)
	}else{
		return (
		<Modal show={showModal} onHide={handleClose}>
		    <Modal.Header closeButton>
		      <Modal.Title>Kosong</Modal.Title>
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
}

export default ModalKeranjang