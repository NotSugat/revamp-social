"use client";
import React, { useEffect, useState } from "react";
import JournalPostCard from "./JournalPostCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@apollo/client";
import { GetCommunities } from "@/graphql/queries.graphql";
import { Community, Goal, Journal } from "@/generated/graphql";
import GoalPostCard from "./GoalPostCard";

const CommunityJournals = () => {
	const [loading, setLoading] = useState(true);
	const [communities, setCommunities] = useState<Community[]>([]);

	const [journals, setJournals] = useState<Journal[][]>([[]]);
	const [goals, setGoals] = useState<Goal[][]>([[]]);

	const { data, error: _error, loading: fetchLoading } = useQuery(GetCommunities);

	useEffect(() => {
		if (data) {
			setCommunities(data.communities);
			setLoading(false);
		}
	}, [setCommunities, data]);

	useEffect(() => {
		if (communities) {
			const journals = communities.map(community => {
				return community.journals;
			});
			setJournals(journals);
		}
	}, [communities]);

	useEffect(() => {
		const goals = communities.map(community => {
			return community.goals;
		});

		setGoals(goals);
	}, [communities]);

	return (
		<ScrollArea className="h-[calc(100dvh-4rem)] lg:h-full">
			<section className="w-full space-y-2 p-2 ">
				{communities.map((community, index) => (
					<div key={community.communityId} className="space-y-2">
						{journals[index] &&
							journals[index].map(journal => (
								<JournalPostCard key={crypto.randomUUID()} journal={journal} />
							))}
						{goals[index] &&
							goals[index].map(goal => <GoalPostCard key={crypto.randomUUID()} goal={goal} />)}
					</div>
				))}
			</section>
		</ScrollArea>
	);
};

export default CommunityJournals;
