import { useState, useEffect, useRef, createContext, useContext } from "react"

// ─── Theme context ────────────────────────────────────────────────────────────

type Theme = "dark" | "light"
interface ThemeCtx { theme: Theme; toggle: () => void }
const ThemeContext = createContext<ThemeCtx>({ theme: "dark", toggle: () => {} })
const useTheme = () => useContext(ThemeContext)

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useCounter(target: number, duration: number, active: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = Date.now()
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.floor(eased * target))
      if (t < 1) requestAnimationFrame(tick)
      else setVal(target)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return val
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) => "₱" + n.toLocaleString("en-PH")

function useBgOverlay(alpha: number) {
  const { theme } = useTheme()
  return theme === "dark" ? `rgba(7,7,7,${alpha})` : `rgba(248,244,239,${alpha})`
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const VISION_CARDS = [
  { icon: "✦", title: "WORSHIP", body: "A place where generations can gather and worship God together without limitation." },
  { icon: "✦", title: "DISCIPLESHIP", body: "A place where people can grow deeper in their relationship with Jesus." },
  { icon: "✦", title: "COMMUNITY", body: "A place where families, young people, and the wider community can truly belong." },
  { icon: "✦", title: "OUTREACH", body: "A place where we can serve our community and share the Gospel boldly." },
  { icon: "✦", title: "NEXT GENERATION", body: "A place where children and young people are equipped to follow Jesus all their lives." },
  { icon: "✦", title: "MISSION", body: "A place that allows ELGC to continue fulfilling God's calling for this church." },
]

const PROGRAMS = [
  {
    icon: "⬡",
    name: "Fill & Full",
    tagline: "One bottle. One year. One dream.",
    description: "Take a plastic bottle and fill it with coins every day throughout the year. A simple habit — when multiplied across the congregation — becomes something extraordinary for K2K.",
    tag: "Ongoing",
    tagStyle: { background: "rgba(50,180,100,0.12)", color: "#4CAF80", border: "1px solid rgba(50,180,100,0.25)" },
    detail: "Resets every year — join anytime",
    cta: "MESSAGE US ON FACEBOOK",
  },
  {
    icon: "◈",
    name: "Covenant",
    tagline: "A promise made before God.",
    description: "Sign a covenant pledge committing a specific amount toward the K2K goal. A Covenant is not just a donation — it is a sacred, written commitment you fulfill over time.",
    tag: "Open for Signing",
    tagStyle: { background: "rgba(201,150,58,0.12)", color: "var(--gold)", border: "1px solid rgba(201,150,58,0.25)" },
    detail: "Regular or one-time contributions",
    cta: "MESSAGE US ON FACEBOOK",
  },
  {
    icon: "◉",
    name: "Chinito Burger",
    tagline: "Eat with purpose.",
    description: "Support ELGC's affiliated food stall — Chinito Burger. Every purchase is a direct contribution to the church's vision. Enjoy a great meal and be part of the movement.",
    tag: "Visit Us",
    tagStyle: { background: "rgba(230,120,60,0.12)", color: "#E07840", border: "1px solid rgba(230,120,60,0.25)" },
    detail: "Church-affiliated food stall",
    cta: "MESSAGE US ON FACEBOOK",
  },
]

const MILESTONES = [
  { year: "2017", label: "K2K BEGINS", desc: "A simple idea: 1,000 people × ₱1,000 = ₱1,000,000. A dream is born.", done: true },
  { year: "2019", label: "THE VISION GROWS", desc: "₱1M is no longer enough. The church prays for greater faith and a greater vision.", done: true },
  { year: "2020–2022", label: "A SEASON PAUSED", desc: "The pandemic slowed the momentum — gatherings stopped, giving grew harder. But the dream never left. ELGC held on in faith.", done: true },
  { year: "2023", label: "NEW GOAL SET", desc: "The target is raised to ₱10,000,000. The movement gains new energy.", done: true },
  { year: "TODAY", label: "FULL FORCE, AGAIN", desc: "After the pause, we're moving again — with full commitment. Every partner, every peso, every prayer moves us forward.", done: false, current: true },
  { year: "SOON", label: "PROPERTY ACQUIRED", desc: "By God's provision and the generosity of His people, we reach the goal.", done: false },
  { year: "THE DAY", label: "WE GET THE KEYS", desc: "A new home for ELGC. A place for generations to come.", done: false, final: true },
]

const WAYS = [
  { icon: "○", title: "GIVE", body: "Make a financial contribution — any amount — toward the K2K goal. Every peso matters." },
  { icon: "◇", title: "PLEDGE", body: "Commit to giving regularly. A consistent pledge moves the vision steadily forward." },
  { icon: "△", title: "PRAY", body: "Pray for God's provision, wisdom, and direction for ELGC. Prayer moves mountains." },
  { icon: "□", title: "SHARE", body: "Invite others to become part of the journey. Grow the movement by telling the story." },
]

const SOCIAL_LINKS = [
  { label: "FB", href: "https://www.facebook.com/elgchurchofficial" },
  { label: "IG", href: "https://www.instagram.com/elgc.official/" },
  { label: "TT", href: "https://www.tiktok.com/@elgchurch" },
]

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const links = [
    { label: "About", href: "#about" },
    { label: "Why K2K", href: "#vision" },
    { label: "Our Vision", href: "#future-church" },
    { label: "Progress", href: "#progress" },
    { label: "Get Involved", href: "#participate" },
  ]

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "var(--nav-bg)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      transition: "background 0.4s ease, border-color 0.4s ease",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <a href="#hero" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.5rem", letterSpacing: "0.12em", color: "var(--fg)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          K2K
          <span style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.12em", fontWeight: 600 }}>ELGC</span>
        </a>

        <div style={{ gap: "2rem", alignItems: "center" }} className="hidden md:flex">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", letterSpacing: "0.03em", color: "var(--fg-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
            >{l.label}</a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className={`theme-toggle${theme === "light" ? " light" : ""}`}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <div className="theme-toggle-dot" />
          </button>

          <a href="#join" className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.8rem" }}>JOIN K2K</a>
        </div>

        <div style={{ alignItems: "center", gap: "1rem" }} className="flex md:hidden">
          <button onClick={toggle} className={`theme-toggle${theme === "light" ? " light" : ""}`} title="Toggle theme">
            <div className="theme-toggle-dot" />
          </button>
          <button onClick={() => setMobileOpen(o => !o)} style={{ background: "none", border: "none", color: "var(--fg)", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--fg)", transition: "transform 0.3s", transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--fg)", opacity: mobileOpen ? 0 : 1, transition: "opacity 0.2s" }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--fg)", transition: "transform 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ background: "var(--nav-bg)", backdropFilter: "blur(14px)", borderTop: "1px solid var(--border)", padding: "1.5rem 2rem 2rem" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--fg)", textDecoration: "none", padding: "0.6rem 0", borderBottom: "1px solid var(--border)" }}>
              {l.label}
            </a>
          ))}
          <a href="#join" className="btn-primary" style={{ marginTop: "1.5rem", justifyContent: "center", width: "100%", display: "flex" }} onClick={() => setMobileOpen(false)}>JOIN K2K</a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const heroTop = useBgOverlay(0.85)
  const heroMid = useBgOverlay(0.35)
  const textShadow = "0 2px 20px rgba(0,0,0,0.55)"

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", background: "var(--bg)" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <video autoPlay muted loop playsInline
          src="/elgc-building-church.mp4"
          aria-label="Construction progress on the future ELGC property"
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${heroTop} 0%, ${heroMid} 55%, transparent 100%)` }} />
        {/* Local scrim behind the bottom text block — the main gradient goes fully
            transparent by the bottom, so without this the headline/copy sit directly
            on the raw video and lose contrast. */}
        <div style={{ position: "absolute", inset: "auto 0 0 0", height: "42%", background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }} />
      </div>

      <div style={{ position: "absolute", top: 80, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <a href="#about" className="section-label" style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textDecoration: "none", transition: "opacity 0.2s ease" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >EMMANUEL'S LIVING GOSPEL CHURCH</a>
      </div>

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 2rem 5rem", width: "100%" }}>
        <div className="fade-up" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(7rem, 28vw, 22rem)", lineHeight: 0.88, letterSpacing: "-0.02em", color: "var(--fg)", textShadow }}>
          K2K
        </div>

        <div className="fade-up delay-2" style={{ marginTop: "2rem" }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", letterSpacing: "0.06em", lineHeight: 1.35, color: "var(--fg)", textTransform: "uppercase", margin: 0, textShadow }}>
            A Place to Worship.<br />A Place to Grow.<br />A Place to Reach More.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <a href="#join" className="btn-primary">JOIN THE MOVEMENT</a>
            <a href="#progress" className="btn-outline">SEE OUR PROGRESS</a>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--fg-dim)", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, var(--fg-dim), transparent)` }} />
      </div>
    </section>
  )
}

