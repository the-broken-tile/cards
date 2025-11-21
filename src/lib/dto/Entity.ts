import Attribute from "./Attribute"

type Entity = {
  readonly type: string
  readonly name: string
  readonly attributes: Attribute[]
}

export default Entity