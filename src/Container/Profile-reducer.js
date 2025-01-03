import { GITHUB_PROFILE_REQUEST, GITHUB_PROFILE_SUCCESS, GITHUB_PROFILE_FAILURE } from "./actionType";


const initialState = {
    loading:false,
    profile:[],
    error:null,
}


export const profile = (state = initialState, action) =>{
    switch (action.type) {
        case GITHUB_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case GITHUB_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: action.payload,
                error: null
            }
        case GITHUB_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}