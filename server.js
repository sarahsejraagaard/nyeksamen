//Først installeres vores moduler, som vi skal benytte:

const express = require("express")
const app = express();
const session = require("express-session")
const fs = require("fs")

//Vi fortæller serven at den skal lytter på følgende port:
const PORT = 7000;
app.listen(PORT, () => {
    console.log(`server lytter på http://localhost:${PORT}`)
});

//Vi gør så serveren kan læse vores JSON filer:
app.use(express.json());
app.use("uploads", express.static("uploads"));

const options = {
    uploadDir: "./uploads"
}

app.use(session({
    secret: "godmorgen",
    resave: false,
    saveUninitialized: false

}));

app.use(express.urlencoded({ extended: false }));

const path = require("path");
const { stringify } = require("querystring");
// const { arrayBuffer } = require("stream/consumers");

//--- data---

/*
const loadUserDatabase= ()=>{
    const rawdata=fs.readFileSync("users.json");
    const users=JSON.parse(rawdata);
    return users
}

const saveUserDatabase = (changedUsers) => {
    const data = JSON.stringify(changeUsers);
    fs.write
}

*/
//vi laver et array, som brugerne kan være i. Jeg har hardcoded en bruger på forhånd:
let users = JSON.parse(fs.readFileSync("users.json"))
// let users = [
//     {
//         email: "sarah@",
//         kodeord: "hej",
//         navn: "Sarah"
//     },
// ];

function saveUsersdatabase() {
    fs.writeFileSync("users.json", JSON.stringify(users))
}

let annoncer = JSON.parse(fs.readFileSync("annoncer.json"))
/*
let annoncer = [
    {
        titel: "sarah@",
        kategori: "bukser",
        pris: 100,
        billede: "hej",
        ejer: "sarah@" //req.session.email 
    },
];*/
function saveAnnoncerdatabase() {
    fs.writeFileSync("annoncer.json", JSON.stringify(annoncer))
}



// ---- Nu oprettes vores end-points:-----

// BRUGER ENDPOINTS

/*Når man går ind på localhost 9000 kommer man ind på vores index.html (home)
Vi beder serven om noget, altså get-requst*/
app.get("/", (req, res) => {
    //hvis ikke der er en session, altså at brugeren har logget ind, redirecter vi brugeren til login-siden
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        //Når den responder sender den brugeren til vores index.html. Dirname giver os hele stien til nyeksamen
        res.sendFile(__dirname + "/views/index.html");
    }
});

//Her definerer vi at siden skal være statisk. Alt nedenfor denne linje vliver sådan:
app.use(express.static(path.join(__dirname, "views")));

//Når laver vi et login-endpoint
app.get("/login", (req, res) => {
    //Hvis der er en session, altså brugeren har logget ind, sender vi brugeren til home:
    if (req.session.email) {
        res.redirect("/");
    } else {
        //Når den responder sender den brugeren til vores login. Dirname giver os hele stien til nyeksamen
        res.sendFile(__dirname + "/views/login.html");
    }
});

//Vi laver et endpoint til et post request til login
app.post("/login", (req, res) => {
    for (let i = 0; i < users.length; i++) {
        //hvis brugerens email er den samme som i user arrayet (listen af brugere):
        if (users[i].email == req.body.email) {
            //herefter går vi videre og tjekker kodeordet:
            if (users[i].kodeord == req.body.kodeord) {
                //hvis de indtastede informationer passer til en bruger, opretter vi en session.
                req.session.email = req.body.email;
                //brugeren bliver sendt til home:
                res.redirect('/');
                return;
            }
            res.statusMessage = "Forkert password.";
            res.status(400).end();
            return;
        }
    }
    //hvis email ikke findes, sendes følgende:
    res.statusMessage = "Email eksisterer ikke.";
    res.status(400).end();
});


//Endpont til profil-siden (så brugeren forbliver logget på):
app.get("/profil", (req, res) => {
    //hvis ikke der er en session, altså at brugeren ikke har logget ind, redirecter vi brugeren til login-siden
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        //Når den responder sender den brugeren til vores profil.html. Dirname giver os hele stien til nyeksamen
        res.sendFile(__dirname + "/views/profil.html");
    }
});

//Når laver vi et opret-endpoint
app.get("/opret", (req, res) => {
    //Hvis der er en session, altså brugeren har logget ind, sender vi brugeren til home:
    if (req.session.email) {
        res.redirect("/");

    } else {
        //Når den responder sender den brugeren til vores login. Dirname giver os hele stien til nyeksamen
        res.sendFile(__dirname + "/views/opret.html");
    }
});

//vi laver et endpoint til en post request til at oprette en bruger
app.post("/opret", (req, res) => {

    //den information, som brugeren har sendt ind:
    const nyUser = {
        email: req.body.email,
        kodeord: req.body.kodeord,
        navn: req.body.navn
    }

    for (let i = 0; i < users.length; i++) {
        //hvis brugerens email er den samme som i user arrayet (listen af brugere):
        if (users[i].email === req.body.email) {
            res.statusMessage = "Email er allerede i brug";
            res.status(400).end();
            return;
        }
    }
    //hvis emailen ikke er i brug, pushes den nye brugers information til users arrayet:
    users.push(nyUser);
    saveUsersdatabase();
    res.status(200).send("brugeren er nu oprettet");
});

