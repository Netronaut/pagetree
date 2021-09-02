import React, { ReactElement, useState, useMemo } from 'react';
import { CatalogComponentDescription, useDrag } from '@pagio/builder';
import {
  CatalogWrapper,
  CatalogToggleLabel,
  CatalogTags,
  CatalogBody,
  CatalogHeader,
  CatalogItem,
} from './Catalog.styles';

import { Tag } from '../Tag';

import { SearchInput } from '../SearchInput';
import { CloseIcon } from '../icons';

export interface CatalogProps {
  expanded?: boolean;
  components: Array<CatalogComponentDescription>;
}

export const Catalog = ({ expanded = false, components }: CatalogProps): ReactElement => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  const tags = useMemo(
    () => Array.from(new Set(components.flatMap(({ tags }) => tags)).values()),
    [components],
  ) as Array<string>;

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
                <Tag
                  key={index}
                  selected={index == 0}
                  onClick={() =>
                    setSelectedTags(
                      selectedTags.includes(tag)
                        ? selectedTags.filter((t) => t !== tag)
                        : selectedTags.concat(tag),
                    )
                  }
                >
                  #{tag}
                </Tag>
              ))}
            </CatalogTags>
          </CatalogHeader>
          <CatalogBody>
            {components
              ?.filter(
                ({ tags }) =>
                  selectedTags.length === 0 || selectedTags.some((tag) => tags?.includes(tag)),
              )
              .filter(
                ({ label, type }) =>
                  searchValue === '' ||
                  [label, type].some((value) =>
                    value?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
                  ),
              )
              .map((item, i) => (
                <CatalogItem
                  key={`catalog-item-${i}`}
                  data-component-description={JSON.stringify({ type: item.type })}
                  {...useDrag()}
                >
                  <div>{item.label || item.type}</div>
                </CatalogItem>
              ))}
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
