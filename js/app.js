// Initialize Firebase
let config = {
  apiKey: "AIzaSyBXBssWe-GF6OrW_D0jYZpb7kTIoIvex-w",
  authDomain: "cloud-firestore-web-tutorial.firebaseapp.com",
  databaseURL: "https://cloud-firestore-web-tutorial.firebaseio.com",
  projectId: "cloud-firestore-web-tutorial",
  storageBucket: "",
  messagingSenderId: "1001195068664"
};
firebase.initializeApp(config);

let firestore = firebase.firestore();

let docRef = firestore.doc('samples/sandwichData');
let outputHeader = document.querySelector('#hotDogOutput');
let inputTextField = document.querySelector('#latestHotDogStatus');
let saveButton = document.querySelector('#saveButton');
let loadButton = document.querySelector('#loadButton');

saveButton.addEventListener('click', function() {
  let textToSave = inputTextField.value;
  console.log(`I am going to save ${textToSave} to Firestore`);
  docRef.set({
    hotDogStatus: textToSave
  }).then(function() {
    console.log('Status saved!');
  }).catch(function(error) {
    console.log(`Got an error: ${error}`);
  });
});

loadButton.addEventListener('click', function() {
  let myData;
  docRef.get().then(function(doc) {
    if ( doc && doc.exists ) {
      myData = doc.data();
      outputHeader.innerText = `Hot dog status: ${myData.hotDogStatus}`;
    }
  }).catch(function(error) {
    console.log(`Got an error: ${error}`);
  });
});

let getRealTimeUpdates = function() {
  docRef.onSnapshot(function(doc) {
    let myData;
    if ( doc && doc.exists ) {
      myData = doc.data();
      outputHeader.innerText = `Hot dog status: ${myData.hotDogStatus}`;
    }
  });
}

getRealTimeUpdates();