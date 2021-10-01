import React, { Component } from 'react';
import { Col, ListGroup, Row, Badge } from 'react-bootstrap';
import { numberWithCommas } from '../untils/until';

export default class Hasil extends Component {
	render(){

		const { keranjangs } = this.props

		return(
		<Col md={3} mt="5">
			<h5><strong>Hasil</strong></h5>
			<hr />
			{ keranjangs.langth !== 0 && (

			<ListGroup variant="flush" key={keranjangs.id}>
			{ keranjangs.map((keranjang) => (
			  <Row>
			  	<Col>
			  		<h4>
			  			<Badge pill bg="primary">
					       { keranjang.jumlah }
					    </Badge>
			  		</h4>
			  	</Col>
			  	<Col>
			  		<h5>{keranjang.product.nama}</h5>
			  		<p>IDR. {numberWithCommas(keranjang.product.harga)}</p>
			  	</Col>
			  	<Col>
			  		<h4>IDR. {numberWithCommas(keranjang.total_harga)}</h4>
			  	</Col>
			  </Row>
			))}
			</ListGroup>

			)}
		</Col>
		)
	}
}