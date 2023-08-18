import { Box, Container } from '@mui/material';
import React from 'react';

const Header = () => {
	return (
		<Box bgcolor='#4951F5' minHeight='2rem' display='flex' alignItems='center'>
			<Container>
				<Box color='#fff' fontSize='2rem' fontWeight='bold'>
					<p>QUICKRESUME.IO</p>
				</Box>
			</Container>
		</Box>
	);
};

export default Header;
