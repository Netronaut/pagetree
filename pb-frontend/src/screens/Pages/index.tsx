import React from 'react';
import './index.scss';
import PageCreation from './components/PageCreation';
import PagesList from './components/PagesList';

const Pages = () => {
  return (
    <div className="container">
      <PageCreation />
      <PagesList />
    </div>
  );
};

export default Pages;
