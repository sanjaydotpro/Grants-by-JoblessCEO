"use client"

import * as React from "react"
import { Check, FileCheck2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type GrantsApplicationPayload = {
  name: string
  email: string
  mobile: string
  details: string
}

interface GrantsApplicationSectionProps {
  className?: string
  style?: React.CSSProperties
  defaultValues?: Partial<GrantsApplicationPayload>
  onSubmit?: (data: GrantsApplicationPayload) => Promise<void> | void
}

const emailRegex =
  // simple and safe email pattern
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const phoneRegex =
  // accepts digits, spaces, plus, hyphens, parentheses; requires at least 7 digits
  /^(?=(?:.*\d){7,})[+\d\s\-().]{7,}$/

export default function GrantsApplicationSection({
  className,
  style,
  defaultValues,
  onSubmit,
}: GrantsApplicationSectionProps) {
  const [name, setName] = React.useState(defaultValues?.name ?? "")
  const [email, setEmail] = React.useState(defaultValues?.email ?? "")
  const [mobile, setMobile] = React.useState(defaultValues?.mobile ?? "")
  const [details, setDetails] = React.useState(defaultValues?.details ?? "")
  const [errors, setErrors] = React.useState<Partial<Record<keyof GrantsApplicationPayload, string>>>(
    {}
  )
  const [submitting, setSubmitting] = React.useState(false)
  const [confirmed, setConfirmed] = React.useState(false)

  function validate(): boolean {
    const next: Partial<Record<keyof GrantsApplicationPayload, string>> = {}
    if (!name.trim()) next.name = "Please enter your full name."
    if (!email.trim()) next.email = "Email is required."
    else if (!emailRegex.test(email.trim())) next.email = "Enter a valid email address."
    if (!mobile.trim()) next.mobile = "Mobile number is required."
    else if (!phoneRegex.test(mobile.trim())) next.mobile = "Enter a valid phone number."
    if (details.trim().length < 10)
      next.details = "Add a few more details about what you're building."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    try {
      setSubmitting(true)
      // Submit to API endpoint
      if (onSubmit) {
        await onSubmit({
          name: name.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          details: details.trim(),
        })
      } else {
        const response = await fetch('/api/v1/waitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            mobile: mobile.trim(),
            details: details.trim(),
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          if (response.status === 409) {
            setErrors({ email: 'This email is already on our waitlist' })
            return
          } else {
            throw new Error(result.error || 'Failed to submit application')
          }
        }
      }
      setConfirmed(true)
      toast.success("You're on the waitlist. We'll notify you.")
    } catch (err) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      className={cn(
        "w-full max-w-full bg-black text-white",
        "rounded-none",
        className
      )}
      style={style}
      aria-labelledby="grants-apply-heading"
    >
      <div
        className={cn(
          "w-full max-w-full",
          "rounded-2xl",
          "bg-zinc-900/90",
          "border border-zinc-800",
          "shadow-2xl",
          "backdrop-blur-sm"
        )}
      >
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 p-6 sm:p-8 md:p-10">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2
                id="grants-apply-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white"
              >
                Grants, residencies,<br />and free builder spaces
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed">
                Join a cohort of ambitious builders in Bangalore. We back teams with micro-grants,
                short residencies, and workspace access — so you can move fast and ship.
              </p>
            </div>
            <div className="space-y-4">
              <ul className="space-y-3">
                {[
                  "Micro-grants for high-velocity experiments",
                  "Residency access to collaborate and ship",
                  "Free workspace and community support",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-sm bg-pink-500/20 text-pink-400"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm sm:text-base text-zinc-300">{item}</p>
                  </li>
                ))}
              </ul>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
                <p className="text-sm sm:text-base text-zinc-400">
                  Be early. Add yourself to the waitlist — we review applications on a rolling basis
                  and open spots every few weeks.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Apply to the waitlist
              </h3>
              <p className="text-zinc-400">
                Tell us about you and what you're building. We'll reach out if there's a fit.
              </p>
            </div>
            <div>
              {confirmed ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-start gap-3 rounded-lg border border-pink-500/30 bg-pink-500/10 p-5"
                >
                  <div className="flex items-center gap-2 text-pink-400">
                    <FileCheck2 className="h-5 w-5" />
                    <span className="font-medium">You're on the waitlist.</span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    We&apos;ll notify you with next steps as spots open up. Thanks for building with us.
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-1 bg-zinc-800 text-white hover:bg-zinc-700"
                    onClick={() => setConfirmed(false)}
                  >
                    Submit another
                  </Button>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Full name</Label>
                      <Input
                        id="name"
                        name="name"
                        inputMode="text"
                        autoComplete="name"
                        placeholder="Ada Lovelace"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={cn(
                          "bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500",
                          "focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:border-pink-500"
                        )}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={cn(
                          "bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500",
                          "focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:border-pink-500"
                        )}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-white">Mobile</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+91 9XX-XXX-XXXX"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      aria-invalid={!!errors.mobile}
                      aria-describedby={errors.mobile ? "mobile-error" : undefined}
                      className={cn(
                        "bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500",
                        "focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:border-pink-500"
                      )}
                    />
                    {errors.mobile && (
                      <p id="mobile-error" className="text-xs text-red-400">
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details" className="text-white">What are you building?</Label>
                    <Textarea
                      id="details"
                      name="details"
                      placeholder="Give us a concise overview of your project, timeline, and what support you need."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      aria-invalid={!!errors.details}
                      aria-describedby={errors.details ? "details-error" : undefined}
                      className={cn(
                        "min-h-[120px] bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500",
                        "focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:border-pink-500"
                      )}
                    />
                    {errors.details && (
                      <p id="details-error" className="text-xs text-red-400">
                        {errors.details}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500 break-words">
                      By applying, you agree to be contacted about upcoming cohorts and opportunities.
                    </p>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className={cn(
                        "rounded-full border border-pink-500/20 bg-pink-500/10 px-6 py-2 text-sm font-medium text-white shadow-sm backdrop-blur",
                        "transition-all hover:bg-pink-500/20 hover:border-pink-500/30 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-0",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      {submitting ? "Submitting..." : "Join the waitlist"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}