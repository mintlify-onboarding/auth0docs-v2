# DownloadQuickstartButton usage example

```
import { DownloadQuickstartButton } from "/snippets/download-quickstart/DownloadQuickstartButton.jsx";

<DownloadQuickstartButton
  category="asynchronous-authorization"
  framework="langchain-fastapi-py"
  label="Your label here" // optional, defaults to "Download Sample"
/>
```

Ensure the `category` and `framework` align with the corresponding quickstart's `release-config.yml` file in the [Auth0 AI Samples repo](https://github.com/auth0-samples/auth0-ai-samples). See that repo's [readme](https://github.com/auth0-samples/auth0-ai-samples/blob/main/README.md) for more details on the downloadable artifacts and how to configure.