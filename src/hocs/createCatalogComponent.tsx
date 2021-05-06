import React, { useContext, useState } from 'react';
import { useModal } from '../hooks';
import styled from 'styled-components';
import { TreeContext } from '../utils/context';
import { H1 } from '../componentsStyles';
import { EditContent } from '../components/Modal/EditContent';
import { EditId } from '../components/Modal/EditId';

export type ProductionComponentProps = {
  id: string;
  config?: Record<string, string>;
};

const Configure = styled.div`
  box-sizing: border-box;
  outline: none;
  position: absolute;
  right: 23px;
  top: 12px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: #9D9D9D;
  font-family: auto;
`;

const Type = styled.span<{ inside?: boolean }>`
  outline: none;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${({ inside }) => (
    inside ? `
      position: absolute;
      left: 32px;
      top: -10px;
      padding: 0 6px 0;
      background: #fff;
      font-family: 'Gotham Pro';
      font-weight: 400;
      font-size: 19px;
      line-height: 15px;
      color: #9D9D9D;
    ` : `
      font-family: 'Gotham Pro', serif;
      font-weight: 700;
      font-size: 22px;
      line-height: 21.05px;
      color: #fff;
      text-align: center;
      margin-bottom: 21px;
    `
  )};
`;

export const createCatalogComponent = (
  WrappedComponent: React.FC,
  ProductionWrappedComponent: React.FC<ProductionComponentProps>,
  configuration: {
    type: string;
    componentName: string;
    props: { fieldName: string; label: string; }[];
  },
) => {
  const Component = function (props: { type: string; id: string }) {
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
        label,
        field: fieldName,
      };
    });

    let keyName = '';
    for (const key in pageConfig?.[id]) {
      if (Object.prototype.hasOwnProperty.call(pageConfig?.[id], key)) {
        keyName = key;
      }
    }
    const defaultValue = pageConfig?.[id]?.[keyName] || '';
    const [inputValue, setInputValue] = useState(defaultValue);

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setInputValue(value);
    };

    const onSave = (field: string) => {
      onConfigChange(id, field, inputValue);
      onModalClose();
    };

    const onCancel = () => {
      setInputValue(defaultValue);
      onModalClose();
    };

    const editComponentProps = {
      type,
      onChange,
      onSave,
      onCancel,
      onModalClose,
      inputValue,
    };

    return (
      <WrappedComponent>
        <Type inside>{type}</Type>
        {modalShown && configurations?.map(({ field, label }) => (
          <EditId
            field={field}
            label={label}
            {...editComponentProps}
            key={id}
          />
        ))}
        {configurations?.map(({ value }) => (<H1 key={id}>{value}</H1>))}
        <Configure onClick={show}>...</Configure>
      </WrappedComponent>
    );
  };

  Component.type = configuration.type;
  Component.componentName = configuration.componentName;

  return Component;
};

export type CatalogComponent = ReturnType<typeof createCatalogComponent>;
export type TComponentGroup = {
  name: string;
  components: CatalogComponent[];
};

export type Components = CatalogComponent[];
export type ComponentGroups = TComponentGroup[];

