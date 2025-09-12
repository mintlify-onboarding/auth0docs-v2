# DownloadQuickstartButton usage example

```
import { DownloadQuickstartButton } from "/snippets/download-quickstart/DownloadQuickstartButton.jsx";

<DownloadQuickstartButton
  category="asynchronous-authorization"
  framework="langchain-fastapi-py"
/>
```

You can *optionally* specify the button label with a `label="Your label here"` prop. If not provided, will default to "Download Sample".

Ensure the `category` and `framework` align with the corresponding quickstart's `release-config.yml` file in the [Auth0 AI Samples repo](https://github.com/auth0-samples/auth0-ai-samples). See that repo's [readme](https://github.com/auth0-samples/auth0-ai-samples/blob/main/README.md) for more details on the quickstart releases and how to configure.