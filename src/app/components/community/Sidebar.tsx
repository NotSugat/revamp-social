import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

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
	return (
		<li
			className={cn(
				"flex items-center justify-between text-xl text-primary-foreground hover:cursor-pointer",
				className,
			)}
		>
			<Link href={`/dashboard/${path}`} className="flex w-full items-center gap-2">
				{icon ? <Icon icon={icon} className="text-3xl" /> : null}
				<span className=" ">{text}</span>
			</Link>
		</li>
	);
};

const CommunitySidebar = () => {
	return (
		<aside
			className={`${
				isSidebarOpen ? "w-[var(--sidebar-width)]" : "w-0"
			} h-[calc(100dvh_-_4rem)]  overflow-y-auto  bg-sidebar duration-300 ease-in-out  `}
		>
			<ul role="navigation" className="relative h-full space-y-4 p-4">
				<Li path="/" icon="radix-icons:dashboard" text="Overview" />
				<Li path="/goals" icon="octicon:goal-16" text="Goals" />
				<Li path="/tasks" icon="ph:notepad" text="Tasks" />

				<li className="flex items-center justify-between text-primary-foreground hover:cursor-pointer">
					<Link href={`/dashboard/journals`} className="flex w-full items-center gap-2">
						<Icon icon="mdi:journal-outline" className="text-3xl" />
						<span className="text-xl ">Journals</span>
					</Link>
					<SmallIcon
						icon="gridicons:dropdown"
						className="p-1/2 rounded-full text-3xl"
						handleClick={() => setIsJournalDropDownOpen(!isJournalDropDownOpen)}
					/>
				</li>

				{isJournalDropDownOpen && (
					<ul className="ml-12 ">
						<Li path="journals/daily" text="Daily" className="py-1 text-sm" />
						<Li path="journals/weekly" text="Weekly" className="py-1 text-sm" />
						<Li path="journals/monthly" text="Monthly" className="py-1 text-sm" />
					</ul>
				)}
				<Li path="/analytics" icon="octicon:graph-24" text="Analytics" />
				<Li path="/community" icon="bi:people" text="Community" />
			</ul>
		</aside>
	);
};

export default CommunitySidebar;
