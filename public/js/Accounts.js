
socket = io();
socket.emit("FAllAccounts");
var Accounts = 0;
var body = document.getElementById("body");
var users = 0;
function AllAccounts(){
    socket.on("AllAccounts",function(username){
        users = username;
         console.log(Accounts);
            for(i = Accounts;i<username.length;i++){
                if(localStorage.getItem('Account')+"" != username[i].username){                
                    console.log(i);
                   var div = document.createElement('div');
                    div.setAttribute('class','content');
                    var img = document.createElement('img');
                    img.src = 
                '../ProfilePicture.png';
                div.appendChild(img);
                var h3 = document.createElement('h3');
                
                    h3.appendChild(document.createTextNode(username[i].username));
                    var button = document.createElement('button');
                    button.appendChild(document.createTextNode("Join"));
                    button.setAttribute('id',i);
                    button.setAttribute('onclick','Clicked(this)');
                    div.appendChild(button);
                    div.appendChild(h3);
                    body.appendChild(div);
                }

            
            }
            
            Accounts = username.length;
      
      
    });
    setTimeout(AllAccounts, 100);
    
}

AllAccounts();
function Clicked(button){
    localStorage.setItem('Joined',""+users[button.id].username) ;
    
        location.replace('/static/html/homepage.html');

   
}
