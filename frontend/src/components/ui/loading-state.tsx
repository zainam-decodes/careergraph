'use client';

interface LoadingStateProps {
  message?: string;
  variant?: 'spinner' | 'skeleton-list' | 'skeleton-cards';
}

function SkeletonLine({ width = '100%', height = '14px' }: { width?: string; height?: string }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius: '4px' }}
    />
  );
}

function SkeletonListItem() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '20px',
      padding: '20px 28px',
      borderBottom: '1px solid var(--border-color)',
    }}>
      {/* Badge */}
      <div className="skeleton" style={{ width: '52px', height: '22px', borderRadius: '4px', flexShrink: 0, marginTop: '2px' }} />
      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SkeletonLine width="45%" height="16px" />
        <SkeletonLine width="25%" height="12px" />
        <SkeletonLine width="70%" height="12px" />
      </div>
      {/* Action */}
      <div className="skeleton" style={{ width: '80px', height: '36px', borderRadius: '6px', flexShrink: 0 }} />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{
      backgroundColor: 'var(--surface-color)',
      border: '1px solid var(--border-color)',
      borderRadius: '10px',
      padding: '28px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonLine width="55%" height="18px" />
          <SkeletonLine width="30%" height="13px" />
        </div>
        <div className="skeleton" style={{ width: '80px', height: '28px', borderRadius: '6px', flexShrink: 0 }} />
      </div>
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SkeletonLine width="35%" height="11px" />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[80, 70, 60, 90].map((w, i) => (
            <div key={i} className="skeleton" style={{ width: `${w}px`, height: '26px', borderRadius: '4px' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LoadingState({ message, variant = 'spinner' }: LoadingStateProps) {
  if (variant === 'skeleton-list') {
    return (
      <div>
        {message && (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', padding: '16px 28px', borderBottom: '1px solid var(--border-color)' }}>
            {message}
          </p>
        )}
        {[1, 2, 3, 4, 5].map(i => <SkeletonListItem key={i} />)}
      </div>
    );
  }

  if (variant === 'skeleton-cards') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {message && (
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', textAlign: 'center', padding: '8px 0' }}>
            {message}
          </p>
        )}
        {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
      </div>
    );
  }

  // Default: spinner
  return (
    <div style={{
      padding: '64px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      textAlign: 'center',
    }}>
      <div style={{
        width: '28px',
        height: '28px',
        border: '2px solid var(--border-color)',
        borderTopColor: 'var(--accent-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        flexShrink: 0,
      }} />
      {message && (
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
          {message}
        </p>
      )}
    </div>
  );
}
