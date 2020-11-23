import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
import usePages from '../../hooks/usePages';
import Button from 'src/components/Button';
import { confirmAlert } from 'react-confirm-alert';
import { Helmet } from 'react-helmet';

type PageProps = {
  id: string;
};

const Page: React.FC<PageProps> = ({ id }) => {
  const { page, deletePage } = usePages(id);
  const { push } = useHistory();

  const onDelete = useCallback(() => {
    confirmAlert({
      title: 'Are you sure?',
      buttons: [
        {
          label: 'Cancel',
          onClick: () => {
            'Cancel';
          },
        },
        {
          label: 'Delete',
          onClick: () => {
            deletePage(id);
            push('/');
          },
        },
      ],
    });
  }, [id]);

  if (!page) return null;

  const { title, route } = page;

  return (
    <div className="container">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h1>Page Name: {title}</h1>
      <h2>Route: /{route}</h2>
      <Button
        title="Delete"
        type={'outline'}
        color={'red'}
        onClick={onDelete}
      />
    </div>
  );
};

export default Page;
