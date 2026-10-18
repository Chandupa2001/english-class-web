import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Menu, X, MessageCircle, MapPin, Phone, Facebook, Clock, CalendarDays, Image as Img, Quote, GraduationCap, BookOpen, Mic, PenLine, ClipboardCheck, Files, FileText, Award, Rocket, Sparkles, ArrowRight, LayoutGrid, CalendarRange } from 'lucide-react'
import { CONTACT, BRANCHES, CLASSES, SPECIAL, QUALIFICATIONS, SHOW_LANGUAGE_SWITCH, GALLERY, TESTIMONIALS } from './data'
import { T, DAYS } from './i18n'

const L = createContext(); const useL = () => useContext(L)
const waLink = text => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
const fmt = (s, lang) => lang === 'si' ? s.replace('AM', 'පෙ.ව.').replace('PM', 'ප.ව.') : s
const NAV = ['home', 'timetable', 'learn', 'about', 'locations', 'contact']
const ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const TODAY = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()]
const mins = s => { const [m, ap] = s.split(' '); let [h, mi] = m.split(':').map(Number); if (ap === 'PM' && h < 12) h += 12; if (ap === 'AM' && h === 12) h = 0; return h * 60 + mi }
const band = g => g <= 5 ? ['from-sky-400 to-blue-600', 'bg-sky-100 text-sky-800'] : g <= 9 ? ['from-violet-500 to-fuchsia-500', 'bg-violet-100 text-violet-800'] : ['from-amber-400 to-orange-500', 'bg-amber-100 text-amber-800']
const spot = e => { const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', e.clientX - b.left + 'px'); e.currentTarget.style.setProperty('--my', e.clientY - b.top + 'px') }

function useInView() {
  const r = useRef(null); const [v, setV] = useState(false)
  useEffect(() => { const el = r.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect() } }, { threshold: .15 }); io.observe(el); return () => io.disconnect() }, [])
  return [r, v]
}
const Rv = ({ children, d = 0, className = '' }) => { const [r, v] = useInView(); return <div ref={r} style={{ '--d': d + 's' }} className={`rv ${v ? 'in' : ''} ${className}`}>{children}</div> }
function Count({ to }) {
  const [r, v] = useInView(); const [n, setN] = useState(0)
  useEffect(() => { if (!v) return; let s; const t0 = performance.now(); const f = t => { const p = Math.min((t - t0) / 1400, 1); setN(Math.round(to * (1 - (1 - p) ** 3))); if (p < 1) s = requestAnimationFrame(f) }; s = requestAnimationFrame(f); return () => cancelAnimationFrame(s) }, [v, to])
  return <span ref={r}>{n}</span>
}

