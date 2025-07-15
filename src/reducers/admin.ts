import { combineReducers } from "redux";
import { createReducer } from "utils/create-reducer";
import { User } from "types";

const users = createReducer<User[]>({}, []);

export const admin = combineReducers({ users });
