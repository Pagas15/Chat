import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login';
import { publicRoutes, privateRoutes } from './routes';
import {useAuthState} from 'react-firebase-hooks/auth'
import { Context } from '..';

const AppRouter = () => {
	const {auth} = useContext(Context)
	const [user] = useAuthState(auth);

	const routes = (listRoutesElement) => listRoutesElement.map(({path, Component}) => <Route key={path} path={path} element={<Component />} exact={true}/>)
	return user ? (
		<Routes>
			{routes(privateRoutes)}
		</Routes>
	) : (
		<Routes>
			{routes(publicRoutes)}
		</Routes>
	)
}

export default AppRouter