function WhatsAppButton({ grade, special, label, className = '', light }) {
  const { t } = useL()
  return (
    <a href={waLink(special ? t.msgSp : t.msg(grade))} target="_blank" rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center gap-2 min-h-12 px-5 sm:px-6 py-2 text-center rounded-full font-bold overflow-hidden transition active:scale-95 hover:-translate-y-0.5 hover:shadow-xl ${light ? 'bg-white text-green-700 hover:shadow-white/30' : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-green-500/40'} ${className}`}>
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <MessageCircle size={20} className="relative" /><span className="relative">{label || t.wa}</span>
    </a>
  )
}

const Head = ({ eye, title, sub, dark }) => (
  <Rv className="max-w-2xl">
    <span className="font-hand text-2xl text-violet inline-flex items-center gap-1.5" style={dark ? { color: '#fbbf24' } : {}}><Sparkles size={18} />{eye}</span>
    <h2 className={`mt-1 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-navy'}`}>{title}</h2>
    {sub && <p className={`mt-3 text-lg ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{sub}</p>}
  </Rv>
)

function Navbar() {
  const { t, lang, setLang } = useL(); const [o, setO] = useState(false), [sc, setSc] = useState(false), [act, setAct] = useState('home'), [p, setP] = useState(0)
  useEffect(() => {
    const f = () => { setSc(scrollY > 20); setP(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100) }
    f(); addEventListener('scroll', f, { passive: true })
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setAct(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(k => { const el = document.getElementById(k); el && io.observe(el) })
    return () => { removeEventListener('scroll', f); io.disconnect() }
  }, [])
  return (
    <>
      <div className="fixed top-0 left-0 h-1 z-[60] bg-gradient-to-r from-gold via-fuchsia-500 to-sky-400" style={{ width: p + '%' }} />
      <header className="fixed top-3 inset-x-3 z-50">
        <div className={`max-w-6xl mx-auto h-14 px-3 pl-4 rounded-full flex items-center justify-between gap-3 text-white transition-all duration-500 ring-1 ring-white/15 backdrop-blur-xl ${sc ? 'bg-ink/85 shadow-2xl shadow-black/30' : 'bg-white/5'}`}>
          <a href="#home" className="flex items-center gap-2 font-display font-extrabold text-lg">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold to-orange-400 text-navy grid place-items-center">A</span>
            <span className="hidden sm:inline">Anuththara <span className="text-gold">Teacher</span></span>
          </a>
          <nav className="hidden lg:flex gap-1 text-sm">
            {NAV.map(k => <a key={k} href={`#${k}`} className={`px-3 py-1.5 rounded-full transition ${act === k ? 'bg-white/15 text-gold' : 'hover:bg-white/10'}`}>{t.nav[k]}</a>)}
          </nav>
          {/* <div className="flex items-center gap-2">
            {SHOW_LANGUAGE_SWITCH && <div className="flex rounded-full bg-white/10 p-0.5 text-xs" role="group" aria-label="Language">
              {[['en', 'EN'], ['si', 'සිං']].map(([k, n]) => <button key={k} onClick={() => setLang(k)} aria-pressed={lang === k} className={`px-3 py-1.5 rounded-full font-semibold ${lang === k ? 'bg-gold text-navy' : ''}`}>{n}</button>)}
            </div>}
            
          </div> */}
          <button className="lg:hidden p-2 min-h-10 min-w-10 grid place-items-center" onClick={() => setO(!o)} aria-label={t.menu}>{o ? <X /> : <Menu />}</button>
        </div>
        {o && <nav className="lg:hidden mt-2 max-w-6xl mx-auto rounded-3xl bg-ink/95 backdrop-blur-xl text-white p-3 ring-1 ring-white/10">
          {NAV.map(k => <a key={k} href={`#${k}`} onClick={() => setO(false)} className="block px-4 py-3 rounded-2xl hover:bg-white/10">{t.nav[k]}</a>)}
        </nav>}
      </header>
    </>
  )
}

function Hero() {
  const { t } = useL(); const [i, setI] = useState(0)
  useEffect(() => { const id = setInterval(() => setI(x => x + 1), 2400); return () => clearInterval(id) }, [])
  const move = e => { const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--px', ((e.clientX - b.left) / b.width - .5).toFixed(3)); e.currentTarget.style.setProperty('--py', ((e.clientY - b.top) / b.height - .5).toFixed(3)) }
  const px = n => ({ transform: `translate(calc(var(--px,0)*${n}px),calc(var(--py,0)*${n}px))`, transition: 'transform .25s ease-out' })
  const [main, year] = t.title.split(' | ')
  const chip = 'glass absolute rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 float'
  return (
    <section id="home" onMouseMove={move} className="relative aurora text-white overflow-hidden pt-24 sm:pt-28 pb-20 md:pb-32">
      <div className="absolute inset-0 grid-bg" />
      {[['Aa', '8%', '18%', '0s', 'text-8xl'], ['ABC', '46%', '6%', '1s', 'text-6xl'], ['?', '90%', '14%', '2s', 'text-8xl'], ['“ ”', '4%', '70%', '1.5s', 'text-8xl'], ['Hello', '40%', '88%', '.5s', 'text-5xl'], ['!', '94%', '72%', '2.5s', 'text-8xl']].map(([c, l, tp, d, s]) =>
        <span key={c} className={`float absolute font-display font-extrabold text-white/[.07] select-none ${s}`} style={{ left: l, top: tp, '--d': d }}>{c}</span>)}
      <div className="relative max-w-6xl mx-auto px-4 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] gap-10 lg:gap-12 items-center">
        <div>
          <Rv><span className="glass inline-flex items-center gap-2 text-sm font-bold px-4 py-1.5 rounded-full"><span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" /><span className="relative rounded-full h-2.5 w-2.5 bg-gold" /></span>{t.badge}</span></Rv>
          <Rv d={.1}><p className="mt-6 font-hand text-3xl text-gold">Anuththara Teacher</p>
            <h1 className="font-display text-[2rem] leading-tight sm:text-5xl xl:text-6xl font-extrabold leading-[1.05] tracking-tight">{main} <span className="shine-text">{year}</span></h1></Rv>
          <Rv d={.2}>
            <p className="mt-5 text-xl sm:text-2xl font-display font-bold flex flex-wrap items-baseline gap-x-3">{t.master}
              <span className="relative inline-block"><span key={i} className="swap inline-block text-gold">{t.words[i % t.words.length]}</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none"><path d="M0 4 Q12 0 25 4 T50 4 T75 4 T100 4" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" /></svg></span></p>
            <p className="mt-5 text-lg text-blue-100">{t.tagline}</p>
            <p className="mt-2 text-blue-100/80 max-w-xl">{t.support}</p>
          </Rv>
          <Rv d={.3} className="mt-8 flex flex-col sm:flex-row gap-3">
            <WhatsAppButton className="text-lg !min-h-14" />
            <a href="#timetable" className="group inline-flex items-center justify-center gap-2 min-h-14 px-6 rounded-full border-2 border-white/40 font-bold hover:bg-white hover:text-navy transition">{t.viewTt}<ArrowRight size={18} className="group-hover:translate-x-1 transition" /></a>
          </Rv>
        </div>
        <Rv d={.2} className="relative mx-auto w-full max-w-[290px] sm:max-w-sm lg:max-w-md aspect-square">
          <div className="absolute inset-[4%] rounded-full bg-gradient-to-br from-gold via-amber-300 to-pink-400 shadow-[0_0_120px_rgba(251,191,36,.45)]" style={px(-14)} />
          <div className="absolute -inset-3 rounded-full spin-slow" style={{ background: 'conic-gradient(from 0deg,transparent 0 55%,#fbbf24,#d946ef,#38bdf8,transparent)', mask: 'radial-gradient(circle,transparent 66%,#000 67%)', WebkitMask: 'radial-gradient(circle,transparent 66%,#000 67%)' }} />
          <div className="absolute -inset-6 sm:-inset-10 rounded-full border border-dashed border-white/20 spin-rev" />
          <img src="/teacher-hero.webp" alt="Anuththara Teacher" width="1000" height="1000" fetchpriority="high" className="relative w-full h-full object-cover [mask-image:linear-gradient(to_bottom,#000_88%,transparent)]" style={px(10)} />
          <div className={`${chip} left-0 top-[8%]`} style={{ '--d': '0s' }}><GraduationCap size={18} className="text-gold" />{t.chip1}</div>
          <div className={`${chip} right-0 top-[44%]`} style={{ '--d': '1.2s' }}><Award size={18} className="text-gold" />BA · HND · NDTESL</div>
          <div className={`${chip} left-0 bottom-[6%]`} style={{ '--d': '2.4s' }}><Mic size={18} className="text-gold" />{t.chip3}</div>
        </Rv>
      </div>
      <svg className="absolute bottom-0 w-full h-12 md:h-20 text-cream" viewBox="0 0 1440 80" preserveAspectRatio="none"><path fill="currentColor" d="M0 80V40C240 0 480 0 720 30s480 40 720 0v50z" /></svg>
    </section>
  )
}

function Marquee() {
  const { t } = useL(); const items = [...t.features.map(f => f[0]), ...t.words]; const row = [...items, ...items]
  return (
    <div className="relative z-10 -mt-6 overflow-hidden py-3"><div className="overflow-hidden -rotate-1 w-[104%] -ml-[2%] bg-gradient-to-r from-gold via-amber-300 to-gold text-navy py-3 shadow-xl">
      <div className="marq flex w-max gap-8 font-display font-extrabold text-base sm:text-xl whitespace-nowrap">
        {[...row, ...row].map((x, k) => <span key={k} className="flex items-center gap-8">{x}<Sparkles size={18} /></span>)}
      </div>
    </div></div>
  )
}

function Stats() {
  const { t } = useL()
  const v = [[...new Set(CLASSES.map(c => c.grade))].length, CLASSES.length, t.features.length, QUALIFICATIONS.length]
  return (
    <section className="max-w-6xl mx-auto px-4 pt-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {v.map((n, i) => <Rv key={i} d={i * .1}><div className="spot rounded-3xl bg-white border border-slate-200 p-4 sm:p-6 text-center" onMouseMove={spot}>
          <p className="font-display text-4xl sm:text-5xl font-extrabold bg-gradient-to-br from-royal to-violet bg-clip-text text-transparent"><Count to={n} /></p>
          <p className="mt-1 text-sm font-semibold text-slate-500">{t.st[i]}</p></div></Rv>)}
      </div>
    </section>
  )
}

function ClassCard({ c }) {
  const { lang, t } = useL(); const b = BRANCHES.find(x => x.id === c.branch); const [g, tag] = band(c.grade)
  return (
    <div onMouseMove={spot} className="spot rounded-3xl border border-slate-200 bg-white flex flex-col h-full">
      <div className={`h-2 bg-gradient-to-r ${g}`} />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div><p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.grade}</p><h3 className={`font-display text-6xl font-extrabold leading-none bg-gradient-to-br ${g} bg-clip-text text-transparent`}>{c.grade}</h3></div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tag}`}>{t[c.type]}</span>
            {c.day === TODAY && <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />{t.today}</span>}
          </div>
        </div>
        <p className="flex items-center gap-2 text-slate-700 font-semibold"><CalendarDays size={18} className="text-violet shrink-0" />{DAYS[lang][c.day]}</p>
        <p className="flex items-center gap-2 text-slate-700"><Clock size={18} className="text-violet shrink-0" />{fmt(c.start, lang)} – {fmt(c.end, lang)}</p>
        <p className="flex items-center gap-2 text-slate-500 text-sm"><MapPin size={18} className="shrink-0" />{b ? b.name[lang] : t.tbc}</p>
        <WhatsAppButton grade={c.grade} label={t.inquire} className="mt-auto text-sm" />
      </div>
    </div>
  )
}

function WeekView({ list }) {
  const { lang, t } = useL()
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
      {ORDER.map((d, k) => { const cs = list.filter(c => c.day === d).sort((a, b) => mins(a.start) - mins(b.start)); return (
        <Rv key={d} d={k * .05}><div className={`rounded-3xl p-3 h-full min-h-32 border ${d === TODAY ? 'bg-navy text-white border-navy shadow-xl shadow-navy/30' : 'bg-white border-slate-200'}`}>
          <p className="font-display font-extrabold flex items-center justify-between text-sm">{lang === 'en' ? DAYS.en[d].slice(0, 3) : DAYS.si[d]}{d === TODAY && <span className="text-[10px] bg-gold text-navy rounded-full px-2 py-0.5">{t.today}</span>}</p>
          <div className="mt-2 space-y-2">
            {cs.map(c => <a key={c.grade + c.type} href={waLink(t.msg(c.grade))} target="_blank" rel="noopener noreferrer" className={`block rounded-2xl p-2.5 text-white bg-gradient-to-br ${band(c.grade)[0]} hover:scale-[1.04] transition`}>
              <b className="font-display text-lg">{t.grade} {c.grade}</b>{c.type === 'paper' && <span className="ml-1 text-[10px] bg-white/25 rounded-full px-1.5">{lang === 'en' ? 'Paper' : 'ප්‍ර.ප.'}</span>}
              <span className="block text-xs opacity-90">{fmt(c.start, lang)}–{fmt(c.end, lang)}</span></a>)}
            {!cs.length && <p className="text-xs opacity-40 py-3 text-center">{t.free}</p>}
          </div></div></Rv>) })}
    </div>
  )
}

function ClassTimetable() {
  const { t } = useL(); const [g, setG] = useState('all'), [view, setView] = useState('cards')
  const shown = CLASSES.filter(c => g === 'all' || c.grade === g)
  const grades = [...new Set(CLASSES.map(c => c.grade))]
  return (
    <section id="timetable" className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Head eye={t.eye.tt} title={t.ttTitle} sub={t.ttSub} />
          <div className="flex rounded-full bg-white border border-slate-200 p-1 text-sm font-semibold shadow-sm self-start">
            {[['cards', LayoutGrid, t.vCards], ['week', CalendarRange, t.vWeek]].map(([k, I, n]) => <button key={k} onClick={() => setView(k)} aria-pressed={view === k} className={`flex items-center gap-2 px-4 min-h-10 rounded-full transition ${view === k ? 'bg-navy text-white' : 'text-slate-600'}`}><I size={16} />{n}</button>)}
          </div>
        </div>
        <div className="mt-6 -mx-4 px-4 flex gap-2 overflow-x-auto pb-2" role="tablist">
          {['all', ...grades].map(x => <button key={x} onClick={() => setG(x)} aria-pressed={g === x}
            className={`shrink-0 min-h-11 px-5 rounded-full border font-bold transition ${g === x ? 'bg-gradient-to-r from-navy to-royal text-white border-transparent shadow-lg shadow-royal/30 scale-105' : 'bg-white text-navy border-slate-200 hover:border-royal'}`}>{x === 'all' ? t.all : `${t.grade} ${x}`}</button>)}
        </div>
        <div className="mt-6">
          {view === 'cards'
            ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{shown.map((c, k) => <Rv key={c.grade + c.type + g} d={(k % 3) * .08}><ClassCard c={c} /></Rv>)}</div>
            : <WeekView list={shown} />}
          {!shown.length && <p className="mt-4 text-slate-500">{t.none}</p>}
        </div>
      </div>
    </section>
  )
}

function SpecialBatchBanner() {
  const { t } = useL()
  return (
    <section className="px-4 pb-20">
      <Rv className="max-w-6xl mx-auto">
        <div className="relative rounded-[2rem] p-[3px] overflow-hidden">
          <div className="absolute -inset-[80%] spin-slow" style={{ background: 'conic-gradient(from 0deg,#fbbf24,#d946ef,#38bdf8,#fbbf24)' }} />
          <div className="relative rounded-[calc(2rem-3px)] bg-gradient-to-br from-[#220a52] via-[#4c1d95] to-[#a21caf] text-white p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-8 md:items-center overflow-hidden">
            {[['8%', '15%', 0], ['70%', '12%', .6], ['90%', '60%', 1.2], ['45%', '85%', 1.8], ['25%', '70%', .9]].map(([l, tp, d], k) => <Sparkles key={k} size={16} className="twinkle absolute text-gold" style={{ left: l, top: tp, '--d': d + 's' }} />)}
            <div className="relative float bg-white/15 rounded-3xl p-6 self-start"><Rocket size={56} className="text-gold" /></div>
            <div className="relative flex-1">
              <span className="text-xs font-bold bg-gold text-navy rounded-full px-3 py-1">{t.spTag}</span>
              <h2 className="mt-3 font-display text-2xl md:text-4xl font-extrabold leading-tight">{t.spTitle}</h2>
              <p className="mt-3 text-purple-100 max-w-2xl">{t.spText}</p>
              <p className="mt-4 font-bold flex items-center gap-2 text-gold"><Clock size={18} />{t.spSched}</p>
            </div>
            <WhatsAppButton special light label={t.inquire} className="relative w-full md:w-auto" />
          </div>
        </div>
      </Rv>
    </section>
  )
}

const ICONS = [BookOpen, FileText, Mic, PenLine, ClipboardCheck, Files, GraduationCap]
const TILE = ['from-sky-400 to-blue-600', 'from-violet-500 to-purple-700', 'from-pink-400 to-rose-600', 'from-amber-400 to-orange-500', 'from-emerald-400 to-teal-600', 'from-fuchsia-500 to-violet-600', 'from-blue-500 to-indigo-700']
const SPAN = ['lg:col-span-2', '', '', '', '', 'lg:col-span-2', 'sm:col-span-2 lg:col-span-4']
function LearningFeatures() {
  const { t } = useL()
  return (
    <section id="learn" className="py-14 sm:py-20 bg-white relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet/10 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-4">
        <Head eye={t.eye.learn} title={t.learnTitle} sub={t.learnSub} />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.features.map(([h, d], i) => { const I = ICONS[i]; return (
            <Rv key={h} d={(i % 4) * .08} className={SPAN[i]}>
              <div onMouseMove={spot} className="spot h-full rounded-3xl border border-slate-200 bg-cream p-6">
                <span className="absolute right-4 top-2 font-display text-7xl font-extrabold text-navy/[.05]">0{i + 1}</span>
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${TILE[i]} text-white grid place-items-center shadow-lg`}><I /></div>
                <h3 className="relative mt-4 font-display text-xl font-bold text-navy">{h}</h3><p className="relative mt-1 text-slate-600">{d}</p>
              </div></Rv>) })}
        </div>
      </div>
    </section>
  )
}

