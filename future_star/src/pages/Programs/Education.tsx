import { ProgramTemplate } from './ProgramTemplate'
import { getProgram } from '../../data/programs'

export default function Education() {
  return <ProgramTemplate program={getProgram('education')} />
}
