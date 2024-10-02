const msal = require('@azure/msal-node');
const request = require('request');
const { createOrFindOnestopUserID, getUserTokens } = require('./onestopUserController');
const REDIRECT_URI = process.env.API_URL+"/v3/auth/microsoft/redirect";
const clientID = process.env.MICROSOFT_GRAPH_CLIENT_ID;
const tenantID = "https://login.microsoftonline.com/" + process.env.MICROSOFT_GRAPH_TENANT_ID;
const clientSecret = process.env.MICROSOFT_GRAPH_CLIENT_SECRET;
const config = {
  auth: {
    clientId: clientID,
    authority: tenantID,
    clientSecret: clientSecret
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Warning,
    }
  }
};

// Create msal application object
const pca = new msal.ConfidentialClientApplication(config);

exports.microsoftLogin = (req, res) => {
  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: REDIRECT_URI,
  };

  // get url to sign user in and consent to scopes needed for application
  pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
    console.log(response);
    res.redirect(response);
  }).catch((error) => console.log(JSON.stringify(error)));
};

exports.microsoftLoginRedirect = (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ["user.read"],
    redirectUri: REDIRECT_URI,
  };

  pca.acquireTokenByCode(tokenRequest).then(async (response) => {
    console.log("Access Token");
    console.log(response.accessToken);

    request.get({
      url: "https://graph.microsoft.com/v1.0/me",
      headers: {
        "Authorization": "Bearer " + response.accessToken
      }
    }, async function (err, resp, body) {
      console.log("here");
      if (err) {
        console.log(err);
        return res.render('authSuccessView.ejs', { userTokens: "ERROR OCCURED" });
      }
      const userInfo = JSON.parse(body);
      console.log(userInfo);
      if(!userInfo.displayName || !userInfo.mail){
        return res.render('authSuccessView.ejs', { userTokens: "ERROR OCCURED" });
      }
      if(!userInfo.surname){
        // in case there is no roll number
        userInfo.surname="1";
      }
      let userid = await createOrFindOnestopUserID(userInfo.displayName, userInfo.mail, userInfo.surname);
      const userTokensString = await getUserTokens(userid);
      console.log(userTokensString);
      
      return res.render('authSuccessView.ejs', { userTokens: userTokensString });
    });
  });
}
