export const IntegrationCard = ({ integration }) => {
  const isComingSoon = integration.status === 'Coming Soon';

  const cardContent = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '175px'
    }}>
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
          <img
            src={integration.icon}
            alt={`${integration.title} icon`}
            style={{
              width: '1em',
              height: '1em',
              verticalAlign: 'middle',
              ...integration.styles
            }}
          />
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
        margin: '0', 
        fontSize: '0.875rem',
        lineHeight: '1.5',
        opacity: isComingSoon ? 0.6 : 1,
        flex: '1'
      }}>
        {integration.description}
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 'auto'
      }}>
        <span style={{
          fontSize: '0.75rem',
          lineheight: '1',
          padding: '0 0.3rem',
          backgroundColor: '#F0F0FC',
          border: '1px solid darkblue',
          borderRadius: '0.7rem',
          fontWeight: '500',
          color: 'darkblue',
          opacity: isComingSoon ? 0.6 : 1
        }}>
          {integration.type}
        </span>

        {isComingSoon && (
          <em style={{ 
            fontSize: '0.875rem',
          }}>
            Coming Soon
          </em>
        )}
      </div>
    </div>
  );

  return (
    <Card
      href={integration.href}
      disabled={isComingSoon}
    >
      {cardContent}
    </Card>
  );
}