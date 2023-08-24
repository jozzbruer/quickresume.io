import { Box, Container } from '@mui/material';
import React from 'react';

const Header = () => {
	return (
		<Box bgcolor='#4951F5' height='3.2rem' display='flex' alignItems='center'>
			<Container>
				<Box color='#fff' fontSize='1.7rem' fontWeight='bold'>
					<p>QUICKRESUME.IO</p>
				</Box>
			</Container>
		</Box>
	);
};

export default Header;
