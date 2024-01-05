import odisap from '..';

const group = 'statistics_sapporo';
const resourceId = '821c83f6-492b-44db-bbde-fca9d2774645';

describe(odisap.name, () => {
  test('odisap with no options', async () => {
    const res = await odisap(group, resourceId);
    expect(res.success).toBeTruthy();
  });

  test('odisap with params', async () => {
    const params = { '年　度': '2008年度' };
    const res = await odisap(group, resourceId, {
      params,
    });
    expect(res.success).toBeTruthy();
    expect(res.result.filters).toEqual(params);
  });

  test('odisap with limit and offset', async () => {
    const res = await odisap(group, resourceId, {
      limit: 3,
      offset: 5,
    });

    expect(res.success).toBeTruthy();
    expect(res.result.records.length).toEqual(3);
  });

  test('odisap with invalid group', async () => {
    console.log = jest.fn();
    const res = await odisap('invalid_group', resourceId);
    expect(res).toBeNull();
    expect(console.log).toHaveBeenCalledWith(expect.any(Error));
    // @ts-expect-error because console.log is mocked
    expect(console.log.mock.calls[0][0].message).toBe('Invalid group');
  });

  test('odisap with invalid resourceId', async () => {
    console.log = jest.fn();
    const res = await odisap(group, 'invalid_resourceId');
    expect(res).toBeNull();
    expect(console.log).toHaveBeenCalledWith(expect.any(Error));

    // @ts-expect-error because console.log is mocked
    expect(console.log.mock.calls[0][0].message).toBe('Invalid resourceId');
  });
});
