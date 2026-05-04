import React from "react";
import PropTypes from "prop-types";

function PlayButton({
	onClick,
	disabled = false,
	children = "Play",
	className = "",
	style = {},
	...props
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={className}
			style={{
				padding: "10px 16px",
				borderRadius: 8,
				border: "none",
				backgroundColor: disabled ? "#64748b" : "#16a34a",
				color: "#ffffff",
				fontWeight: 600,
				cursor: disabled ? "not-allowed" : "pointer",
				transition: "background-color 0.2s ease",
				...style,
			}}
			{...props}
		>
			{children}
		</button>
	);
}

export default PlayButton;

PlayButton.propTypes = {
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	style: PropTypes.object,
};
