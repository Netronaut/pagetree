import React, { ReactElement, useState, useMemo, useContext } from 'react';
import { CatalogComponentDescription, PageTreeStateContext, useDrag } from '@pagetree/core';
import { Tag } from '../Tag';
import { CloseIconOutline, SearchIconOutline } from '../icons';
import { Default } from '../Typography';
import { Input } from '../Input';
import {
  CatalogRoot,
  CatalogTags,
  CatalogBody,
  CatalogHeader,
  CatalogItem,
  CatalogOpenCloseButton,
} from './Catalog.styles';

export interface CatalogProps {
  hide?: boolean;
  expanded?: boolean;
}

export const Catalog = ({ hide = false, ...props }: CatalogProps): ReactElement => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [expanded, setExpanded] = useState<boolean>(props.expanded || false);
  const dragProps = useDrag();

  const { components } = useContext(PageTreeStateContext);

  const tags = useMemo(
    () =>
      Array.from(new Set(components?.flatMap(({ tags }) => tags)).values()).filter(
        (tag) => tag !== undefined,
      ),
    [components],
  ) as Array<string>;

  const filterByTags = ({ tags }: CatalogComponentDescription) =>
    selectedTags.length === 0 || selectedTags.some((tag) => tags?.includes(tag));

  const searchByText = ({ label, type }: CatalogComponentDescription) =>
    searchValue === '' ||
    [label, type].some((value) =>
      value?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
    );

  const onSelectTag = (tag: string) =>
    setSelectedTags(
      selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : selectedTags.concat(tag),
    );

  return (
    <CatalogRoot hide={hide} expanded={expanded}>
      <CatalogHeader expanded={expanded}>
        {expanded && (
          <>
            <Input
              placeholder="Search for component name or title"
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              icon={<SearchIconOutline />}
            />
            <CatalogTags>
              {tags.map((tag, index) => (
                <Tag
                  key={index}
                  selected={selectedTags.includes(tag)}
                  onClick={() => onSelectTag(tag)}
                >
                  {tag}
                </Tag>
              ))}
            </CatalogTags>
          </>
        )}
        <CatalogOpenCloseButton expanded={expanded} onClick={() => setExpanded(!expanded)}>
          <Default>Add Components</Default>
          <CloseIconOutline />
        </CatalogOpenCloseButton>
      </CatalogHeader>
      {expanded && (
        <CatalogBody>
          {components
            ?.filter(filterByTags)
            .filter(searchByText)
            .map((item, i) => (
              <CatalogItem
                key={`catalog-item-${i}`}
                data-component-description={JSON.stringify({ type: item.type })}
                {...dragProps}
              >
                {item.label}
              </CatalogItem>
            ))}
        </CatalogBody>
      )}
    </CatalogRoot>
  );
};
