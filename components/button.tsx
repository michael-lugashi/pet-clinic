
type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  frontAdornment?: React.ReactNode;
  backAdornment?: React.ReactNode;
};

const Button = ({ children, onClick, frontAdornment, backAdornment }: ButtonProps) => {
  return (
    <button className="bg-dark-purple text-white px-4 py-2 rounded-lg hover:bg-dark-purple/80 transition-colors duration-300 flex items-center gap-2" onClick={onClick}>
      {frontAdornment}
      {children}
      {backAdornment}
    </button>
  );
};

export default Button;