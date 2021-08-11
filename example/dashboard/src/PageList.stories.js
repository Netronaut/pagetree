import React from 'react';
import { PageList } from './PageList';

export default {
  title: 'Example/PageList',
  component: PageList,
};

export const pageList = (args) => <PageList {...args} />;

pageList.args = {
  pages: [
    {
      id: 1,
      title: 'News | Unterhaltung',
      path: 'item-one',
      isPined: true,
      version: 'Version 2, Published',
    },
    {
      id: 2,
      title: 'A cool and potentially long page title...',
      path: 'item-two',
      version: 'Version 31, Published',
    },
    {
      id: 3,
      title: 'Homepage',
      path: 'item-three',
      version: 'Version 12, Published, 3 changes',
    },
    {
      id: 4,
      title: 'Gute Zeiten Schlechte Zeiten | Alle Videos',
      path: 'item-four',
      version: 'Version 5, Published',
    },
  ],
};

export const withLongText = (args) => <PageList {...args} />;

withLongText.args = {
  pages: [
    {
      id: 1,
      title:
        'Item One Item OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem OneItem One',
      path: 'item-one',
    },
  ],
};
