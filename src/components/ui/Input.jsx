import React from "react";
import PropTypes from "prop-types";

function Input({
	id,
	name,
	label,
	type = "text",
	value,
	onChange,
	placeholder = "",
	disabled = false,
	required = false,
	error = "",
	helperText = "",
	className = "",
	style = {},
	inputStyle = {},
	...props
}) {
	return (
		<div className={className} style={{ display: "grid", gap: 6, ...style }}>
			{label ? (
				<label htmlFor={id} style={{ color: "#e2e8f0", fontWeight: 600 }}>
					{label}
				</label>
			) : null}

			<input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				disabled={disabled}
				required={required}
				style={{
					backgroundColor: "#0b1220",
					color: "#f8fafc",
					border: `1px solid ${error ? "#ef4444" : "#334155"}`,
					borderRadius: 8,
					padding: "10px 12px",
					outline: "none",
					...inputStyle,
				}}
				{...props}
			/>

			{error ? (
				<small style={{ color: "#f87171" }}>{error}</small>
			) : helperText ? (
				<small style={{ color: "#94a3b8" }}>{helperText}</small>
			) : null}
		</div>
	);
}

Input.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.node,
	type: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	error: PropTypes.string,
	helperText: PropTypes.node,
	className: PropTypes.string,
	style: PropTypes.object,
	inputStyle: PropTypes.object,
};

export default Input;
