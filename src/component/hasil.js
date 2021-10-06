import React, { Component } from 'react';
import { Col, ListGroup, Row, Badge } from 'react-bootstrap';
import { numberWithCommas } from '../untils/until';
import TotalBayar from './totalBayar';
import ModalKeranjang from './modalKeranjang';
import axios from 'axios'
import {API_URL} from '../untils/constants'
import Swal from 'sweetalert2'

export default class Hasil extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 showModal: false,
			 keranjangDetail: false,
			 jumlah: 0,
			 keterangan: '',
			 totalHarga: 0,
		}
	}

	handleShow = (keranjang) => {
		this.setState({
			showModal: true,
			keranjangDetail: keranjang,
			jumlah: keranjang.jumlah,
			keterangan: keranjang.keterangan,
			totalHarga: keranjang.total_harga,
		}) 
	}

	handleClose = ()=> {
		this.setState({
			showModal: false,
		})
	}

	tambah = () => {
		this.setState({
			jumlah: this.state.jumlah+1,
			totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah+1)
		})
	}

	kurang = () => {
		if (this.state.jumlah !== 1) {
			this.setState({
			jumlah: this.state.jumlah-1,
			totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah-1)
		})
		}
	}

	changeHendler = (event) => {
		this.setState({
			keterangan: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.handleClose();
		const data = {
				jumlah: this.state.jumlah,
				total_harga: this.state.totalHarga,
				product: this.state.keranjangDetail.product,
				keterangan: this.state.keterangan
			}

			axios
			 .put(API_URL+"keranjangs/"+this.state.keranjangDetail.id, data)
			  .then(res => {
			  	Swal.fire(
				  'Update Pesanan',
				   data.product.nama+'Berhasil Update Pesanan',
				  'success'
				)
			  })
			  .catch(error => {
			  	console.log(error);
			  })
	}

	hapusPesanan = (id) =>{

	this.handleClose();

	axios
	 .delete(API_URL+"keranjangs/"+id)
	  .then(res => {
	  	Swal.fire(
		  'Pesanan Di Hapus',
		   this.state.keranjangDetail.product.nama+'Berhasil Di Hapus',
		  'error'
		)
	  })
	  .catch(error => {
	  	console.log(error);
	  })
	}

	render(){

		const { keranjangs } = this.props

		return(
		<Col md={3} mt="5">
			<h5><strong>Hasil</strong></h5>
			<hr />
			{ keranjangs.langth !== 0 && (

			<ListGroup variant="flush" key={keranjangs.id}>
			{ keranjangs.map((keranjang) => (
			  <Row key={keranjang.id} onClick={() => this.handleShow(keranjang)}>
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

			<ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHendler={this.changeHendler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan} />

			</ListGroup>

			)}
			
			<TotalBayar keranjangs={keranjangs} {...this.props}/>
		</Col>
		)
	}
}