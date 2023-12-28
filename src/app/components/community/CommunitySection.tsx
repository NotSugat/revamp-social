import { ScrollArea } from "@/components/ui/scroll-area";
import CommunityCard from "../CommunityCard";

const CommunitySection = () => {
	const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	return (
		<div>
			<ScrollArea className="h-[calc(100dvh-4rem)] lg:h-full">
				<section className="w-full space-y-2 px-2 ">
					{array.map((_item, index) => {
						return <CommunityCard key={index} />;
					})}
				</section>
			</ScrollArea>
		</div>
	);
};

export default CommunitySection;
