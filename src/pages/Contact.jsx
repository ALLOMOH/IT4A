import { useState } from "react";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";
import { toast } from "../components/ui/toast.tsx";
import { useLanguage } from "../i18n/LanguageContext";
import { Reveal, PageHero } from "../components/Reveal";
import { OfficeMap } from "../components/OfficeMap";
import emailjs from "@emailjs/browser";


const inputClass =
"w-full bg-paper border border-line rounded-lg px-4 py-3.5 text-ink placeholder:text-ink-soft/70 outline-none focus-visible:outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20";

const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
    {children}
  </label>
);

export default function Contact() {
  const [sending, setSending] = useState(false);
  const { t } = useLanguage();
  const cx = t.x.contact;
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (sending) return;
  setSending(true);

  try {

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        reply_to: form.email,
        company: form.company || "-",
        service: form.service || "-",
        message: form.message,
      },
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
    );

    toast.add({ title: t.contact.form.success, type: "success" });
    setForm({ name: "", email: "", company: "", service: "", message: "" });
  } catch (error) {
    reportError(error, { context: "Contact form submission" });
    toast.add({
      title: t.contact.form.error ?? "L'envoi a échoué. Réessayez ou écrivez-nous directement par email.",
      type: "error",
    });
  } finally {
    setSending(false);
  }
};

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <>
      <PageHero label={t.contact.label} title={t.contact.title} sub={t.contact.sub}>
        <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-4 py-2.5 text-sm font-semibold text-ink">
          <Clock className="size-4 text-mark" />
          {cx.response}
        </p>
      </PageHero>

      <section data-testid="contact-section" className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <form onSubmit={handleSubmit} data-testid="contact-form" className="rounded-3xl border border-line bg-card p-6 sm:p-10">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ink">{t.contact.formTitle}</h2>
              <div className="mt-8 grid sm:grid-cols-2 gap-5">
                <Field label={t.contact.form.name}>
                  <input type="text" required autoComplete="name" value={form.name} onChange={set("name")} data-testid="contact-name-input" className={inputClass} />
                </Field>
                <Field label={t.contact.form.email}>
                  <input type="email" required autoComplete="email" value={form.email} onChange={set("email")} data-testid="contact-email-input" className={inputClass} />
                </Field>
                <Field label={t.contact.form.company}>
                  <input type="text" autoComplete="organization" value={form.company} onChange={set("company")} data-testid="contact-company-input" className={inputClass} />
                </Field>
                <Field label={t.nav.services}>
                  <select value={form.service} onChange={set("service")} className={`${inputClass} appearance-none`}>
                    <option value="">…</option>
                    {t.services.items.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label={t.contact.form.message}>
                    <textarea required rows={6} value={form.message} onChange={set("message")} data-testid="contact-message-input" className={`${inputClass} resize-y`} />
                  </Field>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
                <button type="submit" disabled={sending} data-testid="contact-submit-button" className="btn btn-primary group shrink-0">
                  {sending ? "Envoi en cours..." : t.contact.form.submit}
                  <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <p className="text-[13px] text-ink-soft leading-snug">{cx.formNote}</p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
              <h2 className="font-heading text-xl font-bold text-ink">{cx.officesTitle}</h2>
              <div className="mt-5">
                <OfficeMap />
              </div>
              <ul className="mt-4 divide-y divide-line border-t border-line">
                {t.contact.addresses.map((a, i) => (
                  <li key={i} data-testid={`contact-address-${i}`} className="flex items-start gap-4 py-5">
                    <MapPin className="size-5 text-mark shrink-0 mt-0.5" strokeWidth={1.8} />
                    <div>
                      <p className="font-semibold text-ink">{a.city}</p>
                      <p className="mt-1 text-[15px] text-ink-soft">{a.detail}</p>
                    </div>
                  </li>
                ))}
                <li data-testid="contact-phone" className="flex items-start gap-4 py-5">
                  <Phone className="size-5 text-mark shrink-0 mt-0.5" strokeWidth={1.8} />
                  <div>
                    <p className="text-sm text-ink-soft">{t.contact.phoneLabel}</p>
                    <a href="tel:+2250748290303" className="font-semibold text-ink hover:text-mark transition-colors">+225 07 48 29 03 03</a>
                  </div>
                </li>
                <li data-testid="contact-email" className="flex items-start gap-4 py-5">
                  <Mail className="size-5 text-mark shrink-0 mt-0.5" strokeWidth={1.8} />
                  <div className="min-w-0">
                    <p className="text-sm text-ink-soft">{t.contact.emailLabel}</p>
                    <a href="mailto:contact@itexperts4africa.com" className="font-semibold text-ink hover:text-mark transition-colors wrap-anywhere">contact@itexperts4africa.com</a>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
