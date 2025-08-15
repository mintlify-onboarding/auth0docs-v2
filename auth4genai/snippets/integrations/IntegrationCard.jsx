export const IntegrationCard = ({ integration }) => {
  const isComingSoon = integration.status === 'Coming Soon';

  const cardContent = (
    <div className="integration-card">
      <div className="integration-card-header">
        <span className={`integration-card-icon ${isComingSoon ? 'coming-soon' : ''}`}>
          <img
            src={integration.icon}
            alt={`${integration.title} icon`}
            style={{...integration.styles}}
          />
        </span>
        <h3 className={`integration-card-title ${isComingSoon ? 'coming-soon' : ''}`}>
          {integration.title}
        </h3>
      </div>

      <p className={`integration-card-description ${isComingSoon ? 'coming-soon' : ''}`}>
        {integration.description}
      </p>

      <div className="integration-card-footer">
        <span className={`integration-card-type-tag ${isComingSoon ? 'coming-soon' : ''}`}>
          {integration.type}
        </span>

        {isComingSoon && (
          <em className="integration-card-coming-soon">
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