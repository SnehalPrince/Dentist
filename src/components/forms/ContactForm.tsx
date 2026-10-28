// src/components/forms/ContactForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, AlertCircle, X } from 'lucide-react'
import { Button } from '@components/ui/Button'
import siteConfig from '@content/site.config.json'
import '@styles/components/form.css'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Please enter a subject'),
  message: z.string().min(10, 'Please enter a message (at least 10 characters)'),
})

type FormData = z.infer<typeof schema>
type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')

  const { register, handleSubmit, formState: { errors }, setFocus, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setFormState('submitting')
    try {
      console.log('[CONTACT FORM] Submission:', data)
      await new Promise((r) => setTimeout(r, 800))
      setFormState('success')
      reset()
    } catch {
      setFormState('error')
    }
  }

  const onInvalid = () => {
    const firstErrorField = Object.keys(errors)[0] as keyof FormData
    if (firstErrorField) setFocus(firstErrorField)
  }

  if (formState === 'success') {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <CheckCircle size={24} style={{ color: 'var(--color-brand-600)', flexShrink: 0 }} aria-hidden="true" />
        <div>
          <p style={{ fontWeight: 600 }}>Message sent!</p>
          <p style={{ fontSize: 'var(--text-body-sm)', marginTop: '0.25rem' }}>
            We'll get back to you soon. For immediate assistance, call{' '}
            <a href={`tel:${siteConfig.phone}`} style={{ fontWeight: 600 }}>{siteConfig.phoneDisplay}</a>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate aria-label="Contact form">
      <p className="form-note"><span aria-hidden="true">*</span> <span className="sr-only">(asterisk)</span> Required fields</p>

      {formState === 'error' && (
        <div className="form-error-banner" role="alert">
          <AlertCircle size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
          <p>Something went wrong. Please call <a href={`tel:${siteConfig.phone}`} style={{ fontWeight: 600 }}>{siteConfig.phoneDisplay}</a>.</p>
        </div>
      )}

      <div className="form__row form__row--2col">
        <div className="form-field">
          <label className="form-label" htmlFor="contact-name">
            Name <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span>
          </label>
          <input id="contact-name" type="text" autoComplete="name" className="form-input"
            aria-required="true" aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'cname-error' : undefined} {...register('name')} />
          {errors.name && <p id="cname-error" className="form-error" role="alert"><X size={14} aria-hidden="true" /> {errors.name.message}</p>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="contact-phone">Phone <span style={{ color: 'var(--color-neutral-400)', fontWeight: 400 }}>(optional)</span></label>
          <input id="contact-phone" type="tel" autoComplete="tel" className="form-input" {...register('phone')} />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contact-email">
          Email <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span>
        </label>
        <input id="contact-email" type="email" autoComplete="email" className="form-input"
          aria-required="true" aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'cemail-error' : undefined} {...register('email')} />
        {errors.email && <p id="cemail-error" className="form-error" role="alert"><X size={14} aria-hidden="true" /> {errors.email.message}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contact-subject">
          Subject <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span>
        </label>
        <input id="contact-subject" type="text" className="form-input"
          aria-required="true" aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'csubject-error' : undefined} {...register('subject')} />
        {errors.subject && <p id="csubject-error" className="form-error" role="alert"><X size={14} aria-hidden="true" /> {errors.subject.message}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contact-message">
          Message <span className="required-star" aria-hidden="true">*</span><span className="sr-only">(required)</span>
        </label>
        <textarea id="contact-message" className="form-textarea" rows={5}
          aria-required="true" aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'cmessage-error' : undefined} {...register('message')} />
        {errors.message && <p id="cmessage-error" className="form-error" role="alert"><X size={14} aria-hidden="true" /> {errors.message.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={formState === 'submitting'} id="contact-submit-btn">
        {formState === 'submitting' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}
