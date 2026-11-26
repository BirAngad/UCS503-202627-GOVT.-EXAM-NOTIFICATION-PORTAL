import { Link } from "react-router";
import { Apple, ArrowRight, Bell, Bookmark, Check, GraduationCap, Search, Settings, Smartphone } from "lucide-react";
import { ThemeToggle } from "../components/Theme";

const platforms = [
  { path: "android", name: "Android", icon: Smartphone, color: "green", style: "Material Design 3", features: ["Exam cards with category icons", "Quick access to saved exams and reminders", "Bottom navigation on phones"] },
  { path: "ios", name: "iOS", icon: Apple, color: "blue", style: "Human Interface Guidelines", features: ["Compact exam lists", "Grouped profile settings", "Tab bar navigation on phones"] },
];

const features = [
  { icon: Search, color: "blue", title: "Search exams", detail: "Filter by name or category" },
  { icon: Bookmark, color: "purple", title: "Save exams", detail: "Build a shortlist" },
  { icon: Bell, color: "orange", title: "Track deadlines", detail: "See alerts for saved exams" },
  { icon: Settings, color: "green", title: "Manage listings", detail: "Add and edit exams as an admin" },
];

export default function LandingPage() {
  return <div className="gov-landing">
    <header className="landing-header">
      <div className="landing-nav">
        <Link className="brand" to="/"><GraduationCap /><span><strong>GovExam Alert</strong><small>Government Exam Notifications</small></span></Link>
        <ThemeToggle />
      </div>
    </header>
    <main className="landing-main">
      <div className="hero">
        <span className="hero-icon"><Bell /></span>
        <h1>GovExam Alert <em>Platform</em></h1>
        <p>Find Indian government exams, save your shortlist, and keep track of application deadlines.</p>
      </div>
      <section className="platform-grid" aria-label="Choose a design">
        {platforms.map(({ path, name, icon: Icon, color, style, features }) => <article className="platform-card" key={path}>
          <div className="platform-heading"><span className={`tile ${color}`}><Icon /></span><div><h2>{name} Version</h2><p>{style}</p></div></div>
          <ul>{features.map(feature => <li key={feature}><Check />{feature}</li>)}</ul>
          <Link className={`button ${path === "ios" ? "secondary" : ""}`} to={`/${path}`}>View {name} Design <ArrowRight /></Link>
        </article>)}
      </section>
      <section className="feature-strip" aria-label="Platform features">
        {features.map(({ icon: Icon, color, title, detail }) => <div key={title}>
          <span className={`tile ${color}`}><Icon /></span><span><strong>{title}</strong><small>{detail}</small></span>
        </div>)}
      </section>
    </main>
    <footer className="landing-footer"><span>GovExam Alert</span><span>Third-year Software Engineering Project</span></footer>
  </div>;
}
