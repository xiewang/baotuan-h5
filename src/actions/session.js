import types from '../constants/actions';

export function update() {
    return dispatch => {
        const userInfo = {
            userId: 'test'
        };

        dispatch({
            type: types.UPDATEUSERINFO,
            userInfo
        });
    };
}
