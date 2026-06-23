import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  ChevronDown,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import aboutimage from "@/imports/aboutimage.jpg";
import homeImage from "@/imports/homeimage.jpg";

/* ─────────────────────── DATA */

const NAV_LINKS = ["About", "Skills", "Experience", "Contact"];

const SKILLS = [
  {
    category: "Frontend",
    items: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "jQuery"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Flask", "REST APIs", "Python", "SQL / MySQL"],
  },
  {
    category: "Microsoft Platform",
    items: ["Power Apps", "Power Automate", "Power BI", "SharePoint", "Microsoft Office"],
  },
  {
    category: "Tools & OS",
    items: ["Git / GitHub", "Raspberry Pi", "IoT / DIBee", "Windows", "Linux"],
  },
];

const EXPERIENCE = [
  {
    number: "01",
    company: "Radius Security ",
    role: "Software Developer",
    location: "Richmond, BC",
    type: "Contract",
    bullets: [
      "Upgraded a Node-RED UI by developing a React web interface for IoT device (Debian), supported by a Flask backend .",
      "Enabled real-time monitoring and control of connected peripherals like AC, fans, relays, and temperature sensors through a secure web application.",
      "Developed RESTful APIs to ensure smooth communication between frontend and backend for device data exchange and control.",
      " Implemented session-based authentication and role-based access control to ensure secure login.",
      "Created a responsive and user-friendly UI using React-Bootstrap, with state updates, dynamic form validation, and intuitive controls. ",
    ],
    tags: ["React.js", "Node.js", "Flask", "Raspberry Pi", "REST API"],
  },
  {
    number: "02",
    company: "Coocio Technology Consulting Ltd.  ",
    role: "Software Developer",
    location: "Vancouver, BC",
    type: "Contract",
    bullets: [
      "Developed a guided, stage-based business application for a Real Estate Client using Microsoft Power Apps to automate and streamline the end-to-end business case process. ",
      "Used SharePoint Lists to maintain a database of business case entries, map department codes, track project IDs, define UI input data, log user decisions, and manage approval matrix based on stages, tiers, and departments. ",
      "Utilized SharePoint to manage template libraries and business case documents, enabled metadata-driven upload and linking in the UI, and implemented role-based user access control. ",
      "Automated document workflows using Power Automate, handling folder setup, access control, and tier-based template creation. ",
      "Implemented workflow for scheduled and hierarchy-based emails triggered by stage, tier, and decision logic. ",
    ],
    tags: ["Power Apps", "Power Automate", "SharePoint", "Power BI"],
  },
  {
    number: "03",
    company: "Complete Pest Control",
    role: "Software Developer Intern",
    location: "Surrey, BC",
    type: "Internship",
    bullets: [
      "Developed custom web scraping scripts to extract invoice data from a website lacking bulk download functionality. ",
      " Cleaned and organized inconsistent invoice data based on client-defined categories such as Invoice number, description, units etc. using Python and Excel. ",
      "Matched and merged invoice data with insecticide dataset to create a unified, comprehensive dataset for analysis. ",
      "Automated filling of audit-related PDF forms using cleaned data, minimizing manual input and increasing efficiency. ",
      "Developed a user-friendly, no-cost UI application using Google AppSheet to standardize data entry and streamline data collection for future site visits.",
    ],
    tags: ["Python", "Web Scraping", "Excel", "Google AppSheet"],
  },
];

const COURSEWORK = [
  "Web Development",
  "Operating Systems",
  "Software Engineering",
  "Digital Electronics",
  "Computer Networks",
];

/* ─────────────────────── HOOKS */

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setProgress(el.scrollTop / (el.scrollHeight - el.clientHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.toLowerCase()));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
}

/* ─────────────────────── VALIDATION */

function validateForm(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.subject.trim()) errors.subject = "Subject is required.";
  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Please write at least 20 characters.";
  }
  return errors;
}

/* ─────────────────────── APP */

