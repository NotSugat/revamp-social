import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import navbarReducer from "./features/navbarSlice";
import goalReducer from "./features/goalSlice";
import taskReducer from "./features/taskSlice";
import todoReducer from "./features/todoSlice";
import communityReducer from "./features/communitySlice";

export const store = configureStore({
	reducer: {
		menu: navbarReducer,
		goal: goalReducer,
		task: taskReducer,
		todo: todoReducer,
		community: communityReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
