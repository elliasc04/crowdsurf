import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

type LinkProps = {
	variant: "link";
} & React.ComponentProps<"a"> &
	VariantProps<typeof buttonStyles>;

type ButtonProps = {
	variant?: "button";
} & React.ComponentProps<"button"> &
	VariantProps<typeof buttonStyles>;

type NextLinkProps = {
	variant: "next-link";
} & React.ComponentProps<typeof Link> &
	VariantProps<typeof buttonStyles>;

type PolymorphicProps = LinkProps | ButtonProps | NextLinkProps;

type PolymorphicButton = {
	(props: LinkProps): JSX.Element;
	(props: ButtonProps): JSX.Element;
	(props: NextLinkProps): JSX.Element;
};

export const buttonStyles = cva(
	"inline-flex select-none items-center justify-center focus:outline-none focus-visible:ring focus-visible:ring-highlight group transition-button focus-visible:border-transparent",
	{
		variants: {
			rounded: {
				md: "rounded-md"
			},
			size: {
				md: "px-4 py-2",
				sm: "px-2 py-2",
				xs: "px-1 py-1",
				none: ""
			},
			shade: {
				"none": "",
				"primary": "bg-primary text-white hover:bg-primary-bold",
				"primitive":
					"bg-primitive-faint border border-primitive-edge text-primitive-type hover:bg-primitive",
				"primitive-borderless": "text-primitive-type hover:bg-primitive"
			},
			fontSize: {
				md: "text-base",
				sm: "text-sm",
				xs: "text-xs"
			},
			fontWeight: {
				thin: "font-thin",
				extralight: "font-extralight",
				light: "font-light",
				normal: "font-normal",
				medium: "font-medium",
				semibold: "font-semibold",
				bold: "font-bold",
				extrabold: "font-extrabold"
			}
		},
		defaultVariants: {
			fontSize: "sm",
			fontWeight: "medium",
			size: "md",
			rounded: "md",
			shade: "primitive"
		}
	}
);

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, PolymorphicProps>(
	(props, ref) => {
		const { type, className, children, ...rest } = props;

		switch (type) {
			case "link":
				return (
					<a
						className={clsx(buttonStyles(props), className)}
						ref={ref as React.ForwardedRef<HTMLAnchorElement>}
						{...(rest as LinkProps)}
					>
						{children}
					</a>
				);
			case "next-link":
				return (
					<Link
						className={clsx(buttonStyles(props), className)}
						ref={ref as React.ForwardedRef<HTMLAnchorElement>}
						{...(rest as NextLinkProps)}
					>
						{children}
					</Link>
				);
			default:
				return (
					<button
						className={clsx(buttonStyles(props), className)}
						ref={ref as React.ForwardedRef<HTMLButtonElement>}
						{...(rest as ButtonProps)}
					>
						{children}
					</button>
				);
		}
	}
) as PolymorphicButton;
