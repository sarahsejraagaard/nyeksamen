//Vi laver en listener til knappen login:

document.getElementById("registrer").addEventListener("click", (event) => {

    //Brugerens værdi af email og indtastet kodeord gemmes. Det er et JSON objekt:
    //hvad vi sender til serveren:

    const email = document.getElementById("email").value
    const kodeord = document.getElementById("kodeord").value
    const navn = document.getElementById("navn").value

    let user = {
        "email": email,
        "kodeord": kodeord,
        "navn": navn
    }

        //vi går ind og tager (fetcher) i det nedenstående spor, altså der hvor man logger ind:
        fetch("/opret", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        }, 
        body: JSON.stringify(user),
    })
    //svaret som vi får fra fetch:
    .then(function(data) {
        if(data.statusText =="OK") {
            //Hvis den indtastede data er korrekt, får vi en status ok, og brugeren bliver sendt til login:
            document.location.href="/login";
            return
        } 
            //Hvis ikke den indtstede data er korrenkt får vi en fejlmeddelelse, som svarer til vores data
            document.getElementById("fejlmeddelelse").innerHTML = data.statusText;
    
    })
})





/*
const submitButton = document.getElementById("submit")
const kodeord = document.getElementById("kodeord")
const navn = document.getElementById("navn")
const email = document.getElementById("email")

const init = () => {
    submitButton.addEventListener("click", createUser);
}

const createUser = (e) => {
    e.preventDefault()
    console.log(navn.value)
    fetch(`http://localhost:9000/opret/${navn.value}-${kodeord.value}-${email.value}`, {
        method: "POST"
    })
   
}
init()
*/