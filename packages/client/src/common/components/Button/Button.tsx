interface ButtonProps {
  border?: string;
  color?: string;
  title: string;
  padding?: string;
  onClick?: () => void;
  radius?: string;
  width?: string;
  type: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  type,
  border,
  radius,
  color,
  width,
  padding,
}: ButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        padding,
        width,
      }}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
