import React from 'react';
import { nextStep, prevStep } from '../features/stepper/stepperSclice';
import { saveEducation } from '../features/education/educationSlice';
import * as msg from '../utils/validationMessages';
import * as Yup from 'yup';
import '../css/reset.css';
import '../css/style.css';
import { FieldArray, FormikProvider, getIn, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Grid, InputLabel, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputField from './InputField';

const EmployeeEducation = () => {
	const { education } = useSelector((store) => store);
	const dispatch = useDispatch();
	// local state for education here
	const employeeEducationForm = {
		institute: '',
		degree: '',
		study: '',
		date: '',
	};

	const formik = useFormik({
		initialValues: {
			education: education.education,
		},
		// formik validation here
		validationSchema: Yup.object().shape({
			education: Yup.array().of(
				Yup.object().shape({
					institute: Yup.string()
						.min(3, msg.minSchool)
						.max(50, msg.maxSchool)
						.required('Required!'),
					degree: Yup.string()
						.min(3, msg.minDegree)
						.max(50, msg.maxDegree)
						.required('Required!'),
					study: Yup.string()
						.min(3, msg.minStudy)
						.max(50, msg.maxStudy)
						.required('Required!'),
					date: Yup.date()
						.nullable()
						.test('date', 'Future Dates are not allowed', (value) => {
							const today = new Date();
							return value?.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0);
						})
						.transform((v) => (v instanceof Date && !isNaN(v) ? v : null))

						.required('Required!'),
				})
			),
		}),
		onSubmit: (values) => {
			// save education code here
			if (formik.isValid) {
				dispatch(saveEducation(values));
				dispatch(nextStep());
			}
			// next step code here
		},
	});
	return (
		<>
			<>
				<FormikProvider value={formik}>
					<FieldArray
						name='education'
						render={(arrayHelpers) => (
							<AddCircleIcon
								sx={{
									float: 'right',
									marginTop: '10px',
									fontSize: '30px',
									cursor: 'pointer',
								}}
								onClick={() => {
									arrayHelpers.insert(
										formik.values.education.length,
										employeeEducationForm
									);
								}}
							/>
						)}
					></FieldArray>
					<FieldArray
						name='education'
						render={(arrayHelpers) => (
							<div>
								{formik.values.education.map((education, index) => {
									const error = getIn(
										formik.errors,
										`education[${index}].date`
									);
									const touch = getIn(
										formik.touched,
										`education[${index}].date`
									);
									const value = getIn(
										formik.values,
										`education[${index}].date`
									);

									return (
										<React.Fragment key={index}>
											{index > 0 && (
												<CloseIcon
													sx={{
														float: 'right',
														fontSize: '30px',
														marginTop: '10px',
														cursor: 'pointer',
													}}
													onClick={() => {
														arrayHelpers.remove(index);
													}}
												/>
											)}
											<form className='form-group'>
												<Grid container spacing={4}>
													<Grid item xs={6} className='item'>
														<InputField
															label='Academic Institute'
															type='text'
															placeholder=' e.g. MIT'
															name={`education[${index}].institute`}
															id='institute'
															index={index}
															formik={formik}
														></InputField>
													</Grid>
													<Grid item xs={6} className='item'>
														<InputField
															label='Degree'
															type='text'
															placeholder='e.g. BS'
															name={`education[${index}].degree`}
															id='degree'
															index={index}
															formik={formik}
														></InputField>
													</Grid>
													<Grid item xs={6} className='item'>
														<InputField
															label='Field of Study'
															type='text'
															placeholder='e.g. Computer Science'
															name={`education[${index}].study`}
															id='study'
															index={index}
															formik={formik}
														></InputField>
													</Grid>
													<Grid item xs={6} className='item'>
														<InputLabel
															shrink
															htmlFor='input'
															className='text-input label-margin'
														>
															Graduation Date
														</InputLabel>

														<div className='date-picker'>
															<LocalizationProvider dateAdapter={AdapterDayjs}>
																<DesktopDatePicker
																	className='desktopPicker'
																	inputFormat='MM/DD/YYYY'
																	value={value}
																	name={`education[${index}].date`}
																	id='date'
																	onChange={(value) => {
																		formik.setFieldValue(
																			`${`education[${index}].date`}`,
																			value
																		);
																	}}
																	onBlur={formik.handleBlur}
																	renderInput={(params) => (
																		<TextField
																			{...params}
																			formik={formik}
																			onBlur={formik.handleBlur}
																			name={`education[${index}].date`}
																		/>
																	)}
																/>
															</LocalizationProvider>
														</div>

														{error && touch && (
															<p className='error-text'>{error}</p>
														)}
													</Grid>
												</Grid>{' '}
											</form>
										</React.Fragment>
									);
								})}
							</div>
						)}
					></FieldArray>
				</FormikProvider>
			</>
			{/* buttons to move to next and previous section */}
			<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
				<Button
					color='inherit'
					// previous step here
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
		</>
	);
};

export default EmployeeEducation;
