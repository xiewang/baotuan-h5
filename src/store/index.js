import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import { createLogger } from 'redux-logger';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewares.push(logger);
}

const finalCreateStore = compose(
    applyMiddleware(...middlewares)
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(reducers, initialState);
    return store;
}
