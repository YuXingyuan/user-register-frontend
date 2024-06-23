import type { Dispatch } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import type { User, UserError } from "./user.models";
import { axiosInstance } from "../../utils/network/axios.util";
import {
  requestStart,
  requestSuccess,
  requestError,
  getUserListSuccess,
  toggleSelected,
} from "./user.slice";

export { toggleSelected };

export const addUser =
  (user: User, cb: Function) => async (dispatch: Dispatch) => {
    dispatch(requestStart());
    try {
      const { data } = await axiosInstance.post("/add", {
        name: user.name,
        email: user.email,
        age: user.age,
      });
      dispatch(requestSuccess(data));
      cb();
      getAllUsers()(dispatch);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response) {
        const { data } = error.response;
        dispatch(requestError((data as UserError).message));
      } else {
        dispatch(requestError(error.message));
      }
    }
  };

export const editUser = (user: User) => async (dispatch: Dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axiosInstance.post("/edit/" + user.id, {
      name: user.name,
      email: "dummy@abc.com", //email cannot be edited
      age: user.age,
      active: user.active,
    });
    dispatch(requestSuccess(data));
    getAllUsers()(dispatch);
  } catch (e) {
    const error = e as AxiosError;
    if (error.response) {
      const { data } = error.response;
      dispatch(requestError((data as UserError).message));
    } else {
      dispatch(requestError(error.message));
    }
  }
};

export const deleteUser = (id: string) => async (dispatch: Dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axiosInstance.delete("/delete/" + id);
    dispatch(requestSuccess(data));
    getAllUsers()(dispatch);
  } catch (e) {
    const error = e as AxiosError;
    if (error.response) {
      const { data } = error.response;
      dispatch(requestError((data as UserError).message));
    } else {
      dispatch(requestError(error.message));
    }
  }
};

export const deleteSelectedUsers =
  (ids: string[]) => async (dispatch: Dispatch) => {
    dispatch(requestStart());
    try {
      const { data } = await axiosInstance.delete("/delete/selected", {
        params: {
          ids: ids,
        },
        paramsSerializer: {
          indexes: null, // by default: false
        },
      });
      dispatch(requestSuccess(data));
      getAllUsers()(dispatch);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response) {
        const { data } = error.response;
        dispatch(requestError((data as UserError).message));
      } else {
        dispatch(requestError(error.message));
      }
    }
  };

export const getUser = (id: string) => async (dispatch: Dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axiosInstance.get("/get/" + id);
    dispatch(requestSuccess(data));
  } catch (e) {
    const error = e as AxiosError;
    if (error.response) {
      const { data } = error.response;
      dispatch(requestError((data as UserError).message));
    } else {
      dispatch(requestError(error.message));
    }
  }
};

export const getAllUsers = () => async (dispatch: Dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axiosInstance.get("/get/all");
    dispatch(getUserListSuccess(data));
  } catch (e) {
    const error = e as AxiosError;
    if (error.response) {
      const { data } = error.response;
      dispatch(requestError((data as UserError).message));
    } else {
      dispatch(requestError(error.message));
    }
  }
};
