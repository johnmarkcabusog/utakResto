import {ActionTypes} from '../constants/action-types';

const initialState = {
    openAddMenuDrawer:{
        open:false, 
        action:"add",
        id:0,
        data:{},
    },
    openCategoryModal:{
        open:false
    }
}

export const appReducer = (state = initialState, {type, payload})=>{
    switch(type){
        case ActionTypes.OPEN_ADD_MENU_DRAWER:
            return {...state, openAddMenuDrawer:payload};
        case ActionTypes.OPEN_CATEGORY_MODAL:
            return {...state, openCategoryModal:payload};
        default: 
        return state;
    }
}