// src/components/forms/AppointmentForm.tsx
// React Hook Form + Zod — all accessibility per 07_ACCESSIBILITY_AND_QA.md §2.3.2
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, AlertCircle, X } from 'lucide-react'
import { Button } from '@components/ui/Button'
import siteConfig from '@content/site.config.json'
import '@styles/components/form.css'

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .regex(/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Please enter a valid US phone number'),
  email: z.string().email('Please enter a valid email address'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.enum(['morning', 'afternoon', 'late-afternoon'], {
    message: 'Please select a preferred time',
  }),
  reasonForVisit: z.enum(
    ['checkup-cleaning', 'tooth-pain-emergency', 'wisdom-teeth', 'implant-consultation', 'root-canal', 'cosmetic-consultation', 'orthodontic-consultation', 'other'],
    { message: 'Please select a reason for your visit' }
  ),
  message: z.string().optional(),
  preferredContact: z.enum(['phone', 'email', 'either']),
})

type FormData = z.infer<typeof schema>

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function AppointmentForm() {
  const [formState, setFormState] = useState<FormState>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { preferredContact: 'either' },
  })

  const onSubmit = async (data: FormData) => {
    setFormState('submitting')
    try {
      // In production: POST to /netlify/functions/book or a form service
      // For dev: log to console and simulate success
      console.log('[APPOINTMENT FORM] Submission:', data)
      await new Promise((r) => setTimeout(r, 800)) // simulate latency
      setFormState('success')
      reset()
    } catch {
      setFormState('error')
    }
  }

  const onInvalid = () => {
    // Focus first invalid field on submit failure
    const firstErrorField = Object.keys(errors)[0] as keyof FormData
    if (firstErrorField) setFocus(firstErrorField)
  }

  if (formState === 'success') {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <CheckCircle size={24} style={{ color: 'var(--color-brand-600)', flexShrink: 0 }} aria-hidden="true" />
        <div>
          <p style={{ fontWeight: 600, color: 'var(--color-brand-800)' }}>Request received!</p>
          <p style={{ fontSize: 'var(--text-body-sm)', marginTop: '0.25rem' }}>
            We'll be in touch within 1 business day. For urgent matters, call us directly at{' '}
            <a href={`tel:${siteConfig.phone}`} style={{ fontWeight: 600, color: 'var(--color-brand-700)' }}>
              {siteConfig.phoneDisplay}
            </a>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      aria-label="Appointment request form"
    >
      <p className="form-note" aria-live="polite">
        <span aria-hidden="true">*</span> <span className="sr-only">(asterisk)</span> Required fields
      </p>

      {formState === 'error' && (
        <div className="form-error-banner" role="alert">
          <AlertCircle size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
          <p>
            Something went wrong. Please try again or call us at{' '}
            <a href={`tel:${siteConfig.phone}`} style={{ fontWeight: 600 }}>{siteConfig.phoneDisplay}</a>.
          </p>
        </div>
      )}

      <div className="form__row form__row--2col">
        {/* Full Name */}
        <div className="form-field">
          <label className="form-label" htmlFor="fullName">
            Full Name <span className="required-star" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            className="form-input"
            aria-required="true"
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p id="fullName-error" className="form-error" role="alert">
              <X size={14} aria-hidden="true" /> {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="form-field">
          <label className="form-label" htmlFor="phone">
            Phone Number <span className="required-star" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className="form-input"
            placeholder="(818) 555-0000"
            aria-required="true"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            {...register('phone')}
          />
          {errors.phone && (
            <p id="phone-error" className="form-error" role="alert">
              <X size={14} aria-hidden="true" /> {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="form-field">
        <label className="form-label" htmlFor="email">
          Email Address <span className="required-star" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="form-input"
          aria-required="true"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="form-error" role="alert">
            <X size={14} aria-hidden="true" /> {errors.email.message}
          </p>
        )}
      </div>

      <div className="form__row form__row--2col">
        {/* Preferred Date */}
        <div className="form-field">
          <label className="form-label" htmlFor="preferredDate">
            Preferred Date <span className="required-star" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="preferredDate"
            type="date"
            className="form-input"
            min={new Date().toISOString().split('T')[0]}
            aria-required="true"
            aria-invalid={errors.preferredDate ? 'true' : 'false'}
            aria-describedby={errors.preferredDate ? 'date-error' : undefined}
            {...register('preferredDate')}
          />
          {errors.preferredDate && (
            <p id="date-error" className="form-error" role="alert">
              <X size={14} aria-hidden="true" /> {errors.preferredDate.message}
            </p>
          )}
        </div>

        {/* Preferred Time */}
        <div className="form-field">
          <label className="form-label" htmlFor="preferredTime">
            Preferred Time <span className="required-star" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="preferredTime"
            className="form-select"
            aria-required="true"
            aria-invalid={errors.preferredTime ? 'true' : 'false'}
            aria-describedby={errors.preferredTime ? 'time-error' : undefined}
            {...register('preferredTime')}
          >
            <option value="">Select a time</option>
            <option value="morning">Morning (10 AM – 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM – 3 PM)</option>
            <option value="late-afternoon">Late Afternoon (3 PM – close)</option>
          </select>
          {errors.preferredTime && (
            <p id="time-error" className="form-error" role="alert">
              <X size={14} aria-hidden="true" /> {errors.preferredTime.message}
            </p>
          )}
        </div>
      </div>

      {/* Reason for Visit */}
      <div className="form-field">
        <label className="form-label" htmlFor="reasonForVisit">
          Reason for Visit <span className="required-star" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <select
          id="reasonForVisit"
          className="form-select"
          aria-required="true"
          aria-invalid={errors.reasonForVisit ? 'true' : 'false'}
          aria-describedby={errors.reasonForVisit ? 'reason-error' : undefined}
          {...register('reasonForVisit')}
        >
          <option value="">Select a reason</option>
          <option value="checkup-cleaning">Routine Checkup & Cleaning</option>
          <option value="tooth-pain-emergency">Tooth Pain / Emergency</option>
          <option value="wisdom-teeth">Wisdom Teeth Consultation</option>
          <option value="implant-consultation">Dental Implant Consultation</option>
          <option value="root-canal">Root Canal Therapy</option>
          <option value="cosmetic-consultation">Cosmetic Dentistry Consultation</option>
          <option value="orthodontic-consultation">Orthodontic Consultation</option>
          <option value="other">Other</option>
        </select>
        {errors.reasonForVisit && (
          <p id="reason-error" className="form-error" role="alert">
            <X size={14} aria-hidden="true" /> {errors.reasonForVisit.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="form-field">
        <label className="form-label" htmlFor="message">
          Additional Notes <span style={{ color: 'var(--color-neutral-400)', fontWeight: 400 }}>(optional)</span>
        </label>
        <textarea
          id="message"
          className="form-textarea"
          placeholder="Anything else you'd like us to know before your visit..."
          rows={4}
          {...register('message')}
        />
      </div>

      {/* Preferred Contact Method */}
      <div className="form-field">
        <fieldset style={{ border: 'none', padding: 0 }}>
          <legend className="form-label">Preferred Contact Method</legend>
          <div className="form-radio-group">
            {[
              { value: 'phone', label: 'Phone call' },
              { value: 'email', label: 'Email' },
              { value: 'either', label: 'Either is fine' },
            ].map((opt) => (
              <label key={opt.value} className="form-radio-label">
                <input type="radio" value={opt.value} {...register('preferredContact')} />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Submit */}
      <div className="form-submit">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={formState === 'submitting'}
          id="appointment-submit-btn"
        >
          {formState === 'submitting' ? 'Sending Request…' : 'Request an Appointment'}
        </Button>
        <p className="form-note" style={{ textAlign: 'center' }}>
          By submitting, you agree to be contacted regarding your appointment request.
          This is a request, not a confirmed appointment.
        </p>
      </div>
    </form>
  )
}
