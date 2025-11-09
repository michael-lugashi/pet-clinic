import Title from "./title"
import Button from "./button"

type HeaderProps = {
    title: string;
    subtitle: string;
    buttonText: string;
    onClick: () => void;
    buttonFrontAdornment?: React.ReactNode;
};

const Header = ({ title, subtitle, buttonText, onClick, buttonFrontAdornment: frontAdornment }: HeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <Title title={title} subtitle={subtitle} />
            <Button onClick={onClick} frontAdornment={frontAdornment}>
                {buttonText}
            </Button>
        </div>
    );
};

export default Header;