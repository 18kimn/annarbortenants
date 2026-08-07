import * as documents from './documents'
import * as objects from './objects'
import * as blocks from './blockContent'

export const schemaTypes = [
  ...Object.values(documents),
  ...Object.values(objects),
  ...Object.values(blocks),
]
