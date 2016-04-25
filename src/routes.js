import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Error404 from './components/Error404';
import Root from './components/Root';
import Home from './components/Home';

export default function(history) {
	return (
		<Router history={history}>
			<Route path='/' component={Root}>
				<IndexRoute component={Home}/>
				<Route path='*' component={Error404}/>
			</Route>
		</Router>
	);
}