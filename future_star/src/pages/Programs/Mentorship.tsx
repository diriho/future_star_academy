import { ProgramTemplate } from './ProgramTemplate'
import { getProgram } from '../../data/programs'

export default function Mentorship() {
  return <ProgramTemplate program={getProgram('mentorship')} />
}
