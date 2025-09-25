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
        "w-full max-w-full bg-background text-foreground",
        "rounded-none",
        className
      )}
      style={style}
      aria-labelledby="grants-apply-heading"
    >
      <div
        className={cn(
          "w-full max-w-full",
          "rounded-[calc(var(--radius)+0.25rem)]",
          "bg-[var(--surface-1)]/80",
          "border border-border",
          "shadow-[0_0_0_1px_rgba(46,211,183,0.04)_inset,0_30px_60px_-15px_rgba(0,0,0,0.35)]",
          "backdrop-blur"
        )}
      >
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 p-5 sm:p-6 md:p-8">
          <Card className="bg-card border-border/70 text-foreground shadow-none">
            <CardHeader className="space-y-3">
              <CardTitle
                id="grants-apply-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight"
              >
                Grants, residencies, and free builder spaces
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Join a cohort of ambitious builders in Bangalore. We back teams with micro-grants,
                short residencies, and workspace access — so you can move fast and ship.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <ul className="space-y-3">
                {[
                  "Micro-grants for high-velocity experiments",
                  "Residency access to collaborate and ship",
                  "Free workspace and community support",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/20"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm sm:text-base">{item}</p>
                  </li>
                ))}
              </ul>
              <div className="rounded-md border border-border/60 bg-[var(--surface-2)]/60 p-4">
                <p className="text-sm sm:text-base">
                  Be early. Add yourself to the waitlist — we review applications on a rolling basis
                  and open spots every few weeks.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/70 text-foreground shadow-none">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-semibold">
                Apply to the waitlist
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Tell us about you and what you're building. We'll reach out if there's a fit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {confirmed ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-5"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <FileCheck2 className="h-5 w-5" />
                    <span className="font-medium">You're on the waitlist.</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll notify you with next steps as spots open up. Thanks for building with us.
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-1"
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
                      <Label htmlFor="name">Full name</Label>
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
                          "bg-[var(--surface-2)] border-border/70",
                          "focus-visible:ring-2 focus-visible:ring-ring"
                        )}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-danger">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
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
                          "bg-[var(--surface-2)] border-border/70",
                          "focus-visible:ring-2 focus-visible:ring-ring"
                        )}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-danger">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile</Label>
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
                        "bg-[var(--surface-2)] border-border/70",
                        "focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                    />
                    {errors.mobile && (
                      <p id="mobile-error" className="text-xs text-danger">
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">What are you building?</Label>
                    <Textarea
                      id="details"
                      name="details"
                      placeholder="Give us a concise overview of your project, timeline, and what support you need."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      aria-invalid={!!errors.details}
                      aria-describedby={errors.details ? "details-error" : undefined}
                      className={cn(
                        "min-h-[120px] bg-[var(--surface-2)] border-border/70",
                        "focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                    />
                    {errors.details && (
                      <p id="details-error" className="text-xs text-danger">
                        {errors.details}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground break-words">
                      By applying, you agree to be contacted about upcoming cohorts and opportunities.
                    </p>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className={cn(
                        "rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-foreground/90 shadow-sm shadow-black/20 backdrop-blur",
                        "transition-all hover:bg-white/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.45)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
                      )}
                    >
                      {submitting ? "Submitting..." : "Join the waitlist"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}