import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { useTranslation } from "react-i18next";


type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;
interface SelectInputProps extends InputProps {
	name: string;
	label: string;
	children: React.ReactNode;
}

export const SelectInput: React.FC<SelectInputProps> = ({ children, label, ...props }) => {
	const { t } = useTranslation();
	const [field, meta] = useField(props);
	const formikProps = useFormikContext();
	const [value, setValue] = useState("");

	return (
		<FormControl>
			<InputLabel id="select-label">{label}</InputLabel>
			<Select
				inputProps={field}
				labelId="select-label"
				label={label}
				error={meta.touched && meta.error ? true : false}
				value={value}
				onChange={e => {
					formikProps.setFieldValue(props.name, e.target.value);
					setValue(e.target.value);
				}}
			>
				{children}
			</Select>
			{meta.touched && meta.error && <FormHelperText error={true}>{t(`${meta.error}`)}</FormHelperText>}
		</FormControl>
	);
};

