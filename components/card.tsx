type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <div className="bg-white rounded-lg p-4 border border-black/10">{children}</div>;
};

export default Card;