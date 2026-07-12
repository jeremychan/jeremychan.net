import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faStrava } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faMinus, faMoon, faSun, faVolumeHigh, faVolumeXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "../components/ContactForm";
import runningStats from "../data/runningStats.json";

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
    <p className="lead">Building AI platforms, developer infrastructure and reliable systems from London.</p>
    <p>I work across agentic systems, AI integrations, developer tooling, reliability and observability. I care about turning complex infrastructure into products that are fast, trustworthy and pleasant to build on.</p>
    <a className="projectLink" href="https://www.linkedin.com/in/jeremycwchan/" target="_blank" rel="noreferrer">Connect on LinkedIn <FontAwesomeIcon icon={faLinkedin} /></a>
  </>;
}

function Book() {
  return <>
    <p className="eyebrow">MY BOOK</p>
    <div className="bookIntro"><div><h2>The Prometheus<br /><span>Release.</span></h2><p className="projectRole">JEREMY CHAN · CELIA LIU</p></div><img src="https://prometheus.ceremydigital.com/assets/prometheus-cover.jpeg" alt="Cover of The Prometheus Release" /></div>
    <p>I wanted to write the kind of technology fable I loved in <em>The Phoenix Project</em>: a story that makes difficult lessons about software organisations feel real rather than theoretical.</p>
    <p>Set inside Fiscari’s race to rebuild a legacy tax product as an AI-native platform, the book asks what happens when AI makes a company faster than its judgement. It is about speed, hidden errors, accountability, and building systems people can actually trust.</p>
    <a className="projectLink" href="https://prometheus.ceremydigital.com/" target="_blank" rel="noreferrer">Visit the book <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
  </>;
}

function Models() {
  return <>
    <p className="eyebrow">MADE IN THREE DIMENSIONS</p>
    <h2>3D<span> Models.</span></h2>
    <p>I have a 3D printer (Bambu Lab P1S) at home and I design things that are useful, playful, or simply satisfying to make. I publish the models free on MakerWorld so anyone can download, customise and print them.</p>
    <div className="modelGallery">
      <a href="https://makerworld.com/en/models/2736743-parametric-stackable-sliding-door-round-organizer" target="_blank" rel="noreferrer"><img src="https://makerworld.bblmw.com/makerworld/model/US31e9940bc1b14b/design/de74294d3faeac65.png" alt="Parametric stackable round organizer" /><span>Stackable organizer</span></a>
      <a href="https://makerworld.com/en/models/2736740-customizable-spotify-photo-frame-instax-compatible" target="_blank" rel="noreferrer"><img src="https://makerworld.bblmw.com/makerworld/model/USd3ed37768e93c7/design/ae8e1e8287c89d45.png" alt="Customizable Spotify photo frame" /><span>Spotify photo frame</span></a>
      <a href="https://makerworld.com/en/models/2802418-customizable-chain-coffee-cup-holder-hand-carrier" target="_blank" rel="noreferrer"><img src="https://makerworld.bblmw.com/makerworld/model/US31991614b1fde0/design/fa92f532d27d84ca.png" alt="Customizable chain coffee cup holder" /><span>Coffee cup carrier</span></a>
    </div>
    <a className="projectLink" href="https://makerworld.com/en/@RapidRender/upload" target="_blank" rel="noreferrer">Explore my models <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
  </>;
}

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours ? `${hours}:` : ""}${String(minutes).padStart(hours ? 2 : 1, "0")}:${String(secs).padStart(2, "0")}`;
};

function PbSparkline({ values }) {
  if (values.length < 2) return <div className="singlePb">ONE GLORIOUS DATA POINT</div>;
  const times = values.map(v => v.seconds), min = Math.min(...times), max = Math.max(...times);
  const points = values.map((v, i) => `${6 + i * 88 / (values.length - 1)},${8 + (v.seconds - min) * 25 / Math.max(1, max - min)}`).join(" ");
  return <svg className="sparkline" viewBox="0 0 100 42" preserveAspectRatio="none" aria-hidden="true"><polyline points={points} /><circle cx="94" cy="8" r="2.5" /></svg>;
}

function Running() {
  const distances = [{ key:"5000", label:"5K" },{ key:"10000", label:"10K" },{ key:"21097", label:"21.1K" },{ key:"42195", label:"42.2K" }];
  const maxYear = Math.max(...runningStats.yearly.map(y => y.km));
  return <>
    <p className="eyebrow">OFF THE CLOCK</p>
    <h2>Running<br /><span>log.</span></h2>
    <p>Running started as a way to clear my head and became a long-running experiment in consistency, pacing and how many Sunday mornings I’m willing to surrender. Here’s what the data says so far.</p>
    <div className="runTotals"><div><strong>{runningStats.summary.km.toLocaleString()}<small> km</small></strong><span>TOTAL DISTANCE</span></div><div><strong>{runningStats.summary.runs}</strong><span>RUNS LOGGED</span></div><div><strong>{runningStats.summary.hours}<small> h</small></strong><span>ON MY FEET</span></div></div>
    <p className="chartTitle">PERSONAL BEST PROGRESSION</p>
    <div className="pbGrid">{distances.map(({key,label}) => { const values=runningStats.progress[key]; const pb=values[values.length-1]; return <div className="pbCard" key={key}><span>{label}</span><strong>{formatTime(pb.seconds)}</strong><small>{new Date(`${pb.date}T00:00:00`).toLocaleDateString("en-GB",{month:"short",year:"numeric"})}</small><PbSparkline values={values} /></div>; })}</div>
    <p className="chartTitle">KILOMETRES BY YEAR</p>
    <div className="yearChart">{runningStats.yearly.map(year => <div className="yearBar" key={year.year}><span>{Math.round(year.km)}</span><i style={{height:`${Math.max(5,year.km/maxYear*100)}%`}} /><small>{year.year}</small></div>)}</div>
    <div className="funStats"><span><strong>{runningStats.summary.marathons}</strong> marathon distances in total</span><span><strong>{runningStats.summary.elevation.toLocaleString()}m</strong> climbed — nearly two Everests</span><span><strong>{runningStats.summary.favouriteDay}</strong> is apparently run day</span><span><strong>{runningStats.summary.averageKm}km</strong> per average outing</span></div>
    <p className="dataNote">Calculated from {runningStats.summary.runs} Strava activities. PBs use rolling distance samples from the original FIT tracks.</p>
    <a className="projectLink" href="https://www.strava.com/athletes/79204665" target="_blank" rel="noreferrer">Follow on Strava <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
  </>;
}

function Contact() {
  return <>
    <p className="eyebrow">SAY HELLO</p>
    <h2>Let’s build something<br /><span>useful.</span></h2>
    <ContactForm />
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
        <div className="topRight"><span>51.5072° N, 0.1276° W</span><div className="topSocial"><a href="https://www.linkedin.com/in/jeremycwchan/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a><a href="https://github.com/jeremychan" target="_blank" rel="noreferrer" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a><a href="https://www.strava.com/athletes/79204665" target="_blank" rel="noreferrer" aria-label="Strava"><FontAwesomeIcon icon={faStrava} /></a></div><button onClick={() => setSound(v => !v)} aria-label="Toggle interface sounds"><FontAwesomeIcon icon={sound ? faVolumeHigh : faVolumeXmark} /></button><button onClick={() => setDark(v => !v)} aria-label="Toggle colour theme"><FontAwesomeIcon icon={dark ? faSun : faMoon} /></button></div>
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
