## Open-Data in Sapporo

Sapporo city, Hokkaido opens public data for developing Smart City Sapporo.

[Data-Smart City Sapporo](https://data.pf-sapporo.jp/) page makes those data available to the public.

I have made a SDK to access easily the data even though api endpoints are already accessible in the page above.

## Usage

- Install

```bash
npm i @i2i3i/open-data-in-sapporo
```

- Data available

This [Json file](./open-data.json) lists all data up. Next example will show you how to use.

- Example 1

This example indicates group `statistics_sapporo`, resource `821c83f6-492b-44db-bbde-fca9d2774645` with no parameters.

```typescript
import odisa from '@i2i3i/open-data-in-sapporo';

const func = async () => {
  const result = await odisap(
    'statistics_sapporo',
    '821c83f6-492b-44db-bbde-fca9d2774645'
  );
};

console.log(await func());
```

- Example 2

This one denotes group `statistics_sapporo`, resource `821c83f6-492b-44db-bbde-fca9d2774645` with a parameter and limit 50 data counts.

```typescript
import odisa from '@i2i3i/open-data-in-sapporo';

const func = async () => {
  const result = await odisap(
    'statistics_sapporo',
    '821c83f6-492b-44db-bbde-fca9d2774645',
    { params: { '年　度': '2008年度' }, limit: 50 }
  );
};

console.log(await func());
```

## Properties

Refer to the [docs](./docs//README.md).

## Notice

The [data list](./open-data.json) still has some space to develop. So there are a few attributes which haven't been implemented in the current version. Future functino will apply those developing parts.
