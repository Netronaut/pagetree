import React, { ReactElement, useState, useEffect } from 'react';
import { BrandIcon, EditPageModal, PageEntity, PageList } from '@pagetree/components';
import { getPages, removePage, savePage } from './api';
import { DashboardRoot } from './Dashboard.styles';
import { useHistory } from 'react-router';

export const Dashboard = (): ReactElement => {
  const [pages, setPages] = useState<Array<PageEntity>>([]);
  const [editPage, setEditPage] = useState<PageEntity | null>(null);

  const history = useHistory();

  useEffect(() => {
    getPages().then((data) => setPages(data));
  }, []);

  const handleSave = async (page: PageEntity) => {
    const data = await savePage({ version: '1', starred: false, ...page });

    if (page.id) {
      setPages(pages.map((page) => (page.id === data.id ? data : page)));
    } else {
      setPages(pages.concat(data));
    }

    setEditPage(null);
  };

  const handleRemove = async (page: PageEntity) => {
    const data = await removePage(String(page.id));
    setPages(pages.filter(({ id }) => id !== data.id));
  };

  return (
    <DashboardRoot>
      <BrandIcon width="48" height="48" fill />

      <PageList
        pages={pages}
        onAdd={() => setEditPage({ path: '', title: '' })}
        onEdit={setEditPage}
        onUpdate={handleSave}
        onRemove={handleRemove}
        onSelect={({ id }) => history.push(`/pagebuilder/${id}`)}
      />

      {editPage && (
        <EditPageModal page={editPage} onSave={handleSave} onClose={() => setEditPage(null)} />
      )}
    </DashboardRoot>
  );
};
