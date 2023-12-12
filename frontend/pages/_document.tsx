import { Head, Html, Main, NextScript } from "next/document";
import { Analytics } from '@vercel/analytics/react';
const Document = () => {
	return (
		<Html className="bg-app text-type">
			<Head>
				<meta name="theme-color" content="#111827" />
				<script src="/static/theme.js" />
				<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
			</Head>
			<body>
				<Main />
				<NextScript />
				<Analytics/>
			</body>
		</Html>
	);
};

export default Document;
