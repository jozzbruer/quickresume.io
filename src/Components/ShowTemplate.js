import { RemoveRedEye } from '@material-ui/icons';
import { Button, Typography } from '@mui/material';
import CvTemplate from '../images/cv-template.svg';
import React from 'react';

const ShowTemplate = () => {
	return (
		<div className='template-container'>
			<Button disabled>
				<RemoveRedEye sx={{ color: '#4951F5' }} />
				<Typography sx={{ textTransform: 'capitalize', color: '#212121' }}>
					&nbsp; Template
				</Typography>
			</Button>
			<img src={CvTemplate} className='template-img' alt='template' />
		</div>
	);
};

export default ShowTemplate;
