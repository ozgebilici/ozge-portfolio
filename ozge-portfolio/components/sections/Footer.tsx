"use client";

const navLinks = [
  { label: "Ana Sayfa", href: "#hero" },
  { label: "Hakkımda", href: "#about" },
  { label: "Deneyim", href: "#experience" },
  { label: "Projeler", href: "#projects" },
  { label: "İletişim", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative py-12 border-t"
      style={{ background: "#080E1C", borderColor: "rgba(99,102,241,0.12)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-start mb-10">
          {/* Wordmark */}
          <div>
            <p
              className="text-4xl font-display font-black tracking-tighter"
              style={{
                background: "linear-gradient(135deg, #6366F1, #818CF8, #4F46E5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              aria-label="Özge"
            >
              ÖZGE
            </p>
            <p className="text-text-muted text-xs mt-1 font-mono">Yazılım Mühendisi</p>
          </div>

          {/* Quick links */}
          <nav aria-label="Alt menü hızlı linkler">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Hızlı Linkler</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-text-muted hover:text-accent-light transition-colors focus-visible:outline-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + meta */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">
              Bağlantılar
            </p>

            {/* GitHub */}
            <a
              href="https://github.com/ozgebilici"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-light transition-colors focus-visible:outline-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/%C3%B6zge-bilici-6a7870253/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-light transition-colors focus-visible:outline-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-3.368-4-3.112-4 0v5.604h-3v-10h3v1.604c1.396-2.586 7-2.777 7 2.476v5.92z" />
              </svg>
              LinkedIn
            </a>
          
          
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="pt-6 border-t flex flex-col sm:flex-row justify-between gap-2"
        style={{ borderColor: "rgba(99,102,241,0.08)" }}
      >
        <p className="text-xs text-text-muted">
          © {year} Özge Bilici. Tüm hakları saklıdır.
        </p>
        <p className="text-xs text-text-muted">
          Next.js ile inşa edildi
        </p>
      </div>
    </div>
    </footer >
  );
}
