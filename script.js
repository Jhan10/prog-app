

//#region Workers
/******Workers Code********/
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js');
}

//#endregion Workers

//#region Code
class Code {
  hello=document.getElementsByClassName("hello")[0];
  bye=document.getElementsByClassName("bye")[0];
  Hello(){
    alert("Hello!");
    this.hello.setAttribute("Style","Display: none");
    this.bye.setAttribute("Style","Display: block");
  }
  Bye(){
    alert("Bye!");
    this.bye.setAttribute("Style","Display: none");
    this.hello.setAttribute("Style","Display: block");
  }
/*   retrieveManifestField() {
    //const fs = require('fs');
    fs.readFile('/manifest.json', 'utf-8', (err, file) => {
      if (err) console.log("Ocorreu um erro: ", err); alert("Ocorreu um erro: ", err.message);

      const jsonFile = JSON.parse(file);
      console.log("jsonFile: ", jsonFile);
      console.log("jsonFile.description: ", jsonFile["description"]);
    });
    return 'ok'
  } */
}
window.code = new Code();

//#endregion Code

//#region PWAInstallation
// The install button.
//const installButton = document.querySelector('button');
const installButton = document.getElementsByClassName('pr-install')[0];

// Only relevant for browsers that support installation.
if ('BeforeInstallPromptEvent' in window) {
  // Variable to stash the `BeforeInstallPromptEvent`.
  let installEvent = null;

  // Function that will be run when the app is installed.
  const onInstall = () => {
    // Disable the install button.
    installButton.disabled = true;
    // No longer needed.
    installEvent = null;
  };

  window.addEventListener('beforeinstallprompt', (event) => {
    // Do not show the install prompt quite yet.
    event.preventDefault();
    // Stash the `BeforeInstallPromptEvent` for later.
    installEvent = event;
    // Enable the install button.
    installButton.disabled = false;
  });

  installButton.addEventListener('click', async () => {
    // If there is no stashed `BeforeInstallPromptEvent`, return.
    if (!installEvent) {
      return;
    }
    // Use the stashed `BeforeInstallPromptEvent` to prompt the user.
    installEvent.prompt();
    const result = await installEvent.userChoice;
    // If the user installs the app, run `onInstall()`.
    if (result.outcome === 'accepted') {
      onInstall();
    }
  });

  // The user can decide to ignore the install button
  // and just use the browser prompt directly. In this case
  // likewise run `onInstall()`.
  window.addEventListener('appinstalled', () => {
    onInstall();
  });
}
//#endregion PWAInstallation