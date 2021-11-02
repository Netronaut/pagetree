import React, { ReactElement, useState, useMemo } from 'react';
import { CatalogComponentDescription, useDrag } from '@pagetree/builder';
import { Tag } from '../Tag';
import { CloseIcon, SearchIcon } from '../icons';
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
  components: Array<CatalogComponentDescription>;
  expanded?: boolean;
  onChangeExpanded?: (expanded: boolean) => void;
}

export const Catalog = ({
  components,
  expanded = false,
  onChangeExpanded = () => undefined,
}: CatalogProps): ReactElement => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  const tags = useMemo(
    () => Array.from(new Set(components.flatMap(({ tags }) => tags)).values()),
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
    <CatalogRoot expanded={expanded}>
      <CatalogHeader expanded={expanded}>
        {expanded && (
          <>
            <Input
              placeholder="Search for component name or title"
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              icon={<SearchIcon />}
            />
            <CatalogTags expanded={expanded}>
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
        <CatalogOpenCloseButton expanded={expanded} onClick={() => onChangeExpanded(!expanded)}>
          <Default>Add Components</Default>
          <CloseIcon />
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
                {...useDrag()}
              >
                {item.label}
              </CatalogItem>
            ))}
        </CatalogBody>
      )}
    </CatalogRoot>
  );
};
