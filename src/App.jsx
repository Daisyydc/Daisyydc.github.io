import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { portfolioData as data } from "./data";

gsap.registerPlugin(useGSAP);

const colors = {
  pink: "#ffd6e7",
  yellow: "#fef08a",
  mint: "#ccf3e1",
  purple: "#e9d5ff",
};

function AnimatedBadge({
  children,
  color = "yellow",
  rotation = 0,
  className = "",
  href,
  onClick,
  ariaLabel,
  type = "button",
}) {
  const badgeRef = useRef(null);
  const { contextSafe } = useGSAP(() => {}, { scope: badgeRef });

  const hoverIn = contextSafe(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(badgeRef.current, {
      scale: 1.06,
      rotation: rotation + 2,
      boxShadow: "3px 3px 0 #18181b",
      duration: 0.45,
      ease: "elastic.out(1, 0.48)",
      overwrite: "auto",
    });
  });

  const hoverOut = contextSafe(() => {
    gsap.to(badgeRef.current, {
      scale: 1,
      rotation,
      boxShadow: "0 0 0 #18181b",
      duration: 0.3,
      ease: "back.out(2)",
      overwrite: "auto",
    });
  });

  const press = contextSafe(() => {
    gsap.fromTo(
      badgeRef.current,
      { scale: 0.96, x: 2, y: 2 },
      {
        scale: 1.06,
        x: 0,
        y: 0,
        duration: 0.32,
        ease: "back.out(3)",
        overwrite: "auto",
      },
    );
  });

  const commonProps = {
    ref: badgeRef,
    className: `hand-badge ${className}`,
    style: { backgroundColor: colors[color], transform: `rotate(${rotation}deg)` },
    onPointerEnter: hoverIn,
    onPointerLeave: hoverOut,
    onPointerDown: press,
    onFocus: hoverIn,
    onBlur: hoverOut,
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <a {...commonProps} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button {...commonProps} type={type} onClick={onClick}>
        {children}
      </button>
    );
  }

  return <span {...commonProps}>{children}</span>;
}

function Sunflower({ characterRef, leftLegRef, rightLegRef, leftArmRef, rightArmRef, sparkRef }) {
  return (
    <div ref={characterRef} className="sunflower-wrap" aria-hidden="true">
      <span ref={sparkRef} className="arrival-spark">✦</span>
      <svg viewBox="0 0 132 178" role="presentation">
        <g className="petals" fill="#f8c84e" stroke="#18181b" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M66 39C55 23 57 8 66 5c9 4 11 19 0 34Z" />
          <path d="M78 42c2-20 13-30 22-27 6 8-1 21-22 27Z" />
          <path d="M87 50c12-16 28-19 34-11 1 10-12 19-34 11Z" />
          <path d="M90 62c19-7 33-1 33 9-5 9-21 8-33-9Z" />
          <path d="M85 74c20 1 30 12 25 21-9 5-22-4-25-21Z" />
          <path d="M75 81c15 13 16 29 7 33-10 0-16-14-7-33Z" />
          <path d="M61 82c7 18 1 33-9 32-8-5-6-21 9-32Z" />
          <path d="M49 76c-2 20-14 30-22 25-5-8 3-21 22-25Z" />
          <path d="M43 66c-14 14-30 15-34 6 0-10 14-17 34-6Z" />
          <path d="M44 53c-20-2-29-14-23-22 9-4 21 5 23 22Z" />
          <path d="M53 44C38 31 38 15 47 12c10 1 15 15 6 32Z" />
        </g>
        <g className="flower-face">
          <circle cx="66" cy="61" r="27" fill="#8b5a2b" stroke="#18181b" strokeWidth="2.8" />
          <circle cx="56" cy="56" r="2.8" fill="#18181b" />
          <circle cx="76" cy="56" r="2.8" fill="#18181b" />
          <path d="M55 67c7 8 16 8 23 0" fill="none" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M46 50c4-4 8-5 12-3M74 47c4-2 8-1 12 3" fill="none" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
          <path d="M47 63c-4 0-5 5-1 6M85 63c4 0 5 5 1 6" fill="none" stroke="#f6a6b8" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g className="body" stroke="#18181b" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M60 88c-5 16-5 35-1 48h15c4-13 4-31-2-48Z" fill="#65b96e" />
          <path d="M58 108c-14-3-21 7-22 18 11 2 20-3 22-18Z" fill="#82c978" />
          <path d="M75 111c13-5 21 4 23 15-11 3-20-2-23-15Z" fill="#82c978" />
        </g>
        <g ref={leftArmRef} className="left-arm" stroke="#18181b" strokeWidth="3" strokeLinecap="round">
          <path d="M59 101c-12 5-18 13-21 21" />
          <path d="M37 122l-5-3m5 3-1 6" />
        </g>
        <g ref={rightArmRef} className="right-arm" stroke="#18181b" strokeWidth="3" strokeLinecap="round">
          <path d="M74 101c11 5 17 13 20 21" />
          <path d="M95 122l5-3m-5 3 1 6" />
        </g>
        <g ref={leftLegRef} className="left-leg" stroke="#18181b" strokeWidth="3.2" strokeLinecap="round">
          <path d="M62 135c0 12-3 22-8 31" />
          <path d="M54 166c-6 0-9 2-12 6" />
        </g>
        <g ref={rightLegRef} className="right-leg" stroke="#18181b" strokeWidth="3.2" strokeLinecap="round">
          <path d="M71 135c1 12 4 22 9 31" />
          <path d="M80 166c6 0 9 2 12 6" />
        </g>
      </svg>
    </div>
  );
}

