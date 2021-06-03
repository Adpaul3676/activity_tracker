let initialState = {
  activityPage: false,
  isLoggedIn: false,
  username: null
}

const UPDATE_USER = "UPDATE_USER"
const UPDATE_PAGE = "UPDATE_PAGE"
const LOGOUT = "LOGOUT"

export const updateUser = (userData) => {
  console.log("made it here");
  return {
    type: UPDATE_USER,
    payload: userData
  }
}

export const updatePage = (bool) => {
  console.log("made it here");
  return {
    type: UPDATE_PAGE,
    payload: bool
  }
}

export const logout = () => {
  return {type: LOGOUT}
}

export default function reducer (state=initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      console.log(action.payload)
      const {username} = action.payload
      return {username, isLoggedIn: true, activityPage: true};
    case UPDATE_PAGE:
      return {activityPage: action.payload};
    case LOGOUT + "_FULFILLED":
      return {activityPage: false, isLoggedIn: false, username: null};
    default:
      return state;
  }
}