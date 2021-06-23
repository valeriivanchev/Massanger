
var socket =io();
var users={
    Fromuser:""+localStorage.getItem('Account'),
    Touser:""+localStorage.getItem('Joined'),
    room:0
};

users.room = ''+(users.Fromuser.charCodeAt(0) + users.Touser.charCodeAt(0));
socket.emit("CreateRoom",users.room);
var MassageBox = document.getElementById("discussion");
var NumberOfMassages = 0;
console.log(MassageBox);
function Clicked(){
    console.log(users.room);
       
    var massanger = {
        text : CryptoJS.AES.encrypt(document.getElementById("massage").value, users.room).toString(),
        Fromuser:users.Fromuser,
        Touser:users.Touser,
        roomNumber:users.room
    };
    var textbox = document.getElementById("massage");
    textbox.value="";
    socket.emit("Massage",massanger);
    
}

socket.emit('Receive',users);

function update(){
    
    socket.on('Massages',function(Massage){
        for(var i =NumberOfMassages;i<Massage.length;i++){
            

           
                if(Massage[i].Fromusername == users.Fromuser){
                
                    var MText = document.createElement("div");
                    MText.setAttribute('class','bubble recipient');
                    var ReceivedText = document.createTextNode(
                        CryptoJS.AES.decrypt(Massage[i].Massage, ''+users.room).toString(
                        CryptoJS.enc.Utf8)
                        );
                    MText.appendChild(ReceivedText);
                    MassageBox.appendChild(MText);
                   NumberOfMassages++;
                }else{
                    var MText = document.createElement("div");
                    MText.setAttribute('class','bubble sender');
                    var ReceivedText = document.createTextNode(
                        CryptoJS.AES.decrypt(Massage[i].Massage, ''+users.room).toString(
                        CryptoJS.enc.Utf8)
                        );
                    MText.appendChild(ReceivedText);
                    MassageBox.appendChild(MText);
                   NumberOfMassages++;
                }
            }
            

        
        NumberOfMassages = Massage.length;
        
    });
    setTimeout(update, 100);
}
update();