import { AccordionItem } from './AccordionItem';

interface AccordionProps {
  items: { title: string; content: string }[];
}

const AccordionTerms: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="w-full p-3 my-8">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};
export default AccordionTerms