import React from "react";
import PropTypes from "prop-types";

const variantStyles = {
	primary: {
		backgroundColor: "#2563eb",
		color: "#ffffff",
		border: "1px solid #1d4ed8",
	},
	success: {
		backgroundColor: "#16a34a",
		color: "#ffffff",
		border: "1px solid #15803d",
	},
	warning: {
		backgroundColor: "#d97706",
		color: "#ffffff",
		border: "1px solid #b45309",
	},
	danger: {
		backgroundColor: "#dc2626",
		color: "#ffffff",
		border: "1px solid #b91c1c",
	},
	secondary: {
		backgroundColor: "#334155",
		color: "#ffffff",
		border: "1px solid #475569",
	},
	ghost: {
		backgroundColor: "transparent",
		color: "#e2e8f0",
		border: "1px solid #475569",
	},
};

function Button({
	children,
	onClick,
	type = "button",
	variant = "primary",
	disabled = false,
	className = "",
	style = {},
	...props
}) {
	const selectedVariant = variantStyles[variant] || variantStyles.primary;

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={className}
			style={{
				padding: "10px 16px",
				borderRadius: 8,
				fontWeight: 600,
				lineHeight: 1.2,
				cursor: disabled ? "not-allowed" : "pointer",
				opacity: disabled ? 0.65 : 1,
				transition: "all 0.2s ease",
				...selectedVariant,
				...style,
			}}
			{...props}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	type: PropTypes.oneOf(["button", "submit", "reset"]),
	variant: PropTypes.oneOf(["primary", "success", "warning", "danger", "secondary", "ghost"]),
	disabled: PropTypes.bool,
	className: PropTypes.string,
	style: PropTypes.object,
};

export default Button;