// ─── About Church (identity + why-we-need-a-new-place) ────────────────────────

function AboutChurch() {
  const { ref, inView } = useInView()
  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} style={{ position: "relative", padding: "5rem 2rem", background: "var(--bg-alt)", borderTop: "1px solid var(--border)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 900, height: 900, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,150,58,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
        <div className={inView ? "fade-up" : ""} style={{ opacity: inView ? undefined : 0 }}>
          <span className="section-label">About ELGC</span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem", marginTop: "0.75rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem,4.2vw,3.5rem)", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 0.95, color: "var(--fg)", margin: 0 }}>
              More than<br />a building.
            </h2>
            <p style={{ color: "var(--fg-muted)", maxWidth: 440, lineHeight: 1.6, margin: 0, fontSize: "0.95rem" }}>
              {"We're Emmanuel's Living Gospel Church — a place to worship, a place to grow, a place to reach more. We're not asking for a bigger room. We're praying for a place where God's work can expand into the next generation."}
            </p>
          </div>
        </div>

        <div className={inView ? "fade-up delay-2" : ""} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginTop: "2rem", opacity: inView ? undefined : 0 }}>
          <a href="https://elgchurch.com/" target="_blank" rel="noopener noreferrer" className="btn-outline">VISIT ELGCHURCH.COM</a>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: 40, height: 40, border: "1px solid var(--border-mid)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.08em", color: "var(--fg-muted)", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-mid)"; e.currentTarget.style.color = "var(--fg-muted)" }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div id="vision" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1px", marginTop: "3rem", background: "var(--border)" }}>
          {VISION_CARDS.map((card, i) => (
            <div key={card.title} className={`card-hover ${inView ? `fade-up delay-${Math.min(i + 1, 5)}` : ""}`}
              style={{ background: "var(--bg-alt)", padding: "1.75rem 1.75rem", border: "none", opacity: inView ? undefined : 0 }}>
              <div style={{ color: "var(--gold)", fontSize: "0.9rem", marginBottom: "0.85rem" }}>{card.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg)", margin: "0 0 0.5rem" }}>{card.title}</h3>
              <p style={{ color: "var(--fg-muted)", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Story ────────────────────────────────────────────────────────────────────

function Story() {
  const { ref, inView } = useInView()
  return (
    <section id="story" ref={ref as React.RefObject<HTMLElement>} style={{ padding: "7rem 2rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className={inView ? "fade-up" : ""} style={{ opacity: inView ? undefined : 0 }}>
            <span className="section-label">The Story</span>
            <div style={{ marginTop: "2rem" }}>
              {[
                { n: "1,000", label: "PEOPLE" },
                { symbol: "×" },
                { n: "₱1,000", label: "EACH" },
                { symbol: "=" },
                { n: "₱1,000,000", label: "THE ORIGINAL DREAM", gold: true },
              ].map((item, i) =>
                "symbol" in item ? (
                  <div key={i} style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: "var(--fg-subtle)", fontWeight: 700, margin: "0.5rem 0" }}>{item.symbol}</div>
                ) : (
                  <div key={i} style={{ marginBottom: "0.25rem" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2.5rem,5vw,4rem)", color: item.gold ? "var(--gold)" : "var(--fg)", lineHeight: 1, letterSpacing: "-0.01em" }}>{item.n}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.2em", color: "var(--fg-dim)", textTransform: "uppercase" }}>{item.label}</div>
                  </div>
                )
              )}
            </div>

            <div style={{ margin: "2rem 0", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.3rem, 6vw, 1.8rem)", color: "var(--fg-subtle)", letterSpacing: "0.02em" }}>₱1,000,000</div>
              <div style={{ flex: 1, minWidth: 40, height: 1, background: `linear-gradient(to right, var(--border-mid), var(--gold))` }} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.3rem, 6vw, 1.8rem)", color: "var(--gold)", letterSpacing: "0.02em" }}>₱10,000,000</div>
            </div>

            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.5rem)", color: "var(--gold)", lineHeight: 1, letterSpacing: "-0.01em" }}>10,000 people</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.2em", color: "var(--fg-dim)", textTransform: "uppercase" }}>× ₱1,000 each — today's goal</div>
            </div>
          </div>

          <div className={inView ? "fade-up delay-3" : ""} style={{ opacity: inView ? undefined : 0 }}>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.4rem,2.5vw,2rem)", lineHeight: 1.3, color: "var(--fg)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              It started with a simple idea nine years ago.
            </p>
            <p style={{ color: "var(--fg-muted)", lineHeight: 1.8, marginTop: "1.5rem" }}>
              If 1,000 people each committed ₱1,000, together we could raise ₱1 million for a church property. It was bold. It was faith. It was ELGC moving as one.
            </p>
            <p style={{ color: "var(--fg-muted)", lineHeight: 1.8, marginTop: "1rem" }}>
              But the world changed. The church grew. The needs grew. So today, it takes ten times as many of us — still ₱1,000 each.
            </p>
            <div style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "1.5rem", marginTop: "2rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--fg)", margin: "0 0 0.75rem" }}>
                You do not have to carry<br />the whole dream.
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--gold)", margin: 0 }}>
                We carry it together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Big Vision ───────────────────────────────────────────────────────────────

