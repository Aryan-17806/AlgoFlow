import React from "react";
import PropTypes from "prop-types";

function Card({
	children,
	title,
	footer,
	className = "",
	style = {},
	contentStyle = {},
	...props
}) {
	return (
		<section
			className={className}
			style={{
				backgroundColor: "#0f172a",
				border: "1px solid #1e293b",
				borderRadius: 12,
				color: "#f8fafc",
				overflow: "hidden",
				...style,
			}}
			{...props}
		>
			{title ? (
				<header
					style={{
						padding: "12px 16px",
						borderBottom: "1px solid #1e293b",
						fontWeight: 700,
					}}
				>
					{title}
				</header>
			) : null}

			<div
				style={{
					padding: "16px",
					...contentStyle,
				}}
			>
				{children}
			</div>

			{footer ? (
				<footer
					style={{
						padding: "12px 16px",
						borderTop: "1px solid #1e293b",
						color: "#cbd5e1",
					}}
				>
					{footer}
				</footer>
			) : null}
		</section>
	);
}

Card.propTypes = {
	children: PropTypes.node,
	title: PropTypes.node,
	footer: PropTypes.node,
	className: PropTypes.string,
	style: PropTypes.object,
	contentStyle: PropTypes.object,
};

export default Card;
