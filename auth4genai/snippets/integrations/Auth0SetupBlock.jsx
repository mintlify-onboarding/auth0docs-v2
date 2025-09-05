export const Auth0SetupBlock = ({
  providerName,
  clientIDName = "Client ID",
  clientSecretName = "Client Secret",
  scopesName = "Permissions",
  allowFreeFormScopes = false,
}) => {
  return (
    <>
      <ol>
        <li>
          In the <a href="https://manage.auth0.com">Auth0 Dashboard</a>,
          navigate to <b>Authentication &gt; Social.</b>
        </li>
        <li>
          Select <b>Create Connection</b> and then select <b>{providerName}.</b>
        </li>
        <li>
          Click <b>Continue</b>.
        </li>
        <li>
          In <b>General</b>:
          <ol type="A">
            <li>
              Enter the <b>{clientIDName}</b> and <b>{clientSecretName}</b> from
              your {providerName} OAuth app.
            </li>
            <li>
              Under <b>{scopesName}</b>, select the scope(s) required for your
              application. These determine what permissions your application can
              request from {providerName}, whether for authentication (such as
              accessing basic profile details) or for API access (such as
              connecting to the provider's APIs).
            </li>
            {allowFreeFormScopes && (
              <li>
                You can also add any additional scopes your application may
                require by adding it to the <b>Additional Scopes</b> text box.
              </li>
            )}
          </ol>
        </li>
        <li>
          In <b>Advanced</b>, toggle <b>Enable Token Vault</b>. This allows the
          connection to retrieve and securely store access tokens for
          third-party APIs. To learn more, read{" "}
          <a href="https://auth0.com/docs/secure/tokens/token-vault/configure-token-vault">
            Configure Token Vault
          </a>.
        </li>
        <li>
          Click <b>Create</b>.
        </li>
        <li>
          Once your connection is created, you will be redirected to the "Applications" page, where you can select the application you would like to enable this connection for.
          <br />
          Note: If this is a new Auth0 tenant, you can select the <b>Default App</b>.
        </li>
        <li>
          Once you have created your {providerName} social connection, <a href="https://auth0.com/docs/authenticate/identity-providers/test-connections">test your connection</a> to ensure the setup is working correctly before using it in your application.
        </li>
      </ol>
    </>
  );
};
