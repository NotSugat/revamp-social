"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { itemContent } from "./styled-components/DropdownMenu";
import { MenuDropdown } from "./styled-components/MenuDropdown";

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
				{icon ? <Icon icon={icon} className="hidden text-lg " /> : null}
				<span className=" ">{text}</span>
			</Link>
		</li>
	);
};

const dropdownItems: itemContent = [
	{
		text: "Physical Health",
		icon: "bx:bx-home",
	},
	{
		text: "Mental Health",
		icon: "mdi:journal-outline",
	},
	{
		text: "Emotional Wellbeing",
		icon: "octicon:goal-16",
	},
	{
		text: "Career",
		icon: "bi:people",
	},
	{
		text: "Financial Stability",
		icon: "bi:people",
	},
	{
		text: "Environment",
		icon: "bi:people",
	},
];

const Titlebar = () => {
	return (
		<nav className="horizontal-line  hidden justify-between p-2 md:flex ">
			<ul className="flex items-center gap-4">
				<Li text="Home" path="/" icon="bx:bx-home" />
				<Li text="Journals" path="journals" icon="mdi:journal-outline" />
				<Li text="Goals" path="notifications" icon="octicon:goal-16" />
				<Li text="Community" path="community" icon="bi:people" />
			</ul>

			<MenuDropdown title="Aspect" dropdownItems={dropdownItems} />
		</nav>
	);
};

export default Titlebar;
