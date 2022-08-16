import { ActionTypes } from '../constants/action-types';

export const openAddMenuDrawer = (payload)=>{
    return {
        type: ActionTypes.OPEN_ADD_MENU_DRAWER,
        payload: payload,
    }
}

export const openCategoryModal = (payload)=>{
    return {
        type: ActionTypes.OPEN_CATEGORY_MODAL,
        payload: payload,
    }
}

export const openDeleteModal = (payload)=>{
    return {
        type: ActionTypes.OPEN_DELETE_MODAL,
        payload: payload,
    }
}

export const openSnackBar = (payload)=>{
    return {
        type: ActionTypes.OPEN_DELETE_MODAL,
        payload: payload,
    }
}

export const openInfoAlert = (payload)=>{
    return {
        type: ActionTypes.OPEN_INFO_ALERT,
        payload: payload,
    }
}