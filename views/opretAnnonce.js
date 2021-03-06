//Vi laver en listener til knappen opretAnnonce:


/*let form = document.getElementById("annonce")

form.addEventListener("submit", async (event) => {
    e.preventDefault();

    const formData = new formData(form);

    await fetch("/opretAnnonce", {
        method: "POST", 
        body: formData 
    });
});
*/



document.getElementById("opretAnnonce").addEventListener("click", (event) =>{

    //Brugerens værdi af indtastet informationer gemmes. Det er et JSON objekt:
    //hvad vi sender til serveren:

    let titel = document.getElementById("title").value
    let kategori = document.getElementById("kategori").value
    let pris = document.getElementById("pris").value
    let billede = document.getElementById("billede").value

    let nyAnnonce = {
        "titel": titel,
        "kategori": kategori,
        "pris": pris,
        "billede": billede
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
            window.alert("Din annonce er nu oprettet");
            //Hvis den indtastede data er korrekt, får vi en status ok, og brugeren bliver sendt til home:
            //document.location.href="/opretAnnonce";
            return
        } 
            //Hvis ikke den indtstede data er korrenkt får vi en fejlmeddelelse:
            document.getElementById("fejlmeddelelse").innerHTML = data.statusText;
    
    })
})




