//Vi laver en listener til knappen opretAnnonce:

document.getElementById("opretAnnonce").addEventListener("click", (event) => {

    //Brugerens værdi af indtastet informationer gemmes. Det er et JSON objekt:
    //hvad vi sender til serveren:

    const titel = document.getElementById("titel").value
    const kategori = document.getElementById("kategori").value
    const pris = document.getElementById("pris").value
    const billede = document.getElementById("billede").value
    const ejer = document.getElementById("ejer").value

    let nyAnnonce = {
        "titel": titel,
        "kategori": kategori,
        "pris": pris,
        "billede": billede,
        "ejer": ejer
    }

        //vi går ind og tager (fetcher) i det nedenstående spor, altså der hvor man logger ind:
        fetch("/opretAnnonce", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        }, 
        body: JSON.stringify(nyAnnonce),
    })
    //svaret som vi får fra fetch:
    .then(function(data) {
        if(data.statusText =="OK") {
            //Hvis den indtastede data er korrekt, får vi en status ok, og brugeren bliver sendt til home:
            document.location.href="/";
            return
        } 
            //Hvis ikke den indtstede data er korrenkt får vi en fejlmeddelelse:
            document.getElementById("fejlmeddelelse").innerHTML = data.statusText;
    
    })
})




