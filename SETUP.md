Sellsy App Setup Instructions
===

To install the Sellsy App, you must first create an app with a "Client ID" and "Client Secret".

Once you've logged in, click on __"Settings"__ menu item at the top right of the screen

[![](/docs/assets/setup/sellsy-setup-01.png)](/docs/assets/setup/sellsy-setup-01.png)

Then navigate to the __"Developer Portal"__

[![](/docs/assets/setup/sellsy-setup-02.png)](/docs/assets/setup/sellsy-setup-02.png)

And there choose __"API V2 (beta)"__ and click to the __"Create API access"__ button

[![](/docs/assets/setup/sellsy-setup-03.png)](/docs/assets/setup/sellsy-setup-03.png)

Here, we fill out the following fields:

1. __Access name:__ provide the name as "Deskpro App" (or any preferred name);
2. __Redirect URLs:__ you can copy this from the Sellsy settings tab located in the admin drawer of Deskpro.
3. __Permissions:__ choose the next permissions
   * companies.read
   * contacts.read, contacts.write
   * activities.read
   * search.read
   * accounts.read

[![](/docs/assets/setup/sellsy-setup-04.png)](/docs/assets/setup/sellsy-setup-04.png)

Click on __"Save"__ button. And here click "Generate client secret"

You can see the Client ID and the Client Secret in the opened window.

[![](/docs/assets/setup/sellsy-setup-05.png)](/docs/assets/setup/sellsy-setup-05.png)

Additionally, please copy the __"Client ID"__ and __"Client Secret"__ for secure keeping.

Next, head back to Deskpro and enter the Client ID and Client secret into the app settings form.

To configure who can see and use the Sellsy app, head to the "Permissions" tab and select those users and/or groups you'd like to have access.

When you're happy, click "Install".
