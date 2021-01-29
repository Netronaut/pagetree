import React, { useContext } from 'react';
import { Modal } from 'src/screens/Constructor/components/Modal';
import { useModal } from 'src/hooks/useModal';
import styled from 'styled-components';
import TextInput from 'src/components/TextInput';
import { TreeContext } from 'src/screens/Constructor';
import { useParams } from 'react-router-dom';
import usePages from 'src/screens/Pages/hooks/usePages';

const Configure = styled.div`
  box-sizing: border-box;
  outline: none;
  position: absolute;
  right: 0;
  top: 0;
  border: 1px solid;
  padding: 5px;
  cursor: pointer;
`;

const Type = styled.div<{ inside?: boolean }>`
  outline: none;
  position: absolute;
  left: 10px;
  font-size: ${({ inside }) => (inside ? '20px' : '15px')};
  top: ${({ inside }) => (inside ? '' : '-15px')};
  background: ${({ inside }) => (inside ? 'transparent' : 'white')};
  border-radius: 20px;
  padding: 5px;
  box-sizing: border-box;
  text-transform: uppercase;
`;

const withConfiguration = (
  WrappedComponent: React.FC<{ id: string }>,
  config: { fieldName: string; label: string }[],
  {
    type,
    componentName,
    background,
  }: { type: string; componentName: string; background: string },
) => {
  const component = function (props: { type: string; id: string }) {
    const { id, type } = props;
    const { modalShown, show, onModalClose } = useModal();
    const { onConfigChange } = useContext(TreeContext);
    const location = useParams<{ id: string }>();
    const _id = location.id;
    const { page } = usePages(_id);

    const configurations = config.map(({ fieldName, label }) => {
      return {
        value:
          page?.config && page?.config?.[id] && page?.config?.[id]?.[fieldName]
            ? page?.config[id][fieldName]
            : '',
        label: label,
        field: fieldName,
      };
    });

    const onChange = (e: React.FormEvent<HTMLInputElement>, field: string) => {
      const value = e.currentTarget.value;
      onConfigChange(id, field, value);
    };
    return (
      <>
        <WrappedComponent {...props} />
        <Type inside>{type}</Type>
        {modalShown && (
          <Modal onClose={onModalClose}>
            <Type>{type}</Type>
            {configurations?.map(({ field, value, label }) => (
              <TextInput
                required
                placeholder={`Enter ${label}`}
                key={field}
                value={value}
                onChange={(event) => onChange(event, field)}
              />
            ))}
          </Modal>
        )}
        <Configure onClick={show}>Configure</Configure>
      </>
    );
  };

  component.type = type;
  component.componentName = componentName;
  component.background = background;

  return component;
};

export default withConfiguration;
