import { configureStore } from '@reduxjs/toolkit';
// import infoReducer from "./features/info/infoSlice";
// import workReducer from "./features/work/workSlice";
// import educationReducer from "./features/education/educationSlice";
// import skillsReducer from "./features/skills/skillsSlice";
// import interestsReducer from "./features/interests/interestsSlice";

import stepperSclice from './features/stepper/stepperSclice';
import infoSlice from './features/info/infoSlice';

export const store = configureStore({
	reducer: {
		info: infoSlice,
		// work: workReducer,
		// education: educationReducer,
		// skills: skillsReducer,
		// interests: interestsReducer,
		stepper: stepperSclice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
