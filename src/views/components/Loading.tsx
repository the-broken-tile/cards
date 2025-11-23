
type Props = {
  message?: string
}

export default function Loading({ message }: Props) {
  return <>{message ?? 'Loading'}</>
}