import { configureStore } from '@reduxjs/toolkit';
import stepperSclice from './features/stepper/stepperSclice';
import infoSlice from './features/info/infoSlice';
import workSlice from './features/work/workSlice';
import educationSlice from './features/education/educationSlice';

export const store = configureStore({
	reducer: {
		info: infoSlice,
		work: workSlice,
		education: educationSlice,
		// skills: skillsReducer,
		// interests: interestsReducer,
		stepper: stepperSclice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
