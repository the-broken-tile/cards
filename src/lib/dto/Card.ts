import Attribute from "./Attribute"
import Set from "./Set"

declare type Card = {
    readonly id: number
    readonly name: string
    readonly attributes: Attribute[]
    readonly set?: Set
}

export default Card