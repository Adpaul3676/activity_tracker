let initialState = {
  activityPage: false,
  isLoggedIn: false,
  username: null,
  selectedActivity: {
    title: ''
  },
  indView: false
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
  return { type: LOGOUT }
}

// activity selection and updates

export const updateActivity = (e) => {
  return {
    type: UPDATE_ACTIVITY,
    payload: e
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      // console.log(action.payload)
      const { username } = action.payload
      return { ...state, username, isLoggedIn: true };
    case UPDATE_PAGE:
      return { ...state, activityPage: action.payload.activityPage, indView: action.payload.indView };
    case LOGOUT:
      return { activityPage: false, isLoggedIn: false, username: null, indView: false };
    case UPDATE_ACTIVITY:
      // console.log(action.payload)
      // console.log()
      return { ...state, selectedActivity: action.payload, indView: true }
    default:
      return state;
  }
}