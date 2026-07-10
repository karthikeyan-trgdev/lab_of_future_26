import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiChevronUp, FiMapPin } from "react-icons/fi";
import SEO from "../../components/common/SEO";
import { siteConfig } from "../../data/siteConfig";
import {
  careers,
  programOptions,
  locationOptions,
  disciplineTree,
} from "../../data/careers";
import CareerDetailModal from "./CareerDetailModal";
import CareerApplyModal from "./CareerApplyModal";
import "../../styles/pages/career.css";

const toggle = (arr, value) =>
  arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

const Career = () => {
  const [search, setSearch] = useState("");
  const [programs, setPrograms] = useState([]);
  const [locations, setLocations] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [openSections, setOpenSections] = useState({
    program: true,
    location: true,
    discipline: true,
  });

  const [detailCareer, setDetailCareer] = useState(null);
  const [applyCareer, setApplyCareer] = useState(null);

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleGroup = (group) => {
    const leaves = disciplineTree[group];
    const allSelected = leaves.every((l) => disciplines.includes(l));
    setDisciplines((prev) =>
      allSelected
        ? prev.filter((d) => !leaves.includes(d))
        : [...new Set([...prev, ...leaves])],
    );
  };

  const clearAll = () => {
    setSearch("");
    setPrograms([]);
    setLocations([]);
    setDisciplines([]);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return careers.filter((c) => {
      if (
        q &&
        !c.title.toLowerCase().includes(q) &&
        !c.shortDescription.toLowerCase().includes(q)
      )
        return false;
      if (programs.length && !programs.includes(c.program)) return false;
      if (locations.length && !locations.includes(c.location)) return false;
      if (disciplines.length && !disciplines.includes(c.discipline))
        return false;
      return true;
    });
  }, [search, programs, locations, disciplines]);

  return (
    <div className="career-page">
      <SEO
        title={`Careers | ${siteConfig.title}`}
        description="Find your future at Lab of Future. Explore open roles across education, technology and operations."
        url={`${siteConfig.url}/career`}
        image={siteConfig.socialImage}
      />

      {/* 1 ── Breadcrumb hero — shares the page-level background image
             (set on .career-page) with the career section below. */}
      <section className="career-hero">
        <div className="career-hero-overlay" />
        <div className="container career-hero-inner">
          <nav className="career-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Careers</span>
          </nav>
          <h1 className="career-hero-title">Find Your Future</h1>
          <p className="career-hero-desc">
            Join the team shaping the next generation of innovators. At Lab of
            Future we build curiosity into capability — explore open roles
            across education, technology and operations, and help us launch
            young minds toward the future.
          </p>
        </div>
      </section>

      {/* 2 ── Search ─────────────────────────────────────── */}
      <section className="container career-search-wrap">
        <div className="career-search">
          <FiSearch className="career-search-icon" />
          <input
            type="search"
            placeholder="Search for a role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search for a role"
          />
        </div>
      </section>

      {/* 3 ── Filters + Cards ────────────────────────────── */}
      <section className="container career-body">
        <div className="row gx-4 gy-4">
          {/* Left — filters */}
          <aside className="col-lg-3">
            <div className="career-filters">
              {/* Program */}
              <FilterSection
                title="Program"
                open={openSections.program}
                onToggle={() => toggleSection("program")}
              >
                <CheckRow
                  label="Any"
                  checked={programs.length === 0}
                  onChange={() => setPrograms([])}
                />
                {programOptions.map((p) => (
                  <CheckRow
                    key={p}
                    label={p}
                    checked={programs.includes(p)}
                    onChange={() => setPrograms((prev) => toggle(prev, p))}
                  />
                ))}
              </FilterSection>

              {/* Location */}
              <FilterSection
                title="Location"
                open={openSections.location}
                onToggle={() => toggleSection("location")}
              >
                <CheckRow
                  label="Any"
                  checked={locations.length === 0}
                  onChange={() => setLocations([])}
                />
                {locationOptions.map((l) => (
                  <CheckRow
                    key={l}
                    label={l}
                    checked={locations.includes(l)}
                    onChange={() => setLocations((prev) => toggle(prev, l))}
                  />
                ))}
              </FilterSection>

              {/* Discipline (grouped) */}
              <FilterSection
                title="Discipline"
                open={openSections.discipline}
                onToggle={() => toggleSection("discipline")}
              >
                <CheckRow
                  label="Any"
                  checked={disciplines.length === 0}
                  onChange={() => setDisciplines([])}
                />
                {Object.entries(disciplineTree).map(([group, leaves]) => {
                  const allSelected = leaves.every((l) =>
                    disciplines.includes(l),
                  );
                  return (
                    <div className="career-filter-group" key={group}>
                      <CheckRow
                        label={group}
                        strong
                        checked={allSelected}
                        onChange={() => toggleGroup(group)}
                      />
                      {leaves.map((leaf) => (
                        <CheckRow
                          key={leaf}
                          label={leaf}
                          nested
                          checked={disciplines.includes(leaf)}
                          onChange={() =>
                            setDisciplines((prev) => toggle(prev, leaf))
                          }
                        />
                      ))}
                    </div>
                  );
                })}
              </FilterSection>

              <button
                type="button"
                className="career-clear-all"
                onClick={clearAll}
              >
                Clear All
              </button>
            </div>
          </aside>

          {/* Right — cards */}
          <div className="col-lg-9">
            <p className="career-results-count">
              {filtered.length} {filtered.length === 1 ? "role" : "roles"} found
            </p>

            {filtered.length === 0 ? (
              <div className="career-empty">
                <p>No roles match your filters.</p>
                <button
                  type="button"
                  className="career-btn career-btn--ghost"
                  onClick={clearAll}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="career-card-grid">
                {filtered.map((c) => (
                  <article className="career-card" key={c.id}>
                    <div className="career-card-top">
                      <span className="career-card-tag">{c.discipline}</span>
                      <h3 className="career-card-title">{c.title}</h3>
                      <p className="career-card-desc">{c.shortDescription}</p>
                    </div>
                    <div className="career-card-foot">
                      <p className="career-card-loc">
                        <FiMapPin /> {c.location}
                      </p>
                      <div className="career-card-actions">
                        <button
                          type="button"
                          className="career-btn career-btn--ghost"
                          onClick={() => setDetailCareer(c)}
                        >
                          Read More
                        </button>
                        <button
                          type="button"
                          className="career-btn career-btn--primary"
                          onClick={() => setApplyCareer(c)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      {detailCareer && (
        <CareerDetailModal
          career={detailCareer}
          onClose={() => setDetailCareer(null)}
          onApply={(c) => {
            setDetailCareer(null);
            setApplyCareer(c);
          }}
        />
      )}
      {applyCareer && (
        <CareerApplyModal
          career={applyCareer}
          onClose={() => setApplyCareer(null)}
        />
      )}
    </div>
  );
};

// ---- Small presentational helpers (module-level) --------------------

const FilterSection = ({ title, open, onToggle, children }) => (
  <div className={`career-filter-section ${open ? "is-open" : ""}`}>
    <button
      type="button"
      className="career-filter-head"
      onClick={onToggle}
      aria-expanded={open}
    >
      <span>{title}</span>
      <FiChevronUp className="career-filter-chevron" />
    </button>
    {open && <div className="career-filter-list">{children}</div>}
  </div>
);

const CheckRow = ({ label, checked, onChange, strong, nested }) => (
  <label
    className={`career-check ${strong ? "is-strong" : ""} ${
      nested ? "is-nested" : ""
    }`}
  >
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="career-check-box" />
    <span className="career-check-label">{label}</span>
  </label>
);

export default Career;
