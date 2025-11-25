import {JSX} from "react"

type Props = {
  message?: string
}
export default function ErrorMessage({ message }: Props): JSX.Element {
  return <>{message ?? "Error" }</>
}
