import React from "react"
import { Field } from "formik";

export const FormikField = ({
	name,
	errors = {},
	placeholder,
	label = '',
	type,
	fieldStyle,
	touched = {},
	onInput,
	feedback = '',
	feedbackResponse='',
	...args
}) => {

	const getInputClasses = (fieldname) => {
		if (touched[fieldname] && errors[fieldname]) {
			return 'is-invalid';
		}

		if (touched[fieldname] && !errors[fieldname]) {
			return 'is-valid';
		}

		return '';
	};

	const fieldname = name.trim()
	return (
		<div className="py-1">
			{label && <label>{label} </label>}

			<Field
				{...args}
				type={type}
				name={fieldname}
				autoComplete="off"
				errors={errors}
				placeholder={placeholder}
				className={`form-control ${type === "number" ? 'text-right' : ''} ${fieldStyle ? `form-control-${fieldStyle}` : ""} ${getInputClasses(fieldname)}`}
				onInput={onInput}
			/>
		
			{errors[fieldname] ? (
				<div className="fv-plugins-message-container invalid-feedback">
					<p>{errors[fieldname]}</p>
				</div>
			) : null}
		</div>
	);
};


