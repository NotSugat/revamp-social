import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommunityState {
	isMyCommunity: boolean;
}

const communityState: CommunityState = {
	isMyCommunity: false,
};

export const community = createSlice({
	name: "community",
	initialState: communityState, // This is where you provide the initial state
	reducers: {
		setIsMyCommunity: (state, action: PayloadAction<boolean>) => {
			state.isMyCommunity = action.payload;
		},
	},
});

export const { setIsMyCommunity } = community.actions;
export default community.reducer;
