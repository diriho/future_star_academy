import { ProgramTemplate } from './ProgramTemplate'
import { getProgram } from '../../data/programs'

export default function CommunityServices() {
  return <ProgramTemplate program={getProgram('community-services')} />
}
