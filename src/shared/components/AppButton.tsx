import Button from "@mui/material/Button";

interface IAppButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  text: string;
  disabled?: boolean;
}

export function AppButton({
  text,
  onClick,
  disabled,
  type = "submit",
}: IAppButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      {text}
    </Button>
  );
}