function TeacherProfile() {
  const { lang, t } = useL()
  return (
    <section id="about" className="py-14 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
        <Rv className="relative max-w-sm mx-auto w-full">
          <div className="absolute -inset-3 sm:-inset-6 rounded-full border-2 border-dashed border-violet/30 spin-slow" />
          <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[3rem] bg-gradient-to-br from-gold to-fuchsia-500 rotate-3" />
          <img src="/teacher.webp" alt="Anuththara Teacher" loading="lazy" width="1000" height="1000" className="relative rounded-t-[999px] rounded-b-[3rem] w-full aspect-[4/5] object-cover shadow-2xl" />
          <div className="glass !bg-white/80 !border-white absolute -bottom-5 right-0 sm:-right-4 rounded-2xl px-4 py-3 text-navy font-bold flex items-center gap-2 float"><Award className="text-violet" />BA · HND · NDTESL</div>
        </Rv>
        <Rv d={.15}>
          <span className="font-hand text-2xl text-violet flex items-center gap-1.5"><Sparkles size={18} />{t.eye.about}</span>
          <h2 className="mt-1 font-display text-4xl md:text-5xl font-extrabold text-navy tracking-tight">{t.aboutTitle}</h2>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{t.bio}</p>
          <h3 className="mt-7 font-display font-bold text-navy text-xl">{t.qual}</h3>
          <ul className="mt-3 space-y-3">
            {QUALIFICATIONS.map((q, i) => <li key={q.en} className={`flex gap-3 items-center bg-white border border-slate-200 rounded-2xl p-3.5 hover:border-gold hover:shadow-lg transition ${['', 'md:ml-3', 'md:ml-6'][i % 3]}`}>
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-orange-400 text-navy grid place-items-center shrink-0"><Award size={20} /></span><span className="font-semibold text-slate-800">{q[lang]}</span></li>)}
          </ul>
        </Rv>
      </div>
    </section>
  )
}

function BranchLocations() {
  const { lang, t } = useL()
  return (
    <section id="locations" className="py-14 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <Head eye={t.eye.loc} title={t.locTitle} />
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {BRANCHES.map(b => (
            <Rv key={b.id}><div onMouseMove={spot} className="spot rounded-3xl border border-slate-200 bg-cream p-5 sm:p-6 flex gap-4 sm:gap-5 items-start">
              <div className="relative shrink-0 w-16 h-16 grid place-items-center"><span className="absolute inset-0 rounded-full bg-violet/20 animate-ping" /><span className="relative w-14 h-14 rounded-full bg-gradient-to-br from-violet to-royal text-white grid place-items-center"><MapPin /></span></div>
              <div className="relative min-w-0"><p className="text-sm text-violet font-bold">Anuththara Teacher</p>
                <h3 className="font-display text-xl font-bold text-navy">{b.name[lang]}</h3>
                <p className="mt-1 text-slate-600">{b.address || t.addr}</p>
                {b.maps ? <a href={b.maps} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 min-h-12 px-5 rounded-full bg-royal text-white font-semibold hover:-translate-y-0.5 transition">{t.dir}<ArrowRight size={16} /></a>
                  : <button disabled title={t.soon} className="mt-4 min-h-12 px-5 rounded-full bg-slate-200 text-slate-500 font-semibold">{t.dir} · {t.soon}</button>}</div>
            </div></Rv>))}
        </div>
      </div>
    </section>
  )
}

const Soon = ({ icon: I, text, className = '' }) => <div className={`relative overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-white/70 grid place-items-center text-center p-4 text-slate-400 text-sm ${className}`}><div className="absolute inset-0 shimmer" /><div className="relative"><I className="mx-auto mb-2" />{text}</div></div>

function Community() {
  const { lang, t } = useL()
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Head eye={t.eye.gal} title={t.galTitle} sub={t.galSub} />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY.length ? GALLERY.map((p, i) => <Rv key={p.src} d={i * .06}><img src={p.src} alt={p.alt || ''} loading="lazy" className="rounded-3xl aspect-square object-cover w-full hover:scale-[1.03] transition" /></Rv>)
            : [0, 1, 2, 3].map(i => <Rv key={i} d={i * .08}><Soon icon={Img} text={t.galPh} className="aspect-square" /></Rv>)}
        </div>
        <div className="mt-16"><Head eye={t.eye.tes} title={t.tesTitle} /></div>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.length ? TESTIMONIALS.map((x, i) => <Rv key={i} d={i * .08}><div className="spot h-full rounded-3xl bg-white border border-slate-200 p-6" onMouseMove={spot}><Quote className="text-gold" /><p className="mt-3 text-slate-700">{x.text[lang]}</p><p className="mt-4 font-bold text-navy">{x.name}</p></div></Rv>)
            : [0, 1, 2].map(i => <Rv key={i} d={i * .08}><Soon icon={Quote} text={t.tesPh} className="min-h-40" /></Rv>)}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const { lang, t } = useL()
  const row = 'glass flex items-center gap-3 rounded-2xl p-3.5 sm:p-4 break-words min-h-14 hover:bg-white/20 hover:translate-x-1 transition'
  return (
    <section id="contact" className="relative py-16 sm:py-24 aurora text-white overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="relative max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <Rv>
          <span className="font-hand text-2xl text-gold flex items-center gap-1.5"><Sparkles size={18} />{t.eye.con}</span>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">{t.conTitle}</h2>
          <p className="mt-4 text-lg text-blue-100">{t.conSub}</p>
          <WhatsAppButton className="mt-7 text-lg !min-h-14" />
        </Rv>
        <Rv d={.15} className="space-y-3">
          <a href={`tel:+${CONTACT.whatsapp}`} className={row}><Phone className="text-gold" /><span><small className="block text-blue-200">{t.phone}</small>{CONTACT.phone}</span></a>
          <a href={waLink(t.msg())} target="_blank" rel="noopener noreferrer" className={row}><MessageCircle className="text-gold" /><span><small className="block text-blue-200">{t.whatsapp}</small>{CONTACT.phone}</span></a>
          {CONTACT.facebook ? <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className={row}><Facebook className="text-gold" />{t.facebook}</a> : <div className={`${row} opacity-70`}><Facebook className="text-gold" />{t.fbSoon}</div>}
          {BRANCHES.map(b => <div key={b.id} className={row}><MapPin className="text-gold" />{b.name[lang]}</div>)}
        </Rv>
      </div>
    </section>
  )
}

