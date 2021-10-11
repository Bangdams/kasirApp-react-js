import React from 'react'
import { Col, Row, Modal, Button, Form, } from 'react-bootstrap';
import Listcategoris from '../component/listCategoris';
import Hasil from '../component/hasil';
import Menus from '../component/menus';
import {API_URL} from '../untils/constants';
import axios from 'axios';
import Swal from 'sweetalert2'
import ModalMenu from '../component/modalMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'


export default class Home extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 menus: [],
			 CategoryyangDipilih: 'Makanan',
			 keranjangs: [],
			 showModal: false,
			 keranjangDetail: false,
			 jumlah: 1,
			 totalHarga: 0,
			 keterangan: '',
		}
	}

	componentDidMount() {
		axios
		 .get(API_URL+"products?category.nama="+this.state.CategoryyangDipilih)
		  .then(res => {
		  	const menus = res.data;
		  	this.setState({ menus });
		  })
		  .catch(error => {
		  	console.log(error);
		  });

		  axios
		 .get(API_URL+"keranjangs")
		  .then(res => {
		  	const keranjangs = res.data;
		  	this.setState({ keranjangs });
		  })
		  .catch(error => {
		  	console.log(error);
		  });
	}

	componentDidUpdate(prevState) {
		if (this.state.keranjangs !== prevState.keranjangs) {
			axios
		 .get(API_URL+"keranjangs")
		  .then(res => {
		  	const keranjangs = res.data;
		  	this.setState({ keranjangs });
		  })
		  .catch(error => {
		  	console.log(error);
		  });
		}
	}


	UbahCategory = (value) => {
		this.setState({
			CategoryyangDipilih: value,
			menus: []	
		})

		axios
		 .get(API_URL+"products?category.nama="+value)
		  .then(res => {
		  	const menus = res.data;
		  	this.setState({ menus });
		  })
		  .catch(error => {
		  	console.log(error);
		  })
			
	}

	handleShow = (menu) => {
		this.setState({
			showModal: true,
			keranjangDetail: menu,
			totalHarga: menu.harga
		})
	}

	handleClose = () => {
		this.setState({
			showModal: false
		})
	}

	tambah = () => {
		this.setState({
			jumlah: this.state.jumlah+1,
			totalHarga: this.state.keranjangDetail.harga*(this.state.jumlah+1)
		})
	}

	kurang = () => {
		if (this.state.jumlah !== 1) {
			this.setState({
			jumlah: this.state.jumlah-1,
			totalHarga: this.state.keranjangDetail.harga*(this.state.jumlah-1)
		})
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.handleClose();
		const data = {
			jumlah: this.state.jumlah,
			total_harga: this.state.totalHarga,
			product: this.state.keranjangDetail,
			keterangan: this.state.keterangan
		}

		 axios
		 .get(API_URL+"keranjangs?product.id="+data.product.id)
		  .then(res => {
		  	if (res.data.length === 0) {
		  		const pesanan = {
				jumlah: data.jumlah,
				total_harga: data.total_harga,
				product: data.product
			}

			axios
			 .post(API_URL+"keranjangs", pesanan)
			  .then(res => {
			  	Swal.fire(
				  'Berhasil Di simpan',
				   pesanan.product.nama+'Berhasil Di pesan',
				  'success',
				  this.setState({
						jumlah: 1
					})
				)
			  })
			  .catch(error => {
			  	console.log(error);
			  })

		  	}else{
	  		const pesanan = {
				jumlah: res.data[0].jumlah+data.jumlah,
				total_harga: res.data[0].total_harga+data.product.harga,
				product: data.product
			};

			axios
			 .put(API_URL+"keranjangs/"+res.data[0].id, pesanan)
			  .then(res => {
			  	Swal.fire(
				  'Berhasil Disimpan',
				   pesanan.product.nama+ 'Berhasil Disimpan',
				  'success',
					this.setState({
						jumlah: 1
					})
				)
				console.log("Cek Jumlah : ", this.state.jumlah);
			  })
			  .catch(error => {
			  	console.log(error);
			})
		  	}
		  })
		  .catch(error => {
		  	console.log(error);
		  })
	}

	changeHendler = (event) => {
		this.setState({
			keterangan: event.target.value
		})
	}

	// Menu Default //

	// masukKeranjang = (value) => {
	// 	console.log("cek : ", value);
	// 	axios
	// 	 .get(API_URL+"keranjangs?product.id="+value.id)
	// 	  .then(res => {
	// 	  	if (res.data.length === 0) {
	// 	  		const keranjang = {
	// 			jumlah: 1,
	// 			total_harga: value.harga,
	// 			product: value
	// 		}

	// 		axios
	// 		 .post(API_URL+"keranjangs", keranjang)
	// 		  .then(res => {
	// 		  	Swal.fire(
	// 			  'Berhasil Di simpan',
	// 			   keranjang.product.nama+'Berhasil Di pesan',
	// 			  'success'
	// 			)
	// 		  })
	// 		  .catch(error => {
	// 		  	console.log(error);
	// 		  })
	// 	  	}else{

	// 	  		const keranjang = {
	// 				jumlah: res.data[0].jumlah+1,
	// 				total_harga: res.data[0].total_harga+value.harga,
	// 				product: value
	// 			};

	// 			axios
	// 			 .put(API_URL+"keranjangs/"+res.data[0].id, keranjang)
	// 			  .then(res => {
	// 			  	Swal.fire(
	// 				  'Berhasil Disimpan',
	// 				   keranjang.product.nama+ 'Berhasil Disimpan',
	// 				  'success'
	// 				)
	// 			  })
	// 			  .catch(error => {
	// 			  	console.log(error);
	// 			})
	// 	  	}
	// 	  })
	// 	  .catch(error => {
	// 	  	console.log(error);
	// 	  })

	// }

	// Menu Default //


	render() {
		const {totalHarga, menus, CategoryyangDipilih, keranjangs, showModal, keranjangDetail, jumlah } = this.state
		
		return (
			<div>
			   	 <div>
				     <Row className="mt-3">
				     	<Listcategoris 
				     		UbahCategory={this.UbahCategory} 
				     		CategoryyangDipilih={CategoryyangDipilih} 
				     	/>
				     	<Col>
				     		<h5><strong>Daftar Produk</strong></h5>
				     		<hr />
				     		<Row>
				     			{menus && menus.map((menu) => (
				     				<Menus 
			     					  key = {menu.id}
			     					  menu = {menu}
				     				  masukKeranjang={this.masukKeranjang}
				     				  handleShow = {this.handleShow}
				     				/>
				     			))}
				     		</Row>
				     	</Col>
				     	<Hasil keranjangs={keranjangs} {...this.props}/>
				     </Row>
			      </div>

			      <Modal show={showModal} onHide={this.handleClose}>
				    <Modal.Header closeButton>
				      <Modal.Title>
				      	{ keranjangDetail.nama } {" "}
				      	<strong>
				      		(IDR. {keranjangDetail.harga})
				      	</strong>
				      </Modal.Title>
				    </Modal.Header>
				    <Modal.Body>
				    	<Form onSubmit={this.handleSubmit}>
						  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						    <Form.Label>Total Harga :</Form.Label>
						    <p>
						    	<strong>
						    		IDR. {totalHarga}
						    	</strong>
						    </p>
						  </Form.Group>

						  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						 	<Form.Label>Jumlah :</Form.Label>
						 	<br />
						  	<Button variant="primary" size="sm" onClick={() => this.kurang()}>
						  		<FontAwesomeIcon icon={faMinus} />
						  	</Button>
						  	{" "}
						  	<strong> {jumlah} </strong>
						  	{" "}
						  	<Button variant="primary" size="sm" onClick={() => this.tambah()}>
						  		<FontAwesomeIcon icon={faPlus} />
						  	</Button>
						  </Form.Group>

						  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
						    <Form.Label>Keterangan</Form.Label>
						    <Form.Control as="textarea" rows={3}
						     name="keterangan" placeholder="Tulis Keterangan Contoh Pedas Sedang"
						     onChange={(event) => this.changeHendler(event)}
						      />
						  </Form.Group>
						  <Button variant="primary" type="submit">
					        Pesan
					      </Button>
						</Form>
				    </Modal.Body>
				    <Modal.Footer>
				      
				    </Modal.Footer>
				  </Modal>

			</div>
		)
	}
}