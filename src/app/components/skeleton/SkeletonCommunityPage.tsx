export default function SkeletonCommunityPage() {
	return (
		<div className="l mx-auto min-h-screen  ">
			<div className="bg-card">
				<div className="mx-auto flex max-w-6xl items-start justify-between  p-4">
					<div className="flex animate-pulse space-x-4">
						<div className="h-12 w-12 rounded-full bg-muted-foreground" />
						<div className="flex flex-col space-y-3">
							<div className="h-4 w-36 rounded bg-muted-foreground" />
							<div className="h-4 w-24 rounded bg-muted-foreground" />
						</div>
					</div>
					<div className="flex animate-pulse space-x-4">
						<div className="h-10 w-20 rounded-sm  bg-muted-foreground" />
						<div className="h-10 w-10 rounded-full bg-muted-foreground" />
					</div>
				</div>
			</div>

			<div className="mx-auto mt-6 flex  max-w-6xl gap-8">
				<div className="flex-1 space-y-6">
					<div className="animate-pulse space-y-2">
						<div className="h-6 w-1/4 rounded bg-muted-foreground" />
						<div className="h-6 w-3/4 rounded bg-muted-foreground" />
					</div>

					<div className="animate-pulse space-y-6 rounded-lg bg-card p-4">
						<div className="flex items-center space-x-4">
							<div className="h-10 w-10 rounded-full bg-muted-foreground" />
							<div className="flex-1 space-y-3 py-1">
								<div className="h-4 rounded bg-muted-foreground" />
								<div className="space-y-2">
									<div className="h-4 w-5/6 rounded bg-muted-foreground" />
									<div className="h-4 w-1/4 rounded bg-muted-foreground" />
								</div>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex space-x-2">
								<div className="h-4 w-12 rounded bg-muted-foreground" />
								<div className="h-4 w-12 rounded bg-muted-foreground" />
								<div className="h-4 w-12 rounded bg-muted-foreground" />
							</div>
							<div className="h-4 w-24 rounded bg-muted-foreground" />
						</div>
					</div>
				</div>
				<div className="w-72 animate-pulse space-y-6">
					<div className="space-y-4 rounded-lg bg-card p-4">
						<div className="h-8 rounded bg-muted-foreground" />
						<div className="h-4 w-5/6 rounded bg-muted-foreground" />
						<div className="h-4 w-1/2 rounded bg-muted-foreground" />
						<div className="h-10 rounded bg-muted-foreground" />
					</div>
				</div>
			</div>
		</div>
	);
}
