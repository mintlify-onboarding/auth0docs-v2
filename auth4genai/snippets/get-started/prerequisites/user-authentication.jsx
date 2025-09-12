import { AccountAndAppSteps } from "/snippets/get-started/prerequisites/account-app-steps.jsx";

export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
  createResourceServerClientStep = undefined,
}) => {
  // Build steps array dynamically based on conditions
  const steps = [];

  steps.push(
    ...AccountAndAppSteps({ callbackUrl, logoutUrl })
  );

  if (createResourceServerClientStep) {
    steps.push(
      <Step key="resource-server" title="Create a Resource Server Client">
        The Resource Server Client allows your API server to perform token
        exchanges using{" "}
        <strong>
          <i>access tokens</i>
        </strong>{" "}
        instead of{" "}
        <strong>
          <i>refresh tokens</i>
        </strong>
        . This client enables Token Vault to exchange an access token for an
        external API access token (e.g., Google Calendar API).
        <br />
        This will be used by the Langgraph API server
        (@langchain/langgraph-cli or Langgraph Platform) when executing tools that require third-party access.
        <br />
        <br />
        Create this client programmatically via the Auth0 Management API:
        <CodeBlock
          language="bash"
          expandable="false"
          lines="true"
          filename="Create Resource Server Client"
        >
          {`curl -L 'https://{tenant}.auth0.com/api/v2/clients' \\
-H 'Content-Type: application/json' \\
-H 'Accept: application/json' \\
-H 'Authorization: Bearer {MANAGEMENT_API_TOKEN}' \\
-d '{
  "name": "Calendar API Resource Server Client",
  "app_type": "resource_server",
  "grant_types": ["urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token"],
  "resource_server_identifier": "YOUR_API_IDENTIFIER"
}'`}
        </CodeBlock>
        <ul>
          <li>
            Your <code>MANAGEMENT_API_TOKEN</code> above must have the{" "}
            <code>create:clients</code> scope in order to create a new client.
            To create a new Management API token with the right access
            permissions: following:
            <ul>
              <li>
                Navigate to{" "}
                <strong>
                  Applications &gt; APIs &gt; Auth0 Management API &gt; API
                  Explorer
                </strong>
                {"  "}
                tab in your tenant.
              </li>
              <li>
                Click the{" "}
                <strong>Create &amp; Authorize Test Application</strong> button.
              </li>
              <li>
                Copy the JWT access token shown and provide it as the{" "}
                <code>MANAGEMENT_API_TOKEN</code>.
              </li>
            </ul>
          </li>
          <li>
            Note down the <code>client_id</code> and <code>client_secret</code>{" "}
            returned from the cURL response for your environment variables after
            running cURL successfully.
          </li>
        </ul>
      </Step>
    );
  }

  return (
    <>
      <Heading level={3} id="prerequisites">
        Prerequisites
      </Heading>
      Before getting started, make sure you have completed the following steps:
      <Steps>{steps}</Steps>
    </>
  );
};
