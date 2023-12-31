import { Community } from "@/generated/graphql";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
	className?: string;
}

export function SkeletonCommunityCard() {
	return (
		<div className="flex animate-pulse items-center justify-between bg-card p-4">
			<div className="flex items-center space-x-4">
				<div className="rounded-md bg-[#34495e] p-2">
					<div className="h-12 w-12 bg-[#95a5a6]" />
				</div>
				<div>
					<div className="mb-2 h-4 w-32 bg-[#95a5a6]" />
					<div className="mb-1 h-3 w-24 bg-[#95a5a6]" />
					<div className="h-3 w-16 bg-[#95a5a6]" />
				</div>
			</div>
			<div className="flex items-center space-x-6">
				<div className="flex items-center text-[#95a5a6]">
					<div className="h-6 w-6 bg-[#95a5a6]" />
					<div className="ml-2 h-3 w-12 bg-[#95a5a6]" />
				</div>
				<div className="flex items-center text-[#95a5a6]">
					<div className="h-6 w-6 bg-[#95a5a6]" />
					<div className="ml-2 h-3 w-12 bg-[#95a5a6]" />
				</div>
			</div>
		</div>
	);
}

export function CommunityCard({ community }: { community: Community }) {
	const router = useRouter();
	return (
		<div className="flex items-center justify-between rounded-sm bg-card p-4 ">
			<div className="flex w-full items-center space-x-4">
				<div className="rounded-md bg-[#34495e] p-2">
					<CodepenIcon className="h-12 w-12 text-white" />
				</div>
				<div className="w-full">
					<Link
						href={`community/${community.communityId}`}
						className="font-semibold text-white transition-all duration-200 ease-in-out hover:cursor-pointer hover:text-blue-400"
					>
						{community.community}
					</Link>
					<p className=" w-full max-w-[90%] text-sm text-gray-200">{community.description}</p>
					<p className="text-[#95a5a6]">{community?.users?.length} Members</p>
				</div>
			</div>

			<div className="flex items-center space-x-6">
				<div className="flex  w-fit items-center text-[#95a5a6]">
					<button title="Goals">
						<GoalIcon className="h-6 w-6" />
					</button>
					<span className="ml-2 ">1.2K </span>
				</div>
				<div className="flex items-center text-[#95a5a6]">
					<button title="Journals">
						<NewspaperIcon className="h-6 w-6" />
					</button>
					<span className="ml-2">3K </span>
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

function GoalIcon(props: Props) {
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
			<path d="M12 13V2l8 4-8 4" />
			<path d="M20.55 10.23A9 9 0 1 1 8 4.94" />
			<path d="M8 10a5 5 0 1 0 8.9 2.02" />
		</svg>
	);
}

function NewspaperIcon(props: Props) {
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
			<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
			<path d="M18 14h-8" />
			<path d="M15 18h-5" />
			<path d="M10 6h8v4h-8V6Z" />
		</svg>
	);
}
