## Open-Data in Sapporo

Sapporo city, Hokkaido opens public data for developing Smart City Sapporo.

[Data-Smart City Sapporo](https://data.pf-sapporo.jp/) page makes those data available to the public.

I have made a SDK to access easily the data even though api endpoints are already accessible in the page above.

## Usage

- Install

```bash
npm i @i2i3i/open-data-in-sapporo
```

- Group, Resource id and Params

This [Json file](./open-data.json) lists all data up. Next example will show you how to use those data.

- Example 1

  This example indicates Group `statistics_sapporo`, Resource id `821c83f6-492b-44db-bbde-fca9d2774645` with no Params.

```typescript
import odisa from '@i2i3i/open-data-in-sapporo';

const func = async () => {
  const res = await odisa(
    'statistics_sapporo',
    '821c83f6-492b-44db-bbde-fca9d2774645'
  );
  return res.result;
};

console.log(await func());
```

- Example 2

  This one denotes Group `statistics_sapporo`, Resource id `821c83f6-492b-44db-bbde-fca9d2774645` with Params.

  Caution to use `q` as key name for the parameter object.

```typescript
import odisa from '@i2i3i/open-data-in-sapporo';

const func = async () => {
  const res = await odisa(
    'statistics_sapporo',
    '821c83f6-492b-44db-bbde-fca9d2774645',
    { q: '2008年度' }
  );
  return res.result;
};
console.log(await func());
```

## Properties

Refer to the [docs](./docs//README.md).

## Notice

The [data list](./open-data.json) still has some space to develop. So there are a few attributes which haven't been implemented in the current version. Future functino will apply those developing parts.
