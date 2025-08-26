import { AccountAndAppSteps } from "/snippets/get-started/prerequisites/account-app-steps.jsx";

export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
  appCreation = true,
}) => {
  const steps = [];

  if (appCreation) {
    steps.push(...AccountAndAppSteps({ callbackUrl, logoutUrl, appCreation }));
  }

  steps.push(
    <Step title="Create an Auth0 FGA account">
      You need an{" "}
      <a href="https://dashboard.fga.dev/" target="_blank">
        Auth0 FGA account
      </a>{" "}
      to complete this quickstart.
    </Step>,
    <Step title="OpenAI Platform">
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
      Before getting started, make sure you:
      <Steps>{steps}</Steps>
    </>
  );
};
