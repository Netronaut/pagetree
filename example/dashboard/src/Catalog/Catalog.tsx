import React, { ReactElement, useState } from 'react';
import {
  CatalogWrapper,
  CatalogToggleLabel,
  CatalogTags,
  CatalogContainer,
  CatalogHeader,
} from './Catalog.styles';
import { CatalogList } from './CatalogList';

import { Tag } from '../Tag';

const dummyTags = ['latest', 'tag name 1', 'tag name 2'];

import { SearchInput } from '../SearchInput';
import { CloseIcon } from '../icons';

export interface CatalogProps {
  expanded?: boolean;
}

export const Catalog = ({ expanded }: CatalogProps): ReactElement => {
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(Boolean(expanded));

  return (
    <CatalogWrapper expanded={isExpanded}>
      {isExpanded ? (
        <>
          <CatalogHeader expanded={expanded || false}>
            <SearchInput
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
            />
            <CatalogTags expanded={expanded || false}>
              {dummyTags.map((tag, index) => (
                <Tag key={index} selected={index == 0}>
                  #{tag}
                </Tag>
              ))}
            </CatalogTags>
          </CatalogHeader>
          <CatalogContainer>
            <CatalogList searchValue={searchValue} />
          </CatalogContainer>
        </>
      ) : null}
      {!isExpanded ? <CatalogToggleLabel>Add Components</CatalogToggleLabel> : null}
      <button onClick={() => setIsExpanded(!isExpanded)}>
        <CloseIcon />
      </button>
    </CatalogWrapper>
  );
};
