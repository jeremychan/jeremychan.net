import Head from "next/head";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const projects = [
  {
    number: "01",
    category: "HOME ASSISTANT · AGENT TOOLING",
    title: <>HA Agent<br /><span>CLI.</span></>,
    description: "A command-line tool for interacting with Home Assistant from agents.",
    tags: ["Home Assistant", "CLI", "AI agents"],
    href: "https://github.com/jeremychan/ha-agent-cli",
  },
  {
    number: "02",
    category: "HOME ASSISTANT · GEMINI",
    title: <>Gemini CLI<br /><span>Add-on.</span></>,
    description: "A Home Assistant add-on for using Antigravity/Gemini CLI.",
    tags: ["Home Assistant", "Gemini CLI", "Docker", "Ingress"],
    href: "https://github.com/jeremychan/home-assistant-addons-gemini-cli",
  },
];

export default function Projects() {
  const [dark, setDark] = useState(false);

  return <>
    <Head>
      <title>Projects — Jeremy Chan</title>
      <meta name="description" content="Open-source Home Assistant and AI projects by Jeremy Chan." />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <link rel="canonical" href="https://jeremychan.net/projects" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Projects — Jeremy Chan" />
      <meta property="og:description" content="Open-source Home Assistant and AI projects by Jeremy Chan." />
      <meta property="og:url" content="https://jeremychan.net/projects" />
    </Head>

    <main className={`projectsPage ${dark ? "dark" : ""}`}>
      <nav className="topbar">
        <a className="brand" href="/" aria-label="Back to Jeremy Chan home page"><span>JC</span><b>JEREMY CHAN</b></a>
        <div className="topRight">
          <a className="topNavLink" href="/">BACK HOME</a>
          <span>LONDON, UK</span>
          <button onClick={() => setDark(value => !value)} aria-label="Toggle colour theme"><FontAwesomeIcon icon={dark ? faSun : faMoon} /></button>
        </div>
      </nav>

      <div className="gridLines" aria-hidden="true" />

      <div className="projectsContent">
        <header className="projectsIntro">
          <p className="eyebrow">HOBBY PROJECTS</p>
          <h1>Things I’ve<br /><span>been building.</span></h1>
          <p className="lead">A couple of projects I’ve been working on in my spare time.</p>
        </header>

        <section className="projectsGrid" aria-label="Projects">
          {projects.map(project => <article className="projectCard" key={project.href}>
            <div className="projectCardHeader">
              <span className="projectNumber">{project.number}</span>
              <span className="projectCategory">{project.category}</span>
            </div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="projectTags" aria-label="Technologies used">
              {project.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
            <a className="projectLink" href={project.href} target="_blank" rel="noreferrer">
              View on GitHub <FontAwesomeIcon icon={faGithub} />
            </a>
          </article>)}
        </section>
      </div>

      <footer>
        <span>© {new Date().getFullYear()} JEREMY CHAN</span>
        <span>HOBBY PROJECTS <i /></span>
      </footer>
    </main>
  </>;
}
