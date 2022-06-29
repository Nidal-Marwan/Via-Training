import { useField } from "formik";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { StyledTextField } from "./TextInput.style";

type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;
interface TextInputProps extends InputProps {
	name: string;
	label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
	const { t } = useTranslation();
	const [field, meta] = useField(props);
	return (
		<>
			<StyledTextField
				inputProps={field}
				label={label}
				type={props.type}
				helperText={meta.touched ? t(`${meta.error}`) : ""}
				error={meta.touched && meta.error ? true : false}
			/>
		</>
	);
};
