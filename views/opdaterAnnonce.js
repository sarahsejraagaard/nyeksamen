document.getElementById("Edit").addEventListener("click", ()=>{
    location.href="/profil.html";



document.getElementById("opdaterAnnonce").addEventListener("click",()=>{
    let opdateretVare={
        "titel": nyTitel,
        "kategori": nyKategori,
        "pris": nyPris,
        "billede": nyBillede
    }

fetch("/opdaterAnnonce", {
    method: "PUT",
    header: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(opdateretVare)
})
    .then(function(data) {
        if(data.statusText =="OK") {
            window.alert("Din annonce er nu opdateret");
            //Hvis den indtastede data er korrekt, får vi en status ok:
            document.location.href="/profil";
            return
        } 
            //Hvis ikke den indtstede data er korrenkt får vi en fejlmeddelelse:
            document.getElementById("fejlmeddelelse").innerHTML = data.statusText;
    
    })
})

})