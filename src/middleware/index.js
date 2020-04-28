import thunk from 'redux-thunk';
import logger from './logger';
import {applyMiddleware} from 'redux';

/**
 * Middleware
 */
export default applyMiddleware(
    thunk,
    logger
)



