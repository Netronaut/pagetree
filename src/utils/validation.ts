import { TBasePage } from 'types';

export const validatePageField = (
  fieldName: keyof TBasePage,
  value?: string,
) => {
  switch (fieldName) {
    case 'title':
    case 'route': {
      if (!value?.trim().length) return 'Required';
    }
  }
  return '';
};
