"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GetSingleGoal } from "@/graphql/queries.graphql";
import { Goal, Task } from "@/generated/graphql";
import { DeleteGoal } from "@/graphql/mutations.graphql";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addGoalDetail, deleteGoal as deleteGoalFromState } from "@/redux/features/goalSlice";
import { formatDate, fullDate } from "@/lib/utils";
import { MenuPopover } from "../MenuPopover";
import TaskListItem from "../task/TaskListItem";
import AvatarLogo from "../AvatarLogo";

const GoalDetail = () => {
	const params = useParams();
	const taskChanged = useAppSelector(state => state.task.taskChange);
	const goalsWithoutDetails: Goal[] = useAppSelector(state => state.goal.goals);
	const goalsDetails: Goal[] = useAppSelector(state => state.goal.goalsDetails);
	const [goal, setGoal] = useState<Goal>();

	const selectedGoalId = +(params.goalId || goalsWithoutDetails?.[0]?.goalId);

	const singleGoalDetail =
		goalsDetails.find(goal => goal?.goalId === selectedGoalId) || goalsDetails?.[0];
	const tasks = singleGoalDetail?.tasks || [];

	const router = useRouter();
	const [loading, setLoading] = useState(true);

	const {
		error,
		data,
		loading: fetchLoading,
		refetch,
	} = useQuery(GetSingleGoal, {
		variables: { goalId: selectedGoalId },
	});

	const [deleteGoal, { error: deleteError }] = useMutation(DeleteGoal);

	useEffect(() => {
		if (data) {
			const fetchedGoalDetail: Goal = data.getSingleGoal;
			setGoal(fetchedGoalDetail);
		}
	}, [data, taskChanged]);

	useEffect(() => {
		if (!fetchLoading) {
			setLoading(false);
		}
	}, [fetchLoading]);

	// after goal changed, refetch goals
	useEffect(() => {
		refetch({ goalId: selectedGoalId });
	}, [taskChanged, refetch, selectedGoalId]);

	if (loading && singleGoalDetail == null) {
		return <p>Loading...</p>;
	}

	if (isNaN(selectedGoalId)) {
		return <p>Please select a goal</p>;
	}

	return (
		<div className="relative mx-auto h-[calc(100dvh-2rem)] max-w-[--screen-max] bg-topbar p-2">
			<div className="mb-2 flex items-center space-x-2">
				<AvatarLogo
					imgSrc={goal?.createdBy.imageUrl || ""}
					firstName={goal?.createdBy.firstName || ""}
					lastName={goal?.createdBy.lastName || ""}
				/>
				<div>
					<div className="text-sm ">
						{goal?.createdBy.firstName + " " + goal?.createdBy.lastName}
					</div>
					<div className="text-xs ">Posted on {formatDate(goal?.createdAt)}</div>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<p className="text-2xl font-semibold">{singleGoalDetail?.title}</p>
				<p className="text-sm font-semibold">{`${fullDate(singleGoalDetail?.createdAt)}`}</p>
			</div>

			<div className="">
				<p className="truncate-overflow-7 col-span-2  text-sm">{singleGoalDetail?.description}</p>
			</div>

			<div className="">
				<p className="truncate-overflow-7 col-span-2  text-sm">{singleGoalDetail?.deadline}</p>
			</div>

			<section className="py-4">
				<div className="w-full">
					<h1 className="text-lg font-medium">Tasks</h1>
					{/* Task Section */}
					<ScrollArea className="h-[16rem] ">
						<div className="space-y-1">
							{tasks.map((task: Task) => (
								<TaskListItem
									key={task.taskId}
									className="h-12"
									linkStyle=" bg-[#3a506a]"
									task={task}
									href={`tasks?taskid=${task.taskId}`}
									isDashboard={false}
								/>
							))}
						</div>
					</ScrollArea>
				</div>
			</section>

			<section className="mx-auto grid w-[60%] grid-cols-2 place-items-center">
				<div>
					<p className="text-lg">Commitment Streak</p>

					{singleGoalDetail?.streak === 0 ? (
						<div className=" ">
							<p className="text-center font-[Tourney] text-[length:--streak-font-size]">
								{singleGoalDetail.streak}
							</p>
							<p className="text-xl">{`It's the start of greatness`}</p>
						</div>
					) : (
						<div className="">
							<p className=" text-center font-[Tourney] text-[length:--streak-font-size]">
								{singleGoalDetail?.streak}
							</p>
							<p className="text-3xl">day streak!</p>
						</div>
					)}
				</div>

				<div>
					<Image
						src="/assets/fire.png"
						alt="fire image"
						height={120}
						width={120}
						className={`${true ? "filter-none" : "grayscale"}`}
					/>
				</div>
				<div className="col-span-2">
					<p className="mx-auto max-w-[80%] text-sm font-extralight">
						Complete all todos or create a checkpoint for your todo using milestone to prevent your
						streak being lost
					</p>
				</div>
			</section>
		</div>
	);
};

export default GoalDetail;
