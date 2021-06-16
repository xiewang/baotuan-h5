import types from '../constants/actions';

const initialState = {
    userInfo: {}
};

const session = function(state = initialState, action = {}) {
    switch (action.type) {
        case types.UPDATEUSERINFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo
            });
        default:
            return state;
    }
};

export default session;
