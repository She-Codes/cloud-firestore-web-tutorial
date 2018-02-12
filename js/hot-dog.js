let docRef = firestore.doc('samples/sandwichData');
let outputHeader = document.querySelector('#hotDogOutput');
let inputTextField = document.querySelector('#latestHotDogStatus');
let saveButton = document.querySelector('#saveButton');
let loadButton = document.querySelector('#loadButton');


firebase.auth().onAuthStateChanged(function(user) {
  if ( user ) {
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
  } else {
    console.log('nope');
  }
});


