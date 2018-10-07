import * as redux from 'redux';

import { Vector } from './vector';
import { Snake } from './snake';

enum ActionTypes {
    SET_DIR = 'snake/set-direction',
    STEP = 'game/step',
}

export const step = () => ({ type: ActionTypes.STEP, payload: null });

export const setDir = (dir: Vector) => ({ type: ActionTypes.SET_DIR, payload: dir });

type ReducerMap = {
    [key in ActionTypes]: redux.Reducer<Snake.IGameState>;
};

const reducers: ReducerMap = {
    [ActionTypes.SET_DIR]: ({ dir, ...rest }, { payload }) => ({
        ...rest,
        dir: payload,
    }),
    [ActionTypes.STEP]: Snake.step
};

type MapReducer = (rm: ReducerMap) => redux.Reducer<Snake.IGameState>

const matchReducer: MapReducer
    = (rm) =>
        (state = Snake.randomState(), { type, payload }) =>
            !!rm[type]
                ? rm[type](state, { type, payload })
                : state;

const reducer = matchReducer(reducers);

export const store = redux.createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);