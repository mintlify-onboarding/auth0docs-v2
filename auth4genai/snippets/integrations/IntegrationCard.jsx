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
        margin: '0 0 1rem 0', 
        fontSize: '0.875rem',
        lineHeight: '1.5',
        opacity: isComingSoon ? 0.6 : 1
      }}>
        {integration.description}
      </p>
    </>
  );

  return (
    <Card
      href={integration.href}
      disabled={isComingSoon}
      // icon="js"
      // iconType="solid"
      // horizontal
      // title="JavaScript SDKs"
    >
      {cardContent}
    </Card>
  );
}