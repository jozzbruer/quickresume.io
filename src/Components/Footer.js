import { Box, Container } from '@mui/material';
import React from 'react';

const Footer = () => {
	return (
		<Box bgcolor='#4951F5' height='14rem' display='flex' alignItems='center'>
			<Container>
				<Box
					textAlign='center'
					color='#fff'
					fontSize='1.1rem'
					fontWeight='bold'
				>
					Build with <span style={{ color: 'red' }}>&hearts;</span> by{' '}
					<a
						style={{ textDecoration: 'none', color: '#fff' }}
						href='https://github.com/jozzbruer'
						target='_blank'
					>
						Joz-Bruer Quince
					</a>
				</Box>
			</Container>
			;
		</Box>
	);
};

export default Footer;
