import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

export interface itemContent {
	text: string;
	icon: string;
}

export function MenuDropdown({
	title,
	dropdownItems,
}: {
	title: string;
	dropdownItems: Array<itemContent>;
}) {
	const router = useRouter();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center gap-1 rounded-sm bg-accent p-2 ">
					<Icon icon="ion:filter" className="mr-2 h-4 w-4" />
					{title}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 bg-accent shadow-[0px_2px_8px_2px_#1e293bee] ">
				{dropdownItems.map(item => {
					return (
						<DropdownMenuItem key={item.text} className="cursor-pointer">
							<Icon icon={item.icon} className="mr-2 h-4 w-4" />
							<span>{item.text}</span>
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
