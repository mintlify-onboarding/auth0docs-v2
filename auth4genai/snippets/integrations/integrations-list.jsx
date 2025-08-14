export const integrations = [
    // Available
    {
      id: "google",
      title: "Google",
      icon: "../../img/integrations/google-avatar.png",
      iconType: "solid",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Personal Google accounts with comprehensive API access for Gmail, Drive, Calendar, and more.",
    },
    {
      id: "microsoft",
      title: "Microsoft",
      icon: "../../img/integrations/microsoft-avatar.png",
      iconType: "solid",
      href: "/integrations/microsoft",
      status: "Available",
      type: "Enterprise",
      description:
        "Microsoft 365 and Azure AD integration for enterprise-grade authentication and Office apps.",
    },
    {
      id: "github",
      title: "GitHub",
      icon: "../../img/integrations/github-avatar.png",
      iconType: "solid",
      href: "/integrations/github",
      status: "Available",
      type: "Other",
      description:
        "Developer platform connection with access to repositories, issues, and code management.",
      styles: {
        filter: "var(--github-logo-filter, none)",
      }
    },
    {
      id: "salesforce",
      title: "Salesforce",
      icon: "../../img/integrations/salesforce-avatar.png",
      iconType: "solid",
      href: "/integrations/salesforce",
      status: "Available",
      type: "Enterprise",
      description:
        "CRM platform integration for accessing customer data, opportunities, and sales workflows.",
    },
    {
      id: "slack",
      title: "Slack",
      icon: "../../img/integrations/slack-avatar.png",
      iconType: "solid",
      href: "/integrations/slack",
      status: "Available",
      type: "Enterprise",
      description:
        "Team communication platform for channel management, messaging, and workspace integration.",
    },
    {
      id: "box",
      title: "Box",
      icon: "../../img/integrations/box-avatar.png",
      iconType: "solid",
      href: "/integrations/box",
      status: "Available",
      type: "Enterprise",
      description:
        "Cloud storage and collaboration platform for file management and document sharing.",
    }
  ];