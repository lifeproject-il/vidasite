// Small inline SVG icons used across the site (no icon font downloads).
type P = { size?: number; className?: string };

export const BagIcon = ({ size = 20, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 7h14l-1 13H6L5 7z" />
    <path d="M9 7V6a3 3 0 0 1 6 0v1" />
  </svg>
);

export const UserIcon = ({ size = 20, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="4.5" />
    <path d="M3.5 21c.8-4.2 4.2-6.5 8.5-6.5s7.7 2.3 8.5 6.5z" />
  </svg>
);

export const MailIcon = ({ size = 18, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
    <path d="M3 6l9 7 9-7" />
  </svg>
);

export const MenuIcon = ({ size = 28, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
    <path d="M2 5h20M2 12h20M2 19h20" />
  </svg>
);

export const CloseIcon = ({ size = 24, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export const ChevronIcon = ({ size = 14, className, dir = "left" }: P & { dir?: "left" | "right" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === "left" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
  </svg>
);

export const ClockIcon = ({ size = 16, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 359.286 359.286" fill="currentColor" aria-hidden="true">
    <path d="m179.643 359.286c99.043 0 179.643-80.6 179.643-179.643s-80.599-179.643-179.643-179.643-179.643 80.6-179.643 179.643 80.6 179.643 179.643 179.643zm0-335.334c85.869 0 155.691 69.821 155.691 155.691s-69.821 155.691-155.691 155.691-155.691-69.821-155.691-155.691 69.822-155.691 155.691-155.691z" />
    <path d="m232.039 236.89c2.216 1.796 4.85 2.635 7.485 2.635 3.533 0 7.006-1.557 9.341-4.491 4.132-5.15 3.293-12.695-1.856-16.827l-55.39-44.312v-90.061c0-6.587-5.389-11.976-11.976-11.976s-11.976 5.389-11.976 11.976v95.81c0 3.653 1.677 7.066 4.491 9.341z" />
  </svg>
);

export const LevelIcon = ({ size = 16, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="m18 10h-4a2 2 0 0 0 -2 2v15a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-15a2 2 0 0 0 -2-2zm-4 17v-15h4v15zm14-24h-4a2 2 0 0 0 -2 2v22a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-22a2 2 0 0 0 -2-2zm-4 24v-22h4v22zm-16-10h-4a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8a2 2 0 0 0 -2-2zm-4 10v-8h4v8z" />
  </svg>
);

export const PotIcon = ({ size = 16, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
    <path d="M2 10h2M20 10h2M9 6c0-1 1-1 1-2M14 6c0-1 1-1 1-2" />
  </svg>
);

export const PlayIcon = ({ size = 24, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const HeartIcon = ({ size = 12, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 5.3 3 1.7-1.8 3.2-3 5.3-3 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" />
  </svg>
);

export const CommentIcon = ({ size = 12, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 3C6.5 3 2 6.6 2 11c0 2.4 1.3 4.5 3.4 6L4 21l4.6-2.4c1 .3 2.2.4 3.4.4 5.5 0 10-3.6 10-8s-4.5-8-10-8z" />
  </svg>
);

export const InstagramIcon = ({ size = 14, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = ({ size = 14, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14 8V6.5c0-.8.4-1.5 1.6-1.5H17V2h-2.6C11.6 2 10.5 3.7 10.5 6.2V8H8v3h2.5v11H14V11h2.6l.4-3z" />
  </svg>
);

export const WhatsAppIcon = ({ size = 26, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3z" />
  </svg>
);

export const PlusIcon = ({ size = 16, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
    <path d="M12 4v16M4 12h16" />
  </svg>
);

export const MinusIcon = ({ size = 16, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
    <path d="M4 12h16" />
  </svg>
);
