import { RemoveRedEye, VisibilityOffOutlined } from '@material-ui/icons';
import { Button, Typography } from '@mui/material';
import CvTemplate from '../images/cv-template.svg';
import React, { useState } from 'react';

const ShowTemplate = () => {
	const [showTemplate, setShowTemplate] = useState(false);
	const handleTemplate = () => {
		setShowTemplate(!showTemplate);
	};
	return (
		<div className='template-container'>
			<Button onClick={handleTemplate}>
				{showTemplate ? (
					<VisibilityOffOutlined sx={{ color: '#4951F5' }} />
				) : (
					<RemoveRedEye sx={{ color: '#4951F5' }} />
				)}
				<Typography sx={{ textTransform: 'capitalize', color: '#212121' }}>
					&nbsp; {showTemplate ? 'Hide Template' : 'Show Template'}
				</Typography>
			</Button>
			{showTemplate && (
				<img src={CvTemplate} className='template-img' alt='template' />
			)}
		</div>
	);
};

export default ShowTemplate;
