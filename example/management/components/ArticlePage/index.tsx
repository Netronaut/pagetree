import React, { useState } from 'react';

type Props = {
  prop?: (val: any) => void;
};

export const ArticlePage: React.FC<Props> = ({ prop }) => {
  const [value, setValue] = useState('');
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue(value);
  };
  return (
    <>
      <h1>Create Article</h1>
      <input onChange={handleChange} />
      <h3>{value}</h3>
    </>
  );
};
