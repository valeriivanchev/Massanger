var socket = io();
if(localStorage.getItem('Account')+"" != 'null'){
    location.replace('/static/html/Accounts.html');
}
function Clicked(){
    var username = document.getElementById("reg_username").value;
    
 console.log(username);
    if(username =="" ){
        Swal.fire({
            icon: 'error',
            title: 'Please write in every field!' 
        });
    }else{
          
        socket.emit("Account",username);
        console.log(username);
        var timerInterval;
                    Swal.fire({
                    icon:'info',
                    title: 'One moment',
                    timer: 2000,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                        const content = Swal.getContent()
                      
                        }, 100)
                    },
                    onClose: () => {
                        clearInterval(timerInterval)
                    }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                           console.log('END');
                        }
                    })
        socket.on('Info',function(info){
            console.log(username);
            if(info <=0){
                localStorage.setItem("Account",""+username);
                location.replace('/static/html/Accounts.html');
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry, someone already has the same username!' 
                });
            }
        });
    }
}