function Footer() {
  const { lang, t } = useL()
  return (
    <footer className="bg-ink text-blue-100 pt-12 pb-24 lg:pb-8">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
        <div><p className="text-white font-display font-extrabold text-xl">Anuththara <span className="text-gold">Teacher</span></p><p className="mt-2">{t.footDesc}</p>
          <div className="mt-4 flex gap-3">
            <a href={waLink(t.msg())} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/10 rounded-full hover:bg-green-500 transition"><MessageCircle /></a>
            {CONTACT.facebook && <a href={CONTACT.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/10 rounded-full hover:bg-royal transition"><Facebook /></a>}
          </div></div>
        <div><p className="text-white font-bold mb-2">{t.links}</p>{NAV.map(k => <a key={k} href={`#${k}`} className="block py-1 hover:text-gold hover:translate-x-1 transition">{t.nav[k]}</a>)}</div>
        <div><p className="text-white font-bold mb-2">{t.reach}</p><p>{CONTACT.phone}</p>{BRANCHES.map(b => <p key={b.id}>{b.name[lang]}</p>)}</div>
      </div>
      <p className="mt-10 text-center text-xs text-blue-300">© 2026 Anuththara Teacher. {t.rights}</p>
    </footer>
  )
}

function FloatingDock() {
  const { t } = useL()
  return (
    <a href={waLink(t.msg())} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="group fixed bottom-5 right-5 z-50 flex items-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-2xl shadow-green-600/40 hover:scale-105 transition">
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40" />
      <span className="relative max-w-0 group-hover:max-w-40 overflow-hidden whitespace-nowrap font-bold transition-all duration-500 group-hover:pl-5">{t.waShort}</span>
      <span className="relative w-14 h-14 grid place-items-center"><MessageCircle size={28} /></span>
    </a>
  )
}

export default function App() {
  const [lang, setLang] = useState('en')
  useEffect(() => { document.documentElement.lang = lang === 'si' ? 'si' : 'en' }, [lang])
  return (
    <L.Provider value={{ lang, setLang, t: T[lang] }}>
      <Navbar /><main><Hero /><Marquee /><Stats /><ClassTimetable /><SpecialBatchBanner /><LearningFeatures /><TeacherProfile /><BranchLocations /><Community /><ContactSection /></main><Footer /><FloatingDock />
    </L.Provider>
  )
}
