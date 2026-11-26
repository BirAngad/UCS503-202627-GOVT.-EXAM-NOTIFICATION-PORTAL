import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Bell, Bookmark, Calendar, CheckCircle2, ClipboardList, ExternalLink, GraduationCap, House, Landmark, LogOut, Menu, Search, Settings, Shield, TrainFront, UserRound, X } from "lucide-react";
import { api } from "../api";
import { isOriginalSample } from "../data/originalSamples";
import { AccountPanel } from "./AccountPanel";
import { ThemeToggle } from "./Theme";
import { useReminders } from "./useReminders";

type Exam = {
  id: number; title: string; organization: string; category: string; lastDate?: string; examDate?: string;
  examEndDate?: string; catalogKey?: string; applicationLink?: string; description?: string;
  eligibility?: string; posts?: number; isNew?: boolean;
};
const sections = [
  { id: "dashboard", label: "Dashboard", icon: House },
  { id: "exams", label: "Examinations", icon: ClipboardList },
  { id: "saved", label: "Saved Exams", icon: Bookmark },
  { id: "reminders", label: "Reminders", icon: Bell },
  { id: "profile", label: "Settings", icon: UserRound },
] as const;
type View = typeof sections[number]["id"];

const day = 86400000;
const dateValue = (date?: string) => date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? Date.parse(date) : Infinity;
const formatDate = (date?: string) => Number.isFinite(dateValue(date))
  ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(dateValue(date))
  : "Check source";

function examDateLabel(exam: Exam) {
  const start = formatDate(exam.examDate);
  return exam.examEndDate && exam.examEndDate !== exam.examDate ? start + " – " + formatDate(exam.examEndDate) : start;
}

function IconTile({ exam }: { exam: Exam }) {
  const style = exam.category === "Railway" ? { color: "orange", Icon: TrainFront }
    : exam.category === "Banking" ? { color: "green", Icon: Landmark }
    : ["Defence", "Police"].includes(exam.category) ? { color: "rose", Icon: Shield }
    : exam.category === "SSC" ? { color: "purple", Icon: ClipboardList }
    : { color: "blue", Icon: Landmark };
  return <span className={`tile ${style.color}`}><style.Icon /></span>;
}

