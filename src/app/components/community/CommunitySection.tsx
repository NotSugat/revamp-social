import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunityCard, SkeletonCommunityCard } from "../CommunityCard";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { Community } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { GetCommunities } from "@/graphql/queries.graphql";

const CommunitySection = () => {
	const isMyCommunity = useAppSelector(state => state.community.isMyCommunity);
	const [communities, setCommunities] = useState<Community[]>([]);
	const [ownCommunities, setOwnCommunities] = useState<Community[]>([]);
	const [loading, setLoading] = useState(true);

	const { error: _error, data, refetch, loading: QueryLoading } = useQuery(GetCommunities);

	useEffect(() => {
		if (data) {
			setCommunities(data.communities);
			setLoading(false);
		}
	}, [setCommunities, data]);

	if (loading) {
		return (
			<div className="space-y-2">
				{Array.from({ length: 6 }).map((_, index) => {
					return <SkeletonCommunityCard key={index} />;
				})}
			</div>
		);
	}

	return (
		<div>
			<ScrollArea className="h-[calc(100dvh-4rem)] lg:h-full">
				<section className="w-full space-y-2 px-2 ">
					{communities?.map(community => {
						return <CommunityCard key={community.communityId} community={community} />;
					})}
				</section>
			</ScrollArea>
		</div>
	);
};

export default CommunitySection;
