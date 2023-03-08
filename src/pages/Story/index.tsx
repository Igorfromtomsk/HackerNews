import React from 'react';
import { useParams } from 'react-router-dom';

const Story: React.FC = () => {
  console.log(useParams());
  return (
    <span>PieceOfNews</span>
  );
};

export default Story;
