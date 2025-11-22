import { gameRepository } from '../../lib/container'
import { Link } from "react-router"
export default function Index() {
  return <ul>
    {gameRepository
      .allNames()
      .map(name => <li><Link to={`/${name}.json`}>{name}</Link></li>)}
    </ul>
}