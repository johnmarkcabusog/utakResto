import {ActionTypes} from '../constants/action-types';

const initialState = {
    openAddMenuDrawer:{
        open:false, 
        action:"add",
        id:0,
    }
}

export const appReducer = (state = initialState, {type, payload})=>{
    switch(type){
        case ActionTypes.OPEN_ADD_MENU_DRAWER:
            return {...state, openAddMenuDrawer:payload};
        default: 
        return state;
    }
}