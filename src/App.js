import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {Home, Sukses, NavbarComponent} from './pages/index'
import Login from './pages/Login'
export default class App extends React.Component {
constructor(props) {
	super(props)

	this.state = {
		 halaman: ''
	}
}

home = () => {
	this.setState({
		halaman: 'home'
	})
}

success = () => {
	this.setState({
		halaman: 'success'
	})
}

	render() {
		console.log("Cek Menu : ", this.state.halaman);
		return (
			<Router>
			<NavbarComponent />
				<main>
					<Switch>
						<Route path="/" component={Home} exact/>
						<Route path="/sukses" component={Sukses} exact/>
						<Route path="/login" component={Login} exact/>
					</Switch>
				</main>
			</Router>
		)
	}
}