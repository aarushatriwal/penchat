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
    room_name = localStorage.getItem("room_name");

    function send()
    {
          msg = document.getElementById("mgs").value;
          firebase.database().ref(room_name).push({
                name:user_name,
                message:msg,
                like:0
          });
          document.getElementById("mgs").value = "";
    }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
      name  = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];
      row = "<h4>"+name+"<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>"+message+"</h4> <button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"'onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thum-up'>Like: "+like+"</span></button><hr>";
      document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
      console.log("click on like button - "+message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      update_likes = Number(likes) + 1;
      console.log(update_likes);

      firebase.database().ref(room_name).child(message_id).update({
        like: update_likes
      });
}

function logout()
{
     localStorage.removeItem("user_name");
     localStorage.removeItem("room_name");
     window.location.replace("index.html"); 
}