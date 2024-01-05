@i2i3i/open-data-in-sapporo

# @i2i3i/open-data-in-sapporo

## Table of contents

### Functions

- [default](README.md#default)

## Functions

### default

▸ **default**(`group`, `resourceId`, `params?`, `limit?`, `offset?`): `Promise`\<`any`\>

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `group` | `string` | `undefined` | Refer to open-data.json |
| `resourceId` | `string` | `undefined` | Refer to opne-data.json |
| `params?` | `Record`\<`string`, `string` \| `number`\> | `undefined` | Refer to open-data.json |
| `limit` | `number` | `100` | openData limit(default: 100) |
| `offset` | `number` | `0` | Offset to start(default: 0) |

#### Returns

`Promise`\<`any`\>

data or null

**`Remarks`**

Please follow the examples in the README.md.

#### Defined in

[index.ts:32](https://github.com/HIppei/open-data-in-sapporo/blob/d1fdf0a/src/index.ts#L32)