//her laver vi et endpoint, som tillader brugeren at slette in profil:
app.delete("/sletBruger", (req, res) => {
    for (let i = 0; i < users.length; i++) {
        //hvis den brugers email som er logget ind er den samme som i user arrayet (listen af brugere):
        if (users[i].email == req.session.email) {
            //Jeg benytter splice-metoden til at fjerne et (1) specifikt index fra arrayet:
            users.splice(i, 1);
            //Hvis email passer til den bruger som er logget ind fjernes det objekt fra 'users' arrayet og  deres session//
            req.session.email = null
            //brugeren bliver sendt til login:
            res.status(200).send("Din bruger er slettet");
            return;
        }
        //hvis email ikke findes, sendes følgende:
        res.statusMessage = "der skete en fejl";
        res.status(400).send("mailen findes ikke");
    }
});

//endpoint til at opdatere sit kodeord:
app.put("/profil/opdaterKodeord", (req, res) => {
    //den nye kode som brugeren sender defineres her:
    var nyKodeord = req.body.nyKodeord

    for (let i = 0; i < users.length; i++) {
        //brugeren som ønsker at opdatere kodeord findes:
        if (users[i].email == req.session.email) {
            users[i].kodeord = nyKodeord;
            saveUsersdatabase();
            res.status(200).send("Din kode er nu ændret");
            return;

        }
    }
    res.statusMessage = "der skete en fejl";
    res.status(400).send("mailen findes ikke");
});

//endpoint til at opdatere sit kodeord:
app.put("/profil/opdaterNavn", (req, res) => {
    //den nye kode som brugeren sender defineres her:
    var nytNavn = req.body.nytNavn

    for (let i = 0; i < users.length; i++) {
        //brugeren som ønsker at opdatere kodeord findes:
        if (users[i].email == req.session.email) {
            users[i].navn = nytNavn;
            saveUsersdatabase();
            res.status(200).send("Dit navn er nu ændret");
            return;
        }
    }
    res.statusMessage = "der skete en fejl";
    res.status(400).send("mailen findes ikke");
});


//logud endpoint:
app.get("/logud", (req, res) => {
    // brugerens session sættes til null:
    req.session.email = null;
    res.status(200).send("bruger en logget ud");
})



// ANNONCE ENDPOINTS

//Når laver vi et opret annonce endpoint
app.get("/opretAnnonce", (req, res) => {
    //Hvis der er en session, altså brugeren har logget ind, sender vi brugeren til home:
    if (!req.session.email) {
        res.redirect("/login");
    } else {
        //Når den responder sender den brugeren til vores opret annonce side. Dirname giver os hele stien til nyeksamen
        res.sendFile(__dirname + "/views/opretAnnonce.html");
    }
});

//vi laver et endpoint til en post request til at oprette en annonce
app.post("/opretAnnonce", (req, res) => {

    //den information, som brugeren har sendt ind:
    const nyAnnonce = {
        titel: req.body.titel,
        kategori: req.body.kategori,
        pris: req.body.pris,
        billede: req.body.billede,
        ejer: req.body.ejer,
        id: Math.floor(Math.random() * 1000000000)
    }

    /* Til edris:
    når man opdatere skal både emailen og annonce-id tjekkes om det stemmer overens
    */


    annoncer.push(nyAnnonce);
    saveAnnoncerdatabase();
    res.status(200).send("varen er nu oprettet");


});

//Vi benytter get til at få informationen om vores annoncer (så vi kan se dem)
app.get("/seAnnoncer", (req, res) => {
    res.status(200).send(annoncer);
})

//Vi benytter get til at få informationen om vores annoncer (så vi kan se dem)
app.get("/seBukserAnnoncer", (req, res) => {
    if (req.body.kategori == "Bukser") {
        res.status(200).send(annoncer);
    }
})

// edris (2/3): tjekke om annonceejeren er den som har sendt requesten. return personens annoncer
app.get("/seDineAnnoncer", (req, res) => {
    let brugerAnnoncer = [

    ]
    for (let i = 0; i < annoncer.length; i++) {
        if (annoncer[i].ejer == req.body.email) {
            brugerAnnoncer.push(annoncer[i])
        } else {

        }
    }
    res.json(brugerAnnoncer);
    });

/*her laver vi et endpoint, som tillader brugeren at slette sin annonce:
app.delete("/sletAnnonce", (req, res) => {
    for(let i=0; i<annoncer.length; i++) {
        //hvis den brugers email som er logget ind er den samme som i user arrayet (listen af brugere):
        if(annoncer[i].ejer == req.session.email) {
            //Jeg benytter splice-metoden til at fjerne et (1) specifikt index fra arrayet:
            users.splice(i,1);
            //Hvis email passer til den bruger som er logget ind fjernes det objekt fra 'users' arrayet og  deres session//
            req.session.email = null
            //brugeren bliver sendt til login:
            res.status(200).send("Din bruger er slettet");
            return;
    }
    //hvis email ikke findes, sendes følgende:
    res.statusMessage = "der skete en fejl";
    res.status(400).send("mailen findes ikke");
}});
*/