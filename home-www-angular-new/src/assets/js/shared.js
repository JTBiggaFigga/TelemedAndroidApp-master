
var shared = ()=>{};

shared.logout = ()=>{
    console.log("Logging out ... ");
    //location.href = "/logout";
}

shared.ajaxGetCall = (url, headers, doneCallback, failedCallback, alwaysCallback) => {

    if(url == "") {
        console.log("Enter a URL");
        return;
    }

    console.log("");
    console.log("AJAX GET: " + url);
    var ajax = $.ajax({
        method: "GET",
        url: url,
        headers: headers
    })
    .done( ( response ) => {
        
        
        console.log("AJAX RESPONSE: ", response);
        console.log("");

        if(response.exception && response.body.includes("ACCESS DENIED")) {
            console.log("ACCESS DENIED");
            shared.logout();
            return;    
        }
        if(typeof doneCallback == "function")
            doneCallback(response);
    })
    .fail ( (response) => {
            console.log(response);
            if(typeof failedCallback == "function")
                failedCallback(response);
    })
    .always( (response) => {
            console.log(response);
            if(typeof alwaysCallback == "function")
                alwaysCallback(response);
    });


}


shared.ajaxPostCall = (url, data, headers, doneCallback, failedCallback, alwaysCallback) =>{

    if(url == "") {
        console.log("Enter a URL");
        return;
    }

    console.log("");
    console.log("AJAX POST: " + url);

    var ajax = $.ajax({
        method: "POST",
        url: url,
        data: data,
        headers: headers
    })
    .done( ( response ) => {
        
        console.log("AJAX RESPONSE: ", response);
        console.log("");

        if(response.exception && response.body.includes("ACCESS DENIED")) {
            console.log("ACCESS DENIED");
            shared.logout();
            return;    
        }
        if(typeof doneCallback == "function")
            doneCallback(response);
    })
    .fail ( (response) => {
            console.log(response);
            if(typeof failedCallback == "function")
                failedCallback(response);
    })
    .always( (response) => {
            console.log(response);
            if(typeof alwaysCallback == "function")
                alwaysCallback(response);
    });
}




shared.showStaticObjectVars = (object) => {
    console.log("VClinicState ... ")
    Object.keys(object).forEach((item, key)=>{console.log("\t" + item + ": " + (object[item]))});
}

shared.generateString = (prefix, n) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < n; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return prefix + text;
  }