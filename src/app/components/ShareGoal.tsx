import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { GetGoals } from "@/graphql/queries.graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { Goal } from "@/generated/graphql";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ShareGoal as ShareGoalMutation } from "@/graphql/mutations.graphql";
import { useParams, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setCommunityGoalUpdated } from "@/redux/features/communitySlice";

const ShareGoal = ({
	setDialogOpen,
}: {
	setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [loading, setLoading] = useState(true);
	const [goals, setGoals] = useState<Goal[]>([]);
	const [open, setOpen] = useState(false);
	const [selectedGoal, setSelectedGoal] = useState<Goal | null>();
	const { user } = useUser();
	const params = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const {
		error: _error,
		data,
		refetch,
	} = useQuery(GetGoals, {
		variables: { userId: user?.id },
	});

	const [shareGoal, { error }] = useMutation(ShareGoalMutation);

	const handleClick = async () => {
		if (!selectedGoal) return;

		await shareGoal({
			variables: {
				goalId: +selectedGoal.goalId,
				communityId: +params.communityId,
			},
		});

		dispatch(setCommunityGoalUpdated());
		setDialogOpen(false);
	};
	// initial data fetch
	useEffect(() => {
		console.log(params);
		if (data) {
			const fetchedGoals: Goal[] = data.getGoals;
			setGoals(fetchedGoals);
			setLoading(false);
		}
	}, [data, params]);

	return (
		<div className="grid w-full gap-4  py-4">
			<div>
				<DialogTitle>Select a Goal</DialogTitle>
				<DialogDescription>
					Choose your desired goal from the list. You can search for a specific goal using the
					search bar.
				</DialogDescription>
			</div>
			<div className="grid items-center gap-4">
				<Popover
					open={open}
					onOpenChange={() => {
						console.log(open);
						setOpen(!open);
					}}
				>
					<PopoverTrigger asChild>
						<Button variant="outline" size="sm" className="w-full justify-start">
							{selectedGoal ? (
								<div className="flex items-center py-2">
									<Icon icon="octicon:goal-16" className="mr-2 h-4 w-4" />
									<span className="font-medium">{selectedGoal.title}</span>
								</div>
							) : (
								<>Select Goal to share</>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[500px]  bg-red-500 p-0" side="bottom" align="start">
						<Command>
							<CommandInput placeholder="Search Goal..." />
							<CommandList>
								<CommandEmpty>No results found.</CommandEmpty>
								<CommandGroup>
									{goals.map(goal => (
										<CommandItem
											key={goal.goalId}
											value={goal.title}
											onSelect={value => {
												console.log(value);
												console.log(goals);
												setSelectedGoal(
													goals.find(goal => goal.title.toLowerCase() == value) || null,
												);
												console.log(selectedGoal);
												setOpen(false);
											}}
										>
											<div className="flex items-center py-2">
												<Icon icon="octicon:goal-16" className="mr-2 h-4 w-4" />
												<span className="font-medium">{goal.title}</span>
											</div>
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			<Button type="submit" onClick={handleClick}>
				Share Goal
			</Button>
		</div>
	);
};

export default ShareGoal;
