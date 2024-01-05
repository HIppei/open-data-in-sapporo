## Open-Data in Sapporo

Sapporo city, Hokkaido opens public data for developing Smart City Sapporo.

[Data-Smart City Sapporo](https://data.pf-sapporo.jp/) page makes those data available to the public.

I have made a SDK to access easily the data even though api endpoints are already accessible in the page above.

One remarkable point is that I have curated api endpoints and params using [crawler](https://www.npmjs.com/package/crawler). If you are interested in that method, please refer to the [file](https://github.com/HIppei/open-data-in-sapporo/blob/main/crawler/crawler.js).

## Usage

- Install

```bash
npm i @i2i3i/open-data-in-sapporo
```

- Group, Resource id and Params

This [Json file](./open-data.json) lists up all data which were curated by the abovementioned method. Next example will show you how to use those data.

- Examples

  This example indicates Group `statistics_sapporo`, Resource id `821c83f6-492b-44db-bbde-fca9d2774645` with several options.

```typescript
import odisap from '@i2i3i/open-data-in-sapporo';

// With no optinos
const func1 = async () => {
  const res = await odisap(
    'statistics_sapporo',
    '821c83f6-492b-44db-bbde-fca9d2774645'
  );

  console.log('result', res.result);
  console.log('records', res.result.records);
};

await func1();

// With options (limit, offset)
const func2 = async () => {
  const res = await odisap(
    'statistics_sapporo',
    '821c83f6-492b-44db-bbde-fca9d2774645',
    { limit: 5, offset: 3 }
  );

  console.log('result', res.result);
  console.log('records', res.result.records);
};

await func2();

// With options (params)
const func3 = async () => {
  const res = await odisap(
    'statistics_sapporo',
    '821c83f6-492b-44db-bbde-fca9d2774645',
    {
      params: { '年　度': '2008年度' },
    }
  );

  console.log('result', res.result);
  console.log('records', res.result.records);
};

await func3();
```

## Properties

Refer to the [docs](./docs//README.md).

## Notice

The [data list](./open-data.json) still has some space to develop. So there are a few attributes which haven't been implemented yet in the current version. Future function will apply those developing parts.
