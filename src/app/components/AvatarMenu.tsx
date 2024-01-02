"use client";
import { LogOut, Settings, User } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";

export function AvatarMenu() {
	const router = useRouter();
	const { signOut } = useClerk();
	const { user } = useUser();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button>
					<UserButton />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 bg-accent">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() =>
							router.push(
								process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://revampgoal.co/dashboard",
							)
						}
					>
						<Icon icon="radix-icons:dashboard" className="mr-2 h-4 w-4" />
						<span>Go to Dashboard</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() =>
						signOut(() =>
							router.push(process.env.NEXT_PUBLIC_LANDING_URL || "https://www.revampgoal.co"),
						)
					}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
