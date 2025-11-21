import Attribute from "./Attribute"

declare type Card = {
    readonly id: number
    readonly name: string
    readonly attributes: Attribute[]
}

export default Card