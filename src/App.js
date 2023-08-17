import { useSelector } from 'react-redux';
import './App.css';
import { Container, Grid } from '@mui/material';
import MultiStepper from './Components/MultiStepper';

const App = () => {
	const { activeStep } = useSelector((store) => store.stepper);
	const renderForms = (activeStep) => {
		switch (activeStep) {
			// Task 6: Add employee info case here

			// Task 9: Add employee work case here

			// Task 11: Add employee education case here

			// Task 13: Add employee skills case here

			// Task 15: Add employee interests case here

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
				</Grid>
			) : (
				<Grid container></Grid>
			)}
		</Container>
	);
};

export default App;
