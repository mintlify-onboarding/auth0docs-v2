export const integrationTypes = ['Social', 'Enterprise'];

export const integrations = [
    {
      id: "gmail",
      title: "Gmail",
      icon: "/ai/docs/img/integrations/gmail-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Allow your AI Agents to search, create, and send Gmail emails.",
    },
    {
      id: "google-calendar",
      title: "Google Calendar",
      icon: "/ai/docs/img/integrations/google-calendar-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Allow your AI Agents to search, schedule, and update events in Google Calendar.",
    },
     {
      id: "google-drive",
      title: "Google Drive",
      icon: "/ai/docs/img/integrations/google-drive-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Allow your AI Agents to search, create, and modify files in Google Drive.",
    },
     {
      id: "google-sheets",
      title: "Google Sheets",
      icon: "/ai/docs/img/integrations/google-sheets-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Allow your AI Agents to search, create, and modify spreadsheets in Google Sheets.",
    },
     {
      id: "google-slides",
      title: "Google Slides",
      icon: "/ai/docs/img/integrations/google-slides-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Allow your AI Agents to search, create, and modify slides in Google Slides.",
    },
     {
      id: "google-contacts",
      title: "Google Contacts",
      icon: "/ai/docs/img/integrations/google-contacts-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Allow your AI Agents to search, create, and modify contacts in Google Contacts.",
    },
     {
      id: "google-tasks",
      title: "Google Tasks",
      icon: "/ai/docs/img/integrations/google-tasks-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Allow your AI Agents to search, create, and modify tasks in Google Tasks.",
    },
     {
      id: "youtube",
      title: "Youtube",
      icon: "/ai/docs/img/integrations/youtube-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Allow your AI Agents to search, create, and manage YouTube videos.",
    },
    {
      id: "microsoft",
      title: "Microsoft",
      icon: "/ai/docs/img/integrations/microsoft-avatar.png",
      href: "/integrations/microsoft",
      status: "Available",
      type: "Social",
      description:
        "Connect to your users via their Microsoft Account.",
    },
    {
      id: "github",
      title: "GitHub",
      icon: "/ai/docs/img/integrations/github-avatar.png",
      href: "/integrations/github",
      status: "Available",
      type: "Social",
      description:
        "Allow your AI Agents to create and manage GitHub issues and pull requests.",
      styles: {
        filter: "var(--github-logo-filter, none)",
      }
    },
    {
      id: "slack",
      title: "Slack",
      icon: "/ai/docs/img/integrations/slack-avatar.png",
      href: "/integrations/slack",
      status: "Available",
      type: "Social",
      description:
        "Allow your AI Agents to send and receive Slack messages.",
    },
    {
      id: "box",
      title: "Box",
      icon: "/ai/docs/img/integrations/box-avatar.png",
      href: "/integrations/box",
      status: "Available",
      type: "Social",
      description:
        "Allow your AI Agents to search, create, and modify files in Box.",
    },
    {
      id: "custom",
      title: "Custom OAuth2",
      icon: "/ai/docs/img/integrations/oauth2-avatar.png",
      href: "/integrations/oauth2",
      status: "Available",
      type: "Social",
      description:
        "Allow your AI Agent to connect with any OAuth2 compliant identity provider or service.",
    },
        {
      id: "oidc",
      title: "OpenID Connect",
      icon: "/ai/docs/img/integrations/oidc-avatar.png",
      href: "/integrations/oidc",
      status: "Available",
      type: "Enterprise",
      description:
        "Allow your AI Agent to connect with any OpenID Connect (OIDC) compliant identity provider.",
    },
  ];