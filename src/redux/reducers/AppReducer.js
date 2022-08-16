import { ActionTypes } from "../constants/action-types";

const initialState = {
  openAddMenuDrawer: {
    open: false,
    action: "add",
    id: 0,
    data: {},
  },
  openCategoryModal: {
    open: false,
  },
  openDeleteModal: {
    open: false,
    id: 0,
    toDelete: "menu",
  },
  openInfoAlert: {
    open: false,
    state: "success",
    message: "",
  },
};

export const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.OPEN_ADD_MENU_DRAWER:
      return { ...state, openAddMenuDrawer: payload };
    case ActionTypes.OPEN_CATEGORY_MODAL:
      return { ...state, openCategoryModal: payload };
    case ActionTypes.OPEN_DELETE_MODAL:
      return { ...state, openDeleteModal: payload };
    case ActionTypes.OPEN_INFO_ALERT:
      return { ...state, openInfoAlert: payload };
    default:
      return state;
  }
};
