export const AuthCodeGroup = ({ children, dropdown }) => {
  const [user, setUser] = useState(null);

  const userDomainPlaceholder = /{yourDomain}/g;
  const userClientIdPlaceholder = /{yourClientId}/g;
  const userClientSecretPlaceholder = /{yourClientSecret}/g;
  const userSecretPlaceholder = /{yourSecret}/g;
  const userRedirectUriPlaceholder = /{redirectUri}/g;
  const yourAudiencePlaceholder = /{yourAudience}/g;

  const processChildren = (node) => {
    if (typeof node === "string") {
      return node
        .replace(userDomainPlaceholder, user?.userdomain || "{yourDomain}")
        .replace(userClientIdPlaceholder, user?.userClientId || "{yourClientId}")
        .replace(userClientSecretPlaceholder, user?.userClientSecret || "{yourClientSecret}")
        .replace(userSecretPlaceholder, user?.userSecret || "{yourSecret}")
        .replace(yourAudiencePlaceholder, user?.yourAudience || "{yourAudience}")
        .replace(userRedirectUriPlaceholder, user?.userRedirectUri || "{redirectUri}");
    } else if (Array.isArray(node)) {
      return node.map(processChildren);
    } else if (node && node.props && node.props.children) {
      return {
        ...node,
        props: {
          ...node.props,
          children: processChildren(node.props.children),
        },
      };
    }
    return node;
  };

  return <CodeGroup dropdown={dropdown}>{processChildren(children)}</CodeGroup>;
};