export default function App() {
  const scrollProgress = useScrollProgress();
  const activeSection = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openExp, setOpenExp] = useState("01");
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Figtree', sans-serif" }}>

      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed w-1.5 h-1.5 rounded-full bg-primary z-[100] -translate-x-1/2 -translate-y-1/2"
        style={{ transition: "left 60ms linear, top 60ms linear" }}
      />

      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-primary z-50 transition-[width] duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* ── NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 h-14 border-b border-border bg-background/90 backdrop-blur-sm">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          {/* DivCode Solution logo mark */}
          <div
            className="flex items-center justify-center w-7 h-7 bg-primary"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.75rem", fontWeight: 800, color: "var(--primary-foreground)", letterSpacing: "0.02em" }}
          >
            DC
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.05em", lineHeight: 1 }}
            >
              DivCode
            </span>
            <span
              className="text-primary"
              style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.14em", lineHeight: 1.4 }}
            >
              SOLUTION
            </span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="relative transition-colors duration-150"
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.09em",
                color: activeSection === link.toLowerCase() ? "var(--primary)" : "var(--muted-foreground)",
              }}
            >
              {link}
              {activeSection === link.toLowerCase() && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary" />
              )}
            </button>
          ))}
          <button
            onClick={() => scrollTo("Contact")}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-primary text-primary text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            style={{ fontFamily: "'Geist Mono', monospace", letterSpacing: "0.05em" }}
          >
            Hire me <ArrowUpRight size={11} />
          </button>
        </div>

        <button
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.06em" }}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-background pt-14 flex flex-col border-t border-border">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="flex items-center justify-between px-6 py-5 border-b border-border hover:bg-secondary transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "2rem", letterSpacing: "0.02em" }}
            >
              <span>{link}</span>
              <ArrowUpRight size={20} className="text-primary" />
            </button>
          ))}
        </div>
      )}

      {/* ── HERO */}
      <section className="relative min-h-screen flex flex-col" style={{ paddingTop: "3.5rem" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-background" />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[40%] bg-secondary/30 border-l border-border" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <div className="relative flex-1 flex flex-col justify-center px-6 md:px-12 pt-20 pb-16 max-w-7xl mx-auto w-full">
          <div
            className="mb-6 inline-flex items-center gap-2 w-fit border border-border px-3 py-1.5"
            style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary">OPEN TO WORK — VANCOUVER, BC</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:gap-12">
            <div className="flex-1">
              <h1
                className="font-black uppercase leading-none mb-2"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.2rem, 6vw, 5rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.01em",
                }}
              >
                Hi, I'm
              <br />
            <span style={{ color: "var(--primary)" }}>Divroop Sandhu</span>
           <br />
             <span style={{ fontSize: "0.25em", fontWeight: 500, color: "#a0a0a0", letterSpacing: "0.1em", }}>
              FULL STACK DEVELOPER
           </span>
            </h1>

              <p className="text-foreground/50 mt-5 text-sm leading-relaxed max-w-md">
               I build modern, responsive web applications that combine intuitive user experiences with reliable backend systems. Passionate about solving real-world problems through technology, I enjoy turning ideas into scalable digital solutions.
<br/>
Explore my projects, experience, and the technologies I use to create impactful web experiences.
              </p>

              <div className="mt-6 flex items-center gap-4 flex-wrap">
                <button
                  onClick={() => scrollTo("Contact")}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-semibold hover:opacity-90 transition-opacity"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem", letterSpacing: "0.05em" }}
                >
                  Get in touch <ArrowUpRight size={15} />
                </button>
                <button
                  onClick={() => scrollTo("Experience")}
                  className="inline-flex items-center gap-2 border border-border text-foreground/70 px-5 py-2.5 hover:border-foreground/40 transition-colors"
                  style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.06em" }}
                >
                  View work
                </button>
              </div>

            </div>

            {/* Stats panel */}
            {/* <div className="hidden md:flex flex-col gap-0 w-[38%] self-stretch justify-end pb-1">
              {[
                { value: "3", label: "Professional contracts" },
                { value: "10+", label: "Technologies used" },
                { value: "B.Tech", label: "Computer Science — PTU" },
              ].map(({ value, label }) => (
                <div key={label} className="py-5 border-t border-border">
                  <p
                    className="font-black leading-none"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "2.8rem" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-muted-foreground mt-1"
                    style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.08em" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div> */}

