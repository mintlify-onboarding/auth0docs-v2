export const Prerequisites = ({
  callbackUrl = "http://localhost:3000/auth/callback",
  logoutUrl = "http://localhost:3000",
}) => {
  return (
    <>
      <Heading level={3} id="prerequisites">
        Prerequisites
      </Heading>
      Before getting started, make sure you have completed the following steps:
      <Steps>
        <Step title="Create an Auth0 Account">
          To continue with this quickstart, you need to have an{" "}
          <a
            href="https://auth0.com/signup?onboard_app=genai&ocid=7014z000001NyoxAAC-aPA4z0000008OZeGAM"
            target="_blank"
          >
            Auth0 account.
          </a>
        </Step>
        <Step title="Create an Auth0 Application">
          Go to your {" "}
          <a href="https://manage.auth0.com/dashboard" target="_blank">
            Auth0 Dashboard
          </a>{" "}
          to create a new Auth0 Application.
          <ul>
            <li>
              Navigate to <code>Applications {">"} Applications</code> in the left sidebar.
            </li>
            <li>
              Click the <code>Create Application</code> button in the top right.
            </li>
            <li>
              In the pop-up select <code>Regular Web Applications</code> and click <code>Create</code>.
            </li>
            <li>
              Once the Application is created, switch to the <code>Settings</code> tab.
            </li>
            <li>
              Scroll down to the <code>Application URIs</code> section.
            </li>
            <li>
              Set Allowed Callback URLs as: <code>{callbackUrl}</code>
            </li>
            <li>
              Set Allowed Logout URLs as: <code>{logoutUrl}</code>
            </li>
            <li>
              Click <code>Save</code> in the bottom right to save your changes.
            </li>
          </ul>
          To learn more about Auth0 applications, read{" "}
          <a
            href="https://auth0.com/docs/get-started/applications"
            target="_blank"
          >
            Applications
          </a>
          .
        </Step>
      </Steps>
    </>
  );
};
