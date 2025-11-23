import CardInterface from "../../lib/dto/CardInterface"

type Props = {
  card: CardInterface
}

export default function CardView(props: Props) {
  return <>{props.card.name}</>
}
