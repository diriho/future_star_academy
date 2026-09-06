import { Handshake, HandHeart, Users2 } from 'lucide-react'
import soccerTrio from '../assets/soccer-trio.jpg'
import teamHuddle from '../assets/team-huddle.jpg'
import player3 from '../assets/player3.jpeg'

export const getInvolvedCards = [
  {
    image: teamHuddle,
    icon: HandHeart,
    title: 'Volunteer',
    description: 'Share your time and talent as a tutor, coach, mentor, or event volunteer.',
    to: '/get-involved/volunteer',
  },
  {
    image: player3,
    icon: Handshake,
    title: 'Sponsor',
    description: 'Sponsor a child’s education, uniforms, meals, and mentorship for a full year.',
    to: '/get-involved/sponsor',
  },
  {
    image: soccerTrio,
    icon: Users2,
    title: 'Partner With Us',
    description: 'Partner as a business, school, or organization to expand our reach and impact.',
    to: '/get-involved/partner',
  },
]