function BigVision() {
  const { ref, inView } = useInView()
  const overlay1 = useBgOverlay(0.55)
  const overlay2 = useBgOverlay(0.88)
  return (
    <section id="big-vision" ref={ref as React.RefObject<HTMLElement>} style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--bg)" }}>
      <img src="/images/1.jpg" alt="ELGC congregation gathered in worship"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${overlay1} 0%, ${overlay2} 75%)` }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 1100, height: 1100, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,150,58,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "8rem 2rem", textAlign: "center", width: "100%" }}>
        <span className="section-label">The Big Vision</span>
        <h2 className={inView ? "fade-up delay-1" : ""} style={{
          fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem,5.5vw,5rem)",
          textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1.05,
          color: "var(--fg)", marginTop: "1.5rem", opacity: inView ? undefined : 0
        }}>
          Imagine what God can do<br />
          <span style={{ color: "var(--gold)" }}>with a place like this.</span>
        </h2>
        <div className={inView ? "fade-up delay-3" : ""} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 3rem", marginTop: "4rem", opacity: inView ? undefined : 0 }}>
          {["A place to worship.", "A place to disciple.", "A place to serve.", "A place to send.", "A place for generations."].map((line, i) => (
            <div key={i} style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(0.9rem,2vw,1.4rem)", letterSpacing: "0.04em", color: i === 4 ? "var(--gold)" : "var(--fg)", textTransform: "uppercase", padding: "0.5rem 0" }}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Future Church (Scroll-driven video) ─────────────────────────────────────

const CHURCH_VIDEOS = {
  construction: { src: "/elgc-building-church.mp4", poster: "/elgc-exterior.jpg", label: "Construction" },
  walkthrough: { src: "/elgc-going-inside.mp4", poster: "/elgc-interior.jpeg", label: "Walkthrough" },
} as const

const CHURCH_IMAGES = [
  { src: "/elgc-exterior.jpg", label: "Exterior" },
  { src: "/elgc-interior.jpeg", label: "Interior" },
]

function fmtTime(t: number) {
  if (!Number.isFinite(t) || t < 0) return "0:00"
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

function FutureChurch() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeVideo, setActiveVideo] = useState<keyof typeof CHURCH_VIDEOS>("walkthrough")
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  // Pins the video full-screen while scrolling through this section, and
  // scrubs playback to match scroll position — the page only advances past
  // the video once the user has scrolled through the whole clip.
  //
  // Native scroll events can fire far faster than the video can decode
  // seeks, so work is coalesced to once per animation frame and skipped
  // entirely for sub-frame-sized moves — otherwise seeks queue up faster
  // than they resolve and playback stutters.
  useEffect(() => {
    const wrap = wrapRef.current
    const video = videoRef.current
    if (!wrap || !video) return

    let queued = false

    const update = () => {
      queued = false
      const rect = wrap.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return
      const p = Math.min(Math.max(-rect.top / scrollable, 0), 1)
      setProgress(p)
      // Gate on readyState >= 2 (HAVE_CURRENT_DATA), not just metadata.
      // Seeking before the browser has an actual decoded frame clears the
      // poster (per spec, a seek dismisses it) with nothing decoded yet to
      // show in its place — real iOS/Android hardware renders that gap as
      // black, even though desktop Chrome's mobile emulation papers over
      // it. Waiting for a real frame first means there's always something
      // on screen to seek *from*.
      if (video.readyState >= 2 && Number.isFinite(video.duration)) {
        const target = p * video.duration
        if (Math.abs(video.currentTime - target) > 0.033) {
          const seekable = video as HTMLVideoElement & { fastSeek?: (time: number) => void }
          if (typeof seekable.fastSeek === "function") seekable.fastSeek(target)
          else video.currentTime = target
        }
      }
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(update)
    }

    // Mobile browsers cap how aggressively they preload a <video> that's
    // still far off-screen, regardless of `preload="auto"` — the fetch
    // doesn't really get going until the element is near the viewport or
    // something (like a tap, which remounts the element) forces it. A
    // muted play() is allowed without a user gesture and is itself enough
    // to force the browser to start fetching + decoding, so trigger one
    // as soon as this section is getting close, well before the user
    // actually scrolls into it — that way it's already loaded and ready
    // to respond the instant scrubbing starts.
    const unlockFrame = () => {
      video.play().then(() => video.pause()).catch(() => {})
    }
    const approachObserver = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting) return
        unlockFrame()
        approachObserver.disconnect()
      },
      { rootMargin: "800px 0px 800px 0px" },
    )
    approachObserver.observe(wrap)

    // Re-run update() once a real frame is decoded (readyState >= 2) so the
    // video snaps to the correct scroll-matched position — not just frame
    // 0 — as soon as it's safe to seek without going black.
    video.addEventListener("loadeddata", update)

    window.addEventListener("scroll", onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", onScroll)
      video.removeEventListener("loadeddata", update)
      approachObserver.disconnect()
    }
  }, [activeVideo])

  const headerOpacity = Math.max(0, 1 - progress / 0.2)

  return (
    <section id="future-church" style={{ background: "#000" }}>
      <div ref={wrapRef} style={{ position: "relative", height: "280vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100dvh", overflow: "hidden" }}>
          <video
            key={CHURCH_VIDEOS[activeVideo].src}
            ref={videoRef}
            src={CHURCH_VIDEOS[activeVideo].src}
            poster={CHURCH_VIDEOS[activeVideo].poster}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.4) 100%)" }} />

          {/* Video tabs */}
          <div style={{ position: "absolute", top: 84, left: 0, right: 0, padding: "0 1rem" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              {(Object.entries(CHURCH_VIDEOS) as [keyof typeof CHURCH_VIDEOS, typeof CHURCH_VIDEOS[keyof typeof CHURCH_VIDEOS]][]).map(([key, v]) => (
                <button
                  key={key}
                  onClick={() => setActiveVideo(key)}
                  style={{
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase",
                    padding: "10px 22px", cursor: "pointer", backdropFilter: "blur(6px)",
                    border: activeVideo === key ? "1px solid var(--gold)" : "1px solid rgba(255,255,255,0.3)",
                    background: activeVideo === key ? "rgba(201,150,58,0.22)" : "rgba(0,0,0,0.35)",
                    color: activeVideo === key ? "var(--gold)" : "#fff",
                    transition: "border-color 0.2s ease, color 0.2s ease, background 0.2s ease",
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Heading — fades out early in the scroll so the footage takes over */}
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: "20%", padding: "0 2rem", textAlign: "center",
            opacity: headerOpacity, transition: "opacity 0.1s linear", pointerEvents: headerOpacity < 0.05 ? "none" : "auto",
          }}>
            <span className="section-label" style={{ color: "rgba(255,255,255,0.75)" }}>See The Progress</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem,6vw,4.5rem)", textTransform: "uppercase", letterSpacing: "-0.01em", color: "#fff", marginTop: "1rem" }}>
              Here's what we're building.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: 480, margin: "1rem auto 0", lineHeight: 1.7 }}>
              Keep scrolling to walk through it.
            </p>
          </div>

          {/* Scroll-scrub progress bar */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 2rem 10px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.75)" }}>
              <span>{CHURCH_VIDEOS[activeVideo].label.toUpperCase()}</span>
              <span>{fmtTime(progress * duration)} / {fmtTime(duration)}</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.18)" }}>
              <div style={{ height: "100%", width: `${progress * 100}%`, background: "var(--gold)" }} />
            </div>
          </div>
        </div>
      </div>

      <FuturePhotos />
    </section>
  )
}

function FuturePhotos() {
  const { ref, inView } = useInView()
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ background: "var(--bg-alt)", padding: "5rem 2rem 6rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${inView ? "fade-up" : ""}`} style={{ gap: "1rem", opacity: inView ? undefined : 0 }}>
          {CHURCH_IMAGES.map(img => (
            <div key={img.src} className="card-hover" style={{ aspectRatio: "4/3", position: "relative", overflow: "hidden", border: "1px solid var(--border)" }}>
              <img src={img.src} alt={`ELGC ${img.label.toLowerCase()}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem 1.25rem", background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff" }}>{img.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={inView ? "fade-up delay-2" : ""} style={{ textAlign: "center", marginTop: "1.5rem", opacity: inView ? undefined : 0 }}>
          <p style={{ fontSize: "0.78rem", color: "var(--fg-dim)", fontStyle: "italic", margin: 0 }}>
            Concept renders — the final design may vary slightly.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Progress ─────────────────────────────────────────────────────────────────

const RAISED = 104620
const GOAL = 10000000
const PCT = (RAISED / GOAL) * 100

function Progress() {
  const { ref, inView } = useInView()
  const raisedCount = useCounter(RAISED, 2200, inView)
  return (
    <section id="progress" ref={ref as React.RefObject<HTMLElement>} style={{ padding: "7rem 2rem", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className={inView ? "fade-up" : ""} style={{ opacity: inView ? undefined : 0 }}>
          <span className="section-label">Progress</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem,5vw,4rem)", textTransform: "uppercase", letterSpacing: "-0.01em", marginTop: "1rem", color: "var(--fg)" }}>
            {"We're building"}<br />this together.
          </h2>
        </div>

        <div className={inView ? "fade-up delay-2" : ""} style={{ marginTop: "4rem", opacity: inView ? undefined : 0 }}>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-6">
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(3rem,8vw,7rem)", color: "var(--gold)", lineHeight: 1, letterSpacing: "-0.02em" }}>
              {fmt(raisedCount)}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.2em", color: "var(--fg-muted)", textTransform: "uppercase" }}>raised of</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 6vw, 1.8rem)", color: "var(--fg)", letterSpacing: "-0.01em" }}>₱10,000,000</div>
            </div>
            <div className="sm:ml-auto" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2.5rem,6vw,5rem)", color: "var(--fg-subtle)" }}>
              {PCT.toFixed(1)}%
            </div>
          </div>

          <div style={{ marginTop: "2rem", height: 6, background: "var(--bg-inset)", overflow: "hidden" }}>
            <div className={inView ? "bar-grow" : ""} style={{ height: "100%", background: `linear-gradient(to right, var(--gold-dim), var(--gold), var(--gold-light))`, width: inView ? `${PCT}%` : "0%" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--fg-dim)", letterSpacing: "0.1em" }}>₱0</span>
            <span style={{ fontSize: "0.72rem", color: "var(--fg-dim)", letterSpacing: "0.1em" }}>₱10,000,000</span>
          </div>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${inView ? "fade-up delay-4" : ""}`} style={{ gap: "1px", marginTop: "4rem", background: "var(--border)" }}>
          {[
            { label: "Total Raised", value: fmt(RAISED), sub: "and counting" },
            { label: "Years of Journey", value: "9+", sub: "since the dream began" },
          ].map(stat => (
            <div key={stat.label} className="sm:px-8" style={{ background: "var(--bg)", paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.8rem, 7vw, 2.5rem)", color: "var(--fg)", lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginTop: "0.5rem" }}>{stat.label}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--fg-muted)", marginTop: "0.25rem" }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className={inView ? "fade-up delay-5" : ""} style={{ marginTop: "3rem", textAlign: "center", opacity: inView ? undefined : 0 }}>
          <p style={{ color: "var(--fg-muted)", marginBottom: "1.5rem", fontStyle: "italic" }}>Every peso moves the vision forward.</p>
          <a href="#join" className="btn-primary" style={{ fontSize: "1rem" }}>I WANT TO BE PART OF K2K</a>
        </div>
      </div>
    </section>
  )
}


// ─── Ways to Participate ──────────────────────────────────────────────────────

function Participate() {
  const { ref, inView } = useInView()
  return (
    <section id="participate" ref={ref as React.RefObject<HTMLElement>} style={{ padding: "7rem 2rem", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className={inView ? "fade-up" : ""} style={{ opacity: inView ? undefined : 0 }}>
          <span className="section-label">Ways to Participate</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem,5vw,4rem)", textTransform: "uppercase", letterSpacing: "-0.01em", marginTop: "1rem", color: "var(--fg)" }}>
            How can<br />I help?
          </h2>
          <p style={{ color: "var(--fg-muted)", maxWidth: 480, lineHeight: 1.7, marginTop: "1rem" }}>
            Being part of K2K is not limited to financial giving — pray, share, or give through any of the programs below.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "2.5rem" }}>
            {WAYS.map(w => (
              <div key={w.title} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.2rem", color: "var(--gold)" }}>{w.icon}</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg)" }}>{w.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1.5rem", marginTop: "3.5rem" }}>
          {PROGRAMS.map((prog, i) => (
            <div key={prog.name} className={`program-card ${inView ? `fade-up delay-${i + 2}` : ""}`} style={{ opacity: inView ? undefined : 0 }}>
              {/* Program icon */}
              <div style={{ width: 52, height: 52, border: "1px solid var(--border-mid)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.5rem", color: "var(--gold)" }}>{prog.icon}</span>
              </div>

              {/* Tag */}
              <div style={{ display: "inline-flex", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "4px 10px", ...prog.tagStyle }}>
                  {prog.tag}
                </span>
              </div>

              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.8rem", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--fg)", margin: "0 0 0.25rem" }}>{prog.name}</h3>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 1rem" }}>{prog.tagline}</p>
              <p style={{ color: "var(--fg-muted)", fontSize: "0.9rem", lineHeight: 1.7, margin: "0 0 1.5rem" }}>{prog.description}</p>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--fg-dim)", letterSpacing: "0.06em" }}>{prog.detail}</span>
                <a href="https://m.me/elgchurchofficial" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.7rem" }}>{prog.cta}</a>
              </div>
            </div>
          ))}
        </div>

        {/* Visual connector to K2K */}
        <div className={inView ? "fade-up delay-5" : ""} style={{ marginTop: "4rem", padding: "2rem 2.5rem", border: "1px solid var(--border)", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", opacity: inView ? undefined : 0 }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>All Programs Contribute To</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "2rem", letterSpacing: "0.06em", color: "var(--fg)" }}>K2K — ₱10,000,000 Goal</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {PROGRAMS.map(p => (
              <div key={p.name} style={{ width: 36, height: 36, border: "1px solid var(--border-mid)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1rem", color: "var(--gold)" }}>{p.icon}</span>
              </div>
            ))}
            <div style={{ width: 24, height: 1, background: "var(--gold)" }} />
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.4rem", color: "var(--gold)", letterSpacing: "0.04em" }}>K2K</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Milestones ───────────────────────────────────────────────────────────────

function Milestones() {
  const { ref, inView } = useInView()
  return (
    <section id="milestones" ref={ref as React.RefObject<HTMLElement>} style={{ padding: "7rem 2rem", background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className={inView ? "fade-up" : ""} style={{ opacity: inView ? undefined : 0 }}>
          <span className="section-label">The Journey</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem,5vw,4rem)", textTransform: "uppercase", letterSpacing: "-0.01em", marginTop: "1rem", color: "var(--fg)" }}>
            Progress<br />milestones.
          </h2>
        </div>

        {/* Mobile: vertical timeline — horizontal scroll inside a vertically-scrolling page is easy to miss on touch */}
        <div className={`md:hidden ${inView ? "fade-up delay-2" : ""}`} style={{ position: "relative", marginTop: "4rem", opacity: inView ? undefined : 0 }}>
          <div style={{ position: "absolute", left: 4, top: 4, bottom: 4, width: 1, background: `linear-gradient(to bottom, var(--gold), var(--border))` }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {MILESTONES.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: "1.5rem" }}>
                <div style={{ flexShrink: 0, width: 9, paddingTop: 3 }}>
                  <div style={{
                    width: m.current || m.final ? 12 : 9,
                    height: m.current || m.final ? 12 : 9,
                    borderRadius: "50%",
                    background: m.done ? "var(--gold)" : m.current ? "var(--gold)" : "transparent",
                    border: m.final ? "2px solid var(--gold)" : (m.done || m.current) ? "none" : "2px solid var(--border-mid)",
                    boxShadow: m.current ? "0 0 0 4px rgba(201,150,58,0.15)" : "none",
                  }} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.22em", color: m.done ? "var(--gold)" : "var(--fg-dim)", textTransform: "uppercase", marginBottom: "0.25rem" }}>{m.year}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: m.final ? 900 : 700, fontSize: m.final ? "1.2rem" : "1rem", letterSpacing: "0.06em", textTransform: "uppercase", color: m.final ? "var(--gold)" : m.current ? "var(--fg)" : m.done ? "var(--fg)" : "var(--fg-muted)" }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--fg-muted)", lineHeight: 1.6, marginTop: "0.5rem" }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet/desktop: horizontal scroll timeline */}
        <div className={`hidden md:block ${inView ? "fade-up delay-2" : ""}`} style={{ marginTop: "4rem", overflowX: "auto", opacity: inView ? undefined : 0 }}>
          <div style={{ position: "relative", display: "inline-flex", paddingBottom: "1.5rem" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 6, height: 1, background: `linear-gradient(to right, var(--gold), var(--border))` }} />

            {MILESTONES.map((m, i) => (
              <div key={i} style={{ flexShrink: 0, width: 230, paddingRight: i === MILESTONES.length - 1 ? 0 : "2.5rem" }}>
              <div style={{
                width: m.current || m.final ? 14 : 10,
                height: m.current || m.final ? 14 : 10,
                borderRadius: "50%",
                background: m.done ? "var(--gold)" : m.current ? "var(--gold)" : "transparent",
                border: m.final ? "2px solid var(--gold)" : (m.done || m.current) ? "none" : "2px solid var(--border-mid)",
                boxShadow: m.current ? "0 0 0 4px rgba(201,150,58,0.15)" : "none",
              }} />
              <div style={{ marginTop: "1.5rem" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.22em", color: m.done ? "var(--gold)" : "var(--fg-dim)", textTransform: "uppercase", marginBottom: "0.25rem" }}>{m.year}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: m.final ? 900 : 700, fontSize: m.final ? "1.2rem" : "1rem", letterSpacing: "0.06em", textTransform: "uppercase", color: m.final ? "var(--gold)" : m.current ? "var(--fg)" : m.done ? "var(--fg)" : "var(--fg-muted)" }}>
                  {m.label}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--fg-muted)", lineHeight: 1.6, marginTop: "0.5rem" }}>{m.desc}</div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What exactly is K2K?",
    a: "K2K began as a simple idea: 1,000 people giving ₱1,000 each to raise ₱1,000,000 toward a future home for ELGC. The vision has grown since — the goal is now ₱10,000,000 — but the heart behind it is the same: an entire church moving together in faith.",
  },
  {
    q: "Where does my contribution go?",
    a: "Every peso given toward K2K goes directly toward acquiring a new place of worship for ELGC. You can track our progress toward the ₱10,000,000 goal on this page at any time.",
  },
  {
    q: "How can I give?",
    a: "Through Fill & Full, a signed Covenant pledge, supporting Chinito Burger, or by reaching out to ELGC directly to arrange your contribution — see Ways to Participate and Other Fundraising Programs above.",
  },
  {
    q: "Is there a deadline?",
    a: "There's no fixed deadline. K2K is an ongoing journey, and every contribution moves us closer, whenever it comes.",
  },
  {
    q: "I'm not a member of ELGC — can I still give?",
    a: "Yes. K2K is open to anyone who wants to be part of what God is doing at ELGC, whether you attend regularly, occasionally, or you're hearing about this for the first time.",
  },
  {
    q: "Can I be part of K2K without giving money?",
    a: "Absolutely. Prayer and sharing the vision with others are just as valuable — see Ways to Participate for other ways to get involved.",
  },
  {
    q: "Who do I contact if I have more questions?",
    a: "Reach out to ELGC directly — see the About ELGC section at the top of this page for our social channels, or visit our official website.",
  },
]

function FAQ() {
  const { ref, inView } = useInView()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <section id="faq" ref={ref as React.RefObject<HTMLElement>} style={{ padding: "7rem 2rem", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className={inView ? "fade-up" : ""} style={{ opacity: inView ? undefined : 0 }}>
          <span className="section-label">FAQ</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem,5vw,4rem)", textTransform: "uppercase", letterSpacing: "-0.01em", marginTop: "1rem", color: "var(--fg)" }}>
            Questions?<br />We've got you.
          </h2>
        </div>

        <div style={{ marginTop: "3rem", borderTop: "1px solid var(--border)" }}>
          {FAQS.map((item, i) => {
            const open = openIndex === i
            return (
              <div key={item.q} style={{ borderBottom: "1px solid var(--border)" }}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "1.5rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.02em", color: "var(--fg)" }}>{item.q}</span>
                  <span style={{
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: "var(--gold)", flexShrink: 0,
                    transition: "transform 0.2s ease", transform: open ? "rotate(45deg)" : "none",
                  }}>+</span>
                </button>
                {open && (
                  <p className="fade-up" style={{ color: "var(--fg-muted)", lineHeight: 1.8, paddingBottom: "1.5rem", margin: 0, maxWidth: 640 }}>
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  const { ref, inView } = useInView()
  const bg80 = useBgOverlay(0.82)
  const bg60 = useBgOverlay(0.6)
  return (
    <section id="join" ref={ref as React.RefObject<HTMLElement>} style={{ position: "relative", padding: "9rem 2rem 8rem", background: "var(--bg)", borderTop: "1px solid var(--border)", overflow: "hidden" }}>
      <img src="/images/worship.jpg"
        alt="ELGC congregation gathered in worship"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: "var(--img-op)" as any }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${bg80} 40%, ${bg60} 100%)` }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
        <div className={inView ? "fade-up" : ""} style={{ opacity: inView ? undefined : 0 }}>
          <span className="section-label">Join the Movement</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2.5rem,7vw,6rem)", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 0.92, marginTop: "1.5rem", color: "var(--fg)" }}>
            {"We're not just"}<br />raising money.
          </h2>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.5rem,4vw,3.5rem)", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1, marginTop: "0.75rem", color: "var(--gold)" }}>
            {"We're building a place"}<br />for the next generation.
          </h3>
        </div>

        <div className={inView ? "fade-up delay-3" : ""} style={{ maxWidth: 540, marginTop: "2rem", opacity: inView ? undefined : 0 }}>
          <p style={{ color: "var(--fg-muted)", lineHeight: 1.8 }}>
            K2K is a faith journey for Emmanuel's Living Gospel Church. We believe that with prayer, generosity, unity, and God's provision, we can reach this goal together.
          </p>
        </div>

        <div className={inView ? "fade-up delay-4" : ""} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "3rem", opacity: inView ? undefined : 0 }}>
          <a href="#participate" className="btn-primary" style={{ fontSize: "1.1rem", padding: "16px 40px" }}>BE PART OF K2K</a>
          <a href="#vision" className="btn-outline">PRAY WITH US</a>
        </div>

        <div className={inView ? "fade-up delay-5" : ""} style={{ marginTop: "5rem", opacity: inView ? undefined : 0 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2.2rem,12vw,10rem)", color: "var(--fg-subtle)", letterSpacing: "-0.02em", lineHeight: 1, userSelect: "none" }}>
            ₱10,000,000
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Official Site Link ───────────────────────────────────────────────────────

function OfficialSite() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding: "4.5rem 2rem", background: "var(--bg-alt)", borderTop: "1px solid var(--border)", textAlign: "center" }}>
      <div className={inView ? "fade-up" : ""} style={{ maxWidth: 560, margin: "0 auto", opacity: inView ? undefined : 0 }}>
        <span className="section-label">Learn More</span>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem,3vw,2rem)", textTransform: "uppercase", letterSpacing: "-0.01em", color: "var(--fg)", marginTop: "1rem" }}>
          Want to know more about ELGC?
        </h3>
        <p style={{ color: "var(--fg-muted)", lineHeight: 1.7, marginTop: "0.75rem" }}>
          Visit our official church website for service times, sermons, and more.
        </p>
        <a href="https://elgchurch.com/" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ marginTop: "1.75rem" }}>
          VISIT ELGCHURCH.COM
        </a>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const links = [
    { label: "About K2K", href: "#vision" },
    { label: "Progress", href: "#progress" },
    { label: "Ways to Give", href: "#participate" },
    { label: "Contact", href: "#about" },
    { label: "ELGC", href: "#about" },
  ]
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "3rem 2rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "2rem", letterSpacing: "0.1em", color: "var(--fg)" }}>K2K</div>
            <div style={{ fontSize: "0.7rem", color: "var(--fg-dim)", marginTop: "0.25rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>{"Emmanuel's Living Gospel Church"}</div>
          </div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {links.map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: "0.78rem", color: "var(--fg-muted)", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}>
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, border: "1px solid var(--border-mid)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.08em", color: "var(--fg-muted)", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-mid)"; e.currentTarget.style.color = "var(--fg-muted)" }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--border)", marginTop: "2.5rem", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--fg-muted)", fontStyle: "italic", letterSpacing: "0.08em" }}>Built by faith. Moved by purpose.</span>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
            <a href="https://karlodr.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.72rem", color: "var(--fg-dim)", letterSpacing: "0.08em", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-dim)")}>
              Site by Karlo Dela Rosa
            </a>
            <span style={{ fontSize: "0.72rem", color: "var(--fg-dim)", letterSpacing: "0.08em" }}>K2K © ELGC</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Mobile sticky CTA ────────────────────────────────────────────────────────

function MobileCTA() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => {
      const joinEl = document.getElementById("join")
      const reachedJoin = joinEl ? joinEl.getBoundingClientRect().top <= window.innerHeight : false
      setShow(window.scrollY > 400 && !reachedJoin)
    }
    window.addEventListener("scroll", fn)
    fn()
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <div className="md:hidden" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 99,
      background: "var(--nav-bg)", backdropFilter: "blur(14px)",
      borderTop: "1px solid var(--border)", padding: "1rem 1.5rem",
      transform: show ? "translateY(0)" : "translateY(100%)",
      transition: "transform 0.4s ease",
    }}>
      <a href="#join" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "1rem", display: "flex" }}>JOIN K2K</a>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState<Theme>("dark")
  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark")

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div data-theme={theme} style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100dvh" }}>
        <Nav />
        <Hero />
        <AboutChurch />
        <FutureChurch />
        <Story />
        <BigVision />
        <Progress />
        <Participate />
        <Milestones />
        <FAQ />
        <FinalCTA />
        <OfficialSite />
        <Footer />
        <MobileCTA />
      </div>
    </ThemeContext.Provider>
  )
}
