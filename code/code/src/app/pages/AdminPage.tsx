import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowLeft, ExternalLink, Plus } from "lucide-react";
import { api } from "../api";
import { ThemeToggle } from "../components/Theme";
import { isOriginalSample } from "../data/originalSamples";

const blank = { title: "", organization: "", category: "SSC", lastDate: "", examDate: "", examEndDate: "", applicationLink: "", description: "", eligibility: "", posts: "", isNew: true };
type Exam = { id: number; catalogKey?: string; posts?: number; isNew?: boolean; category: string } &
  Partial<Record<"lastDate" | "examDate" | "examEndDate" | "applicationLink" | "description" | "eligibility", string>> &
  Record<"title" | "organization", string>;
const categories = ["Banking", "Railway", "SSC", "UPSC", "State PSC", "Defence", "Teaching", "Police", "Other"];
const fields = [
  ["title", "Exam title", "text"], ["organization", "Organisation", "text"],
  ["lastDate", "Application deadline", "date"], ["examDate", "Exam date", "date"],
  ["examEndDate", "Exam end date (optional)", "date"], ["applicationLink", "Application or source link", "url"], ["posts", "Number of posts", "number"],
  ["description", "Description", "text"], ["eligibility", "Eligibility", "text"],
] as const;

export default function AdminPage() {
  const [allowed, setAllowed] = useState(false);
  const [exams, setExams] = useState<Exam[]>([]);
  const [form, setForm] = useState(blank);
  const [id, setId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const [query, setQuery] = useState("");
  const editor = useRef<HTMLFormElement>(null);
  const reload = () => api("/exams").then((rows: Exam[]) => setExams(rows.filter(exam => !isOriginalSample(exam))));

  useEffect(() => {
    api("/profile").then(user => {
      if (user.role !== "admin") throw new Error("Administrator access required");
      setAllowed(true);
      return reload();
    }).catch(error => setMessage(error.message));
  }, []);

  useEffect(() => {
    if (editing) editor.current?.querySelector("input")?.focus();
  }, [editing, id]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    try {
      await api("/admin/exams" + (id ? "/" + id : ""), id ? "PUT" : "POST", {
        ...form, posts: form.posts === "" ? null : Number(form.posts),
      });
      await reload();
      setForm(blank);
      setId(null);
      setEditing(false);
      setMessage("Exam saved");
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(exam: Exam) {
    if (!window.confirm("Delete " + exam.title + "?")) return;
    try {
      await api("/admin/exams/" + exam.id, "DELETE");
      await reload();
      if (id === exam.id) setEditing(false);
      setMessage("Exam deleted");
    } catch (error) {
      setMessage((error as Error).message);
    }
  }

  function edit(exam?: Exam) {
    setId(exam?.id ?? null);
    setForm(exam ? {
      title: exam.title, organization: exam.organization, category: exam.category,
      lastDate: exam.lastDate ?? "", examDate: exam.examDate ?? "", examEndDate: exam.examEndDate ?? "", applicationLink: exam.applicationLink ?? "",
      description: exam.description ?? "", eligibility: exam.eligibility ?? "", posts: String(exam.posts ?? ""), isNew: Boolean(exam.isNew),
    } : blank);
    setEditing(true);
    window.scrollTo(0, 0);
  }

  const term = query.trim().toLowerCase();
  const matches = (title: string, organisation: string, category: string) =>
    [title, organisation, category].some(value => value.toLowerCase().includes(term));
  const visible = exams.filter(exam => matches(exam.title, exam.organization, exam.category));

  return <div className="gov-admin">
    <header className="landing-header"><div className="landing-nav">
      <Link className="button secondary" to="/"><ArrowLeft /> Platform selection</Link>
      <ThemeToggle />
    </div></header>
    <main className="workspace-main">
      <div className="section-heading">
        <div><h1>Examination Management</h1><p className="source-note">Add, edit, or delete exam listings.</p></div>
        {allowed && <button type="button" className="button" onClick={() => edit()}><Plus /> Add Examination</button>}
      </div>
      {message && <p className="gov-alert" role="status">{message}</p>}
      {allowed && <>
        {editing && <form ref={editor} onSubmit={save} className="panel gov-form-surface gov-admin-form">
          <h2>{id ? "Edit examination" : "Add examination"}</h2>
          <div className="profile-fields">
            {fields.map(([key, label, type]) => <label key={key}>{label}
              <input type={type} min={key === "posts" ? 0 : undefined} required={["title", "organization"].includes(key)}
                value={form[key]} onChange={event => setForm({ ...form, [key]: event.target.value })} />
            </label>)}
            <label>Category<select value={form.category} onChange={event => setForm({ ...form, category: event.target.value })}>
              {[...new Set([...categories, form.category])].map(category => <option key={category}>{category}</option>)}
            </select></label>
            <label className="new-exam"><input type="checkbox" checked={form.isNew} onChange={event => setForm({ ...form, isNew: event.target.checked })} /> New exam</label>
          </div>
          <div className="form-actions"><button disabled={busy} className="button">Save exam</button>
            <button type="button" className="button secondary" onClick={() => setEditing(false)}>Cancel</button></div>
        </form>}
        <div className="filters gov-filters"><label className="search-box"><input type="search" aria-label="Search examinations" placeholder="Search all examinations..." value={query} onChange={event => setQuery(event.target.value)} /></label></div>
        <p className="source-note">Showing {visible.length} of {exams.length} examinations.</p>
        <div className="table-wrap"><table>
          <thead><tr><th>Examination name</th><th>Category</th><th>Application deadline</th><th>Exam date</th><th>Actions</th></tr></thead>
          <tbody>
          {visible.map(exam => <tr key={exam.id}>
            <td><strong>{exam.title}</strong><small>{exam.organization}</small></td>
            <td>{exam.category}</td><td>{exam.lastDate || "—"}</td><td>{exam.examDate || "—"}{exam.examEndDate && exam.examEndDate !== exam.examDate && " – " + exam.examEndDate}</td>
            <td><div className="table-actions">
              {exam.catalogKey && exam.applicationLink && /^https?:\/\//i.test(exam.applicationLink) &&
                <a className="button secondary" href={exam.applicationLink} target="_blank" rel="noreferrer" aria-label={`View official source for ${exam.title}`}>Official source <ExternalLink /></a>}
              <button type="button" className="button secondary" onClick={() => edit(exam)}>Edit</button><button type="button" className="button danger" onClick={() => remove(exam)}>Delete</button></div></td>
          </tr>)}
          {!visible.length && <tr><td colSpan={5}>No matching exams.</td></tr>}</tbody>
        </table></div>
      </>}
    </main>
  </div>;
}
