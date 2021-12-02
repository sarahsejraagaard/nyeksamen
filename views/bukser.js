//Når når kommer ind på home sendes en get request til vores endpoint seAnnoncer:

fetch("/seBukserAnnoncer", {
    method: "GET", 
    headers: {
        "Content-Type": "application/json", 
    }, 

})

console.log("hej")
//Den data vi får fra fetchen:
.then(function(data) {
    //vi tager vores response og laver 
    return data.json();
})

.then(function(data) {
    for(let i=0; i<data.length; i++) {
        //Vi indsætter vores annoncer i html-siden:
        document.getElementById("produkter-center").innerHTML+=`
            <div class= seAnnoncer>
                <h1>${data[i].titel}</h1>
                <p>${data[i].kategori}</p>
                <p>${data[i].pris}</p>
                <p>${data[i].ejer}</p>
                <p><img src="${data[i].billede}" style="height:50px; width:50px" /></p>
            </div>
        `;
    }
});

    


