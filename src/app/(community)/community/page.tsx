import CreateCommunity from "@/app/components/CreateCommunity";
import Titlebar from "@/app/components/Titlebar";
import Appbar from "@/app/components/community/Appbar";
import CommunitySection from "@/app/components/community/CommunitySection";
import JournalTrendingSidebar from "@/app/components/community/JournalTrendingSidebar";

const Topbar = () => {
	return (
		<div className="flex h-16 items-center justify-between px-2">
			<div className="space-x-2">
				<button>All</button>
				<button>My community</button>
			</div>

			<div>
				<CreateCommunity />
			</div>
		</div>
	);
};

const Community = () => {
	return (
		<div className=" relative mx-auto flex max-w-[--screen-max] flex-col md:flex-row  ">
			<section className="w-full">
				<Titlebar />
				<Topbar />
				<CommunitySection />
			</section>
			<JournalTrendingSidebar />
			<Appbar />
		</div>
	);
};

export default Community;
