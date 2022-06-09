import React, { useContext } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Context } from '..'
import firebase from 'firebase/compat/app';

const Login =  () => {
	const {auth} = useContext(Context)

	const loginBtn = async () => {
		const provider = new firebase.auth.GoogleAuthProvider()
		const {user} = await auth.signInWithPopup(provider)
		console.log(user);
	}

	return (
		<Container maxWidth="xs">
			<Grid 
				container 
				style={{height: window.innerHeight - 50}}
				alignItems="center"
				justifyContent={"center"}
			>
				<Grid 
					style={{width: 400, background: 'lightgray'}}
					container
					alignItems={"center"}
					direction={"column"}
				>
					<Box p={5}>
						<Button variant="outlined" color="inherit" onClick={loginBtn}>Sign in with Google</Button>
					</Box>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Login