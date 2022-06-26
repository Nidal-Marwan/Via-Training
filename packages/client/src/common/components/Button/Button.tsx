import Button from "@mui/material/Button";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  style?: {};
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
  style,
}: ButtonProps) => {
  return (
    <Button style={style} color={color} variant="contained" type={type} onClick={onClick}>
      {title}
    </Button>
  );
};
