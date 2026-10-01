import { site } from '../config/site'
import { logo } from '../data/pxImages'

export default function Logo() {
  return <img src={logo} alt={site.name} width="122" height="83" />
}
