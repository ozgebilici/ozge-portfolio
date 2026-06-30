"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    kvkk: false,
    honeypot: "",
  });
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({ ...prev, [name]: checked !== undefined ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.kvkk) {
      setErrorMsg("Lütfen KVKK aydınlatma metnini onaylayın.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Bir hata oluştu.");
        setStatus("error");
      } else {
        setStatus("success");
        setForm({ firstName: "", lastName: "", email: "", message: "", kvkk: false, honeypot: "" });
      }
    } catch {
      setErrorMsg("Sunucuya bağlanılamadı. Lütfen tekrar deneyin.");
      setStatus("error");
    }
  };

  // Obfuscated email
  const getEmail = () => {
    const parts = ["ozgebilici", "40", "@", "gmail", ".", "com"];
    return parts.join("");
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "#0B1120" }}
        aria-hidden="true"
      />

      {/* Large parallax text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[12vw] font-display font-black select-none"
          style={{ color: "rgba(99,102,241,0.035)", letterSpacing: "-0.02em" }}
        >
          İLETİŞİM
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div
          className="mb-16 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-mono text-sm">09</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent max-w-xs" />
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary">
            İletişim
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-text-secondary leading-relaxed">
              Bir proje fikriniz, iş birliği teklifiniz ya da sormak istediğiniz bir şey mi var? Mesajınızı göndermekten çekinmeyin.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <a
                  href={`mailto:${getEmail()}`}
                  className="text-sm text-text-secondary hover:text-accent-light transition-colors focus-visible:outline-accent"
                >
                  {getEmail()}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#818CF8" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-3.368-4-3.112-4 0v5.604h-3v-10h3v1.604c1.396-2.586 7-2.777 7 2.476v5.92z" />
                  </svg>
                </div>

                <a
                  href="https://www.linkedin.com/in/%C3%B6zge-bilici-6a7870253/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-accent-light transition-colors focus-visible:outline-accent"
                >
                  linkedin.com/in/özge-bilici
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#818CF8" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <a
                  href="https://github.com/ozgebilici"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-accent-light transition-colors focus-visible:outline-accent"
                >
                  github.com/ozgebilici
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-xl border border-accent/30 text-center"
                style={{ background: "rgba(99,102,241,0.08)" }}
              >
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-text-primary font-semibold mb-2">Mesajınız Gönderildi!</h3>
                <p className="text-text-secondary text-sm">En kısa sürede size geri döneceğim.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={form.honeypot}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Ad" name="firstName" value={form.firstName} onChange={handleChange} required />
                  <FormField label="Soyad" name="lastName" value={form.lastName} onChange={handleChange} required />
                </div>
                <FormField label="E-posta" name="email" type="email" value={form.email} onChange={handleChange} required />
                <FormField label="Mesaj" name="message" value={form.message} onChange={handleChange} required textarea rows={5} />

                {/* KVKK */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="kvkk"
                    checked={form.kvkk}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-border-subtle bg-bg-2 accent-accent focus-visible:outline-accent"
                    required
                    aria-required="true"
                  />
                  <span className="text-xs text-text-muted leading-relaxed group-hover:text-text-secondary transition-colors">
                    Kişisel verilerimin KVKK kapsamında işlenmesine onay veriyorum. Verilerim yalnızca iletişim amacıyla kullanılacaktır.
                  </span>
                </label>

                {errorMsg && (
                  <p className="text-red-400 text-sm" role="alert">{errorMsg}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3.5 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-accent-light transition-colors disabled:opacity-50 focus-visible:outline-accent relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {status === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        aria-hidden="true"
                      />
                      Gönderiliyor...
                    </span>
                  ) : (
                    "Mesaj Gönder"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  textarea,
  rows,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const baseClass =
    "w-full bg-bg-2 border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200 resize-none";
  const borderClass = focused
    ? "border-accent shadow-[0_0_0_2px_rgba(99,102,241,0.2)]"
    : "border-border-subtle hover:border-accent/30";

  return (
    <div>
      <label className="block text-xs text-text-muted mb-1.5 font-medium" htmlFor={name}>
        {label}{required && <span className="text-accent ml-0.5" aria-label="zorunlu">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={rows}
          required={required}
          aria-required={required}
          placeholder={`${label} giriniz`}
          className={`${baseClass} ${borderClass}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          aria-required={required}
          placeholder={`${label} giriniz`}
          className={`${baseClass} ${borderClass}`}
        />
      )}
    </div>
  );
}
