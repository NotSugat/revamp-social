import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Getjournals } from "@/graphql/queries.graphql";
import { useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { Journal } from "@/generated/graphql";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { GetJournalsOfUser } from "@/graphql/queries.graphql";

const Sharejournal = ({ communtiyId }: { communityId: number }) => {
	const [loading, setLoading] = useState(true);
	const [journals, setjournals] = useState<Journal[]>([]);
	const [open, setOpen] = useState(false);
	const [selectedjournal, setSelectedjournal] = useState<Journal | null>();
	const { user } = useUser();

	const {
		error: _error,
		data,
		refetch,
	} = useQuery(GetJournalsOfUser, {
		variables: { userId: user?.id },
	});
	// initial data fetch
	useEffect(() => {
		if (data) {
			const fetchedjournals: Journal[] = data.getJournalsOfUser;
			setjournals(fetchedjournals);
			setLoading(false);
		}
	}, [data]);

	return (
		<div className="grid w-full gap-4  py-4">
			<div>
				<DialogTitle>Select a journal</DialogTitle>
				<DialogDescription>
					Choose your desired journal from the list. You can search for a specific journal using the
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
							{selectedjournal ? (
								<div className="flex items-center py-2">
									<Icon icon="octicon:journal-16" className="mr-2 h-4 w-4" />
									<span className="font-medium">{selectedjournal.title}</span>
								</div>
							) : (
								<>Select journal to share</>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[500px]  bg-red-500 p-0" side="bottom" align="start">
						<Command>
							<CommandInput placeholder="Search journal..." />
							<CommandList>
								<CommandEmpty>No results found.</CommandEmpty>
								<CommandGroup>
									{journals.map(journal => (
										<CommandItem
											key={journal.journalId}
											value={journal.title}
											onSelect={value => {
												console.log(value);
												console.log(journals);
												setSelectedjournal(
													journals.find(journal => journal.title.toLowerCase() == value) || null,
												);
												console.log(selectedjournal);
												setOpen(false);
											}}
										>
											<div className="flex items-center py-2">
												<Icon icon="octicon:journal-16" className="mr-2 h-4 w-4" />
												<span className="font-medium">{journal.title}</span>
											</div>
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			<Button type="submit">Share journal</Button>
		</div>
	);
};

export default Sharejournal;
