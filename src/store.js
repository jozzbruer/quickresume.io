import { configureStore } from '@reduxjs/toolkit';
import stepperSclice from './features/stepper/stepperSclice';
import infoSlice from './features/info/infoSlice';
import workSlice from './features/work/workSlice';
import educationSlice from './features/education/educationSlice';
import skillsSlice from './features/skills/skillsSlice';
import interestsSlice from './features/interest/interestsSlice';

export const store = configureStore({
	reducer: {
		info: infoSlice,
		work: workSlice,
		education: educationSlice,
		skills: skillsSlice,
		interests: interestsSlice,
		stepper: stepperSclice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
