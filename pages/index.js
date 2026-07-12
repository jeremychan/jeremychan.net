import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faStrava } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faEnvelope, faMinus, faMoon, faSun, faVolumeHigh, faVolumeXmark, faXmark } from "@fortawesome/free-solid-svg-icons";

const panels = {
  about: { title: "about.txt", x: 7, y: 15, className: "aboutWindow" },
  book: { title: "book.epub", x: 51, y: 10, className: "bookWindow" },
  models: { title: "models.stl", x: 42, y: 52, className: "modelsWindow" },
  running: { title: "running.exe", x: 66, y: 35, className: "runningWindow" },
  contact: { title: "contact.msg", x: 60, y: 57, className: "contactWindow" },
};

function Window({ id, title, position, active, depth, minimized, onFocus, onClose, onMinimize, onMove, children }) {
  const drag = useRef(null);

  const pointerDown = (event) => {
    if (event.button !== 0 || event.target.closest("button")) return;
    onFocus(id);
    drag.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, left: position.x, top: position.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    onMove(id, drag.current.left + event.clientX - drag.current.x, drag.current.top + event.clientY - drag.current.y);
  };

  const pointerUp = (event) => {
    if (drag.current?.pointerId === event.pointerId) drag.current = null;
  };

  return (
    <section
      className={`deskWindow ${panels[id].className} ${active ? "isActive" : ""} ${minimized ? "isMinimized" : ""}`}
      style={{ left: position.x, top: position.y, zIndex: active ? 20 : 10, "--sheet-depth": depth }}
      onPointerDown={() => onFocus(id)}
      aria-label={title}
    >
      <header className="windowBar" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp}>
        <span className="windowMark" aria-hidden="true" />
        <span>{title}</span>
        <div className="windowActions">
          <button onClick={() => onMinimize(id)} aria-label={`Minimize ${title}`}><FontAwesomeIcon icon={faMinus} /></button>
          <button onClick={() => onClose(id)} aria-label={`Close ${title}`}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
      </header>
      <div className="windowBody">{children}</div>
    </section>
  );
}

function About() {
  return <>
    <p className="eyebrow">HELLO, I’M</p>
    <h1>Jeremy<br /><span>Chan.</span></h1>
    <p className="lead">Tech lead at Meta building AI platforms and reliable systems from London.</p>
    <div className="status"><i /> AVAILABLE FOR INTERESTING PROBLEMS</div>
    <p>I lead ambiguous, cross-functional work across agentic browser systems, developer tooling, reliability and observability. I care about turning complex infrastructure into products that are fast, trustworthy and pleasant to build on.</p>
    <div className="chips"><span>AI systems</span><span>Tech leadership</span><span>Reliability</span><span>Developer tools</span></div>
  </>;
}

function Book() {
  return <>
    <p className="eyebrow">SELECTED WRITING</p>
    <h2>The Prometheus<br /><span>Release.</span></h2>
    <p className="projectRole">CO-AUTHOR · BOOK</p>
    <p>A book about AI transformation, software leadership, and the work required to build trustworthy systems.</p>
    <a className="projectLink" href="https://prometheus.ceremydigital.com/" target="_blank" rel="noreferrer">Visit the book <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
  </>;
}

function Models() {
  return <>
    <p className="eyebrow">MADE IN THREE DIMENSIONS</p>
    <h2>Rapid<span>Render.</span></h2>
    <p className="projectRole">3D DESIGN · MAKERWORLD</p>
    <p>Practical objects, experiments and printable ideas—designed when software alone isn’t quite tangible enough.</p>
    <a className="projectLink" href="https://makerworld.com/en/@RapidRender/upload" target="_blank" rel="noreferrer">Explore my models <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
  </>;
}

function Running() {
  return <>
    <p className="eyebrow">OFF THE CLOCK</p>
    <h2>Running<br /><span>log.</span></h2>
    <div className="emptyState"><span>DATA PENDING</span><strong>Miles, races and personal bests will live here.</strong><small>This window is ready for your running career.</small></div>
    <a className="projectLink" href="https://www.strava.com/athletes/79204665" target="_blank" rel="noreferrer">Follow on Strava <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
  </>;
}

