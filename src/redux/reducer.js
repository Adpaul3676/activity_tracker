let initialState = {
  activityPage: false,
  isLoggedIn: false,
  username: null,
  selectedActivity: null
}

const UPDATE_USER = "UPDATE_USER"
const UPDATE_PAGE = "UPDATE_PAGE"
const LOGOUT = "LOGOUT"

const UPDATE_ACTIVITY = "UPDATE_ACTIVITY"

export const updateUser = (userData) => {
  // console.log("made it here");
  return {
    type: UPDATE_USER,
    payload: userData
  }
}

export const updatePage = (bool) => {
  // console.log("made it here");
  return {
    type: UPDATE_PAGE,
    payload: bool
  }
}

export const logout = () => {
  return {type: LOGOUT}
}

// activity selection and updates

export const updateActivity = (id) => {
  return {
    type: UPDATE_ACTIVITY,
    payload: id
  }
}

export default function reducer (state=initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      // console.log(action.payload)
      const {username} = action.payload
      return {username, isLoggedIn: true, activityPage: true};
    case UPDATE_PAGE:
      return {activityPage: action.payload};
    case LOGOUT:
      return {activityPage: false, isLoggedIn: false, username: null};
    case UPDATE_ACTIVITY:
      return {...state, selectedActivity: action.payload}
    default:
      return state;
  }
}