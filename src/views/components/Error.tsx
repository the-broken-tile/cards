import {JSX} from "react"

type Props = {
  message?: string
}
export default function Error({ message }: Props): JSX.Element {
  return <>{message ?? "Error" }</>
}
