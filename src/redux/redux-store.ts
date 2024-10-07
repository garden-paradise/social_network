import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import profiles from './profiles-reducer';
import messages from './messages-reducer';
import users from './users-reducer';
import auth from './auth-reducer';
import { reducer as form } from 'redux-form';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import app from './app-reducer';

const rootReducer = combineReducers({
  profiles,
  messages,
  users,
  auth,
  form,
  app,
});

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsTypes<T> = T extends {
  [key: string]: (...arg: any[]) => infer U;
}
  ? U
  : never;

export type BaseThunkType<
  A extends Action,
  R = Promise<void> | void
> = ThunkAction<R, AppStateType, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
