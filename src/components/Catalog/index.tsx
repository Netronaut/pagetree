import React from 'react';
import { GroupWrapper } from './GroupWrapper';
import { ComponentGroups } from '../../hocs/createCatalogComponent';

type Props = {
  componentGroups?: ComponentGroups;
};

export const Catalog = ({ componentGroups }: Props) => {
  return (
    componentGroups?.map(group =>
      <GroupWrapper key={group.name} group={group} />
    )
  );
};
