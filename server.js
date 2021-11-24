//Først installeres vores moduler, som vi skal benytte:

const express = require ("express")
const app = express();
const session = require("express-session")

//Vi fortæller serven at den skal lytter på følgende port:
app.listen(9000)

//Vi gør så serveren kan læse vores JSON filer:
app.use(express.json());

app.use(session({
    secret: "godmorgen",
    resave: false,
    saveUninitialized: false

}));

app.use(express.urlencoded({extended:false}));

const path = require("path");

//--- data---

//vi laver et array, som brugerne kan være i. Jeg har hardcoded en bruger på forhånd:
let users = [
    {
        email: "sarah@",
        kodeord: "hej",
        navn: "Sarah"
    },
];
// ---- Nu oprettes vores end-points:-----

/*Når man går ind på localhost 9000 kommer man ind på vores index.html (home)
Vi beder serven om noget, altså get-requst*/
app.get("/", (req, res) => {
    //hvis ikke der er en session, altså at brugeren har logget ind, redirecter vi brugeren til login-siden
    if (!req.session.email) {
        res.redirect("/login");
    } else {
       //Når den responder sender den brugeren til vores index.html. Dirname giver os hele stien til nyeksamen
    res.sendFile(__dirname+"/views/index.html");
    }
});

//Her definerer vi at siden skal være statisk. Alt nedenfor denne linje vliver sådan:
app.use(express.static(path.join(__dirname, "views")));

//Når laver vi et login-endpoint
app.get("/login", (req, res) =>{
    //Hvis der er en session, altså brugeren har logget ind, sender vi brugeren til home:
    if (req.session.email) {
        res.redirect("/");
    } else {
       //Når den responder sender den brugeren til vores login. Dirname giver os hele stien til nyeksamen
    res.sendFile(__dirname+"/views/login.html");
    }
});

//Vi laver et endpoint til et post request til login
app.post("/login", (req, res) => {
    for(let i=0; i<users.length; i++) {
        //hvis brugerens email er den samme som i user arrayet (listen af brugere):
        if(users[i].email == req.body.email) {
            //herefter går vi videre og tjekker kodeordet:
            if(users[i].kodeord == req.body.kodeord) {
                //hvis de indtastede informationer passer til en bruger, opretter vi en session.
                req.session.email = req.body.email;
                //brugeren bliver sendt til home:
                res.redirect('/');
                return;
            }
            console.log("her");
            res.statusMessage = "Forkert password.";
            res.status(400).end();
            return;
        }
    }
    //hvis email ikke findes, sendes følgende:
    res.statusMessage = "Email eksisterer ikke.";
    res.status(400).end();
});

//vi laver et endpoint til en post request til at oprette en bruger
app.post("/opret", (req, res) => {
    const user= (
        email= req.body.email, 
        kodeord= req.body.kodeord, 
        navn= req.boby.navn
    )
    //hvis de indtastede informationer passer til en bruger, opretter vi en session.
    req.session.email = req.body.email;
                
    res.redirect('/');
});
