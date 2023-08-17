import { Input, InputLabel } from '@mui/material';
import { getIn } from 'formik';
import React from 'react';

const InputField = ({ label, type, placeholder, name, id, formik, index }) => {
	const error = getIn(formik.errors, name);
	const touch = getIn(formik.touched, name);
	const values = getIn(formik.values, name);
	return (
		<>
			<InputLabel
				shrink
				htmlFor={name}
				className='text-input'
				sx={{ marginLeft: '1.5rem' }}
			>
				{label}
			</InputLabel>
			<Input
				placeholder={placeholder}
				name={name}
				type={type}
				id={id}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				fullWidth
				value={values}
			/>
			{error && touch && <p className='error-text'>{error}</p>}
		</>
	);
};

export default InputField;
