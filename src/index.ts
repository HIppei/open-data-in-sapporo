import openData from '../open-data.json';

const hostUrl = 'https://ckan.pf-sapporo.jp/api/3/action/datastore_search';

const pickParams = (obj: Record<string, string> | undefined, arr: string[]) => {
  if (!obj) return undefined;
  return arr.reduce((acc, record) => {
    if (record in obj) acc[record] = obj[record];
    return acc;
  }, {});
};

/**
 * @param group - openData group name
 * @param resourceId - openData resourceId
 * @param params - openData params
 * @param limit - openData limit
 * @returns
 * data or null
 */
const odisap = async (
  group: keyof typeof openData,
  resourceId: string,
  { params, limit = 100 }: { params?: Record<string, string>; limit?: number }
) => {
  try {
    const resource = openData[group];

    if (!resource[resourceId]) throw new Error('Invalid resourceId');

    const paramKeys = Object.keys(
      // @ts-expect-error because param must be inffered as keys
      resource[resourceId as keyof typeof resource].param
    );

    const searchParams = new URLSearchParams({
      resource_id: resourceId,
      limit: `${limit}`,
      ...pickParams(params, paramKeys),
    });

    const url = `${hostUrl}?${searchParams.toString()}`;
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default odisap;
