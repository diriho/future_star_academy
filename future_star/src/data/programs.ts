import type { LucideIcon } from 'lucide-react'
import {
  Award,
  BookMarked,
  BookOpen,
  Building2,
  ClipboardList,
  Compass,
  Dumbbell,
  FlaskConical,
  Goal,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartHandshake,
  Laptop,
  MapPinned,
  Megaphone,
  School,
  Smile,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Trophy,
  Users2,
} from 'lucide-react'

import player3 from '../assets/player3.jpeg'
import soccerTrio from '../assets/soccer-trio.jpg'
import teamHuddle from '../assets/team-huddle.jpg'

export interface ProgramFeature {
  icon: LucideIcon
  title: string
  description: string
}

export interface Program {
  slug: 'education' | 'sports' | 'mentorship' | 'community-services'
  path: string
  navLabel: string
  icon: LucideIcon
  eyebrow: string
  title: string
  subtitle: string
  heroImage: string
  mission: string
  objectives: string[]
  overview: string
  features: ProgramFeature[]
  gallery: { src: string; caption: string }[]
  stats: { value: number; suffix?: string; label: string }[]
  // Illustrative, composite outcomes based on program-level impact rather than
  // a specific named child — replace with real, permission-cleared stories before launch.
  successStories: { title: string; story: string }[]
  faqs: { question: string; answer: string }[]
}

