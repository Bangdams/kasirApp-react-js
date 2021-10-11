import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { numberWithCommas } from'../untils/until'

const Menus = ({ menu, masukKeranjang, handleShow }) => {
	return (
	<Col md={4} xs={6} className="mb-3">
		<Card className="shadow" onClick={() => handleShow(menu)}>
		  <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} />
		  <Card.Body>
		    <Card.Title>{menu.nama} <strong>{menu.kode}</strong></Card.Title>
		    <Card.Title><p>IDR. {numberWithCommas(menu.harga)}</p></Card.Title>
		    <Card.Text>
		      Some quick example text to build on the card title and make up the bulk of
		      the card's content.
		    </Card.Text>
		  </Card.Body>
		</Card>
	</Col>
	)
}

export default Menus;