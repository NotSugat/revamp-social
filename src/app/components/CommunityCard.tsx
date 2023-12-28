import { Card } from "@/components/ui/card";

interface Props {
	className?: string;
}
export default function Component() {
	return (
		<Card className="flex w-full items-center space-x-6 border-none bg-card p-6">
			<img
				alt="Vue.js logo"
				className="h-16 w-16 rounded-lg"
				height="70"
				src="/assets/hero.webp"
				style={{
					aspectRatio: "70/70",
					objectFit: "cover",
				}}
				width="70"
			/>
			<div className="flex flex-col space-y-2">
				<span className="text-xl font-semibold">Vue.js</span>
				<span className="text-gray-500">5.3K Members</span>
				<div className="flex space-x-4">
					<div className="flex items-center space-x-1">
						<GoalIcon className="h-6 w-6" />
						<span className="text-gray-500">1.2K Goals</span>
					</div>
					<div className="flex items-center space-x-1">
						<NewspaperIcon className="h-6 w-6" />
						<span className="text-gray-500">3K Journals</span>
					</div>
				</div>
			</div>
		</Card>
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
