import React from "react";
import JournalPostCard from "./JournalPostCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const CommunityJournals = () => {
	const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	return (
		<ScrollArea className="h-[calc(100dvh-4rem)] lg:h-full">
			<section className="w-full space-y-2 p-2 ">
				{array.map((_item, index) => {
					return <JournalPostCard key={index} />;
				})}
			</section>
		</ScrollArea>
	);
};

export default CommunityJournals;
