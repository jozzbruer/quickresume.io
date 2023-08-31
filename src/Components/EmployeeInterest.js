import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveInterest } from '../features/interest/interestsSlice';
import { nextStep, prevStep } from '../features/stepper/stepperSclice';
import * as Yup from 'yup';
import '../css/reset.css';
import '../css/style.css';
import { Box, Button, InputLabel } from '@mui/material';
import { TagsInput } from 'react-tag-input-component';

const EmployeeInterest = () => {
	const { interests } = useSelector((store) => store);
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			interests: interests.interests,
		},
		// formik validation here
		validationSchema: Yup.object({
			interests: Yup.array()
				.of(Yup.string())
				.min(3)
				.max(7)
				.required('Required!'),
		}),
		onSubmit: (values) => {
			// save skills code here
			if (formik.isValid) {
				dispatch(saveInterest(values));
				dispatch(nextStep());
			}
		},
	});
	return (
		<div className='skills'>
			<InputLabel className='text-input'>Interest</InputLabel>
			<TagsInput
				rows={3}
				placeHolder='e.g. Reading Books, Press Enter to add'
				onChange={(value) => {
					formik.setFieldValue('interests', value);
				}}
				formik={formik}
				onBlur={formik.handleBlur}
				value={formik.values.interests}
				name='Interest'
				id='Interest'
			/>
			{formik.touched.interests && formik.errors.interests && (
				<p className='error-text'>{formik.errors.interests}</p>
			)}
			<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
				<Button
					color='inherit'
					// previous step code
					onClick={() => dispatch(prevStep())}
					sx={{ mr: 1 }}
				>
					Back
				</Button>
				<Box sx={{ flex: '1 1 auto' }} />

				<Button
					onClick={() => formik.handleSubmit()}
					variant='contained'
					sx={{ background: '#4951F5' }}
				>
					Next
				</Button>
			</Box>
		</div>
	);
};

export default EmployeeInterest;
