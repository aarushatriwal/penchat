var firebaseConfig = {
      apiKey: "AIzaSyCbgwt8a-4ZmowJKA4kBxWm3ByFFZZZnVU",
      authDomain: "kwitter-d27a8.firebaseapp.com",
      databaseURL: "https://kwitter-d27a8.firebaseio.com",
      projectId: "kwitter-d27a8",
      storageBucket: "kwitter-d27a8.appspot.com",
      messagingSenderId: "835122830774",
      appId: "1:835122830774:web:7dd3de7ad0614b72d13517",
      measurementId: "G-5PQ72LDW47"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "welcome"+user_name+"!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
       console.log("Room name"+Room_names);
       row = "<div class='Room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+Room_names+"</div><hr>";
       document.getElementById("output").innerHTML += row;
       //End code
      });});}
getData();

function redirectToRoomName(name){
  console.log(name);
  localStorage.setItem("room_name",name);
  window.location = "Kwitter_page.html";
}

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
