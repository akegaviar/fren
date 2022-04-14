const serverUrl = process.env.API_URL;
const appId = process.env.API_ID;
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({
      signingMessage: "Log in"
    })
      .then(function (user) {
        console.log("logged in user:", user);
        let ethAddress = user.get("ethAddress");
        document.getElementById(
          "myethAddress"
        ).textContent = `Logged in Eth Address ${ethAddress}`;
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    let ethAddress = user.get("ethAddress");
    document.getElementById(
      "myethAddress"
    ).textContent = `Already Logged in ${ethAddress}`;
  }
}

async function logOut() {
  await Moralis.User.logOut();
  document.getElementById("myethAddress").textContent = "";
  console.log("logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
