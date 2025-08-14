export const IntegrationCard = ({ integration }) => {
  const isComingSoon = integration.status === 'Coming Soon';

  const cardContent = (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.75rem'
      }}>
        <span style={{ 
          fontSize: '1.5rem', 
          marginRight: '0.75rem',
          opacity: isComingSoon ? 0.6 : 1
        }}>
          {/* Icon placeholder - in a real implementation this would use the icon prop */}
          {integration.icon === 'google' && '🔍'}
          {integration.icon === 'microsoft' && '🟦'}
          {integration.icon === 'github' && '🐙'}
          {integration.icon === 'salesforce' && '☁️'}
          {integration.icon === 'slack' && '💬'}
          {integration.icon === 'box' && '📦'}
          {integration.icon === 'linkedin' && '💼'}
          {integration.icon === 'dropbox' && '📁'}
          {integration.icon === 'notion' && '📝'}
          {integration.icon === 'stripe' && '💳'}
          {integration.icon === 'hubspot' && '🧲'}
          {integration.icon === 'video' && '📹'}
        </span>
        <h3 style={{ 
          margin: 0, 
          fontSize: '1.25rem',
          opacity: isComingSoon ? 0.6 : 1
        }}>
          {integration.title}
        </h3>
      </div>

      <p style={{ 
        margin: '0 0 1rem 0', 
        color: 'var(--ifm-color-emphasis-700)',
        fontSize: '0.875rem',
        lineHeight: '1.5',
        opacity: isComingSoon ? 0.6 : 1
      }}>
        {integration.description}
      </p>

      {isComingSoon && (
        <div style={{
          marginTop: 'auto',
          paddingTop: '0.5rem'
        }}>
          <em style={{ 
            color: 'var(--ifm-color-emphasis-500)',
            fontSize: '0.875rem'
          }}>
            Coming Soon
          </em>
        </div>
      )}
    </>
  );

  const cardStyle = {
    padding: '1.5rem',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '8px',
    backgroundColor: 'var(--ifm-background-color)',
    transition: 'all 0.2s ease',
    cursor: isComingSoon ? 'default' : 'pointer',
    opacity: integration.className?.includes('hidden') ? 0.5 : 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textDecoration: 'none',
    color: 'inherit'
  };

  if (isComingSoon) {
    return <div style={cardStyle}>{cardContent}</div>;
  }

  return (
    <a 
      href={integration.href} 
      style={{
        ...cardStyle,
        ':hover': {
          borderColor: 'var(--ifm-color-primary)',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }
      }}
      onMouseEnter={(e) => {
        e.target.style.borderColor = 'var(--ifm-color-primary)';
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.target.style.borderColor = 'var(--ifm-color-emphasis-300)';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      {cardContent}
    </a>
  );
}