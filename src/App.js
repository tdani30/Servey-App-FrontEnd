import React from 'react';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import NavBar from './NavBar';
import AdminPage from './Pages/AdminPage';
import QuestionsPage from './Pages/QuestionsPage';
export default function App() {
	
	return (
		<Router>
			<div className="App">
		<NavBar></NavBar>
		<br/><br/><br/><br/><br/>
		<div className="page-body">
			<Switch>
				<Route path="/QuestionsPage/:ID" component={QuestionsPage} exact></Route>
				<Route path="/" component={AdminPage}></Route>
			</Switch>
			</div>
			</div>
		</Router>
);
}
