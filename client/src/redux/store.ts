import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { rootReducer } from "./root-reducer";

export const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));
