firebase.auth().onAuthStateChanged(function(user) {
  window.user = user;

});
  
document.querySelector('#sign-in').addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  var email = document.querySelector('#email').value;
  var password = document.querySelector('#password').value
  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  var auth = firebase.auth();
  var currentUser = auth.currentUser;

});

document.querySelector('#sign-out').addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  firebase.auth().signOut();
});
