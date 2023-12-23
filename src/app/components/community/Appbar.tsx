"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
		<li className={cn(" text-lg text-primary-foreground hover:cursor-pointer", className)}>
			<Link href={`/${path}`} className="flex w-full items-center px-8 ">
				{icon ? <Icon icon={icon} className=" text-2xl " /> : null}
			</Link>
		</li>
	);
};

const dropdownItems = [
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

const Appbar = () => {
	return (
		<nav className="horizontal-line    shadown-sm absolute bottom-0 flex h-12 w-full  justify-between bg-accent md:hidden">
			<ul className="flex w-full items-center justify-between  ">
				<Li text="Home" path="/" icon="bx:bx-home" />
				<Li text="Journals" path="journals" icon="mdi:journal-outline" />
				<Li text="Goals" path="notifications" icon="octicon:goal-16" />
				<Li text="Community" path="community" icon="bi:people" />
			</ul>
		</nav>
	);
};

export default Appbar;
