import * as React from 'react';

type SeparatorProps = {
  id: string;
  addPrevComponent: (id: string) => void;
  isDragging: boolean;
};

const Separator = ({ id, addPrevComponent, isDragging }: SeparatorProps) => {
  return (
    <div className="separator-wrapper">
      <div
        className={isDragging ? 'separator' : 'separator first'}
        key={`separator_${id}`}
        id={id}
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
