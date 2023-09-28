import { CoursePart } from '../types';

interface ContentProps {
  parts: CoursePart[]
}

const Content = ({ parts }: ContentProps ) => {
  return (
    <>
      {parts.map(part => <p key={part.name} >{part.name} {part.exerciseCount}</p>)}
    </>
  );
};

export default Content;