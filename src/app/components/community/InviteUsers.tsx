import { Button } from "@/components/ui/button";
import {
	DialogTrigger,
	DialogTitle,
	DialogDescription,
	DialogHeader,
	DialogFooter,
	DialogContent,
	Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useMutation, useQuery } from "@apollo/client";
import { GetUsers } from "@/graphql/queries.graphql";
import { useEffect, useState } from "react";
import { User, UserWithLessDetails } from "@/generated/graphql";
import { InviteUserToCommunity } from "@/graphql/mutations.graphql";
import { useParams } from "next/navigation";
import { InvitedUsersInCommunity } from "@/graphql/queries.graphql";

const UserInfo = ({ user }: { user: UserWithLessDetails }) => {
	const [isInvited, setIsInvited] = useState(false);
	const name = user.firstName + " " + user.lastName;
	const [inviteUserToCommunity, { data, error }] = useMutation(InviteUserToCommunity);
	const params = useParams<{ communityId: string }>();

	const handleInvite = async () => {
		setIsInvited(!isInvited);
		await inviteUserToCommunity({
			variables: {
				communityId: +params.communityId,
				username: user.username,
			},
		});
		console.log(data, +params.communityId, user.id);
	};
	return (
		<div className="flex items-center justify-between py-2">
			<div className="flex items-center space-x-2">
				<Avatar className="h-10 w-10">
					<AvatarImage alt={name} src={user.imageUrl || "https://github.com/shadcn.png"} />
					<AvatarFallback>{name[0] + name.split(" ")[1][0]}</AvatarFallback>
				</Avatar>
				<div>
					<p className="text-sm">{name}</p>
					<p className="text-xs text-gray-500">@{user.username}</p>
				</div>
			</div>
			{isInvited ? (
				<Button size="sm" variant="outline" onClick={handleInvite}>
					Unsent
				</Button>
			) : (
				<Button size="sm" variant="outline" onClick={handleInvite}>
					Invite
				</Button>
			)}
		</div>
	);
};

export default function InviteUsers({
	communityNametag,
}: {
	communityNametag: string | undefined;
}) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState<UserWithLessDetails[]>([]);
	const { data, loading: queryLoading } = useQuery(GetUsers);
	const { data: invitedUserData, loading: invitedQueryLoading } = useQuery(
		InvitedUsersInCommunity,
		{
			variables: {
				communityNametag: communityNametag,
			},
		},
	);

	useEffect(() => {
		if (data) {
			console.log(data.getAllUsers);

			setUsers(data.getAllUsers);
			setLoading(false);
		}
	}, [setLoading, setUsers, data, invitedUserData]);

	useEffect(() => {
		if (invitedUserData) {
			console.log(invitedUserData);
		}
	}, [setLoading, invitedUserData]);

	return (
		<Dialog
			open={dialogOpen}
			onOpenChange={() => {
				setDialogOpen(!dialogOpen);
			}}
		>
			<DialogTrigger asChild>
				<Button className="btn">Invite Users</Button>
			</DialogTrigger>
			<DialogContent className=" sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Invite users to the community</DialogTitle>
					<DialogDescription>
						Search for users and click invite to add them to the community.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<Label className="sr-only" htmlFor="search">
							Search
						</Label>
						<Input id="search" placeholder="Search for users..." />
					</div>
					<div className="divide-y-[1px] divide-gray-500">
						{users?.map(user => {
							return <UserInfo key={user.id} user={user} />;
						})}
					</div>
				</div>
				<DialogFooter>
					<Button variant="ghost" onClick={() => setDialogOpen(!dialogOpen)}>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
