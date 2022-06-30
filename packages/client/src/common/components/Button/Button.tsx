import Button from "@mui/material/Button";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  color:
  | "error"
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning";
}

export const CustomButton: React.FC<ButtonProps> = ({
	title,
	onClick,
	type,
	color,
}: ButtonProps) => {
	return (
		<Button color={color} variant="contained" type={type} onClick={onClick}>
			{title}
		</Button>
	);
};
