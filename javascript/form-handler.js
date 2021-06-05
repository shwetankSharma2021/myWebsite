let isPersonNameValid = function(val){

    if(val.length<3||val.length>30){
        return false;
    }else{
        return true;
    }

}

let isPersonEmailValid = function(val){

    let em = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(em.test(val)){
        return true;
    }else{
        return false;
    } 

}

let isPersonPhoneValid = function(val){
    if(val.length!=10){
        console.log(val);
        return false;
    }else{
        if(val[0]=="9"||val[0]=="8"||val[0]=="7"||val[0]=="6"){
            return true;
        }else{
            return false;
        }
    }

}

let isSubjectValid = function(val){

    if(val.length<10 || val.length>30){
        return false;
    }else {
        return true;
    }
    
}

let isMessageValid = function(val){
    if(val.length<10 || val.length>300){
        return false;
    }else {
        return true;
    }
}


document.querySelector("#submitbtn").addEventListener("click", (evt)=>{
    evt.preventDefault();
    console.log("Everything is working !");
    const personName = document.querySelector("#personName").value;
    const personEmail = document.querySelector("#personEmail").value;
    const phone = document.querySelector("#phone").value;
    const subject = document.querySelector("#subject").value;
    const message = document.querySelector("#message").value;



    if(isPersonNameValid(personName)){
        if(isPersonEmailValid(personEmail)){
            if(isPersonPhoneValid(phone)){
                if(isSubjectValid(subject)){
                    if(isMessageValid(message)){
                        let data = {
                            personName: personName,
                            personEmail: personEmail,
                            personPhone: phone,
                            personSubject: subject,
                            personMessage: message
                        }                        


                        // API CALL
                        fetch("https://shwetankwebsite.herokuapp.com/mailapi/submitForm",{
                            method: "POST",
                            body : JSON.stringify(data),
                            headers : {
                                "Content-type": "application/json"
                            }
                        }).then((response)=>{ return response.json() }).then((arg)=>{
                            if(arg.success){
                                alert("We have received your request! you will be contacted shortly!");
                                document.querySelector("#personName").value="";
                                document.querySelector("#personEmail").value="";
                                document.querySelector("#phone").value="";
                                document.querySelector("#subject").value="";
                                document.querySelector("#message").value="";
                                message.value = "I want to avail your services! Please Contact me."
                            }
                        }).catch((err)=>{
                            console.log(err);
                            alert("We cannot complete your request right now. Please try again Later.")
                        });

                    }else{alert("Enter Correct Message");}
                }else{alert("Enter Correct Subject");}
            }else{alert("Enter Correct Phone");}
        }else {alert("Enter Correct Email");}
    }else{alert("Enter Correct Name");}



})

