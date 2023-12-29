import openData from '../open-data.json';

const hostUrl = 'https://ckan.pf-sapporo.jp/api/3/action/datastore_search';

const pickParams = (obj: Record<string, string> | undefined, arr: string[]) => {
  if (!obj) return undefined;
  return arr.reduce((acc, record) => {
    if (record in obj) acc[record] = obj[record];
    return acc;
  }, {});
};
const odisap = async (
  group: keyof typeof openData,
  resourceId: string,
  params?: Record<string, string>,
  limit = 100
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
    console.log(url);
    // const res = await fetch(url);

    // return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export default odisap;

odisap('statistics_sapporo', '821c83f6-492b-44db-bbde-fca9d2774645');
