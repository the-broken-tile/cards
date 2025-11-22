import Card from "../../lib/dto/Card"

type Props = {
  card: Card
}

export default function CardView(props: Props) {
  return <>{props.card.name}</>
}
