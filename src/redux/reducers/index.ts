import currentData from './currentData'
import counter from './counter'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    currentData,
    counter
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer