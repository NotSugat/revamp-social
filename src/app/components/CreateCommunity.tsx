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
import { FieldValues, useForm } from "react-hook-form";
import { CreateCommunity as CreateCommunityMutation } from "@/graphql/mutations.graphql";
import { CreateCommunityInput } from "@/generated/graphql";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "@apollo/client";

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

const CommunityPrivacy = ({ setPrivacy }: { setPrivacy: Dispatch<SetStateAction<string>> }) => {
	return (
		<RadioGroup defaultValue="public" onValueChange={setPrivacy} className="space-y-1">
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="open" id="r3" />
				<PrivacyLabel
					icon="akar-icons:eye-open"
					title="Open"
					description="Anyone can join, share in your community"
				/>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="public" id="r1" />
				<PrivacyLabel
					icon="bi:people"
					title="Public"
					description="Anyone can join your community but only admins can post"
				/>
			</div>

			<div className="flex items-center space-x-2">
				<RadioGroupItem value="private" id="r3" />
				<PrivacyLabel
					icon="bx:lock"
					title="Private"
					description="Create your private small group of friends"
				/>
			</div>
		</RadioGroup>
	);
};

export default function CreateCommunity() {
	const [privacy, setPrivacy] = useState("public");
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
		reset,
	} = useForm();

	const [createCommunityMutation, { error }] = useMutation(CreateCommunityMutation);
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	const validateNameTag = (value: string) => {
		if (value.trim() === "" || value.includes(" ")) {
			return "Name tag cannot contain spaces";
		}
		return true;
	};

	const onSubmit = async (data: FieldValues) => {
		const res: CreateCommunityInput = {
			name: data["community-name"],
			nametag: data["name-tag"],
			description: data["description"],
			privacy: privacy,
			members: [],
		};

		await createCommunityMutation({
			variables: {
				input: res,
			},
		});

		reset();
		setDialogOpen(false);
	};

	return (
		<Dialog
			open={dialogOpen}
			onOpenChange={() => {
				setDialogOpen(!dialogOpen);
				reset();
			}}
		>
			<DialogTrigger asChild>
				<Button className="rounded-md bg-accent px-4 py-2 text-white hover:bg-accent hover:opacity-80 ">
					Create Community
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[530px]">
				<DialogHeader>
					<DialogTitle>Create a Community</DialogTitle>
					<DialogDescription>Fill out the details to create a new community.</DialogDescription>
				</DialogHeader>
				<form action="submit" onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="community-name">Community Name</Label>
							<Input
								{...register("community-name", {
									required: "Community name is required",
									minLength: {
										value: 3,
										message: "Community name must be at least 3 characters",
									},
									maxLength: {
										value: 20,
										message: "Community name must be at most 20 characters",
									},
								})}
								placeholder="Community Name"
								required
							/>
							{errors["community-name"] && (
								<p className="text-xs text-red-500">{`${errors["community-name"].message}`}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="name-tag">Name Tag</Label>
							<Input
								{...register("name-tag", {
									required: "Name tag is required",
									minLength: {
										value: 3,
										message: "Name tag must be at least 3 characters",
									},
									maxLength: {
										value: 20,
										message: "Name tag must be at most 20 characters",
									},
									validate: validateNameTag,
								})}
								placeholder="Name Tag (eg: awesome)"
								required
							/>

							{errors["name-tag"] && (
								<p className="text-xs text-red-500">{`${errors["name-tag"].message}`}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								{...register("description", {
									required: "Description is required",
									minLength: {
										value: 10,
										message: "Description must be at least 3 characters",
									},
									maxLength: {
										value: 500,
										message: "Description must be at most 500 characters",
									},
								})}
								id="description"
								placeholder="Describe your community"
								required
							/>
							{errors["description"] && (
								<p className="text-xs text-red-500">{`${errors["description"].message}`}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label>Community Privacy</Label>
							<CommunityPrivacy setPrivacy={setPrivacy} />
						</div>
					</div>
					<DialogFooter>
						<Button disabled={isSubmitting} type="submit">
							{isSubmitting ? "Creating..." : "Create Community"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