export function ExamWorkspace({ platform }: { platform: "android" | "ios" }) {
  const { reminders, alerts, toggle } = useReminders();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState<View>("dashboard");
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [listingType, setListingType] = useState("");
  const [sort, setSort] = useState("featured");
  const [limit, setLimit] = useState(12);
  const [selected, setSelected] = useState<Exam | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let active = true;
    api("/exams").then((rows: Exam[]) => {
      if (active) setExams(rows.filter(exam => !isOriginalSample(exam)));
    }).catch((error: Error) => {
      if (active) setError(error.message);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(""), 3500);
    return () => window.clearTimeout(timeout);
  }, [message]);

  function changeView(next: View, type = "") {
    setView(next);
    setMenu(false);
    setQuery("");
    setCategory("");
    setListingType(type);
    setSort("featured");
    setLimit(12);
    window.scrollTo(0, 0);
  }

  async function save(exam: Exam) {
    if (busy) return;
    setBusy(true);
    try {
      setMessage(await toggle(exam.id));
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const today = Date.parse(new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()));
  const daysLeft = (exam: Exam) => (dateValue(exam.lastDate) - today) / day;
  const isSaved = (exam: Exam) => reminders.has(String(exam.id));
  const upcoming = exams.filter(exam => isSaved(exam) && daysLeft(exam) >= 0 && daysLeft(exam) <= 3);
  const categories = [...new Set(exams.map(exam => exam.category))].sort();
  const filtered = (view === "saved" || view === "reminders" ? exams.filter(isSaved) : exams).filter(exam =>
    (!category || exam.category === category) &&
    (!listingType || (listingType === "official" ? Boolean(exam.catalogKey) : !exam.catalogKey)) &&
    [exam.title, exam.organization, exam.category, exam.description].some(value => value?.toLowerCase().includes(query.trim().toLowerCase()))
  ).sort((a, b) => {
    if (Boolean(a.catalogKey) !== Boolean(b.catalogKey)) return Number(Boolean(b.catalogKey)) - Number(Boolean(a.catalogKey));
    if (sort === "name") return a.title.localeCompare(b.title);
    if (sort === "exam") return dateValue(a.examDate) - dateValue(b.examDate);
    if (sort === "deadline") return dateValue(a.lastDate) - dateValue(b.lastDate);
    if (sort === "new") return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
    return 0;
  });
  const visible = filtered.slice(0, limit);
  const stats = [
    { label: "Total listings", count: exams.length, color: "blue", Icon: ClipboardList, target: "exams" },
    { label: "Total official exams", count: exams.filter(exam => exam.catalogKey).length, color: "green", Icon: CheckCircle2, target: "exams" },
    { label: "Listed future deadlines", count: exams.filter(exam => daysLeft(exam) >= 0 && Number.isFinite(daysLeft(exam))).length, color: "orange", Icon: Bell, target: "reminders" },
    { label: "Saved exams", count: exams.filter(isSaved).length, color: "purple", Icon: Bookmark, target: "saved" },
  ] as const;

  function card(exam: Exam) {
    return <article className="exam-card" key={exam.id}>
      <div className="exam-head">
        <IconTile exam={exam} />
        <div className="exam-name"><h3>{exam.title}</h3><p>{exam.organization}</p></div>
        <button type="button" className={`icon-button bookmark ${isSaved(exam) ? "selected" : ""}`}
          aria-label={isSaved(exam) ? `Remove ${exam.title} from saved exams` : `Save ${exam.title}`} aria-pressed={isSaved(exam)}
          disabled={busy} onClick={() => save(exam)}><Bookmark /></button>
      </div>
      <div className="tags"><span className="tag blue">{exam.category}</span></div>
      <div className="dates">
        <span><Calendar /> Apply by <strong>{formatDate(exam.lastDate)}</strong></span>
        <span><Calendar /> Exam date <strong>{examDateLabel(exam)}</strong>
          {exam.catalogKey && exam.examDate && <small className="tentative">Tentative</small>}</span>
      </div>
      <button type="button" className="button details-button" aria-label={`View details for ${exam.title}`} onClick={() => setSelected(exam)}>View Details <ArrowRight /></button>
    </article>;
  }

  const pageTitle = view === "dashboard" ? "Welcome to GovExam Alert" : sections.find(section => section.id === view)?.label;
  return <div className="gov-workspace shell" data-gov-platform={platform}>
    <aside className={`sidebar ${menu ? "is-open" : ""}`}>
      <Link className="brand" to="/"><GraduationCap /><span><strong>GovExam Alert</strong><small>Government Exam Notifications</small></span></Link>
      <nav className="primary-nav" aria-label="Main navigation">
        {sections.map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-current={id === view ? "page" : undefined} onClick={() => changeView(id)}><Icon /><span>{label}</span></button>)}
        <Link to="/admin"><Settings /><span>Admin Panel</span></Link>
      </nav>
      <Link className="back-link" to="/"><LogOut /><span>Platform selection</span></Link>
    </aside>
    <div className="workspace">
      <header className="app-header">
        <div className="app-heading">
          <button className="icon-button menu-toggle" type="button" aria-label="Toggle menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><Menu /></button>
          <div><h1>{pageTitle}</h1><p>{platform === "ios" ? "iOS" : "Android"} workspace</p></div>
        </div>
        <div className="header-actions">
          <ThemeToggle />
          <button className="icon-button" type="button" aria-label="Open reminders" onClick={() => changeView("reminders")}><Bell /></button>
          <button className="icon-button" type="button" aria-label="Open profile settings" onClick={() => changeView("profile")}><UserRound /></button>
        </div>
      </header>
      <main className="workspace-main">
        {view === "profile" ? <AccountPanel /> : <>
          {view === "dashboard" && <section className="stats" aria-label="Exam overview">{stats.map(({ label, count, color, Icon, target }) =>
            <button type="button" key={label} className={`stat ${color}`} onClick={() => changeView(target, label === "Real exams" ? "official" : "")}><span className="tile"><Icon /></span><span><strong>{count}</strong><small>{label}</small></span></button>)}</section>}
          {loading && <p className="source-note" role="status">Loading project exams…</p>}
          {error && <div className="gov-alert" role="status">Could not load exams. Start the backend and reload the page.</div>}
          {alerts && (view === "dashboard" || view === "reminders") && upcoming.map(exam =>
            <div key={exam.id} className="gov-alert" role="status">Deadline alert: {exam.title} closes in {daysLeft(exam)} day(s).</div>)}
          <div className="filters gov-filters" aria-label="Filter examinations">
            <label className="search-box"><Search /><input type="search" aria-label="Search exams" placeholder="Search exams (e.g. UPSC, SSC, Banking)..." value={query} onChange={event => { setQuery(event.target.value); setLimit(12); }} /></label>
            <select aria-label="Category" value={category} onChange={event => { setCategory(event.target.value); setLimit(12); }}><option value="">All categories</option>{categories.map(item => <option key={item}>{item}</option>)}</select>
            {(view === "exams" || view === "dashboard") && <select aria-label="Listing type" value={listingType} onChange={event => { setListingType(event.target.value); setLimit(12); }}>
              <option value="">All listing types</option><option value="official">Official catalog</option><option value="added">Added by admin</option>
            </select>}
            <select aria-label="Sort by" value={sort} onChange={event => setSort(event.target.value)}>
              <option value="featured">Featured first</option><option value="deadline">Application deadline</option><option value="exam">Exam date</option><option value="new">Newest first</option><option value="name">Name A–Z</option>
            </select>
          </div>
          <div className="section-heading"><h2>{view === "saved" || view === "reminders" ? "Your saved listings" : "Examinations"}</h2><span>Showing {visible.length} of {filtered.length}</span></div>
          {(view === "dashboard" || view === "exams") && <p className="source-note">Calendar dates are tentative. Sign in to bookmark exams and track deadlines.</p>}
          {visible.length > 0 && <div className="exam-grid">{visible.map(card)}</div>}
          {!loading && !error && !visible.length && <div className="empty"><h3>No matching exams</h3><p>{view === "saved" || view === "reminders" ? "Saved exams appear here after you sign in and bookmark them." : "Try a different keyword or category."}</p></div>}
          {visible.length < filtered.length && <div className="more"><button className="button secondary" type="button" onClick={() => setLimit(limit + 12)}>Show more exams</button></div>}
        </>}
      </main>
    </div>
    <nav className="mobile-tabs" aria-label="Quick navigation">
      {sections.slice(0, 4).map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-current={id === view ? "page" : undefined} onClick={() => changeView(id)}><Icon /><span>{id === "saved" ? "Saved" : label}</span></button>)}
    </nav>
    <dialog ref={dialog} aria-labelledby="exam-dialog-title" onClose={() => setSelected(null)}>
      {selected && <div className="dialog-inner">
        <header><h2 id="exam-dialog-title">{selected.title}</h2><button type="button" className="icon-button" aria-label="Close details" onClick={() => dialog.current?.close()}><X /></button></header>
        <p className="source-note">{selected.organization} · {selected.category}</p>
        <p>{selected.description || "See the listing source for details."}</p>
        <dl>
          <div><dt>Apply by</dt><dd>{selected.lastDate ? formatDate(selected.lastDate) : "See source when available"}</dd></div>
          <div><dt>Exam date</dt><dd>{selected.examDate ? examDateLabel(selected) : "See source when available"}</dd></div>
          {selected.eligibility && <div><dt>Eligibility</dt><dd>{selected.eligibility}</dd></div>}
          {selected.posts != null && <div><dt>Posts</dt><dd>{selected.posts}</dd></div>}
        </dl>
        {selected.catalogKey && <p className="source-note">Check the official notice for current dates and eligibility.</p>}
        {selected.applicationLink && /^https?:\/\//i.test(selected.applicationLink) && <a className="button secondary" href={selected.applicationLink} target="_blank" rel="noreferrer">{selected.catalogKey ? "Official source" : "Open application link"} <ExternalLink /></a>}
        <div className="form-actions"><button type="button" className="button" disabled={busy} onClick={() => save(selected)}>{isSaved(selected) ? "Remove reminder" : "Save reminder"}</button></div>
        {message && <p role="status">{message}</p>}
      </div>}
    </dialog>
    {!selected && <div className={`toast ${message ? "visible" : ""}`} role="status">{message}</div>}
  </div>;
}
