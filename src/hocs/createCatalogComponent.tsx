import React, { useContext } from 'react';
import { Modal } from '../components/Modal';
import { useModal } from '../hooks';
import styled from 'styled-components';
import { TreeContext } from '../utils/context';
import { ModalButton } from '../components/Modal/componentsStyles';
import { Flex } from '../componentsStyles';

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
    props: { fieldName: string; label: string; groupName: string }[];
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

    const configurations = configuration.props.map(({ fieldName, label, groupName }) => {
      return {
        value: pageConfig?.[id]?.[fieldName] || '',
        label: label,
        field: fieldName,
        groupName: groupName,
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
            <Modal onOpenClose={onModalClose}>
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
              <Flex mt={16} px={50}>
                <ModalButton mainStream>Cancel</ModalButton>
                <ModalButton mainStream whiteBg>OK</ModalButton>
              </Flex>
            </Modal>
          )}
          <Configure onClick={show}>...</Configure>
        </WrappedComponent>
      </>
    );
  };

  Component.type = configuration.type;
  Component.componentName = configuration.componentName;
  Component.groupName = configuration.props[0].groupName;

  return Component;
};

export type CatalogComponent = ReturnType<typeof createCatalogComponent>;

export type Components = CatalogComponent[];
