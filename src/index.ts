import openData from '../open-data.json';

const hostUrl = 'https://ckan.pf-sapporo.jp/api/3/action/datastore_search';

const makeFilters = (
  params: Record<string, string | number> | undefined,
  paramsFormat: Record<string, string>
) => {
  if (!params) return {};
  const keys = Object.keys(paramsFormat);

  return keys.reduce((acc, key) => {
    if (key in params && typeof params[key] === typeof paramsFormat[key])
      acc[key] = params[key];
    return acc;
  }, {});
};

/**
 * @param group - Refer to open-data.json
 * @param resourceId - Refer to opne-data.json
 * @param params - Refer to open-data.json
 * @param limit - openData limit(default: 100)
 * @param offset - Offset to start(default: 0)
 * @returns
 * data or null
 *
 * @remarks
 * Please follow the examples in the README.md.
 *
 */
const odisap = async (
  group: string,
  resourceId: string,
  options: {
    params?: Record<string, string | number>;
    limit?: number;
    offset?: number;
  } = { limit: 100, offset: 0 }
) => {
  try {
    const { params, limit, offset } = options;

    if (!Object.keys(openData).includes(group))
      throw new Error('Invalid group');

    const resource = openData[group as keyof typeof openData];
    if (!resource[resourceId]) throw new Error('Invalid resourceId');

    const filters = makeFilters(params, resource[resourceId].param);

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify({
      resource_id: resourceId,
      filters,
      limit,
      offset,
    });

    const res = await fetch(hostUrl, {
      method: 'POST',
      headers,
      body,
    });

    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default odisap;
