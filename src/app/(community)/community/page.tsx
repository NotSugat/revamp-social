"use client";
import CreateCommunity from "@/app/components/CreateCommunity";
import Titlebar from "@/app/components/Titlebar";
import Appbar from "@/app/components/community/Appbar";
import CommunitySection from "@/app/components/community/CommunitySection";
import JournalTrendingSidebar from "@/app/components/community/JournalTrendingSidebar";
import { setIsMyCommunity } from "@/redux/features/communitySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { GetSingleCommunity } from "@/graphql/queries.graphql";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const Topbar = () => {
	const dispatch = useDispatch<AppDispatch>();
	return (
		<div className="flex h-16 items-center justify-between px-2">
			<div className="space-x-2">
				<button onClick={() => dispatch(setIsMyCommunity(true))}>All</button>
				<button onClick={() => dispatch(setIsMyCommunity(false))}>My community</button>
			</div>

			<div>
				<CreateCommunity />
			</div>
		</div>
	);
};

const Community = ({
	params,
}: {
	params: {
		communityId: string;
	};
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [loading, setLoading] = useState(true);
	const [community, setCommunity] = useState<any>({});

	const { communityId } = params;
	const { data, loading: queryLoading } = useQuery(GetSingleCommunity, {
		variables: {
			communityId: communityId,
		},
	});

	useEffect(() => {
		if (data) {
			setLoading(false);
		}
	}, [data, dispatch]);

	return (
		<div className=" relative mx-auto flex max-w-[--screen-max] flex-col md:flex-row  ">
			<section className="w-full">
				<Titlebar />
				<Topbar />
				<CommunitySection />
			</section>
			<JournalTrendingSidebar />
			<Appbar />
		</div>
	);
};

export default Community;
