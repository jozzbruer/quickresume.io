import { Box, Button, Input, InputLabel } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { prevStep } from '../features/stepper/stepperSclice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormatColorFill } from '@mui/icons-material';
import { Email, Phone, LocationOn } from '@material-ui/icons';

const Resume = () => {
	const [sidebarBG, setSidebarBG] = useState('#3E4969');
	const [sidebarTxt, setSidebarTxt] = useState('#BD7A7A');
	const styles = {
		container: {
			color: '#30353D',
			fontFamily: "'Inter', sans-serif",
			fontSize: '1rem',
			lineHeight: '1.5',
			padding: '0',
			aspectRatio: '8.3 / 11.7',
			boxSizing: 'border-box',
			width: '796.8px',
			margin: 'auto',
			boxShadow: '0px 0px 10px 1px #959595',
		},
		resumeRow: {
			display: 'flex',
			width: '100%',
		},
		sidebar: {
			background: sidebarBG,
			width: '34%',
			minHeight: '1123px',
		},
		main: {
			width: '66%',
			padding: '3rem 1rem',
		},
		sidebarUl: {
			color: sidebarTxt,
			margin: '2rem 0',
		},
		headingDecorator: {
			position: 'relative',
		},
		profile: {
			marginTop: '3rem',
			padding: '0 15px',
		},
		sidebarProfilePuL: {
			wordBreak: 'break-word',
			fontSize: '1rem',
			fontWeight: '400',
		},
		profileContentColor: {
			color: sidebarTxt,
		},
		canidateName: {
			alignItems: 'center',
			justifyContent: 'center',
			display: 'flex',
		},
		contactSection: {
			margin: '2rem 0',
		},
		jobTitle: {
			fontSize: '1.5rem',
			color: '#204D8B',
			fontWeight: '600',
			lineHeight: '1rem',
		},
		dFlex: {
			display: 'flex',
			alignItems: 'center',
		},
		spaceBetween: {
			justifyContent: 'space-between',
		},
		headingDecoratorSmall: {
			position: 'relative',
		},
		icons: {
			width: '25px',
			marginTop: '20px',
		},
		margin0: { margin: '0px' },
		uniName: { marginBottom: '5px', fontWeight: 'bold' },
	};

	const { info, work, education, skills, interests } = useSelector(
		(store) => store
	);

	const dispatch = useDispatch();
	const cvTemplateRef = useRef(null);

	const handleGeneratePdf = () => {
		const doc = new jsPDF('p', 'px', [796.8, 1123.2]);

		doc.html(cvTemplateRef.current, {
			async callback(doc) {
				doc.save(`${info.firstName + ' ' + info.lastName} Resume`);
			},
		});
	};

	const handleGeneratePng = () => {
		const resume = cvTemplateRef.current;
		const a = document.createElement('a');

		html2canvas(resume)
			.then((canvas) => {
				a.href = canvas.toDataURL();
				a.download = `${info.firstName + ' ' + info.lastName} Resume.png`;
				document.body.appendChild(a);
				a.click();
			})
			.then(() => {
				a.remove();
			});
	};

	const formatDate = (dateNonFormated) => {
		const date = new Date(dateNonFormated);
		const month = date.getMonth() + 1;
		return `${month}/${date.getDate()}/${date.getFullYear()}`;
	};

	const populateExperience = (experience) => {
		if (experience.organization) {
			return (
				<>
					<span style={styles.jobTitle}>{experience.title}</span>
					<div style={{ ...styles.dFlex, ...styles.spaceBetween }}>
						<p>
							{experience.organization}, {experience.city}
						</p>
						<p>
							{formatDate(experience.startDate)} –{' '}
							{formatDate(experience.endDate)}
						</p>
					</div>
					<p>{experience.description}</p>
				</>
			);
		} else {
			return '';
		}
	};
	const populateEducation = (education) => {
		if (education.degree) {
			return (
				<li>
					<div style={{ ...styles.dFlex, ...styles.spaceBetween }}>
						<p style={styles.uniName}>{education.institute}</p>

						<p style={styles.uniName}>{formatDate(education.date)}</p>
					</div>
					<p style={styles.margin0}>
						{education.degree} in {education.study}
					</p>
				</li>
			);
		} else {
			return '';
		}
	};

	return (
		<>
			<div style={styles.container}>
				<div style={styles.resumeRow} ref={cvTemplateRef}>
					<div style={styles.sidebar}>
						<div style={styles.profile}>
							<div style={styles.canidateName}>
								<h2 style={{ ...styles.profileContentColor, ...styles.dFlex }}>
									{
										/* first name and last name here */ info.firstName +
											' ' +
											info.lastName
									}
								</h2>
							</div>
							<div style={styles.contactSection}>
								<Email style={styles.icons} />
								<p
									style={{
										...styles.profileContentColor,
										...styles.sidebarProfilePuL,
										...styles.margin0,
									}}
								>
									{/* populate email here */ info.email}
								</p>

								<Phone style={styles.icons} />
								<p
									style={{
										...styles.profileContentColor,
										...styles.sidebarProfilePuL,
										...styles.margin0,
									}}
								>
									{/* populate phone here */ info.phone}
								</p>

								<LocationOn style={styles.icons} />
								<p
									style={{
										...styles.profileContentColor,
										...styles.sidebarProfilePuL,
										...styles.margin0,
									}}
								>
									{
										/* populate city and country here */ info.country
											? info.city + ', ' + info.country.label
											: ''
									}
								</p>
							</div>
							<div className='skill-section'>
								<h3
									style={{
										...styles.profileContentColor,
										...styles.headingDecoratorSmall,
									}}
								>
									SKILLS
								</h3>
								<ul
									style={{ ...styles.profileContentColor, ...styles.sidebarUl }}
								>
									{
										/* populate skills here */ skills.skills &&
											skills.skills.map((skill) => <li>{skill}</li>)
									}
								</ul>
							</div>
							<div className='interest-section'>
								<h3
									style={{
										...styles.profileContentColor,
										...styles.headingDecoratorSmall,
									}}
								>
									INTERESTS
								</h3>
								<ul
									style={{ ...styles.profileContentColor, ...styles.sidebarUl }}
								>
									{
										/* populate interests here */ interests.interests &&
											interests.interests.map((interest) => <li>{interest}</li>)
									}
								</ul>
							</div>
						</div>
					</div>
					<div style={styles.main}>
						<h3>SUMMARY</h3>
						<p>{/* summary here */ info.summary}</p>

						<h3 className='heading-decorator'>EXPERIENCE</h3>
						{
							/* map experience here */ work.experience &&
								work.experience.map((exp) => populateExperience(exp))
						}

						<h3 className='heading-decorator'>EDUCATION</h3>
						<ul>
							{
								/* map education here */ education.education &&
									education.education.map((edu) => populateEducation(edu))
							}
						</ul>
					</div>
				</div>
			</div>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					width: '-webkit-fill-available',
					justifyContent: 'space-evenly',
					pt: 5,
				}}
			>
				<Button
					color='inherit'
					onClick={() => dispatch(prevStep())}
					sx={{ mr: 1 }}
				>
					Back
				</Button>

				<div style={{ display: 'flex', gap: 10 }}>
					<div
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Button
							sx={{
								background: '#4951F5',
								borderRadius: '25px',
							}}
						>
							<InputLabel
								htmlFor='bg-color'
								className='color-lable'
								sx={{
									display: 'flex',
									alignItems: 'center',
									color: 'white',
								}}
							>
								<FormatColorFill sx={{ color: 'white' }} />
								&nbsp; Sidebar BG Color &nbsp;
							</InputLabel>
							<Input
								type='color'
								id='bg-color'
								value={sidebarBG}
								sx={{
									width: '0px',
									height: '0px',
									border: '0',
								}}
								onChange={(e) => setSidebarBG(e.target.value)}
							/>
						</Button>
					</div>
					<div
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Button
							sx={{
								background: '#4951F5',
								borderRadius: '25px',
							}}
						>
							<InputLabel
								htmlFor='text-color'
								className='color-lable'
								sx={{
									display: 'flex',
									alignItems: 'center',
									color: 'white',
								}}
							>
								<FormatColorFill sx={{ color: 'white' }} />
								&nbsp; Sidebar Text Color &nbsp;
							</InputLabel>
							<Input
								type='color'
								id='text-color'
								value={sidebarTxt}
								sx={{
									width: '0px',
									height: '0px',
									border: '0',
								}}
								onChange={(e) => setSidebarTxt(e.target.value)}
							/>
						</Button>
					</div>
				</div>
				<div className='dropdown'>
					<Button variant='contained' sx={{ background: '#F26D85', mx: 0.5 }}>
						Download
					</Button>
					<div className='dropdown-content'>
						<a
							href='#'
							rel='noreferrer'
							// call handleGeneratePdf function here
							onClick={handleGeneratePdf}
						>
							PDF
						</a>
						<a
							href='#'
							rel='noreferrer'
							// call handleGeneratePng function here
							onClick={handleGeneratePng}
						>
							PNG
						</a>
					</div>
				</div>
			</Box>
		</>
	);
};

export default Resume;