function Contact() {
  return <>
    <p className="eyebrow">SAY HELLO</p>
    <h2>Let’s build something<br /><span>useful.</span></h2>
    <a className="emailLink" href="mailto:chanchunwing@gmail.com"><FontAwesomeIcon icon={faEnvelope} /> Send me an email</a>
    <div className="socialLinks">
      <a href="https://www.linkedin.com/in/jeremycwchan/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /><span>LinkedIn</span></a>
      <a href="https://github.com/jeremychan" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /><span>GitHub</span></a>
      <a href="https://www.strava.com/athletes/79204665" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faStrava} /><span>Strava</span></a>
    </div>
  </>;
}

export default function Home() {
  const [open, setOpen] = useState({ about: true, book: false, models: false, running: false, contact: false });
  const [minimized, setMinimized] = useState({});
  const [active, setActive] = useState("about");
  const [dark, setDark] = useState(false);
  const [sound, setSound] = useState(true);
  const [positions, setPositions] = useState({});
  const [order, setOrder] = useState(["about"]);
  const audioContext = useRef(null);

  useEffect(() => {
    const place = () => setPositions(Object.fromEntries(Object.entries(panels).map(([id, p]) => [id, { x: window.innerWidth * p.x / 100, y: window.innerHeight * p.y / 100 }])));
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  useEffect(() => {
    const click = (event) => {
      if (!sound || !event.target.closest("button, a")) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const context = audioContext.current || (audioContext.current = new AudioCtx());
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(520, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(310, context.currentTime + .035);
      gain.gain.setValueAtTime(.035, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .045);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(); oscillator.stop(context.currentTime + .05);
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [sound]);

  const focus = (id) => { setActive(id); setOrder(v => [...v.filter(key => key !== id), id]); };
  const launch = (id) => { setOpen(v => ({ ...v, [id]: true })); setMinimized(v => ({ ...v, [id]: false })); focus(id); };
  const close = (id) => {
    setOpen(v => ({ ...v, [id]: false }));
    setOrder(v => {
      const next = v.filter(key => key !== id);
      if (active === id && next.length) setActive(next[next.length - 1]);
      return next;
    });
  };
  const move = (id, x, y) => setPositions(v => ({ ...v, [id]: { x: Math.max(8, Math.min(x, window.innerWidth - 260)), y: Math.max(62, Math.min(y, window.innerHeight - 80)) } }));

  return <>
    <Head><title>Jeremy Chan — Software Engineer</title><meta name="description" content="Jeremy Chan is a full-stack software engineer in London, specialising in AI, backend development and DevOps." /><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" /></Head>
    <main className={`desktop ${dark ? "dark" : ""}`}>
      <nav className="topbar">
        <button className="brand" onClick={() => launch("about")}><span>JC</span><b>JEREMY CHAN</b></button>
        <div className="topRight"><span>51.5072° N, 0.1276° W</span><button onClick={() => setSound(v => !v)} aria-label="Toggle interface sounds"><FontAwesomeIcon icon={sound ? faVolumeHigh : faVolumeXmark} /></button><button onClick={() => setDark(v => !v)} aria-label="Toggle colour theme"><FontAwesomeIcon icon={dark ? faSun : faMoon} /></button></div>
      </nav>

      <div className="launchers" aria-label="Open windows">
        {Object.entries(panels).map(([id, p], index) => <button key={id} onClick={() => launch(id)} className={open[id] && !minimized[id] && active === id ? "selected" : ""}><span>{String(index + 1).padStart(2, "0")}</span>{p.title}</button>)}
      </div>

      <div className="gridLines" aria-hidden="true" />
      <div className="orbit" aria-hidden="true"><i /><i /><i /></div>
      {Object.entries(panels).map(([id, p]) => open[id] && positions[id] && <Window key={id} id={id} title={p.title} position={positions[id]} active={active === id} depth={Math.max(0, order.length - 1 - order.indexOf(id))} minimized={minimized[id]} onFocus={focus} onClose={close} onMinimize={(key) => setMinimized(v => ({ ...v, [key]: true }))} onMove={move}>{id === "about" ? <About /> : id === "book" ? <Book /> : id === "models" ? <Models /> : id === "running" ? <Running /> : <Contact />}</Window>)}

      <footer><span>© {new Date().getFullYear()} JEREMY CHAN</span><span>DESIGNED & BUILT WITH CARE <i /></span></footer>
    </main>
  </>;
}