function ProjectJourney() {
  const sectionRef = useRef(null);
  const journeyRef = useRef(null);
  const characterRef = useRef(null);
  const leftLegRef = useRef(null);
  const rightLegRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const sparkRef = useRef(null);
  const cardRefs = useRef({});
  const detailRefs = useRef({});
  const navigationTlRef = useRef(null);
  const walkCycleRef = useRef(null);
  const idleRef = useRef(null);
  const activeProjectRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  const stopCharacterMotion = () => {
    navigationTlRef.current?.kill();
    walkCycleRef.current?.kill();
    gsap.killTweensOf([
      characterRef.current,
      leftLegRef.current,
      rightLegRef.current,
      leftArmRef.current,
      rightArmRef.current,
      sparkRef.current,
    ]);
    gsap.set([leftLegRef.current, rightLegRef.current, leftArmRef.current, rightArmRef.current], {
      rotation: 0,
    });
  };

  const startIdle = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    idleRef.current?.kill();
    idleRef.current = gsap.to(characterRef.current, {
      yPercent: -2.5,
      rotation: 1.4,
      duration: 1.35,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  };

  useGSAP(() => {
    gsap.set(sparkRef.current, { autoAlpha: 0, scale: 0, rotation: -20 });
    startIdle();

    const handleResize = () => {
      window.clearTimeout(handleResize.timer);
      handleResize.timer = window.setTimeout(() => {
        if (!activeProjectRef.current) return;
        const card = cardRefs.current[activeProjectRef.current];
        const journey = journeyRef.current;
        if (!card || !journey) return;
        const header = card.querySelector(".project-trigger");
        const journeyRect = journey.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();
        const charHeight = characterRef.current.getBoundingClientRect().height;
        const nextY = headerRect.top - journeyRect.top + headerRect.height / 2 - charHeight / 2;
        gsap.set(characterRef.current, { y: Math.max(0, nextY), yPercent: 0 });
      }, 120);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(handleResize.timer);
      navigationTlRef.current?.kill();
      walkCycleRef.current?.kill();
      idleRef.current?.kill();
    };
  }, { scope: sectionRef });

  const { contextSafe } = useGSAP(() => {}, { scope: sectionRef });

  const openProject = contextSafe((projectId) => {
    const targetCard = cardRefs.current[projectId];
    const journey = journeyRef.current;
    if (!targetCard || !journey) return;

    stopCharacterMotion();
    idleRef.current?.kill();

    const targetIndex = data.projects.findIndex((project) => project.id === projectId);
    const journeyRect = journey.getBoundingClientRect();
    const targetHeader = targetCard.querySelector(".project-trigger");
    const targetHeaderRect = targetHeader.getBoundingClientRect();
    const charHeight = characterRef.current.getBoundingClientRect().height;

    const collapsingHeight = data.projects.slice(0, targetIndex).reduce((total, project) => {
      const detail = detailRefs.current[project.id];
      return total + (detail ? detail.getBoundingClientRect().height : 0);
    }, 0);

    const rawY =
      targetHeaderRect.top -
      journeyRect.top -
      collapsingHeight +
      targetHeaderRect.height / 2 -
      charHeight / 2;
    const maxY = Math.max(0, journeyRect.height - charHeight);
    const targetY = gsap.utils.clamp(0, maxY, rawY);
    const currentY = Number(gsap.getProperty(characterRef.current, "y")) || 0;
    const distance = Math.abs(targetY - currentY);
    const duration = gsap.utils.clamp(0.5, 0.9, 0.5 + distance / 650);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    activeProjectRef.current = projectId;
    setActiveProject(projectId);

    const allDetails = data.projects.map((project) => detailRefs.current[project.id]).filter(Boolean);
    const targetDetail = detailRefs.current[projectId];
    const otherDetails = allDetails.filter((detail) => detail !== targetDetail);

    gsap.set(targetDetail, { height: 0, autoAlpha: 0, overflow: "hidden" });

    if (reduceMotion) {
      gsap.set(characterRef.current, { y: targetY, yPercent: 0, rotation: 0 });
      gsap.set(otherDetails, { height: 0, autoAlpha: 0 });
      gsap.to(targetDetail, {
        height: "auto",
        autoAlpha: 1,
        duration: 0.2,
        ease: "power1.out",
        onComplete: () => gsap.set(targetDetail, { overflow: "visible" }),
      });
      return;
    }

    walkCycleRef.current = gsap.timeline({ repeat: -1 })
      .to(leftLegRef.current, { rotation: 24, transformOrigin: "top center", duration: 0.15, ease: "sine.inOut" }, 0)
      .to(rightLegRef.current, { rotation: -24, transformOrigin: "top center", duration: 0.15, ease: "sine.inOut" }, 0)
      .to(leftArmRef.current, { rotation: -15, transformOrigin: "top center", duration: 0.15, ease: "sine.inOut" }, 0)
      .to(rightArmRef.current, { rotation: 15, transformOrigin: "top center", duration: 0.15, ease: "sine.inOut" }, 0)
      .to(leftLegRef.current, { rotation: -24, duration: 0.15, ease: "sine.inOut" })
      .to(rightLegRef.current, { rotation: 24, duration: 0.15, ease: "sine.inOut" }, "<")
      .to(leftArmRef.current, { rotation: 15, duration: 0.15, ease: "sine.inOut" }, "<")
      .to(rightArmRef.current, { rotation: -15, duration: 0.15, ease: "sine.inOut" }, "<");

    navigationTlRef.current = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: startIdle,
    });

    navigationTlRef.current
      .addLabel("walk")
      .to(otherDetails, { height: 0, autoAlpha: 0, duration: 0.28, ease: "power2.inOut" }, "walk")
      .to(characterRef.current, { y: targetY, yPercent: 0, rotation: 0, duration, ease: "power2.inOut" }, "walk")
      .to(characterRef.current, {
        keyframes: [
          { y: targetY - 9, rotation: -3, duration: 0.12 },
          { y: targetY, rotation: 0, duration: 0.2, ease: "bounce.out" },
        ],
        onStart: () => {
          walkCycleRef.current?.kill();
          gsap.to([leftLegRef.current, rightLegRef.current, leftArmRef.current, rightArmRef.current], {
            rotation: 0,
            duration: 0.12,
          });
        },
      })
      .fromTo(
        sparkRef.current,
        { autoAlpha: 0, scale: 0, rotation: -20, y: 8 },
        { autoAlpha: 1, scale: 1.25, rotation: 10, y: -2, duration: 0.3, ease: "back.out(3)" },
        "<-0.08",
      )
      .to(sparkRef.current, { autoAlpha: 0, scale: 0.5, y: -15, duration: 0.25 }, ">-0.05")
      .to(
        targetDetail,
        {
          height: "auto",
          autoAlpha: 1,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => gsap.set(targetDetail, { overflow: "visible" }),
        },
        "<",
      );
  });

  const closeProject = contextSafe((projectId) => {
    stopCharacterMotion();
    idleRef.current?.kill();
    const detail = detailRefs.current[projectId];
    gsap.to(detail, {
      height: 0,
      autoAlpha: 0,
      overflow: "hidden",
      duration: 0.35,
      ease: "power2.inOut",
      onComplete: () => {
        activeProjectRef.current = null;
        setActiveProject(null);
        startIdle();
      },
    });
  });

  return (
    <section ref={sectionRef} id="projects" className="section-block projects-section" aria-labelledby="projects-title">
      <div className="section-heading">
        <p className="section-kicker">Things I have brought to life</p>
        <h2 id="projects-title">Selected projects</h2>
        <p>Pick a project. My tiny guide will walk you there.</p>
      </div>

      <div ref={journeyRef} className="project-journey">
        <div className="journey-rail" aria-hidden="true">
          <svg className="dashed-road" viewBox="0 0 100 1000" preserveAspectRatio="none">
            <path d="M52 0 C28 110, 75 190, 48 300 S75 490, 45 620 S72 820, 50 1000" />
          </svg>
          <Sunflower
            characterRef={characterRef}
            leftLegRef={leftLegRef}
            rightLegRef={rightLegRef}
            leftArmRef={leftArmRef}
            rightArmRef={rightArmRef}
            sparkRef={sparkRef}
          />
        </div>

        <div className="project-list">
          {data.projects.map((project) => {
            const isActive = activeProject === project.id;
            return (
              <article
                key={project.id}
                ref={(node) => { cardRefs.current[project.id] = node; }}
                className={`project-card ${isActive ? "is-active" : ""}`}
                style={{ "--project-color": colors[project.color], "--project-rotation": `${project.rotation}deg` }}
              >
                <button
                  type="button"
                  className="project-trigger"
                  onClick={() => openProject(project.id)}
                  aria-expanded={isActive}
                  aria-controls={`${project.id}-details`}
                >
                  <span className="project-index">{project.tag}</span>
                  <span className="project-title-row">
                    <span>
                      <strong>{project.title}</strong>
                      <small>{project.summary}</small>
                    </span>
                    <span className="view-pill">View details</span>
                  </span>
                </button>

                <div
                  id={`${project.id}-details`}
                  ref={(node) => { detailRefs.current[project.id] = node; }}
                  className="project-details"
                  aria-hidden={!isActive}
                >
                  <div className="project-details-inner">
                    <div className="note-tape" aria-hidden="true" />
                    {project.demoVideo && (
                      <div className="demo-video-block">
                        <span className="detail-label">Demo recording</span>
                        <video
                          className="demo-video"
                          controls
                          playsInline
                          preload="metadata"
                          src={project.demoVideo}
                          aria-label={`${project.title} demo recording`}
                        >
                          Your browser does not support HTML video.
                        </video>
                      </div>
                    )}
                    <div className="detail-block">
                      <span className="detail-label">Background</span>
                      <p>{project.background}</p>
                    </div>
                    <div className="detail-block">
                      <span className="detail-label">Toolkit</span>
                      <div className="mini-badges">
                        {project.stack.map((item, index) => (
                          <span key={item} style={{ transform: `rotate(${index % 2 ? 1.4 : -1.4}deg)` }}>{item}</span>
                        ))}
                      </div>
                    </div>
                    <div className="detail-block">
                      <span className="detail-label">Core highlights</span>
                      <ul>
                        {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                      </ul>
                    </div>
                    <div className="detail-actions">
                      {(project.liveUrl || project.github) && (
                        <div className="project-links">
                          {project.liveUrl && (
                            <AnimatedBadge href={project.liveUrl} color="yellow" rotation={1} ariaLabel={`Open the live demo for ${project.title}`}>
                              Live Demo
                            </AnimatedBadge>
                          )}
                          {project.github && (
                            <AnimatedBadge href={project.github} color="mint" rotation={-1} ariaLabel={`Open ${project.title} on GitHub`}>
                              View on GitHub
                            </AnimatedBadge>
                          )}
                        </div>
                      )}
                      <button type="button" className="close-note" onClick={() => closeProject(project.id)}>
                        Close note
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function App() {
  const appRef = useRef(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    gsap.from(".hero-copy > *", {
      y: 24,
      autoAlpha: 0,
      duration: 0.75,
      stagger: 0.08,
      ease: "power3.out",
    });
    gsap.from(".hero-doodle", {
      scale: 0.7,
      rotation: -8,
      autoAlpha: 0,
      duration: 0.9,
      ease: "back.out(1.8)",
    });
  }, { scope: appRef });

  return (
    <div ref={appRef} className="site-shell">
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Back to top">{data.monogram}</a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="top" className="hero section-block" aria-labelledby="hero-title">
          <div className="hero-copy">
            <AnimatedBadge color="mint" rotation={-2} className="status-badge">
              <span className="status-dot" aria-hidden="true" /> {data.status}
            </AnimatedBadge>
            <p className="eyebrow">{data.eyebrow}</p>
            <h1 id="hero-title">
              Hi, I’m <span>{data.name}</span>
              <em>({data.nickname})</em>
            </h1>
            <p className="hero-intro">{data.intro}</p>
            <div className="hero-actions">
              <AnimatedBadge href="#projects" color="yellow" rotation={2}>See my projects</AnimatedBadge>
              <a className="text-link" href="#contact">Let’s connect</a>
            </div>
          </div>

          <div className="hero-doodle" aria-hidden="true">
            <div className="doodle-orbit orbit-one">AI</div>
            <div className="doodle-orbit orbit-two">DATA</div>
            <div className="doodle-orbit orbit-three">IDEAS</div>
            <svg viewBox="0 0 360 360">
              <path className="doodle-line" d="M67 221c-42-75 8-168 93-181 94-15 168 72 139 161-23 71-102 116-171 81-37-19-57-58-46-96 11-37 49-61 85-51 32 9 49 43 37 72-10 25-39 38-62 26-19-10-25-34-13-51" />
              <circle cx="178" cy="185" r="24" fill="#ffd6e7" stroke="#18181b" strokeWidth="3" />
              <path d="M167 185h22M178 174v22" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="doodle-caption">Making the complicated feel lighter.</span>
          </div>
        </section>

        <section id="about" className="section-block about-section" aria-labelledby="about-title">
          <div className="section-heading compact-heading">
            <p className="section-kicker">A small toolkit, used with curiosity</p>
            <h2 id="about-title">What I work with</h2>
          </div>
          <div className="skills-cloud">
            {data.skills.map((skill) => (
              <AnimatedBadge key={skill.label} color={skill.color} rotation={skill.rotation}>
                {skill.label}
              </AnimatedBadge>
            ))}
          </div>
          <div className="about-note">
            <span aria-hidden="true">✷</span>
            <p>I like the space where analysis, useful AI, and product thinking overlap.</p>
          </div>
        </section>

        <section id="experience" className="section-block experience-section" aria-labelledby="experience-title">
          <div className="section-heading">
            <p className="section-kicker">From classrooms to shipping operations</p>
            <h2 id="experience-title">Work Experience</h2>
          </div>
          <div className="experience-grid">
            {data.experience.map((item, index) => (
              <article
                key={`${item.role}-${item.company}`}
                className="experience-card"
                style={{ backgroundColor: colors[item.color], "--experience-rotation": `${item.rotation}deg` }}
              >
                <span className="experience-doodle" aria-hidden="true">{["✦", "✷", "✿"][index]}</span>
                <div className="experience-card-top">
                  <div className="experience-role">
                    <h3>{item.role}</h3>
                    <p className="experience-company">@ {item.company}</p>
                  </div>
                  <p className="experience-period">{item.period}</p>
                </div>
                <p className="experience-description">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <ProjectJourney />

        <section id="contact" className="section-block contact-section" aria-labelledby="contact-title">
          <div className="contact-copy">
            <p className="section-kicker">The next good idea can start with hello</p>
            <h2 id="contact-title">Let’s make something useful — and delightful.</h2>
            <p>I’m open to opportunities in data, applied AI, and digital product work.</p>
          </div>
          <div className="contact-stickers">
            {data.contacts.map((contact) => (
              <AnimatedBadge
                key={contact.label}
                href={contact.href}
                color={contact.color}
                rotation={contact.rotation}
                className="contact-badge"
                ariaLabel={`${contact.label}: ${contact.value}`}
              >
                <span>{contact.label}</span>
                <small>{contact.value}</small>
              </AnimatedBadge>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>Designed with curiosity, built with React + GSAP.</p>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  );
}

export default App;
