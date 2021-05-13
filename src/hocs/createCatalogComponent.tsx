import React, { useContext, useState } from 'react';
import { useModal } from '../hooks';
import styled from 'styled-components';
import { TreeContext } from '../utils/context';
import { H1 } from '../componentsStyles';
import { EditContent } from '../components/Modal/EditContent';
import { EditId } from '../components/Modal/EditId';
import { Modal } from '../components/Modal';

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
    groupName?: string;
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

    let keyName = configuration.props[0].fieldName;
    const defaultValue = pageConfig?.[id]?.[keyName] || '';
    const defaultUserControlledId = pageConfig?.[id]?.userControlledId || '';
    const [inputValue, setInputValue] = useState(defaultValue);
    const [idByUser, setIdByUser] = useState(defaultUserControlledId);

    const onChangeId = (e: React.FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setIdByUser(value);
    };

    const onSaveId = (e: React.MouseEvent, field: string, userControlledId: string) => {
      onConfigChange(id, field, inputValue, userControlledId);
      onModalClose();
      e.stopPropagation();
    };

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setInputValue(value);
    };

    const onSave = (e: React.MouseEvent, field: string) => {
      onConfigChange(id, field, inputValue, defaultUserControlledId);
      onModalClose();
      e.stopPropagation();
    };

    const onCancel = (e: React.MouseEvent) => {
      setInputValue(defaultValue);
      setIdByUser(defaultUserControlledId)
      onModalClose();
      e.stopPropagation();
    };

    const editContentProps = {
      type,
      onChange,
      onSave,
      onCancel,
      onModalClose,
      inputValue,
    };

    const editIdProps = {
      type,
      onChangeId,
      onSaveId,
      onCancel,
      onModalClose,
      idByUser,
    };

    return (
      <WrappedComponent>
        <Type inside>{type}</Type>
        {modalShown && configurations?.map(({ field, label }) => (
          <Modal onClose={onModalClose} key={id}>
            {configuration.props[0].fieldName === 'articleId' ?
              <EditId
                field={field}
                label={label}
                {...editIdProps}
                key={configuration.componentName}
              />
              :
              <EditContent
                field={field}
                label={label}
                {...editContentProps}
                key={configuration.componentName}
              />
            }
          </Modal>
        ))}
        {configurations?.map(({ value }) => (<H1 key={id}>{value}</H1>))}
        {defaultUserControlledId && <span>id: {defaultUserControlledId}</span>}
        <Configure onClick={show}>...</Configure>
      </WrappedComponent>
    );
  };

  Component.type = configuration.type;
  Component.componentName = configuration.componentName;
  Component.groupName = configuration.groupName;

  return Component;
};

export type CatalogComponent = ReturnType<typeof createCatalogComponent>;

export type Components = CatalogComponent[];
