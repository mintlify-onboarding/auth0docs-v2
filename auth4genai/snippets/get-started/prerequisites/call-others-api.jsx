import { AccountAndAppSteps } from "/snippets/get-started/prerequisites/account-app-steps.jsx";

/**
 * Prerequisites for call-others-api quickstarts.
 * @param {Object} props - The props object
 *
 * @param {Object|undefined} [props.createAuth0ApplicationStep] - Configuration for Auth0 application creation step
 * @param {string} [props.createAuth0ApplicationStep.applicationType] - Type of Auth0 application (e.g., "Regular Web")
 * @param {string} [props.createAuth0ApplicationStep.callbackUrl] - Allowed callback URL for the application
 * @param {string} [props.createAuth0ApplicationStep.logoutUrl] - Allowed logout URL for the application
 *
 * @param {string|undefined} [props.createAuth0ApplicationStep.allowedWebOrigins] - Allowed web origins for the application
 *
 * @param {Object|undefined} [props.refreshTokenGrantStep] - Configuration for refresh token grant step
 * @param {string} [props.refreshTokenGrantStep.applicationName] - Name of the application for refresh token grant
 *
 * @param {Object|undefined} [props.createAuth0ApiStep] - Configuration for Auth0 API creation step
 *
 * @param {Object|undefined} [props.createResourceServerClientStep] - Configuration for resource server client creation step
 *
 * @param {Object|undefined} [props.tokenVaultGrantStep] - Configuration for token vault grant step
 * @param {string} [props.tokenVaultGrantStep.applicationName] - Name of the application for token vault grant
 *
 * @returns {JSX.Element} A React component containing prerequisite steps
 */

export const Prerequisites = ({
  createAuth0ApplicationStep = {
    applicationType: "Regular Web Applications",
    callbackUrl: "http://localhost:3000/auth/callback",
    logoutUrl: "http://localhost:3000",
    allowedWebOrigins: undefined,
  },
  refreshTokenGrantStep = undefined,
  createAuth0ApiStep = undefined,
  createResourceServerClientStep = undefined,
  tokenVaultGrantStep = {
    applicationName: "Auth0 Application",
  },
}) => {
  // Build steps array dynamically based on conditions
  const steps = [];

  steps.push(
    ...AccountAndAppSteps({
      applicationType: createAuth0ApplicationStep.applicationType,
      callbackUrl: createAuth0ApplicationStep.callbackUrl,
      logoutUrl: createAuth0ApplicationStep.logoutUrl,
      appCreation: !!createAuth0ApplicationStep,
      allowedWebOrigins: createAuth0ApplicationStep.allowedWebOrigins,
    })
  );

  if (tokenVaultGrantStep) {
    steps.push(
      <Step key="token-exchange" title="Enable Token Vault Grant">
        Enable the Token Vault Grant for your{" "}
        {tokenVaultGrantStep.applicationName}. Go to{" "}
        <strong>
          Applications &gt; [Your Application] &gt; Settings &gt; Advanced &gt;
          Grant Types
        </strong>{" "}
        and enable the <strong>Token Vault</strong> grant type.
      </Step>
    );
  }

  // Conditionally add steps
  if (refreshTokenGrantStep) {
    steps.push(
      <Step key="refresh-token" title="Enable Refresh Token Grant">
        Enable the Refresh Token Grant for your{" "}
        {refreshTokenGrantStep.applicationName}. Go to{" "}
        <strong>
          Applications &gt; [Your Application] &gt; Settings &gt; Advanced &gt;
          Grant Types
        </strong>{" "}
        and enable the <strong>Refresh Token</strong> grant type.
      </Step>
    );
  }

  if (createAuth0ApiStep) {
    steps.push(
      <Step key="auth0-api" title="Create an Auth0 API">
        <ul>
          <li>
            In your Auth0 Dashboard, go to{" "}
            <strong>Applications &gt; APIs</strong>.
          </li>
          <li>Create a new API with an identifier (audience).</li>
          <li>
            Once API is created, go to the APIs{" "}
            <strong>Settings &gt; Access Settings</strong> and enable{" "}
            <strong>Allow Offline Access</strong>.
          </li>
          <li>Note down the API identifier for your environment variables.</li>
        </ul>
        To learn more about Auth0 APIs, read{" "}
        <a
          href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis"
          target="_blank"
        >
          APIs
        </a>
        .
      </Step>
    );
  }

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

  // Always include these final steps
  steps.push(
    <Step key="google-connection" title="Configure Google Social Integration">
      Set up a Google developer account that allows for third-party API calls by
      following the <a href="/integrations/google">Google Social Integration</a>{" "}
      instructions.
    </Step>
  );

  steps.push(
    <Step key="openai" title="OpenAI Platform">
      Set up an{" "}
      <a
        href="https://platform.openai.com/docs/libraries#create-and-export-an-api-key"
        target="_blank"
      >
        OpenAI account and API key
      </a>
      .
    </Step>
  );

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
