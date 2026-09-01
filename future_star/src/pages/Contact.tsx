import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Globe, Mail, MapPin, Phone, Send } from 'lucide-react'
import { HeroSection } from '../components/shared/HeroSection'
import { SectionTitle } from '../components/shared/SectionTitle'
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '../components/shared/SocialIcons'
import teamHuddle from '../assets/team-huddle.jpg'
import './Contact.css'

interface ContactFormValues {
  name: string
  email: string
  subject: string
  message: string
}

const MAX_NAME_LENGTH = 100
const MAX_SUBJECT_LENGTH = 150
const MAX_MESSAGE_LENGTH = 2000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/futurestarsacademyofficial/', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/FutureStarsAcademyOfficial', Icon: FacebookIcon },
  { label: 'Twitter', href: 'https://twitter.com', Icon: TwitterIcon },
  { label: 'YouTube', href: 'https://youtube.com', Icon: YoutubeIcon },
]

// Single-line fields feed into a mailto "subject" — strip CR/LF so a
// crafted value can't inject extra mail headers, then trim whitespace.
function sanitizeLine(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function sanitizeMessage(value: string) {
  return value.replace(/\r\n/g, '\n').trim()
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>()

  function onSubmit(data: ContactFormValues) {
    const name = sanitizeLine(data.name).slice(0, MAX_NAME_LENGTH)
    const email = sanitizeLine(data.email).slice(0, MAX_NAME_LENGTH)
    const subject = sanitizeLine(data.subject).slice(0, MAX_SUBJECT_LENGTH) || 'Message from the website'
    const message = sanitizeMessage(data.message).slice(0, MAX_MESSAGE_LENGTH)

    if (!name || !EMAIL_PATTERN.test(email) || !message) {
      toast.error('Please fill out your name, a valid email, and a message.')
      return
    }

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`
    const mailtoUrl = `mailto:info@fsausaliberia.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.assign(mailtoUrl)
    toast.success("Opening your email client — we'll get back to you soon.")
    reset()
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | Future Stars Academy</title>
        <meta
          name="description"
          content="Get in touch with Future Stars Academy. Send us a message and our team will get back to you about volunteering, sponsorship, or partnership."
        />
      </Helmet>

      <HeroSection
        image={teamHuddle}
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="We'd love to hear from you. Send us a message and our team will get back to you as soon as possible."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="section section--white">
        <div className="container contact-split">
          <div className="contact-info">
            <SectionTitle
              eyebrow="Contact us"
              title="We'd love to hear from you"
              description="Whether you have a question about our programs, want to volunteer, or are interested in partnering with us, reach out and we'll respond as soon as we can."
            />

            <div className="contact-info__list">
               {/*Email info*/}
              <a href="mailto:info@fsausaliberia.org" className="contact-info__item">
                <span className="contact-info__icon">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="contact-info__label">Email</p>
                  <p className="contact-info__value">info@fsausaliberia.org</p>
                </div>
              </a>

              {/*Website Address*/}
              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <Globe size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="contact-info__label">Website</p>
                  <p className="contact-info__value">www.fsausaliberia.org</p>
                </div>
              </div>

              {/* MapPin icon */}
                {/*USA location */}
              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <MapPin size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="contact-info__label">Location</p>
                  <p className="contact-info__value">USA </p>
                  <p>36 Vicksburg Street Providence RI 02904</p>
                </div> 
              </div>

               {/*Liberia location */}
               <div className="contact-info__item">
                <span className="contact-info__icon">
                  <MapPin size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="contact-info__label">Location</p>
                  <p className="contact-info__value">Liberia</p>
                  <p>Montserrado Co, Republic of Liberia. </p>
                </div> 
              </div>

              {/*Phone info*/}
              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <Phone size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="contact-info__label">Phone</p>
                  <p className="contact-info__value">+1 (401) 585-9603</p>
                </div> 
              </div>
            </div>

            <div className="contact-info__social">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="contact-info__social-link"
                >
                  <Icon width={16} height={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/*Contact form */}
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
            <div className="contact-form__field">
              <label htmlFor="name" className="contact-form__label">
                Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                maxLength={MAX_NAME_LENGTH}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="contact-form__input"
                placeholder="Your name"
                {...register('name', { required: 'Please enter your name.', maxLength: MAX_NAME_LENGTH })}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="contact-form__error">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="contact-form__field">
              <label htmlFor="email" className="contact-form__label">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                maxLength={MAX_NAME_LENGTH}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="contact-form__input"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Please enter your email.',
                  pattern: { value: EMAIL_PATTERN, message: 'Please enter a valid email address.' },
                })}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="contact-form__error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="contact-form__field">
              <label htmlFor="subject" className="contact-form__label">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                maxLength={MAX_SUBJECT_LENGTH}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className="contact-form__input"
                placeholder="How can we help?"
                {...register('subject', { required: 'Please enter a subject.', maxLength: MAX_SUBJECT_LENGTH })}
              />
              {errors.subject && (
                <p id="subject-error" role="alert" className="contact-form__error">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="contact-form__field">
              <label htmlFor="message" className="contact-form__label">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                maxLength={MAX_MESSAGE_LENGTH}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className="contact-form__input contact-form__input--textarea"
                placeholder="Leave us a message..."
                {...register('message', { required: 'Please enter a message.', maxLength: MAX_MESSAGE_LENGTH })}
              />
              {errors.message && (
                <p id="message-error" role="alert" className="contact-form__error">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button type="submit" disabled={isSubmitting} className="contact-form__submit">
              <Send size={16} aria-hidden="true" />
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
