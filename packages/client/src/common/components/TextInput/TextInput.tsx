import { FieldMetaProps, useField } from 'formik';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import TextField from '@mui/material/TextField';

type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;
interface TextInputProps extends InputProps {
	name: string;
	label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<TextField
				inputProps={field}
				label={label}
				type={props.type}
				helperText={meta.touched? meta.error : " "}
				error={meta.touched && meta.error ? true : false} 
			/>
		</>
	);
};
