// FirebaseUI config.
let uiConfig = {
  signInSuccessUrl: 'logged-in.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>'
};
let auth = firebase.auth();
// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(auth);
let userCollectionRef = firestore.collection('users');


// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

// if (ui.isPendingRedirect()) {
//   ui.start('#firebaseui-auth-container', uiConfig);
// }

initApp = function() {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      var userObj = {
        displayName: displayName,
        email: email,
        emailVerified: emailVerified,
        phoneNumber: phoneNumber,
        photoURL: photoURL,
        providerData: providerData
      }
      userCollectionRef.doc(user.uid).set(userObj);
      user.getIdToken().then(function(accessToken) {
        document.getElementById('sign-in-status').textContent = 'Signed in';
        document.getElementById('sign-in').innerHTML = `<div>
      <button type="button" id="sign-out">sign out</button>
    </div>`;
        document.getElementById('account-details').textContent = JSON.stringify({
          displayName: displayName,
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          uid: uid,
          accessToken: accessToken,
          providerData: providerData
        }, null, '  ');
      });
      currentUser = user;
    } else {
      // User is signed out.
      document.getElementById('sign-in-status').textContent = 'Signed out';
      document.getElementById('sign-in').textContent = 'Sign in';
      document.getElementById('account-details').textContent = 'null';
      currentUser = null;
    }
  }, function(error) {
    console.log(error);
  });
};

window.addEventListener('load', function() {
  initApp();
});

document.addEventListener('click', function(e) {
  if ( e.target.id === 'sign-out' ) {
    auth.signOut().then(function() {
      document.location.assign(`${window.location.protocol}//${window.location.host}/index.html`);
    }).catch(function(error) {
      console.log(`sign out error: ${error}`);
    });
  }
});

