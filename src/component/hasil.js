import React, { Component } from 'react';
import { Col, ListGroup, Row, Badge } from 'react-bootstrap';
import { numberWithCommas } from '../untils/until';
import TotalBayar from './totalBayar';

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
			  <Row key={keranjang.id}>
			  	<Col xs={2}>
			  		<h4>
			  			<Badge pill bg="primary">
					       { keranjang.jumlah }
					    </Badge>
			  		</h4>
			  	</Col>
			  	<Col>
			  		<h6><strong>{keranjang.product.nama}</strong></h6>
			  		<p>IDR. {numberWithCommas(keranjang.product.harga)}</p>
			  	</Col>
			  	<Col>
			  		<p><strong className="float-right">IDR. {numberWithCommas(keranjang.total_harga)}</strong></p>
			  	</Col>
			  </Row>
			))}
			</ListGroup>

			)}
			
			<TotalBayar keranjangs={keranjangs} {...this.props}/>
		</Col>
		)
	}
}