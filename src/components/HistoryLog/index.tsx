// import { nanoid } from 'nanoid';
import React, { useContext } from 'react';
// var diff = require('changeset');
import { HistoryLogContext } from '../../../example/strapi/src/context';

// type Change = {
//   type: string;
//   key: string[];
//   value: string;
// };

// type Props = {
//   change: Change[];
// };

export const HistoryLog: React.FC = () => {
  const { historyLog } = useContext(HistoryLogContext);

  return (
    <div>
      <h1>History</h1>
      {historyLog?.map((historyItem) => {
        return <p>{historyItem.value}</p>;
      })}
    </div>
  );
};
