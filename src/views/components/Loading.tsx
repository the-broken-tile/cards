import { JSX } from "react"

type Props = {
  message?: string
}

export default function Loading({ message }: Props): JSX.Element {
  return <>{message ?? "Loading"}</>
}