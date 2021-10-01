import React, {Component} from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../untils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

 
const Icon = ({nama}) => {
	if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
	if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />
	if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />
}

export default class Listcategoris extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 categories : [],
			 cek: [],
		}
	}

	componentDidMount() {
		axios
		 .get(API_URL+"categories")
		  .then(res => {
		  	const categories = res.data;
		  	this.setState({ categories });
		  })
		  .catch(error => {
		  	console.log(error);
		  })
	}

	render() {
		const { categories } = this.state
		const { UbahCategory, CategoryyangDipilih } = this.props
		return(
		<Col md={2} mt="3">
			<h5><strong>Daftar Kategori</strong></h5>
			<hr />
			<ListGroup className="mb-3">
			  {categories && categories.map((category) => (
				  <ListGroup.Item action variant="light" key={category.id} onClick={() => UbahCategory(category.nama)}>
				    <h5><Icon nama={category.nama} /> { category.nama }</h5>
				  </ListGroup.Item>
			  ))}
			</ListGroup>
		</Col>
		)
	}
}