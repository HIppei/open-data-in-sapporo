@i2i3i/open-data-in-sapporo

# @i2i3i/open-data-in-sapporo

## Table of contents

### Functions

- [default](README.md#default)

## Functions

### default

▸ **default**(`group`, `resourceId`, `«destructured»`): `Promise`\<`any`\>

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `group` | `string` | `undefined` | openData group name |
| `resourceId` | `string` | `undefined` | openData resourceId |
| `«destructured»` | `Object` | `undefined` | - |
| › `limit?` | `number` | `100` | - |
| › `params?` | `Record`\<`string`, `string`\> | `undefined` | - |

#### Returns

`Promise`\<`any`\>

data or null

#### Defined in

[index.ts:21](https://github.com/HIppei/open-data-in-sapporo/blob/ed6659d/src/index.ts#L21)
