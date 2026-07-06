import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import Logo from "../../assets/light-logo.svg";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEnquiryModal } from "../../context/EnquiryModalContext";

const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About Us",
    path: "/about",
  },
  {
    label: "School Programs",
    submenu: [
      {
        label: "Labs In School",
        path: "https://laboffuture.odoo.com/lab-verse",
        external: true,
      },
      {
        label: "Dubai Lab Tour",
        path: "https://laboffuture.odoo.com/lab-tours-book-a-lab-tour",
        external: true,
      },
      { label: "Zero Gravity", path: "/school-programs/zero-gravity" },
      {
        label: "Week Without Walls",
        path: "https://laboffuture.odoo.com/week-without-walls",
        external: true,
      },
      {
        label: "ECA",
        path: "https://laboffuture.odoo.com/eca",
        external: true,
      },
      {
        label: "Leadership & Advisory Team",
        path: "https://laboffuture.odoo.com/leadership-advisory-team",
        external: true,
      },
    ],
  },
  {
    label: "Events",
    submenu: [
      { label: "Orbita 26", path: "/events/orbita-26" },
      {
        label: "Asian Space Settlement Design Competition 2026",
        path: "/events/asian-space-settlement-design-competition-2026",
      },
      { label: "Summer Camp 2026", path: "/events/summer-camp-2026" },
      {
        label: "Summer Internship 2026",
        path: "/events/summer-internship-2026",
      },
    ],
  },
  {
    label: "Get Involved",
    submenu: [
      {
        label: "Internship",
        path: "https://laboffuture.odoo.com/internship",
        external: true,
      },
      {
        label: "Jobs",
        path: "https://laboffuture.odoo.com/jobs",
        external: true,
      },
      {
        label: "Become LOF Ambassador",
        path: "https://laboffuture.odoo.com/student-ambassador-program",
        external: true,
      },
      {
        label: "Join the Curiosity Crew",
        path: "https://laboffuture.odoo.com/lof-community",
        external: true,
      },
      {
        label: "Ivy League Colleges",
        path: "https://laboffuture.odoo.com/ivy-league-colleges",
        external: true,
      },
    ],
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const { openEnquiry } = useEnquiryModal();
  const [open, setOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState([]);

  // Scroll behaviour:
  //   - scrolled:  page is NOT at the very top → header background
  //                switches to a dark/blackish glass
  //   - hidden:    user is actively scrolling DOWN → hide the header
  //                Slide it back into view as soon as they scroll UP.
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastYRef.current;
      // Avoid jitter near the top: only consider deltas above a small threshold.
      if (Math.abs(delta) > 4) {
        if (delta > 0 && y > 80) {
          setHidden(true);   // scrolling down past 80px → hide
        } else if (delta < 0) {
          setHidden(false);  // scrolling up → reveal
        }
        lastYRef.current = y;
      }
      setScrolled(y > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleSubmenu = (path) => {
    setOpenSubmenus((current) =>
      current.includes(path)
        ? current.filter((item) => item !== path)
        : [...current, path],
    );
  };

  const closeMenu = () => {
    setOpen(false);
    setOpenSubmenus([]);
  };

  const renderNavItems = (items) =>
    items.map((item) => {
      const itemKey = item.path || item.label;
      const isOpen = openSubmenus.includes(itemKey);

      let labelEl;
      if (item.external) {
        labelEl = (
          <a
            href={item.path}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            {item.label}
          </a>
        );
      } else if (item.path) {
        labelEl = (
          <NavLink
            to={item.path}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            {item.label}
          </NavLink>
        );
      } else {
        labelEl = <span className="nav-label">{item.label}</span>;
      }

      return (
        <li
          key={itemKey}
          className={
            item.submenu ? `has-submenu ${isOpen ? "is-open" : ""}` : ""
          }
        >
          <div className="nav-item-wrapper">
            {labelEl}

            {item.submenu && (
              <button
                className="submenu-toggle"
                type="button"
                aria-haspopup="true"
                aria-label={`Toggle submenu for ${item.label}`}
                aria-expanded={isOpen}
                onClick={() => toggleSubmenu(itemKey)}
              >
                <IoMdArrowDropdown />
              </button>
            )}
          </div>

          {item.submenu && (
            <ul className="submenu">{renderNavItems(item.submenu)}</ul>
          )}
        </li>
      );
    });

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}${
        hidden ? " is-hidden" : ""
      }`}
    >
      <div className="container header-inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <img src={Logo} alt="LOF Logo" />
        </NavLink>
        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
        >
          <FiMenu size={24} />
        </button>
        <nav
          className={`site-nav ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <ul>{renderNavItems(navItems)}</ul>
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="glass-btn glass-btn--light header-btn"
            onClick={() => {
              closeMenu();
              openEnquiry();
            }}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
