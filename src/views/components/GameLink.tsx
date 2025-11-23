import { JSX } from "react"
import { Link } from "react-router"

type Props = {
  slug: string
  name: string
}
export default function GameLink(props: Props): JSX.Element {
  return <Link to={`/${props.slug}`}>{props.name}</Link>
}
