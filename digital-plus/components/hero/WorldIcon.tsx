import type { WorldKey } from '@/lib/content';

const PATHS: Record<WorldKey, React.ReactNode> = {
  leads: (
    <>
      <path d="M4 16l5-5 4 4 7-8" />
      <path d="M15 6h5v5" />
    </>
  ),
  creative: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.5 5.5l2 2M16.5 16.5l2 2M5.5 18.5l2-2M16.5 7.5l2-2" />
    </>
  ),
  it: <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" />,
};

export default function WorldIcon({ world }: { world: WorldKey }) {
  return (
    <svg
      className="world-orb-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[world]}
    </svg>
  );
}
