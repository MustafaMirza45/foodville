
import * as ActionTypes from './ActionTypes';

export const Managers =(state = {
    isLoading: true,
    errMess:null,
    insert: true,
    managers:[]
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_MANAGER:
            
            return {...state,isLoading: false, errMess: null, managers: action.payload};

        case ActionTypes.MANAGER_LOADING:

            return {...state, isLoading: true, errMess: null, managers: []}
        case ActionTypes.MANAGER_FAILED:

            return {...state, isLoading: true, errMess: action.payload, managers: []}

        default:
            return state;
    }
}