import React, { ReactElement, useState, useMemo } from 'react';
import { CatalogComponentDescription } from '@pagio/builder';
import {
  CatalogWrapper,
  CatalogToggleLabel,
  CatalogTags,
  CatalogBody,
  CatalogHeader,
} from './Catalog.styles';
import { CatalogList } from './CatalogList';

import { Tag } from '../Tag';

import { SearchInput } from '../SearchInput';
import { CloseIcon } from '../icons';

export interface CatalogProps {
  expanded?: boolean;
  components: Array<CatalogComponentDescription>;
}

export const Catalog = ({ expanded, components }: CatalogProps): ReactElement => {
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(Boolean(expanded));
  const tags = useMemo(() => Array.from(new Set(components.flatMap(({ tags }) => tags)).values()));

  return (
    <CatalogWrapper expanded={isExpanded}>
      {isExpanded ? (
        <>
          <CatalogHeader expanded={isExpanded || false}>
            <SearchInput
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
            />
            <CatalogTags expanded={isExpanded || false}>
              {tags.map((tag, index) => (
                <Tag key={index} selected={index == 0}>
                  #{tag}
                </Tag>
              ))}
            </CatalogTags>
          </CatalogHeader>
          <CatalogBody>
            <CatalogList components={components} searchValue={searchValue} />
          </CatalogBody>
        </>
      ) : null}
      {!isExpanded ? <CatalogToggleLabel>Add Components</CatalogToggleLabel> : null}
      <button onClick={() => setIsExpanded(!isExpanded)}>
        <CloseIcon />
      </button>
    </CatalogWrapper>
  );
};
