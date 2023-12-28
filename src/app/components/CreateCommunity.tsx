"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icon } from "@iconify/react/dist/iconify.js";

const PrivacyLabel = ({
	icon,
	title,
	description,
}: {
	icon: string;
	title: string;
	description: string;
}) => {
	return (
		<Label htmlFor="r3" className="flex items-center gap-1">
			<Icon icon={icon} />
			<p>{title}</p>
			<p className="text-xs text-gray-500">{description}</p>
		</Label>
	);
};

const CommunityPrivacy = () => {
	return (
		<RadioGroup defaultValue="public" className="space-y-1">
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="public" id="r1" />
				<PrivacyLabel
					icon="bi:people"
					title="Public"
					description="Anyone can join your community, share"
				/>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="private" id="r3" />
				<PrivacyLabel
					icon="bx:lock"
					title="Private"
					description="Create your small group of community"
				/>
			</div>
		</RadioGroup>
	);
};

export default function CreateCommunity() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="rounded-md bg-accent px-4 py-2 text-white">Create Community</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create a Community</DialogTitle>
					<DialogDescription>Fill out the details to create a new community.</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="community-name">Community Name</Label>
						<Input id="community-name" placeholder="Community Name" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="name-tag">Name Tag</Label>
						<Input id="name-tag" placeholder="Name Tag" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea id="description" placeholder="Describe your community" required />
					</div>

					<div className="space-y-2">
						<Label>Community Privacy</Label>
						<CommunityPrivacy />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Create Community</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
