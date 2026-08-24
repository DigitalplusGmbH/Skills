interface WebGLSceneProps {
  className?: string;
  fallbackClassName?: string;
}

/**
 * Static gradient background (formerly a live Three.js scene) — the animated
 * canvas caused visible lag wherever it was mounted, so it's been replaced
 * with the same CSS fallback that low-power devices already used.
 */
export default function WebGLScene({ className = '', fallbackClassName = '' }: WebGLSceneProps) {
  return (
    <div className={className}>
      <div className={fallbackClassName} aria-hidden="true" />
    </div>
  );
}
