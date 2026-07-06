const footerLinks = [
  { label: "Contact Us", href: "https://laboffuture.odoo.com/contact" },
  { label: "Newsletter", href: "https://laboffuture.odoo.com/newsletter" },
  { label: "Blogs", href: "https://laboffuture.odoo.com/blog/our-blog-1" },
  { label: "Privacy Policy", href: "https://laboffuture.odoo.com/privacy-policy" },
  { label: "Refund Policy", href: "https://laboffuture.odoo.com/refund-policy" },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-inner">
      <p>&copy; {new Date().getFullYear()} Lab of Future</p>
      <ul className="footer-links">
        {footerLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
