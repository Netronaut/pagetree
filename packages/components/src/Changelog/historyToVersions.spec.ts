import { historyToVersions } from './historyToVersions';

it('only unversioned', () => {
  const history = [
    {
      date: 'Mon, 06 Jun 2021 13:00:00',
      changes: [],
    },
    {
      date: 'Mon, 06 Jun 2021 13:01:00',
      changes: [],
    },
  ];
  const expected = {
    '<unversioned>': [
      {
        date: 'Mon, 06 Jun 2021 13:00:00',
        changes: [],
      },
      {
        date: 'Mon, 06 Jun 2021 13:01:00',
        changes: [],
      },
    ],
  };
  expect(historyToVersions(history)).toStrictEqual(expected);
});

it('versioned, without unversioned', () => {
  const history = [
    {
      date: 'Mon, 06 Jun 2021 13:00:00',
      changes: [],
    },
    {
      version: 'Version 1',
      date: 'Mon, 06 Jun 2021 13:11:11',
    },
  ];
  const expected = {
    '<unversioned>': [],
    'Version 1': [
      {
        version: 'Version 1',
        date: 'Mon, 06 Jun 2021 13:11:11',
      },
      {
        date: 'Mon, 06 Jun 2021 13:00:00',
        changes: [],
      },
    ],
  };
  expect(historyToVersions(history)).toStrictEqual(expected);
});

it('versioned and unversioned', () => {
  const history = [
    {
      date: 'Mon, 06 Jun 2021 13:00:00',
      changes: [],
    },
    {
      version: 'Version 1',
      date: 'Mon, 06 Jun 2021 13:11:11',
    },
    {
      date: 'Mon, 06 Jun 2021 14:22:22',
      changes: [],
    },
    {
      version: 'Version 2',
      date: 'Mon, 06 Jun 2021 14:33:33',
    },
    {
      date: 'Mon, 06 Jun 2021 14:44:44',
      changes: [],
    },
    {
      version: 'Version 3',
      date: 'Mon, 06 Jun 2021 14:55:55',
    },
    {
      date: 'Mon, 06 Jun 2021 14:66:66',
      changes: [],
    },
  ];
  const expected = {
    '<unversioned>': [
      {
        date: 'Mon, 06 Jun 2021 14:66:66',
        changes: [],
      },
    ],
    'Version 1': [
      {
        version: 'Version 1',
        date: 'Mon, 06 Jun 2021 13:11:11',
      },
      {
        date: 'Mon, 06 Jun 2021 13:00:00',
        changes: [],
      },
    ],
    'Version 2': [
      {
        version: 'Version 2',
        date: 'Mon, 06 Jun 2021 14:33:33',
      },
      {
        date: 'Mon, 06 Jun 2021 14:22:22',
        changes: [],
      },
    ],
    'Version 3': [
      {
        version: 'Version 3',
        date: 'Mon, 06 Jun 2021 14:55:55',
      },
      {
        date: 'Mon, 06 Jun 2021 14:44:44',
        changes: [],
      },
    ],
  };
  expect(historyToVersions(history)).toStrictEqual(expected);
});
