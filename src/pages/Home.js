import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Listcategoris from '../component/listCategoris';
import Hasil from '../component/hasil';
import Menus from '../component/menus';
import {API_URL} from '../untils/constants';
import axios from 'axios';
import Swal from 'sweetalert2'

export default class Home extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 menus: [],
			 CategoryyangDipilih: 'Makanan',
			 keranjangs: []
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

	masukKeranjang = (value) => {
		console.log("cek : ", value);
		axios
		 .get(API_URL+"keranjangs?product.id="+value.id)
		  .then(res => {
		  	if (res.data.length === 0) {
		  		const keranjang = {
				jumlah: 1,
				total_harga: value.harga,
				product: value
			}

			axios
			 .post(API_URL+"keranjangs", keranjang)
			  .then(res => {
			  	Swal.fire(
				  'Berhasil Di simpan',
				   keranjang.product.nama+'Berhasil Di pesan',
				  'success'
				)
			  })
			  .catch(error => {
			  	console.log(error);
			  })
		  	}else{

		  		const keranjang = {
					jumlah: res.data[0].jumlah+1,
					total_harga: res.data[0].total_harga+value.harga,
					product: value
				};

				axios
				 .put(API_URL+"keranjangs/"+res.data[0].id, keranjang)
				  .then(res => {
				  	Swal.fire(
					  'Berhasil Disimpan',
					   keranjang.product.nama+ 'Berhasil Disimpan',
					  'success'
					)
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


	render() {
		const { menus, CategoryyangDipilih, keranjangs } = this.state
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
				     				/>
				     			))}
				     		</Row>
				     	</Col>
				     	<Hasil keranjangs={keranjangs} {...this.props}/>
				     </Row>
			      </div>
			</div>
		)
	}
}