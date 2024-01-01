import openData from '../open-data.json';

const hostUrl = 'https://ckan.pf-sapporo.jp/api/3/action/datastore_search';

// const pickParams = (obj: Record<string, string> | undefined, arr: string[]) => {
//   if (!obj) return undefined;
//   return arr.reduce((acc, record) => {
//     if (record in obj) acc[record] = obj[record];
//     return acc;
//   }, {});
// };

/**
 * @param group - Refer to open-data.json
 * @param resourceId - Refer to opne-data.json
 * @param params - Refer to open-data.json
 * @param limit - openData limit(default: 100)
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
  params?: Record<string, string>,
  limit: number = 100
) => {
  try {
    if (!Object.keys(openData).includes(group))
      throw new Error('Invalid group');

    const resource = openData[group as keyof typeof openData];
    if (!resource[resourceId]) throw new Error('Invalid resourceId');

    // const paramKeys = Object.keys(
    //   // @ts-expect-error resource[resourceId] is not undefined
    //   resource[resourceId as keyof typeof resource].param
    // );

    const searchParams = new URLSearchParams({
      resource_id: resourceId,
      limit: `${limit}`,
      q: params?.q || '',
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
