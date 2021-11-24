//Vi laver en listener til knappen login:

document.getElementById("login").addEventListener("click", () => {

    //Brugerens værdi af email og indtastet kodeord gemmes. Det er et JSON objekt:
    //hvad vi sender til serveren:

    const email = document.getElementById("email").value
    const kodeord = document.getElementById("kodeord").value

    let user = {
        "email": email,
        "kodeord": kodeord
    }

    //Bemærk at vi her skriver vores login-endpoint istedet for opret-endpoint, som vi gjorde i registrere.js koden:
    fetch("/login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        }, 
        body: JSON.stringify(user),
    })
    //svaret som vi får fra fetch:
    .then(function(data) {
        if(data.statusText=="OK") {
            //Hvis den indtastede data er korrekt, får vi en status ok, og brugeren bliver sendt til home:
            document.location.href="/";
        } else {
            //Hvis ikke den indtstede data er korrenkt får vi en fejlmeddelelse, som svarer til vores data
            document.getElementById("fejlmeddelelse").innerHTML= data.statusText;
        }
    })
})