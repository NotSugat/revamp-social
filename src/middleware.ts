import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
	afterAuth(auth, req, _evt) {
		if (!auth.userId && !auth.isPublicRoute) {
			return redirectToSignIn({ returnBackUrl: req.url });
		}

		if (auth.sessionId && req.nextUrl.pathname === "/") {
			console.log(`sessionId: ${auth.sessionId}`);
			console.log(`userId: ${auth.userId}`);
		}
	},
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};
