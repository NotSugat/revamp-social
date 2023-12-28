import CommunityJournals from "@/app/components/community/CommunityJournals";
import JournalTrendingSidebar from "@/app/components/community/JournalTrendingSidebar";
import Titlebar from "../components/Titlebar";
import Appbar from "../components/community/Appbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const Community = () => {
	const dispatch = useDispatch<AppDispatch>();
	return (
		<div className=" relative mx-auto flex max-w-[--screen-max] flex-col md:flex-row  ">
			<section className="w-full">
				<Titlebar />
				<CommunityJournals />
			</section>
			<JournalTrendingSidebar />
			<Appbar />
		</div>
	);
};

export default Community;
