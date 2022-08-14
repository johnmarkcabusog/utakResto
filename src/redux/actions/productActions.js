import { ActionTypes } from '../constants/action-types';

export const openAddMenuDrawer = (payload)=>{
    return {
        type: ActionTypes.OPEN_ADD_MENU_DRAWER,
        payload: payload,
    }
}
