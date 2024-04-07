import { google } from "googleapis";

export const googleOauth = async (req, res, next) => {
	console.log("Google Login Started...");
	const oAuth2Client = new google.auth.OAuth2(
		process.env.GOOGLE_CLIENT_ID,
		process.env.GOOGLE_CLIENT_SECRET,
		process.env.GOOGLE_REDIRECT_URI
	);
	const url = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: [
			"email",
			"profile",
			"https://www.googleapis.com/auth/analytics",
			"https://www.googleapis.com/auth/analytics.readonly",
			"https://www.googleapis.com/auth/analytics.manage.users.readonly",
		],
	});
	res.redirect(url);
};

export const googleCallback = async (req, res, next) => {
	try {
		const oAuth2Client = new google.auth.OAuth2(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			process.env.GOOGLE_REDIRECT_URI
		);
		const { tokens } = await oAuth2Client.getToken(req.query.code);
		oAuth2Client.setCredentials(tokens);
		console.log(oAuth2Client);

		res.redirect("/");
	} catch (err) {
		console.error(err);
		next(err);
	}
};
