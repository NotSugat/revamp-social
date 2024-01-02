"use client";
import { Button } from "@/components/ui/button";
import { cn, fullDate } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GetSingleCommunity } from "@/graphql/queries.graphql";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Community } from "@/generated/graphql";
import JournalPostCard from "@/app/components/community/JournalPostCard";
import { SkeletonCommunityCard } from "@/app/components/CommunityCard";
import SkeletonCommunityPage from "@/app/components/skeleton/SkeletonCommunityPage";
import InviteUsers from "@/app/components/community/InviteUsers";
import GoalPostCard from "@/app/components/community/GoalPostCard";
import ShareDialog from "@/app/components/ShareDialog";
import { useAppSelector } from "@/redux/store";

const Li = ({
	icon,
	text,
	className,
	path,
}: {
	icon?: string;
	text: string;
	path: string;
	className?: string;
}) => {
	const pathName = usePathname();
	return (
		<li
			className={cn(
				"flex items-center justify-between text-lg text-primary-foreground hover:cursor-pointer",
				className,
			)}
		>
			<Link href={`/${path}`} className="flex w-full items-center gap-1">
				{icon ? <Icon icon={icon} className="hidden text-lg lg:block " /> : null}
				<span className=" ">{text}</span>
			</Link>
		</li>
	);
};

const ShareGoalBar = () => {
	return (
		<div className="mb-4 flex items-center justify-between">
			<div className=" flex items-center gap-2">
				<Li icon="octicon:goal-16" text="Goal" path="/goal" />
				<Li icon="mdi:journal-outline" text="Journal" path="/journal" />
			</div>
			<ShareDialog />
		</div>
	);
};

export default function CommunityDetail({
	params,
}: {
	params: {
		communityId: string;
	};
}) {
	const [loading, setLoading] = useState(true);
	const [community, setCommunity] = useState<Community>();
	const communityGoalUpdated = useAppSelector(state => state.community.communityGoalUpdated);
	const communityJournalUpdated = useAppSelector(state => state.community.communityJournalUpdated);

	const { communityId } = params;
	const {
		data,
		loading: queryLoading,
		refetch,
	} = useQuery(GetSingleCommunity, {
		variables: {
			communityId: +communityId,
		},
	});

	useEffect(() => {
		if (data) {
			setCommunity(data.community);
			setLoading(false);
		}
	}, [data]);

	useEffect(() => {
		refetch();
	}, [refetch, communityGoalUpdated, communityJournalUpdated]);

	if (loading) {
		return <SkeletonCommunityPage />;
	}

	return (
		<div key="1" className="min-h-screen  text-white">
			<header className="bg-card p-4">
				<div className="mx-auto flex max-w-6xl items-center justify-between">
					<div className="flex items-center space-x-4">
						<CodepenIcon className="h-10 w-10" />

						<div>
							<h1 className="text-2xl font-bold">{community?.community}</h1>
							<p className="text-sm">{`c/${community?.nametag}`}</p>
						</div>
						<Button className="btn rounded-full ">Joined</Button>
					</div>
					<div className="flex items-center space-x-4">
						<InviteUsers communityNametag={community?.nametag} />
						<Button className=" rounded-full p-2 px-3">
							<BellIcon className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</header>
			<div className="mx-auto max-w-6xl p-4">
				<div className="grid grid-cols-3 gap-8">
					<div className="col-span-2">
						<ShareGoalBar />
						<div className="space-y-2">
							{community?.journals?.map(journal => (
								<JournalPostCard key={journal.journalId} journal={journal} />
							))}

							{community?.goals?.map(goal => <GoalPostCard key={goal.goalId} goal={goal} />)}
						</div>
					</div>
					<div className="col-span-1">
						<div className="space-y-4 bg-card p-4">
							<h2 className="text-xl font-semibold">About Community</h2>
							<p className="truncate-overflow-5">{community?.description}</p>
							<div className="flex items-center justify-between text-sm">
								<span>Created {fullDate(community?.createdAt)}</span>
								<span>{community?.users.length} Members</span>
							</div>
							<Button className="w-full rounded-md bg-slate-600 px-4 py-2 text-foreground shadow-md transition-all duration-300 hover:bg-slate-500">
								Share Goal
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function CodepenIcon(props: Props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
			<line x1="12" x2="12" y1="22" y2="15.5" />
			<polyline points="22 8.5 12 15.5 2 8.5" />
			<polyline points="2 15.5 12 8.5 22 15.5" />
			<line x1="12" x2="12" y1="2" y2="8.5" />
		</svg>
	);
}

function BellIcon(props: Props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
			<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
		</svg>
	);
}
