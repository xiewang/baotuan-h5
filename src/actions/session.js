import types from '../constants/actions';

export function update(userInfo) {
    return dispatch => {
        dispatch({
            type: types.UPDATEUSERINFO,
            userInfo
        });
    };
}
