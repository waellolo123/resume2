import { createSlice } from "@reduxjs/toolkit";


// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         token: null,
//         user: null,
//         loading: true
//     },
//     reducers: {
//         login: (state, action) => {
//           state.token = action.payload.token,
//           state.user = action.payload.user
//         },
//         logout: (state) => {
//           state.token = "",
//           state.user = null,
//           localStorage.removeItem("token")  
//         },
//         setLoading: (state, action) => {
//           state.loading = action.payload  
//         }
//     }
// })




const authSlice = createSlice({
  name: "auth",
  initialState: {
    // Look for the token immediately on load
    token: localStorage.getItem("token") || null, 
    user: null, // Usually, you'll need a "profile" API call to get this back
    loading: true
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
          // You MUST save it here so it's there for the next refresh
          localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
          state.token = null; // Use null to match your initialState type
          state.user = null;
          localStorage.removeItem("token");
        },
        // ... rest of your reducers
         setLoading: (state, action) => {
          state.loading = action.payload  
        }
      }
    })

    export const {login, logout, setLoading} = authSlice.actions;
    export default authSlice.reducer;
    