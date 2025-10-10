export const AuthCodeBlock = ({ filename, icon, language, highlight, children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userDomainPlaceholder = /{yourDomain}/g;
  const userClientIdPlaceholder = /{yourClientId}/g;
  const userClientSecretPlaceholder = /{yourClientSecret}/g;
  const userSecretPlaceholder = /{yourSecret}/g;
  const userRedirectUriPlaceholder = /{redirectUri}/g;
  const yourAudiencePlaceholder = /{yourAudience}/g;

  const processedChildren = children
    .replace(userDomainPlaceholder, user?.userdomain || "{yourDomain}")
    .replace(userClientIdPlaceholder, user?.userClientId || "{yourClientId}")
    .replace(userClientSecretPlaceholder, user?.userClientSecret || "{yourClientSecret}")
    .replace(userSecretPlaceholder, user?.userSecret || "{yourSecret}")
    .replace(yourAudiencePlaceholder, user?.yourAudience || "{yourAudience}")
    .replace(userRedirectUriPlaceholder, user?.userRedirectUri || "{redirectUri}");

  useEffect(() => {
    const initUser = async () => {
      try {
        await window.authService.getAuthStatus();
        const user = window.authService.user;
        if (!user) {
          throw new Error("User not found");
        }
        console.log("User fetched:", user);
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to initialize user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initUser();
  }, []);

  return (
    <CodeBlock filename={filename} icon={icon} language={language} lines highlight={highlight}>
      {processedChildren}
    </CodeBlock>
  );
};
