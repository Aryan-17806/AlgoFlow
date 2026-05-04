import React from "react";
import PropTypes from "prop-types";

function StepButton({
	onClick,
	disabled = false,
	children = "Step",
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
				backgroundColor: disabled ? "#64748b" : "#2563eb",
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

export default StepButton;

StepButton.propTypes = {
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	style: PropTypes.object,
};
