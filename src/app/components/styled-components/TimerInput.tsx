import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

const TimerInput = ({
	labelName,
	timer,
	setTimer,
}: {
	labelName: string;
	timer: string;
	setTimer: Dispatch<SetStateAction<string>>;
}) => {
	const [inputValue, setInputValue] = useState(timer);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const numericValue = e.target.value.replace(/\D/, "");

		const value = numericValue.slice(numericValue.length - 2, numericValue.length);

		setInputValue(value);

		if (parseInt(value, 10) > 59) {
			document.getElementById(labelName)?.classList.add("text-red-500");
			setInterval(() => {
				setInputValue("59");
				document.getElementById(labelName)?.classList.remove("text-red-500");
			}, 1000);
		}
	};

	useEffect(() => {
		if (inputValue) {
			setTimer(inputValue);
		}
	}, [setTimer, inputValue]);

	return (
		<span className="relative">
			<input
				id={labelName}
				type="text"
				placeholder="00"
				value={inputValue}
				onChange={handleChange}
				pattern="\d*"
				className="h-[10rem] w-[12rem] bg-transparent p-0 text-right text-[10rem] outline-none"
			/>
			<label htmlFor="hour" className="absolute -bottom-6 right-1">
				{labelName}
			</label>
		</span>
	);
};

export default TimerInput;