<div className="hidden md:flex w-[38%] self-stretch items-center justify-center relative">
  <div className="relative w-full max-w-[500px] aspect-square">
    {/* Soft color glow/reflection behind everything */}
    <div
      className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-120"
      style={{ backgroundColor: "var(--primary)" }}
    />

    {/* Contrast circular background — offset lower/behind */}
    <div
      className="absolute inset-0 rounded-full translate-y-8 translate-x-5"
      style={{ backgroundColor: "var(--primary)" }}
    />

    {/* Image — sits on top */}
    <img
      src={homeImage}
      alt="Divroop Sandhu"
      className="absolute inset-0 w-full h-full object-cover rounded-full"
    />

    {/* Floating tech badges */}
    <div
      className="absolute -top-1 -left-2 flex items-center gap-1.5 bg-background border border-border px-3 py-1.5 shadow-lg animate-float-1"
      style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.04em" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
     SEO Optimized
    </div>

    <div
      className="absolute top-1/4 -right-8 flex items-center gap-1.5 bg-background border border-border px-3 py-1.5 shadow-lg animate-float-2"
      style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.04em" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      Problem Solver
    </div>

    <div
      className="absolute bottom-2 -left-10 flex items-center gap-1.5 bg-background border border-border px-3 py-1.5 shadow-lg animate-float-3"
      style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.04em" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
     Tech Enthusiast
    </div>

    <div
      className="absolute -bottom-4 right-2 flex items-center gap-1.5 bg-background border border-border px-3 py-1.5 shadow-lg animate-float-2"
      style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.04em" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      Responsive Design
    </div>
  </div>
