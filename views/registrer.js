//Vi laver en listener til knappen opret:

document.getElementById("opret").addEventListener("click", () => {

    //Brugerens indtastede værdier gemmes. Det er et JSON objekt:
    //hvad vi sender til serveren:

    const email = document.getElementById("email").value
    const kodeord = document.getElementById("kodeord").value
    const navn = document.getElementById("navn").value

    let user = {
        "email": email,
        "kodeord": kodeord,
        "navn": navn
    }

        //vi går ind og tager (fetcher) i det nedenstående spor, altså der hvor man opretter sin bruger
        fetch("/opret", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        }, 
        body: JSON.stringify(user),
    })
    .then((response) => response.json())
    //vi laver svaret om til json, således at serven kan forstå. Når den er lavet til en string sker følgende:
    .then((response)=> {
        if (response) {
        location.href = "/index.html";  
        }
    })
    //hvis responset er successfuldt tages brugeren til loginskærmen. 
    //Hvis noget går galt, går den videre til næste linje. Her ønsker vi en alert-boks med følgende tekst:
    .catch(()=> {
        window.alert("der skete en fejl");
    });
})