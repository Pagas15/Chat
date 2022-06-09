import React, {useContext} from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { NavLink } from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth'
import { Context } from '..';

const Navbar = () => {
	const {auth} = useContext(Context)
	const [user] = useAuthState(auth);

	const logoutBtn = () => {auth.signOut()};
	return (
		<AppBar color={"secondary"} position="static">
			<Toolbar variant='dance'>
				<Grid container justifyContent={"flex-end"}>
					{
						user 
							? <>
								<NavLink to={CHAT_ROUTE} style={{marginRight: 'auto', color: 'white', textDecoration: 'none'}}><Button variant="outlined" color="inherit">Chat</Button></NavLink>
								<Button variant="outlined" color="inherit" onClick={logoutBtn}>Logout</Button>
							</>
							: 
							<NavLink to={LOGIN_ROUTE} style={{color: 'white', textDecoration: 'none'}}>
								<Button variant="outlined" color="inherit">Login</Button>
							</NavLink>
					}
				</Grid>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar