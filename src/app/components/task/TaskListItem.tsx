"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Goal, Task } from "@/generated/graphql";
import { useAppSelector } from "@/redux/store";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useMutation } from "@apollo/client";

const TaskListItem = ({
	task,
	href,
	dragBtnStyle,
	isDashboard = true,
	className,
	linkStyle,
}: {
	task: Task;
	href: string;
	dragBtnStyle?: string;
	isDashboard?: boolean;
	className?: string;
	linkStyle?: string;
}) => {
	const searchParams = useSearchParams();
	const selectedTask = searchParams.get("taskid");

	const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(task.isDone);

	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: task.taskId,
		data: {
			type: "Task",
			task,
		},
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className={cn(
					"flex h-16 items-center border-2 border-topbar bg-topbar opacity-60 ",
					className,
				)}
			></div>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cn("flex h-16 items-center text-foreground", className)}
		>
			<div
				className={cn(
					`relative flex h-full  w-full cursor-pointer  items-center justify-between   pr-1  text-lg transition-all duration-300 ease-in-out hover:bg-[#446288] ${
						selectedTask === task.taskId.toString() ? "bg-[#446288]" : "bg-topbar"
					} ${isCheckboxChecked ? "opacity-20" : "opacity-100"}`,
					linkStyle,
				)}
			>
				<Link href={href || ""} className="flex h-full w-full items-center gap-4 ">
					<span className="priority after:bg-white "></span>
					<div className="">
						<p>{task.title}</p>
					</div>
				</Link>
			</div>

			{isDashboard && (
				<span
					{...attributes}
					{...listeners}
					className={cn("h-full bg-gray-400 bg-opacity-20 px-1  ", dragBtnStyle)}
				>
					<Icon icon="iconamoon:menu-burger-horizontal-thin" className="h-full text-2xl  " />
				</span>
			)}
		</div>
	);
};

export default TaskListItem;