export const programs: Program[] = [
  {
    slug: 'education',
    path: '/programs/education',
    navLabel: 'Education',
    icon: GraduationCap,
    eyebrow: 'Our Programs / Education',
    title: 'Academic Enrichment & Tutoring',
    subtitle: 'Building strong foundations in literacy, math, and technology so every student can thrive in the classroom and beyond.',
    heroImage: player3,
    mission: 'To close learning gaps and build lifelong academic confidence by giving every student personalized support, modern tools, and a love of learning.',
    objectives: [
      'Improve literacy and numeracy outcomes for enrolled students',
      'Provide safe, structured spaces for homework and study',
      'Introduce students to digital tools and basic tech skills',
      'Prepare students for long-term academic and career success',
    ],
    overview:
      'Our Education program pairs students with dedicated tutors and structured learning tracks across five core areas — from one-on-one academic tutoring to hands-on STEM exploration. Sessions run after school and during holiday camps, blending small-group instruction with individual attention.',
    features: [
      { icon: BookOpen, title: 'Academic Tutoring', description: 'One-on-one and small-group tutoring across core subjects.' },
      { icon: Laptop, title: 'Digital Literacy', description: 'Foundational computer and internet skills for the digital world.' },
      { icon: ClipboardList, title: 'Homework Support', description: 'A structured, supervised space to complete daily assignments.' },
      { icon: BookMarked, title: 'Reading Programs', description: 'Guided reading circles that build fluency and comprehension.' },
      { icon: FlaskConical, title: 'STEM Learning', description: 'Hands-on science, tech, engineering, and math exploration.' },
    ],
    gallery: [
      { src: player3, caption: 'Tutoring session in progress' },
      { src: player3, caption: 'Reading circle' },
      { src: teamHuddle, caption: 'Student showcase day' },
      { src: soccerTrio, caption: 'Academic camp break' },
    ],
    stats: [
      { value: 30, suffix: '+', label: 'Students Tutored' },
      { value: 4, suffix: '+', label: 'Education Programs' },
      { value: 6, suffix: '+', label: 'Volunteer Tutors' },
      { value: 90, suffix: '%', label: 'Improved Grades' },
    ],
    successStories: [
      {
        title: 'From Struggling Reader to Peer Mentor',
        story: 'A Grade 5 student who once read below grade level joined our tutoring program twice a week. Within a year, she was reading two grade levels above her peers — and now helps mentor younger students in the same reading circle.',
      },
      {
        title: 'Building Confidence Through STEM',
        story: 'A group of middle-schoolers who had never used a computer completed their first coding project through our digital literacy sessions, sparking a new after-school interest club.',
      },
    ],
    faqs: [
      { question: 'What ages does the Education program serve?', answer: 'We currently support primary and secondary students, with tutoring tracks adapted to each age group and academic level.' },
      { question: 'How often do tutoring sessions happen?', answer: 'Most students attend two to three sessions per week, with additional support available during school holidays.' },
      { question: 'Do I need to be a certified teacher to volunteer as a tutor?', answer: 'No — we welcome volunteers of all backgrounds. We provide orientation and ongoing support for every tutor.' },
    ],
  },
  {
    slug: 'sports',
    path: '/programs/sports',
    navLabel: 'Sports',
    icon: Trophy,
    eyebrow: 'Our Programs / Sports',
    title: 'Soccer Training & Talent Development',
    subtitle: 'Developing skill, teamwork, and discipline through structured soccer training, competition, and fitness.',
    heroImage: soccerTrio,
    mission: 'To use the game of soccer as a tool for building discipline, teamwork, and character while identifying and developing young athletic talent.',
    objectives: [
      'Provide structured, age-appropriate soccer training',
      'Build physical fitness and healthy habits',
      'Create pathways to competitive play for top talent',
      'Instill discipline, sportsmanship, and teamwork',
    ],
    overview:
      'Our Sports program runs weekly training sessions across 15+ teams, combining technical skill-building with fitness conditioning and competitive play. Coaches focus as much on character development — discipline, respect, and teamwork — as they do on athletic performance.',
    features: [
      { icon: Goal, title: 'Soccer Training', description: 'Structured drills and technical skill-building for every age group.' },
      { icon: TrendingUp, title: 'Player Development', description: 'Individualized coaching pathways for our most promising athletes.' },
      { icon: Trophy, title: 'Competitions', description: 'Local tournaments and matches that build competitive experience.' },
      { icon: Dumbbell, title: 'Fitness', description: 'Conditioning and nutrition guidance to build lifelong healthy habits.' },
      { icon: Award, title: 'Character Building', description: 'Coaching that reinforces discipline, respect, and teamwork on and off the field.' },
    ],
    gallery: [
      { src: soccerTrio, caption: 'Match day' },
      { src: teamHuddle, caption: 'Team huddle' },
      { src: player3, caption: 'Pre-season fitness' },
      { src: player3, caption: 'Youth league' },
    ],
    stats: [
      { value: 4, suffix: '+', label: 'Soccer Teams' },
      { value: 30, suffix: '+', label: 'Active Players' },
      { value: 25, suffix: '+', label: 'Matches Per Season' },
      { value: 4, suffix: '+', label: 'Certified Coaches' },
    ],
    successStories: [
      {
        title: 'A Team Built From Nothing',
        story: 'A group of neighborhood kids with no formal training joined our youngest league and, within two seasons, went from last place to regional finalists — while maintaining passing grades as required by the program.',
      },
      {
        title: 'From Player to Coach',
        story: 'One of our earliest players stayed with the program through his teenage years and now returns as a volunteer assistant coach, mentoring the next generation of Future Stars.',
      },
    ],
    faqs: [
      { question: 'Do players need prior soccer experience?', answer: 'No experience is required. We place players on teams based on age and skill level, with pathways to more competitive teams over time.' },
      { question: 'Is equipment provided?', answer: 'Sponsorship funding helps provide uniforms and equipment for players who need it — see our Sponsor a Child program for details.' },
      { question: 'How do academics factor into the Sports program?', answer: 'Players are expected to stay enrolled in and engaged with school; our coaches work closely with our Education program to support that.' },
    ],
  },
  {
    slug: 'mentorship',
    path: '/programs/mentorship',
    navLabel: 'Mentorship',
    icon: HeartHandshake,
    eyebrow: 'Our Programs / Mentorship',
    title: 'Leadership & Life Skills',
    subtitle: 'Pairing young people with trusted mentors who help build confidence, character, and a clear path forward.',
    heroImage: teamHuddle,
    mission: 'To surround every young person with consistent, caring adult mentors who help them build the confidence, skills, and vision to lead their own futures.',
    objectives: [
      'Match students with consistent, trained mentors',
      'Build practical life skills and decision-making confidence',
      'Expose students to career and leadership pathways',
      'Strengthen community bonds through mentor relationships',
    ],
    overview:
      'Our Mentorship program pairs students with trained community mentors for regular one-on-one and group sessions covering leadership, career exposure, and life skills. Mentors commit to consistent, long-term relationships that give students a stable source of guidance and encouragement.',
    features: [
      { icon: Handshake, title: 'Leadership', description: 'Workshops and projects that build real leadership experience.' },
      { icon: Compass, title: 'Career Guidance', description: 'Exposure to career paths and goal-setting support.' },
      { icon: Sparkles, title: 'Life Skills', description: 'Practical skills for communication, decision-making, and daily life.' },
      { icon: Smile, title: 'Confidence Building', description: 'Structured encouragement that helps students find their voice.' },
      { icon: Users2, title: 'Community Mentors', description: 'Trained local mentors offering consistent, caring guidance.' },
    ],
    gallery: [
      { src: teamHuddle, caption: 'Mentor check-in' },
      { src: player3, caption: 'Leadership workshop' },
      { src: soccerTrio, caption: 'Group mentoring session' },
      { src: player3, caption: 'Goal-setting activity' },
    ],
    stats: [
      { value: 30, suffix: '+', label: 'Mentor Matches' },
      { value: 5, suffix: '+', label: 'Trained Mentors' },
      { value: 6, suffix: '+', label: 'Life Skills Workshops' },
      { value: 30, suffix: '%', label: 'Mentee Retention' },
    ],
    successStories: [
      {
        title: 'Finding a Voice in Leadership',
        story: 'A quiet, reserved student who joined our mentorship circle two years ago now leads student-run workshops for newer participants, crediting her mentor with helping her find the confidence to speak up.',
      },
      {
        title: 'A Clearer Path Forward',
        story: 'Through career guidance sessions, a group of teenage mentees set their first concrete academic and career goals — several now cite specific paths they want to pursue after school.',
      },
    ],
    faqs: [
      { question: 'How are mentors matched with students?', answer: 'We consider age, interests, and personality to create matches, and every relationship starts with a supervised introduction session.' },
      { question: 'What is the time commitment for mentors?', answer: 'Mentors typically commit to a weekly or biweekly session for at least one full program cycle to give students consistency.' },
      { question: 'Are mentors background-checked?', answer: 'Yes — every mentor completes a screening and orientation process before being matched with a student.' },
    ],
  },
  {
    slug: 'community-services',
    path: '/programs/community-services',
    navLabel: 'Community Services',
    icon: Users2,
    eyebrow: 'Our Programs / Community Services',
    title: 'Community Outreach & Youth Empowerment',
    subtitle: 'Strengthening the neighborhoods our students call home through outreach, projects, and shared resources.',
    heroImage: player3,
    mission: 'To extend our impact beyond the classroom and field by strengthening the families, schools, and neighborhoods that surround our students.',
    objectives: [
      'Connect families with community resources and support',
      'Partner with local schools to extend educational impact',
      'Mobilize volunteers for hands-on community projects',
      'Raise awareness around health and community wellbeing',
    ],
    overview:
      'Our Community Services program takes our mission beyond program walls — organizing neighborhood projects, supporting partner schools, and running outreach and health-awareness initiatives that benefit the wider community our students live in.',
    features: [
      { icon: Megaphone, title: 'Youth Outreach', description: 'Connecting young people and families to our programs and resources.' },
      { icon: Building2, title: 'Community Projects', description: 'Hands-on improvement projects led by volunteers and students.' },
      { icon: School, title: 'School Support', description: 'Partnering with local schools to extend educational resources.' },
      { icon: HandHeart, title: 'Volunteer Initiatives', description: 'Mobilizing community volunteers for service days and drives.' },
      { icon: Stethoscope, title: 'Health Awareness', description: 'Community health education and awareness campaigns.' },
      { icon: MapPinned, title: 'Neighborhood Development', description: 'Long-term investment in the neighborhoods our students call home.' },
    ],
    gallery: [
      { src: player3, caption: 'Community workshop' },
      { src: teamHuddle, caption: 'Neighborhood service day' },
      { src: player3, caption: 'Health awareness event' },
      { src: soccerTrio, caption: 'Youth outreach day' },
    ],
    stats: [
      { value: 6, suffix: '+', label: 'Volunteers & Partners' },
      { value: 5, suffix: '+', label: 'Community Projects' },
      { value: 3, suffix: '+', label: 'Partner Schools' },
      { value: 300, suffix: '+', label: 'Community Members Reached' },
    ],
    successStories: [
      {
        title: 'A Neighborhood Comes Together',
        story: 'A student-led litter cleanup and mural project brought together dozens of families and volunteers, turning an underused lot into a shared community gathering space.',
      },
      {
        title: 'Extending the Classroom',
        story: 'A partnership with a local primary school brought our tutoring and health-awareness volunteers directly into classrooms, reaching students who couldn’t otherwise attend our after-school sessions.',
      },
    ],
    faqs: [
      { question: 'How can my organization get involved in outreach?', answer: 'Businesses, schools, and community groups can partner with us directly — visit our Partner With Us page to learn more.' },
      { question: 'Do I need to be part of another program to volunteer?', answer: 'No — Community Services volunteers can join independently of our Education, Sports, or Mentorship programs.' },
      { question: 'What kind of health awareness topics are covered?', answer: 'Sessions are age-appropriate and cover topics like hygiene, nutrition, and general wellbeing, often delivered in partnership with local health volunteers.' },
    ],
  },
]

export function getProgram(slug: Program['slug']) {
  const program = programs.find((p) => p.slug === slug)
  if (!program) throw new Error(`Unknown program slug: ${slug}`)
  return program
}

export function getRelatedPrograms(slug: Program['slug']) {
  return programs.filter((p) => p.slug !== slug)
}
