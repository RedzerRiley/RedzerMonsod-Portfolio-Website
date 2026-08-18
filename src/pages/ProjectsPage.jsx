import { projects } from "../data/index.js";
import "./ProjectsPage.css";

/* ─────────────────────────────────────────────────────────────
   ProjectsPage
   A sequential list of case studies rather than a grid of cards.
   Each entry: screenshot, title, context, description, the
   highlights that used to go unused, stack, and plain-text links.
───────────────────────────────────────────────────────────── */

function ProjectRow({ project, index }) {
  const image = project.image || project.screenshot || null;
  const stack = project.stack || project.tech || [];
  const liveUrl =
    project.link || project.live || project.url || null;
  const repoUrl =
    project.repo || project.github || null;

  return (
    <article
      className={`project${
        index % 2 === 1 ? " project--reverse" : ""
      }`}
    >
      <div className="project__media">
        {image ? (
          <img
            src={`./images/myscreenshots/${image}`}
            alt={project.title || project.name}
          />
        ) : (
          <div className="project__media--empty">
            {project.title || project.name}
          </div>
        )}
      </div>

      <div className="project__content">
        <div className="project__head">
          <h2 className="project__title">
            {project.title || project.name}
          </h2>

          {project.year && (
            <span className="project__year">
              {project.year}
            </span>
          )}
        </div>

        {project.context && (
          <p className="project__context">
            {project.context}
          </p>
        )}

        {project.description && (
          <p className="project__desc">
            {project.description}
          </p>
        )}

        {project.highlights?.length > 0 && (
          <ul className="project__highlights">
            {project.highlights
              .slice(0, 3)
              .map((h) => (
                <li key={h}>{h}</li>
              ))}
          </ul>
        )}

        {stack.length > 0 && (
          <p className="project__stack">
            {stack.join(" · ")}
          </p>
        )}

        <div className="project__links">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              View live ↗
            </a>
          )}

          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Source ↗
            </a>
          )}

          {!liveUrl && !repoUrl && (
            <span>Links coming soon</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <div className="projects">
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />

      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />

      <header className="projects-head">
        <h1 className="projects-head__title">
          Projects & Contests
        </h1>
      </header>

      <div className="project-list">
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id || i}
            project={project}
            index={i}
          />
        ))}
      </div>

      <p className="projects-more">
        <strong>More in progress.</strong>{" "}
        A few things currently being built
        aren't listed here yet.
      </p>
    </div>
  );
}