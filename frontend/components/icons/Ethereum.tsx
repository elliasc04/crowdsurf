interface Props {
	className?: string;
}

export const EthereumIcon = (props: Props) => {
	const { className } = props;

	return (
		<svg
			width="732"
			height="733"
			viewBox="0 0 732 733"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M366.2 732.3C568.226 732.3 732 568.526 732 366.5C732 164.474 568.226 0.699951 366.2 0.699951C164.174 0.699951 0.400024 164.474 0.400024 366.5C0.400024 568.526 164.174 732.3 366.2 732.3Z"
				fill="#627EEA"
			/>
			<path d="M377.6 92.1V294.9L549 371.5L377.6 92.1Z" fill="white" fillOpacity="0.602" />
			<path d="M377.6 92.1L206.2 371.5L377.6 294.9V92.1Z" fill="white" />
			<path d="M377.6 502.9V640.7L549.1 403.4L377.6 502.9Z" fill="white" fillOpacity="0.602" />
			<path d="M377.6 640.7V502.9L206.2 403.4L377.6 640.7Z" fill="white" />
			<path d="M377.6 471L549 371.5L377.6 294.9V471Z" fill="white" fillOpacity="0.2" />
			<path d="M206.2 371.5L377.6 471V294.9L206.2 371.5Z" fill="white" fillOpacity="0.602" />
		</svg>
	);
};
