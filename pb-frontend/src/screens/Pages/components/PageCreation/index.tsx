import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet';
import { TBasePage, TPage } from 'types';
import { validatePageField } from 'utils/validation';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import usePageCreation from '../../hooks/usePageCreation';

type Errors = Record<string, string>;

const getPrefilledRoute = (name: string) =>
  name.toLowerCase().replace(/ /g, '-');

const initialValues = {
  title: '',
  route: '',
};

const PageCreation = () => {
  const { createPage, pathExists } = usePageCreation();

  const [values, setValues] = useState<TBasePage | TPage>(initialValues);

  const [errors, setErrors] = useState<Errors>({});

  const checkErrors = () => {
    const errors = Object.entries(values).reduce((acc, [key, value]) => {
      acc[key] = validatePageField(key as keyof TBasePage, value as string);
      return acc;
    }, {} as Errors);

    if (!errors.route) {
      errors.route = pathExists(values.route) ? 'Route already exists' : '';
    }

    const hasError = Object.values(errors).some((err) => err);

    if (hasError) {
      setErrors(errors);
    }

    return hasError;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkErrors()) {
      createPage(values);
      setValues(initialValues);
      setErrors({});
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(e.target.name === 'title' &&
      prev.route === getPrefilledRoute(prev.route)
        ? { route: getPrefilledRoute(e.target.value) }
        : {}),
    }));
  };

  return (
    <div className="form-wrapper">
      <Helmet>
        <title>Create Page</title>
      </Helmet>
      <h1 className="title">Create Page</h1>
      <form className="form" onSubmit={handleSubmit}>
        <TextInput
          name="title"
          required
          placeholder="Route name"
          onChange={handleChange}
          value={values.title}
          error={errors.title}
        />
        <TextInput
          name="route"
          required
          placeholder="route"
          prefilledText="/"
          onChange={handleChange}
          value={values.route}
          error={errors.route}
        />
        <Button
          title="Submit"
          color="blue"
          onClick={() => handleSubmit}
          fullWidth
          marginTop
        />
      </form>
    </div>
  );
};

export default PageCreation;
