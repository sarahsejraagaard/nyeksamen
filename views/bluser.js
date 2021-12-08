//Der sendes en request til /seShirtsAnnoncer:
    
fetch("/getBluserAnnoncer", {
    method: "GET", 
    headers: {
        "Content-Type": "application/json", 
    }, 

})
//Den data vi får fra fetchen:
.then(function(data) {
    //vi tager vores response og laver 
    return data.json();
})

.then(function(data) {
    console.log(data);
    for(let i=0; i<data.length; i++) {
        //Vi indsætter vores annoncer i html-siden:
        document.getElementById("seBluseAnnoncer").innerHTML+=`
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


