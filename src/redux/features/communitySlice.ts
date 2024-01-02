import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommunityState {
	isMyCommunity: boolean;
	communityChanged: boolean;
}

const communityState: CommunityState = {
	isMyCommunity: false,
	communityChanged: false,
};

export const community = createSlice({
	name: "community",
	initialState: communityState, // This is where you provide the initial state
	reducers: {
		setIsMyCommunity: (state, action: PayloadAction<boolean>) => {
			state.isMyCommunity = action.payload;
		},
		setCommunityChanged: state => {
			state.communityChanged = !state.communityChanged;
		},
	},
});

export const { setIsMyCommunity, setCommunityChanged } = community.actions;
export default community.reducer;
