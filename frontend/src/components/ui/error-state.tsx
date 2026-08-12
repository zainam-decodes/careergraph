interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We had trouble loading this information. This is temporary — please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div style={{
      padding: '72px 32px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: '12px',
    }}>
      {/* Warning icon */}
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '10px',
        backgroundColor: 'rgba(224, 159, 62, 0.08)',
        border: '1px solid rgba(224, 159, 62, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--company-color)',
        marginBottom: '4px',
        flexShrink: 0,
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 7v4M9 13.5h.01M7.16 2.76L1.26 12.5A2 2 0 003 15.5h12A2 2 0 0016.74 12.5L10.84 2.76a2 2 0 00-3.68 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <p style={{
        fontSize: '16px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        margin: 0,
        lineHeight: 1.4,
      }}>
        {title}
      </p>
      <p style={{
        fontSize: '14px',
        color: 'var(--text-muted)',
        maxWidth: '360px',
        margin: 0,
        lineHeight: 1.6,
      }}>
        {description}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            height: '40px',
            padding: '0 20px',
            borderRadius: '7px',
            backgroundColor: 'var(--surface-hover)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'border-color 0.15s',
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}
