const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': true, viewBox: '0 0 24 24' }

export const IconeBusca = ({ size = 18 }) => (
  <svg width={size} height={size} {...base}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
)
export const IconeCarrinho = ({ size = 18 }) => (
  <svg width={size} height={size} {...base}>
    <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
    <circle cx="10" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" />
  </svg>
)
export const IconeCheck = ({ size = 16 }) => (
  <svg width={size} height={size} {...base} strokeWidth={2.2} stroke="var(--accent)"><path d="m5 12 5 5 9-10" /></svg>
)
export const IconeEscudo = ({ size = 20 }) => (
  <svg width={size} height={size} {...base}><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
)
export const IconeFiltro = ({ size = 16 }) => (
  <svg width={size} height={size} {...base}><path d="M4 6h16M7 12h10M10 18h4" /></svg>
)
