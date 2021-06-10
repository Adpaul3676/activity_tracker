// let initialState = {
//   activityPage: false,
//   indView: false
// }

// const UPDATE_PAGE = "UPDATE_PAGE"

// export const updatePage = (bool) => {
//   // console.log("made it here");
//   return {
//     type: UPDATE_PAGE,
//     payload: bool
//   }
// }

// export default function pageReducer(state = initialState, action) {
//   switch (action.type) {
//     case UPDATE_PAGE:
//       return { ...state, activityPage: action.payload.activityPage, indView: action.payload.indView };
//     default:
//       return state;
//   }
// }