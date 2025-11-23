import { JSX } from "react"
import CardInterface from "../../lib/dto/CardInterface"

type Props = {
  card: CardInterface
}

export default function CardView(props: Props): JSX.Element {
  return <>{props.card.name}</>
}
