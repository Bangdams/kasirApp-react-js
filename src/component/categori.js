import React from 'react'
import { Nav } from 'react-bootstrap'

const Categori = () => {
	return (
		<div>
			<Nav defaultActiveKey="/home" className="flex-column">
			  <Nav.Link href="/home">Makanan</Nav.Link>
			  <Nav.Link eventKey="link-1">Minuman</Nav.Link>
			  <Nav.Link eventKey="link-2">Cemilan</Nav.Link>
			</Nav>
		</div>
	)
}

export default Categori