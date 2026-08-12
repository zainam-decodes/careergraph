import Link from 'next/link';

interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  title: string;
  description: string;
  action?: EmptyStateAction;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
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
      {icon && (
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          backgroundColor: 'var(--surface-hover)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          marginBottom: '4px',
        }}>
          {icon}
        </div>
      )}
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
      {action && (
        action.href ? (
          <Link
            href={action.href}
            style={{
              marginTop: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '40px',
              padding: '0 20px',
              borderRadius: '7px',
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
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
            }}
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
