"use client";
import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";

const Editor = () => {
	const editorRef = useRef<EditorJS>();
	const [enabled, setEnabled] = useState<boolean>(false);

	const intializedEditor = useCallback(async () => {
		const Editorjs = (await import("@editorjs/editorjs")).default;
		const Header = (await import("@editorjs/header")).default;
		const List = (await import("@editorjs/list")).default;
		const Embed = (await import("@editorjs/embed")).default;
		const Code = (await import("@editorjs/code")).default;
		const InlineCode = (await import("@editorjs/code")).default;
		const LinkTool = (await import("@editorjs/link")).default;
		const Table = (await import("@editorjs/table")).default;
		const ImageTool = (await import("@editorjs/image")).default;

		if (!editorRef.current) {
			const editor = new Editorjs({
				holder: "editorjs",
				autofocus: true,

				onReady: () => {
					console.log("Editor.js is ready to work!");
					editorRef.current = editor;
				},
				placeholder: "Create amazing journal with one click!",
				inlineToolbar: true,
				data: { blocks: [] },

				tools: {
					header: Header,
					LinkTool: {
						class: LinkTool,
						config: {
							endpoint: "api/link",
						},
					},
					image: {
						class: ImageTool,
						config: {
							uploader: {
								async uploadByFile(_file: File) {
									console.log("hello");
								},
							},
						},
					},
					list: List,
					embed: Embed,
					code: Code,
					table: Table,
				},
			});
		}
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setEnabled(true);
		}
	}, []);

	useEffect(() => {
		const init = async () => {
			await intializedEditor();

			setTimeout(() => {});
		};

		if (enabled) {
			init();

			return () => {};
		}
	}, [enabled, intializedEditor]);

	return (
		<div className=" h-[100dvh] max-h-[100dvh] w-full overflow-auto  text-foreground">
			<div id="editorjs" className="" />
		</div>
	);
};

export default Editor;
