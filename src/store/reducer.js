const initialState = {
    isLoggedIn: false
}

const reducer = (state=initialState, action) => {
    if(action.type === 'ON_LOGGED_IN') {
        return {
            ...state,
            isLoggedIn: true,
        }
    } else if(action.type === 'ON_LOGGED_OUT') {
        return {
            ...state,
            isLoggedIn: false,
        }
    }
    return state;
}

export default reducer;
