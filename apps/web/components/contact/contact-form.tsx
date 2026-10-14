"use client"

import Image from "next/image"
import * as React from "react"

import { contact } from "@/lib/site"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"

type Errors = Partial<Record<"name" | "email" | "message" | "privacy", string>>

function validate(data: FormData): Errors {
  const errors: Errors = {}
  if (!String(data.get("name") ?? "").trim())
    errors.name = "Inserisci il tuo nome"
  const email = String(data.get("email") ?? "").trim()
  if (!email) errors.email = "Inserisci la tua e-mail"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Inserisci un'e-mail valida"
  if (!String(data.get("message") ?? "").trim())
    errors.message = "Scrivi un messaggio"
  if (!data.get("privacy")) errors.privacy = "Devi accettare l'informativa"
  return errors
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null
  return (
    <p id={id} className="text-xs leading-[18px] text-destructive">
      {children}
    </p>
  )
}

function TextField({
  name,
  label,
  type = "text",
  autoComplete,
  error,
}: {
  name: string
  label: string
  type?: string
  autoComplete?: string
  error?: string
}) {
  const id = `contact-${name}`
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder="Scrivi..."
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={error ? "pr-12" : undefined}
        />
        {error && (
          <Image
            src="/icons/input-error.svg"
            alt=""
            width={24}
            height={24}
            className="pointer-events-none absolute top-4 right-4"
          />
        )}
      </div>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  )
}

export function ContactForm() {
  const [errors, setErrors] = React.useState<Errors>({})

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(new FormData(event.currentTarget))
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    // TODO: send the request (backend / email service not defined yet).
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 text-foreground">
          <h3>Compila il form</h3>
          <p className="text-body">
            Raccontaci di cosa hai bisogno: ti ricontattiamo entro 24 ore con la
            soluzione più adatta.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <TextField
            name="name"
            label="Nome"
            autoComplete="name"
            error={errors.name}
          />
          <TextField
            name="email"
            label="E-mail"
            type="email"
            autoComplete="email"
            error={errors.email}
          />
          <TextField
            name="phone"
            label="Telefono"
            type="tel"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">Messaggio</Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Scrivi..."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
        />
        <FieldError id="contact-message-error">{errors.message}</FieldError>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex max-w-[292px] items-start gap-[7px] md:max-w-none">
          <Checkbox
            name="privacy"
            aria-invalid={errors.privacy ? true : undefined}
            aria-describedby={
              errors.privacy ? "contact-privacy-error" : undefined
            }
          />
          <span className="text-sm leading-4 text-testo-secondario">
            Inserendo i dati nel form di contatto dichiari di aver preso visione
            e di accettare quanto disposto nell’informativa sul trattamento dei
            dati personali, resa ai sensi dell’art. 13 del Regolamento (UE)
            2016/679.
          </span>
        </label>
        <FieldError id="contact-privacy-error">{errors.privacy}</FieldError>
      </div>

      <Button type="submit" size="lg" className="w-full">
        Invia Richiesta
      </Button>
      <Button
        variant="success"
        size="lg"
        className="w-full gap-2.5"
        render={<a href={contact.whatsapp} target="_blank" rel="noreferrer" />}
        nativeButton={false}
      >
        Contattaci
        <Image src="/icons/whatsapp.svg" alt="" width={16} height={16} />
      </Button>
    </form>
  )
}
