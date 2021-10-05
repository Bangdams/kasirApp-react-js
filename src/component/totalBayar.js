import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { numberWithCommas } from '../untils/until'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {API_URL} from '../untils/constants'



export default class TotalBayar extends React.Component {
	submitTotalBayar = (totalBayar) => {
		const pesanan = {
			total_bayar: totalBayar,
			menus: this.props.keranjangs
		}

		axios.post(API_URL+"pesanans",pesanan).then((res) => {
			this.props.history.push('/sukses')
		})
	};
	render() {
		const totalBayar = this.props.keranjangs.reduce(function (result, item) {
			return result + item.total_harga;
		}, 0);
		return (
			<div className="fixed-bottom">
				<Row>
					<Col md={{ span: 3, offset: 9}} className="px-4">
						<h4>
							Total Harga : {" "}
							<strong className="float-right mr-2">
								IDR.{numberWithCommas(totalBayar)}
							</strong>
						</h4>
						<div className="d-grid gap-2">
						  <Button variant="primary" size="lg" onClick={() => this.submitTotalBayar(totalBayar) }>
						    <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
						  </Button>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}