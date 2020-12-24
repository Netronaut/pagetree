import { Direction, remove } from '../tree';

describe('remove', () => {
  it('should remove item and replace container with last item', () => {
    const testData: Direction = {
      direction: 'column',
      id: 'root',
      components: [
        {
          direction: 'row',
          id: '0',
          components: [{ id: '0-0' }, { id: '0-1' }, { id: '0-2' }],
        },
      ],
    } as Direction;

    const result1: Direction = {
      direction: 'column',
      id: 'root',
      components: [
        {
          direction: 'row',
          id: '0',
          components: [{ id: '0-0' }, { id: '0-2' }],
        },
      ],
    } as Direction;

    expect(remove(testData, [0, 1])).toStrictEqual(result1);

    const result2 = {
      direction: 'column',
      id: 'root',
      components: [{ id: '0-2' }],
    };
    expect(remove(result1, [0, 0])).toStrictEqual(result2);
  });

  it('should replace same direction with all nested items', () => {
    const testData: Direction = {
      direction: 'column',
      id: 'root',
      components: [
        {
          direction: 'row',
          id: '0',
          components: [
            { id: '0-0' },
            {
              id: '0-1',
              direction: 'column',
              components: [{ id: '0-1-0' }, { id: '0-1-1' }],
            },
          ],
        },
      ],
    } as Direction;

    const result = {
      direction: 'column',
      id: 'root',
      components: [{ id: '0-1-0' }, { id: '0-1-1' }],
    };

    expect(remove(testData, [0, 0])).toStrictEqual(result);
  });
});
