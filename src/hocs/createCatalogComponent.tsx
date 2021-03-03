import React, { useContext } from 'react';
import { Modal } from '../components/Modal';
import { useModal } from '../hooks';
import styled from 'styled-components';
import { TreeContext } from '../utils/context';

export type ProductionComponentProps = {
  id: string;
  config?: Record<string, string>;
};

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

const Type = styled.span<{ inside?: boolean }>`
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

export const createCatalogComponent = (
  WrappedComponent: React.FC,
  ProductionWrappedComponent: React.FC<ProductionComponentProps>,
  configuration: {
    type: string;
    componentName: string;
    props: { fieldName: string; label: string }[];
  },
) => {
  const Component = function(props: { type: string; id: string }) {
    const { id, type } = props;
    const { modalShown, show, onModalClose } = useModal();
    const { onConfigChange, config: pageConfig, showPreview } = useContext(
      TreeContext,
    );

    if (showPreview) {
      return (
        <ProductionWrappedComponent {...props} config={pageConfig?.[id]} />
      );
    }

    const configurations = configuration.props.map(({ fieldName, label }) => {
      return {
        value: pageConfig?.[id]?.[fieldName] || '',
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
        <WrappedComponent>
          <Type inside>{type}</Type>
          {modalShown && (
            <Modal onClose={onModalClose}>
              <Type>{type}</Type>
              {configurations?.map(({ field, value, label }) => (
                <input
                  required
                  placeholder={`Enter ${label}`}
                  key={field}
                  value={value}
                  onChange={event => onChange(event, field)}
                />
              ))}
            </Modal>
          )}
          <Configure onClick={show}>...</Configure>
        </WrappedComponent>
      </>
    );
  };

  Component.type = configuration.type;
  Component.componentName = configuration.componentName;

  return Component;
};

export type CatalogComponent = ReturnType<typeof createCatalogComponent>;

export type Components = CatalogComponent[];
