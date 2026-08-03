import { ProgramTemplate } from './ProgramTemplate'
import { getProgram } from '../../data/programs'

export default function Sports() {
  return <ProgramTemplate program={getProgram('sports')} />
}
