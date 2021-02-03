import React, { useContext } from 'react';
import { Modal } from 'screens/Constructor/components/Modal';
import { useModal } from 'hooks/useModal';
import styled from 'styled-components';
import TextInput from 'components/TextInput';
import { TreeContext } from 'screens/Constructor';
import { useParams } from 'react-router-dom';
import usePages from 'screens/Pages/hooks/usePages';

const Configure = styled.div`
  box-sizing: border-box;
  outline: none;
  position: absolute;
  right: 5px;
  top: -5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: grey;
`;

const Type = styled.p<{ inside?: boolean }>`
  width: ${({ inside }) => (inside ? '100%' : '')};
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
        <Configure onClick={show}>...</Configure>
      </>
    );
  };

  component.type = type;
  component.componentName = componentName;
  component.background = background;

  return component;
};

export default withConfiguration;
