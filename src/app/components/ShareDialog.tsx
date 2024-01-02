import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import ShareGoal from "./ShareGoal";
import Sharejournal from "./ShareJournal";

const ShareCard = ({
	title,
	description,
	icon,
	setSelected,
}: {
	title: string;
	description: string;
	icon: string;
	setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const handleClick = () => {
		setSelected(title.toLowerCase());
	};
	return (
		<Card className="flex flex-col items-center space-y-4 border-none bg-card  p-6">
			<Icon icon={icon} className="h-16 w-16" />
			<CardHeader>
				<CardTitle className="text-lg font-semibold">Share {title}</CardTitle>
			</CardHeader>
			<CardContent className="text-center">
				<p className="text-gray-600 dark:text-gray-400">{description}</p>
			</CardContent>
			<Button className="self-stretch" onClick={handleClick}>
				Choose
			</Button>
		</Card>
	);
};

const ShareDialog = () => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selected, setSelected] = useState("");

	return (
		<Dialog
			open={dialogOpen}
			onOpenChange={() => {
				setDialogOpen(!dialogOpen);
				setSelected("");
			}}
		>
			<DialogTrigger asChild>
				<Button className=" bg-accent">Share Goal</Button>
			</DialogTrigger>
			<DialogContent className="bg-accent sm:max-w-[50%]">
				<DialogHeader>
					<DialogTitle>
						<h1 className="mb-10 text-center text-3xl font-bold">What you want to share ?</h1>
					</DialogTitle>
				</DialogHeader>
				<main className="flex  flex-col items-center justify-center  py-6 ">
					<div className=" w-full grid-cols-1 gap-8 md:max-w-2xl ">
						{!selected ? (
							<div className="grid gap-4 md:grid-cols-2">
								<ShareCard
									title="Goal"
									description="share your goals in the community and build community"
									icon="octicon:goal-16"
									setSelected={setSelected}
								/>
								<ShareCard
									title="Journal"
									description="share your journals in the community and build community"
									icon="mdi:journal-outline"
									setSelected={setSelected}
								/>
							</div>
						) : // Render content based on the selected value
							selected === "goal" ? (
								<ShareGoal setDialogOpen={setDialogOpen} />
							) : (
								<Sharejournal setDialogOpen={setDialogOpen} />
							)}{" "}
					</div>
				</main>
			</DialogContent>
		</Dialog>
	);
};
export default ShareDialog;
