import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavbarComponent from './component/Navbar'
import {Home, Sukses} from './pages/index'

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<NavbarComponent />
				<main>
					<Switch>
						<Route path="/" component={Home} exact/>
						<Route path="/sukses" component={Sukses} exact/>
					</Switch>
				</main>
			</Router>
		)
	}
}