interface HeadlingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadlingProps> = ({ title, description }) => {
  return (
    <div className="flex-col py-4">
      <h1 className="uppercase font-bold text-lg sm:text-2xl tracking-widest">{title}</h1>
      <p className="text-muted-foreground text-xs sm:text-sm"> {description}</p>
    </div>
  );
};

export default Heading;
