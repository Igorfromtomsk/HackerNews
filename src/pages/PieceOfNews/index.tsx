import React from 'react';
import { useParams } from 'react-router-dom';

const PieceOfNews: React.FC = () => {
  console.log(useParams());
  return (
    <span>PieceOfNews</span>
  );
}

export default PieceOfNews;