</div>
          </div>

          <button
            onClick={() => scrollTo("About")}
            className="mt-10 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-fit"
            style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em" }}
          >
            <ChevronDown size={13} className="animate-bounce" />
            Scroll to explore
          </button>
        </div>
      </section>

      {/* ── ABOUT */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 border-t border-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="00" title="About DivCode Solution" />

          {/* Headline */}
          <div className="mt-12 mb-14">
            <h2
              className="font-black uppercase leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                lineHeight: 0.9,
              }}
            >
              We turn your ideas into
              <br />
              <span className="text-primary">fast, modern web products.</span>
            </h2>
          </div>

          {/* Two column: left content / right image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left — client-focused pitch */}
            <div className="flex flex-col gap-8">

              {/* Owner badge */}
              <div className="inline-flex items-center gap-3 border border-border px-4 py-3 w-fit">
                <div
                  className="flex items-center justify-center w-8 h-8 bg-primary shrink-0"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.8rem", fontWeight: 800, color: "var(--primary-foreground)" }}
                >
                  DC
                </div>
                <div>
                  <p
                    className="text-foreground font-semibold text-sm leading-none"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem", letterSpacing: "0.04em" }}
                  >
                    DivCode Solution
                  </p>
                  <p
                    className="text-muted-foreground mt-0.5"
                    style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em" }}
                  >
                    SOLE PROPRIETORSHIP · VANCOUVER, BC
                  </p>
                </div>
              </div>

              {/* Pitch paragraphs */}
              <div className="space-y-4 text-foreground/65 text-sm leading-relaxed">
                <p>
                  DivCode Solution is a solo software studio run by a B.Tech Computer Science graduate. I work directly with clients — no account managers, no middlemen — so your vision goes straight into the code.
                </p>
                <p>
                  Whether you need a client-facing React web app, a REST API backend, a Power Apps business automation, or a database built from scratch, I handle the full delivery: architecture, build, testing, and launch.
                </p>
                <p>
                  Past clients include a tech startup in Richmond, an enterprise consulting firm in Vancouver, and a service business in Surrey. Every project is treated like it&apos;s the only one on my desk — because it usually is.
                </p>
              </div>

              {/* What I offer — service cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "⚡", title: "Web Applications", desc: "React frontends, REST APIs, full-stack builds from scratch." },
                  { icon: "🔁", title: "Business Automation", desc: "Power Apps & Power Automate workflows that save hours every week." },
                  { icon: "🗄️", title: "Database Design", desc: "Clean schemas, SQL queries, and data migrations done right." },
                  { icon: "🤝", title: "Direct Collaboration", desc: "You talk to the developer. Fast responses, transparent progress." },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="p-4 border border-border hover:border-primary/40 transition-colors group cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">{icon}</span>
                      <p
                        className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem", letterSpacing: "0.03em" }}
                      >
                        {title}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Why hire me strip */}
              <div className="flex flex-wrap gap-3">
                {[
                  "On-time delivery",
                  "Clean, maintainable code",
                  "Transparent pricing",
                  "Vancouver-based",
                  "Remote-friendly",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="flex items-center gap-1.5 text-foreground/70"
                    style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.06em" }}
                  >
                    <span className="text-primary text-xs">✓</span>
                    {badge}
                  </span>
                ))}
              </div>

              {/* Education line */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div>
                  <p
                    className="text-muted-foreground uppercase"
                    style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em" }}
                  >
                    Founder education
                  </p>
                  <p className="text-foreground text-sm font-medium mt-0.5">
                    B.Tech Computer Science Engineering
                  </p>
                  <p className="text-muted-foreground text-xs">Punjab Technical University · 2021</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin size={12} className="text-primary shrink-0" />
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.06em" }}>
                  Vancouver, BC — serving clients locally &amp; worldwide
                </span>
              </div>
            </div>

            {/* Right — programming image */}
            <div className="relative lg:sticky lg:top-20">
                <div  className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-110" style={{ backgroundColor: "var(--primary)" }}/>
              <div className="relative overflow-hidden border border-border rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <div className="relative w-full h-full">
                {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="../src/imports/aboutvideo.mp4" type="video/mp4" />
        
      </video> */}
                <img
                  src={aboutimage}
                  alt="Programming workstation with dual monitors displaying code"
                  className="absolute inset-0 w-full h-full object-cover animate-[kenburns_20s_ease-in-out_infinite]"
                />
                {/* Dark overlay so text pops */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />

                {/* Floating stat cards
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm border border-border px-4 py-3">
                  <p
                    className="text-primary font-black leading-none"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.8rem" }}
                  >
                    1+
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em" }}
                  >
                    YEARS EXP.
                  </p>
                </div> */}

                <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm border border-border px-4 py-3 flex items-center justify-between">
                  <div>
                    <p
                      className="text-foreground font-semibold"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem", letterSpacing: "0.04em" }}
                    >
                      DivCode Solution
                    </p>
                    <p
                      className="text-muted-foreground"
                      style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em" }}
                    >
                      SOLE PROPRIETORSHIP · EST. 2022
                    </p>
                  </div>
                  <div
                    className="flex items-center justify-center w-9 h-9 bg-primary"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.85rem", fontWeight: 800, color: "var(--primary-foreground)" }}
                  >
                    DC
                  </div>
                </div>
              </div></div>

              {/* Coursework below image */}
              <div className="mt-5">
                <p
                  className="text-muted-foreground uppercase mb-3"
                  style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em" }}
                >
                  Relevant coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {COURSEWORK.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors cursor-default"
                      style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.05em" }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            





          </div>
        </div>
      </section>

      {/* ── SKILLS */}
      <section id="skills" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/20 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="01" title="Skills" />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border divide-y lg:divide-y-0 divide-border">
            {SKILLS.map(({ category, items }, ci) => (
              <div
                key={category}
                className="p-6 md:p-8"
                style={{ borderRight: ci < SKILLS.length - 1 ? "1px solid var(--border)" : undefined }}
              >
                <p
                  className="text-primary mb-5 uppercase"
                  style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.14em" }}
                >
                  {category}
                </p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-foreground/75 text-sm group cursor-default hover:text-foreground transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform duration-150" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE */}
      <section id="experience" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="02" title="Experience" />

          <div className="mt-14 space-y-0">
            {EXPERIENCE.map((exp) => {
              const isOpen = openExp === exp.number;
              return (
                <div key={exp.number} className="border-b border-border">
                  <button
                    className="w-full flex items-start md:items-center gap-4 py-6 text-left group"
                    onClick={() => setOpenExp(isOpen ? null : exp.number)}
                  >
                    <span
                      className="text-primary shrink-0 mt-0.5 md:mt-0"
                      style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em" }}
                    >
                      {exp.number}
                    </span>
                    <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-8">
                      <h3
                        className="font-black uppercase leading-none group-hover:text-primary transition-colors"
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: "clamp(1.4rem, 3vw, 2rem)",
                          lineHeight: 1,
                        }}
                      >
                        {exp.company}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span
                          className="text-foreground/50 text-xs"
                          style={{ fontFamily: "'Geist Mono', monospace", letterSpacing: "0.04em" }}
                        >
                          {exp.role}
                        </span>
                        <span
                          className="px-2 py-0.5 border border-border text-muted-foreground"
                          style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 ml-auto">
                      <div className="hidden md:flex items-center gap-1 text-muted-foreground">
                        <MapPin size={11} />
                        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.05em" }}>
                          {exp.location}
                        </span>
                      </div>
                      <span
                        className="text-muted-foreground text-xl leading-none transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block" }}
                      >
                        +
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pb-8 pl-10 pr-4 grid grid-cols-1 md:grid-cols-12 gap-6">
                      <ul className="md:col-span-8 space-y-3">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-3 text-foreground/65 text-sm leading-relaxed">
                            <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-2" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="md:col-span-4 flex flex-wrap gap-1.5 content-start">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 border border-border text-muted-foreground"
                            style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.05em" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/20 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="03" title="Contact" />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
            <div className="md:col-span-5">
              <h2
                className="font-black uppercase leading-none mb-6"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  lineHeight: 0.92,
                }}
              >
                Let&apos;s work
                <br />
                <span className="text-primary">together.</span>
              </h2>
              <p className="text-foreground/60 text-sm leading-relaxed mb-8 max-w-sm">
                I&apos;m actively looking for full-time or contract opportunities in Vancouver, BC and remotely. Drop me a message and I&apos;ll get back to you within 24 hours.
              </p>

              <div className="space-y-0">
                {[
                  { label: "Email", value: "divroopsandhu2@gmail.com", href: "mailto:divroopsandhu2@gmail.com" },
                  { label: "LinkedIn", value: "View profile", href: "https://www.linkedin.com/in/divroop-sandhu-650382214/" },
                  { label: "GitHub", value: "@divroopsandhu2-coder", href: "https://github.com/divroopsandhu2-coder" },
                  { label: "Location", value: "Vancouver, BC", href: null, accent: false },
                  { label: "Education", value: "B.Tech CS · Punjab Technical University", href: null, accent: false },
                  { label: "Status", value: "Open to work ✓", href: null, accent: true },
                ].map(({ label, value, href, accent }) => (
                  <div key={label} className="flex items-center justify-between py-3.5 border-b border-border">
                    <p
                      className="text-muted-foreground shrink-0"
                      style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em" }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors text-sm"
                      >
                        {value} <ExternalLink size={11} />
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color: accent ? "var(--primary)" : "var(--foreground)", opacity: accent ? 1 : 0.8 }}>
                        {value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center w-5 h-5 bg-primary"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.55rem", fontWeight: 800, color: "var(--primary-foreground)" }}
          >
            DC
          </div>
          <p
            className="text-muted-foreground"
            style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em" }}
          >
            © 2025 DivCode Solution — Sole Proprietorship
          </p>
        </div>
        <p
          className="text-muted-foreground"
          style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em" }}
        >
          B.Tech CS · Punjab Technical University · Vancouver, BC
        </p>
      </footer>
    </div>
  );
}

/* ─────────────────────── CONTACT FORM */

function ContactForm() {
  const empty = { name: "", email: "", subject: "", message: "" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const set = (field) => (e) => {
    const next = { ...form, [field]: e.target.value };
    setForm(next);
    if (touched[field]) {
      const errs = validateForm(next);
      setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  };

  const blur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validateForm(form);
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    const errs = validateForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    await new Promise((res) => setTimeout(res, 1400));
    setStatus("success");
    setForm(empty);
    setTouched({});
    setErrors({});
  };

  if (status === "success") {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 py-20 border border-border text-center px-8">
        <CheckCircle2 size={36} className="text-primary" />
        <h3
          className="font-black uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "2rem", lineHeight: 1 }}
        >
          Message sent!
        </h3>
        <p className="text-foreground/60 text-sm max-w-xs">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-primary hover:opacity-70 transition-opacity"
          style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em" }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Full name"
          id="name"
          type="text"
          placeholder="Jane Smith"
          value={form.name}
          onChange={set("name")}
          onBlur={blur("name")}
          error={touched.name ? errors.name : undefined}
        />
        <Field
          label="Email address"
          id="email"
          type="email"
          placeholder="jane@company.com"
          value={form.email}
          onChange={set("email")}
          onBlur={blur("email")}
          error={touched.email ? errors.email : undefined}
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block mb-1.5 text-foreground/80"
          style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em" }}
        >
          Subject
        </label>
        <select
          id="subject"
          value={form.subject}
          onChange={set("subject")}
          onBlur={blur("subject")}
          className="w-full bg-secondary/50 border text-foreground/80 px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          style={{
            borderColor: touched.subject && errors.subject ? "var(--destructive)" : "var(--border)",
            fontFamily: "'Geist Mono', monospace",
            fontSize: "0.72rem",
          }}
        >
          <option value="">Select a topic…</option>
          <option value="Full-time opportunity">Full-time opportunity</option>
          <option value="Contract / freelance">Contract / freelance</option>
          <option value="Collaboration">Collaboration</option>
          <option value="General inquiry">General inquiry</option>
        </select>
        {touched.subject && errors.subject && <ErrorMsg msg={errors.subject} />}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block mb-1.5 text-foreground/80"
          style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em" }}
        >
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell me about the role or project…"
          value={form.message}
          onChange={set("message")}
          onBlur={blur("message")}
          className="w-full bg-secondary/50 border text-foreground/80 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary transition-colors placeholder:text-muted-foreground/50"
          style={{ borderColor: touched.message && errors.message ? "var(--destructive)" : "var(--border)" }}
        />
        <div className="flex items-start justify-between mt-1">
          {touched.message && errors.message ? <ErrorMsg msg={errors.message} /> : <span />}
          <span
            className="text-muted-foreground shrink-0"
            style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.05em" }}
          >
            {form.message.length} / 20 min
          </span>
        </div>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle size={14} />
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground py-3.5 font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.05rem", letterSpacing: "0.05em" }}
      >
        {status === "submitting" ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
            Sending…
          </>
        ) : (
          <>Send message <Send size={15} /></>
        )}
      </button>
    </form>
  );
}

function Field({ label, id, type, placeholder, value, onChange, onBlur, error }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-1.5 text-foreground/80"
        style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em" }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full bg-secondary/50 border text-foreground/80 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors placeholder:text-muted-foreground/50"
        style={{ borderColor: error ? "var(--destructive)" : "var(--border)" }}
      />
      {error && <ErrorMsg msg={error} />}
    </div>
  );
}

function ErrorMsg({ msg }) {
  return (
    <p
      className="flex items-center gap-1.5 mt-1 text-destructive"
      style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.04em" }}
    >
      <AlertCircle size={11} />
      {msg}
    </p>
  );
}

/* ─────────────────────── SHARED */

function SectionLabel({ index, title }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="text-primary shrink-0"
        style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em" }}
      >
        {index}
      </span>
      <div className="flex-1 h-px bg-border" />
      <span
        className="text-muted-foreground uppercase shrink-0"
        style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em" }}
      >
        {title}
      </span>
    </div>
  );
}
