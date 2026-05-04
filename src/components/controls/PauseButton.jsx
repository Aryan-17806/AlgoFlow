import React from "react";
import PropTypes from "prop-types";

function PauseButton({
	onClick,
	disabled = false,
	children = "Pause",
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
				backgroundColor: disabled ? "#64748b" : "#d97706",
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

export default PauseButton;

PauseButton.propTypes = {
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	style: PropTypes.object,
};
