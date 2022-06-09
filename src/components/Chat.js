import { Avatar, Button, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '..';
import Loader from './Louder';
import firebase from 'firebase/compat/app';



const Chat = () => {
	const {auth, firestore} = useContext(Context)
	const [user] = useAuthState(auth);
	const [value, setValue] = useState('');
	const [messages, loading] = useCollectionData(
		firestore.collection('messages').orderBy('createdAt')
	)

	const sendMessage = async () => {
		firestore.collection('messages').add({
			uid: user.uid,
			displayName: user.displayName,
			photoURL: user.photoURL,
			text: value,
			createdAt: firebase.firestore.FieldValue.serverTimestamp()
		})
		setValue('')
	}

	const inputChange = e => {
		setValue(e.target.value)
	}	

	if(loading){
		<Loader/>
	}

	return (
		<Container >
			<Grid 
				container 
				style={{height: window.innerHeight - 50, marginTop: 20}}
				justifyContent={"center"}
			>
				<div style={{width: '80%', height: '70vh', border: '1px solid gray', ovetflowY: 'auto'}}>
					{messages && messages.map(message => 
						<div style={{
							margin: 10,
							border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
							marginLeft: user.uid === message.uid ? 'auto' : '10px',
							width: 'fit-content',
							minWidth: '30%',
							padding: 5
						}}>
							<Grid 
								container 
								flexDirection={user.uid === message.uid ? 'row-reverse' : 'row'} 
								alignItems={"center"}
							>
								<Avatar src={message.photoURL} />
								<div 
									style={{
										marginLeft: user.uid === message.uid ? 0 : 10,
										marginRight: user.uid === message.uid ? 10 : 0
									}}
								>{message.displayName}</div>
							</Grid>
							<p>{message.text}</p>
						</div>	
					)}
				</div>
				<Grid
					container
					direction={"column"}
					alignItems={"flex-end"}
					style={{width: '80%'}}
				>
					<TextField 
						variant={"outlined"}
						fullWidth
						maxRows={2}
						value={value}
						onChange={inputChange}
					/>
					<Button vatiant={"outlined"} style={{color: "dark"}} onClick={sendMessage}>Send</Button>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Chat