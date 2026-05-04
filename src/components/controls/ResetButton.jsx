import React from "react";
import PropTypes from "prop-types";

function ResetButton({
	onClick,
	disabled = false,
	children = "Reset",
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
				backgroundColor: disabled ? "#94a3b8" : "#475569",
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

export default ResetButton;

ResetButton.propTypes = {
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	style: PropTypes.object,
};
