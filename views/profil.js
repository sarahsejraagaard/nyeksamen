//Vi laver en listener til knappen opdater dit kodeord:
document.getElementById("submitNyKodeord").addEventListener("click", () => {

    let nyKodeord = {
        "nyKodeord": document.getElementById("nyKodeord").value
    }

    //vi går ind og tager (fetcher) i det nedenstående spor:
    fetch("/profil/opdaterKodeord", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        //body:
        body: JSON.stringify(nyKodeord)
    })
        .then(function (data) {
            if (data.statusText == "OK") {
                window.alert("Din kode er nu opdateret");
                //Hvis den indtastede data er korrekt, får vi en status ok, og brugeren bliver sendt til profil:
                document.location.href = "/profil";
            } else {
                //Hvis ikke den indtstede data er korrenkt får vi en fejlmeddelelse, som svarer til vores data
                document.getElementById("fejlmeddelelse").innerHTML = data.statusText;
            }
        })
});

//Vi laver en listener til knappen nytNavn
document.getElementById("submitNytNavn").addEventListener("click", () => {

    let nytNavn = {
        "nytNavn": document.getElementById("nytNavn").value
    }

    //vi går ind og tager (fetcher) i det nedenstående spor:
    fetch("/profil/opdaterNavn", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        //body:
        body: JSON.stringify(nytNavn)
    })
        .then(function (data) {
            if (data.statusText == "OK") {
                window.alert("Dit navn er nu opdateret");
                //Hvis den indtastede data er korrekt, får vi en status ok, og brugeren bliver sendt til profil:
                document.location.href = "/profil";
            } else {
                //Hvis ikke den indtstede data er korrenkt får vi en fejlmeddelelse, som svarer til vores data
                document.getElementById("fejlmeddelelse").innerHTML = data.statusText;
            }
        })
});


//Vi laver en listener til knappen slet bruger:
window.addEventListener("load", () => {
    document.getElementById("sletBruger").addEventListener("click", () => {

        //vi går ind og tager (fetcher) i det nedenstående spor:
        fetch("/sletBruger", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            //vi har ingen body, fordi vi ikke sender noget til serveren
        })
            //svaret som vi får fra fetch:
            .then(function (data) {
                if (data.statusText == "OK") {
                    //Hvis den indtastede data er korrekt, får vi en status ok, og brugeren bliver sendt til login:
                    document.location.href = "/login";
                } else {
                    //Hvis ikke den indtstede data er korrenkt får vi en fejlmeddelelse, som svarer til vores data
                    document.getElementById("fejlmeddelelse").innerHTML = data.statusText;
                }
            })
    })

});


//Listener til log ud:
document.getElementById("logud").addEventListener("click", () => {

    //vi går ind og tager (fetcher) i det nedenstående spor:
    fetch("/logud", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        //vi har ingen body, fordi vi ikke sender noget til serveren
    })
        //svaret som vi får fra fetch:
        .then(function (data) {
            if (data.statusText == "OK") {
                //Hvis den indtastede data er korrekt, får vi en status ok, og brugeren bliver sendt til login:
                document.location.href = "/login";
            } else {
                //Hvis ikke den indtstede data er korrenkt får vi en fejlmeddelelse, som svarer til vores data
                document.getElementById("fejlmeddelelse").innerHTML = data.statusText;
            }
        })
})




//Nedenfor tages fat i end-pointet /seDineAnnoncer, som gør en bruger kan se dens oprettede annoncer:
ware_table= document.getElementById("vare_table")
ware_table.innerHTML= `
<tr>
    <th>titel</th>
    <th>kategori</th>
    <th>pris</th>
    <th>billede</th>
</tr>
`

fetch("/seDineAnnoncer", {
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
        ware_table.innerHTML+=`
            <table class= seAnnoncer>
                <tr>
                    <td>${data[i].titel}</td>
                    <td>${data[i].kategori}</td>
                    <td>${data[i].pris}</td>
                    <td>${data[i].ejer}</td>
                    <td><img src="${data[i].billede}" style="height:50px; width:50px" /></td>
                    <td><button onclick id="Edit"> Edit </button></td>
                </tr>
                
            </table>
        `;
    }
});




        /*svaret som vi får fra fetch:
.then(function (data) {
if (data.statusText == "OK") {
//Hvis den indtastede data er korrekt, får vi en status ok, og brugeren bliver sendt til login:
document.location.href = "/login";
} else {
//Hvis ikke den indtstede data er korrenkt får vi en fejlmeddelelse, som svarer til vores data
document.getElementById("fejlmeddelelse").innerHTML = data.statusText;
}
})
});

*/


/*Vi laver en listener til knappen slet annonce:
window.addEventListener("load", () => {
    document.getElementById("sletBruger").addEventListener("click", () => {

        //vi går ind og tager (fetcher) i det nedenstående spor:
        fetch("/sletBruger", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    //vi har ingen body, fordi vi ikke sender noget til serveren
    })
    //svaret som vi får fra fetch:
    .then(function(data) {
        if(data.statusText=="OK") {
            //Hvis den indtastede data er korrekt, får vi en status ok, og brugeren bliver sendt til login:
            document.location.href="/login";
        } else {
            //Hvis ikke den indtstede data er korrenkt får vi en fejlmeddelelse, som svarer til vores data
            document.getElementById("fejlmeddelelse").innerHTML= data.statusText;
        }
    })
})

*/



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