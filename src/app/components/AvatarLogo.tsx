import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarLogo = ({
	imgSrc,
	firstName,
	lastName,
}: {
	imgSrc: string;
	firstName: string;
	lastName: string;
}) => {
	return (
		<Avatar>
			<AvatarImage src={imgSrc || "https://github.com/shadcn.png"} alt="@shadcn" />
			<AvatarFallback>Cn</AvatarFallback>
		</Avatar>
	);
};

export default AvatarLogo;
