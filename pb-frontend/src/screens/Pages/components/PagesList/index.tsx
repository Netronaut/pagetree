import React from 'react';
import usePages from 'src/screens/Pages/hooks/usePages';
import { Link } from 'react-router-dom';
import './index.scss';

const PagesList = () => {
  const { pages } = usePages();

  return (
    <div className="list">
      {pages.map(({ title, route, _id }) => (
        <div key={_id} className="page-row">
          {title}
          <Link to={`/constructor/${_id}`}>{route}</Link>
        </div>
      ))}
    </div>
  );
};

export default PagesList;
