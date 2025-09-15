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
      <Step key="resource-server" title="Create a Custom API Client">
        The Custom API Client allows your API server to perform token
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
        <ul>
              <li>
                Navigate to{" "}
                <strong>
                  Applications &gt; APIs
                </strong>
              </li>
              <li>
                Click the{" "}
                <strong>Create API</strong> button to create a new Custom API.
              </li>
              <li>
                Go to the Custom API you created and click the <strong>Add Application</strong> button in the right top corner.
              </li>
              <li>
                After that click the <strong>Configure Application</strong> button in the right top corner.
              </li>
          <li>
            Note down the <code>client id</code> and <code>client secret</code>{" "}
           for your environment variables.
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
