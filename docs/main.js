import "./style.css";

const logo = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-miterlimit="1.5">
  <path fill="var(--text-color)" d="M12 124H4v-8h8v8zm24 0v-8H20v8h16zm24 0v-8H44v8h16zm24 0v-8H68v8h16zm24 0v-8H92v8h16zm16 0h-8v-8h8v8zM4 92v16h8V92H4zm120 0h-8v16h8V92zM4 68v16h8V68H4zm120 0h-8v16h8V68zM4 44v16h8V44H4zm120 0h-8v16h8V44zM4 20v16h8V20H4zm120 0h-8v16h8V20zM12 12H4V4h8v8zm112 0V4h-8v8h8zm-16-8H92v8h16V4zM84 4H68v8h16V4zM60 4H44v8h16V4zM36 4H20v8h16V4z"/>
  <path fill="#ff00ae" d="M4 51.143h72.857V124H4z"/>
  <path d="M76.857 51.143H4V124h72.857V51.143zm-8 8V116H12V59.143h56.857z"/>
  <path d="M107 21L86 42V26v16h16" fill="none" stroke="var(--text-color)" stroke-width="6.000008"/>
  <g>
    <g fill="none" stroke="#fff" stroke-width="6">
      <path d="M42.972 85.496l10.242-10.243 10.243 10.243" stroke-miterlimit="10"/>
      <path d="M30 111.071V96.165s23.214-1.527 23.214-5.124V75.253"/>
    </g>
    <g fill="none" stroke="#fff" stroke-width="6">
      <path d="M19.758 78.485L30 68.243l10.242 10.242" stroke-miterlimit="10"/>
      <path d="M30 88.036V68.243"/>
    </g>
  </g>
</svg>

`

new Docute({
  target: "#app",
  detectSystemDarkTheme: true,
  darkThemeToggler: true,
  highlight: ["javascript", "json"],
  logo:
    `<span class="itty-logo">${logo} <span>Itty Router</span></span>`,
  nav: [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "GitHub",
      link: "https://github.com/kwhitley/itty-router",
    },
  ],
  sidebar: [
    {
      title: "Getting Started",
      link: "/",
    },
  ],
  footer: `© ${new Date().getFullYear()} <a href="https://github.com/kwhitley" target="_blank" rel="noopener noreferrer">
  Kevin Whitley <ExternalLinkIcon /></a>. Released under MIT license.`,
  cssVariables: (theme) => {
    const light = {
      pageBackground: "#fafafa",
      accentColor: '#e4009b',
      inlineCodeBackground: "#dbdbdb",
      inlineCodeColor: "#212121",
    };
    
    const dark = {
      accentColor: '#ff85d8'
    };

    return theme === "default" ? light : dark;
  },
});
