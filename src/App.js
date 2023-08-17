import { useSelector } from 'react-redux';
import './App.css';
import { Container, Grid } from '@mui/material';
import MultiStepper from './Components/MultiStepper';
import ShowTemplate from './Components/ShowTemplate';
import EmployeeInfo from './Components/EmployeeInfo';
import EmployeeExperience from './Components/EmployeeExperience';
import EmployeeEducation from './Components/EmployeeEducation';
import EmployeeSkills from './Components/EmployeeSkills';

const App = () => {
	const { activeStep } = useSelector((store) => store.stepper);
	const renderForms = (activeStep) => {
		switch (activeStep) {
			case 0:
				return <EmployeeInfo />;
			case 1:
				return <EmployeeExperience />;
			case 2:
				return <EmployeeEducation />;
			case 3:
				return <EmployeeSkills />;
			default:
				break;
		}
	};

	return (
		<Container label={'margin:"none"'} sx={{ mt: 10, mb: 10 }}>
			<MultiStepper sx={{ mt: 6 }} />
			{activeStep < 5 ? (
				<Grid>
					{' '}
					<Grid item md={8} lg={8} sm={12}>
						{renderForms(activeStep)}
					</Grid>
					<Grid item md={4} lg={4} sm={12} xs={12}>
						<ShowTemplate />
					</Grid>
				</Grid>
			) : (
				<Grid container></Grid>
			)}
		</Container>
	);
};

export default App;
