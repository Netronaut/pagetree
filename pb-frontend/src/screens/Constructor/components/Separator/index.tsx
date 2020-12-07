import * as React from 'react';

type SeparatorProps = {
  id: string;
  addPrevComponent: (id: string) => void;
};

const Separator = ({ id, addPrevComponent }: SeparatorProps) => {
  const firstSeparator = id === 'separator_0';
  return (
    <div className="separator-wrapper">
      <div
        className={firstSeparator ? 'separator first' : 'separator'}
        key={`separator_${id}`}
        id={id}
        style={{ height: 4, width: '100%', borderRadius: 10 }}
      >
        <div
          className="add-prev-component"
          onClick={() => addPrevComponent(id)}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default Separator;
