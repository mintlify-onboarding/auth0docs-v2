# Documentation for Auth for GenAI

This directory contains the documentation for GenAI features in Auth0, which can be found at https://auth0.com/ai/docs.

# Mintlify Starter Kit

Click on `Use this template` to copy the Mintlify starter kit. The starter kit contains examples including

- Guide pages
- Navigation
- Customizations
- API Reference pages
- Use of popular components

### Development

**Note: you must disconnect from the VPN before attempting to install. After the install is successful, you can reconnect.**

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) to preview the documentation changes locally. To install, DISCONNECT FROM THE VPN and use the following command

```
npm i -g mint
```

Once install completes, you can RECONNECT TO THE VPN.

Run the following command at the root of your documentation (where `docs.json` is, so in this case, `/auth4genai`):

```
mint dev
```

### Publishing Changes

Install our Github App to auto propagate changes from your repo to your deployment. Changes will be deployed to production automatically after pushing to the default branch. Find the link to install on your dashboard. 

#### Troubleshooting

- If you get an error when running `mint dev`, make sure you are off VPN during the install.
- If the dev environment isn't running - Run `mint update` to ensure you have the most recent version of the CLI.
- Page loads as a 404 - Make sure you are running in a folder with `docs.json`