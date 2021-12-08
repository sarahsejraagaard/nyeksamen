const {expect} = require("chai")
const chai =require("chai")
const chaiHttp = require("chai-http")
const server = require("../server")

chai.use(chaiHttp)

describe("login", () => {
    describe("POST /login", () => {
        it("tester login", (done)=>{
            chai
            .request(server)
            .post("/login")
            .send({email: "sarah@", kodeord: "sarah"})
            .end((err,res)=> {
                expect(err).to.be.null
                expect(res.status).to.equal(400)
                done()
            })
        })
        
    })
})

/*
const {check} =require("../src/login")
const chai = require("chai");
const expect = chai.expect;

describe("login", () => {
    describe("POST /login", () => {
        it("Hvis brugeren bliver logget ind, burde den sende en statuskode 200", function (done) {
            chai
            .request("http://localhost:7000/")
            .post("/login")
            .send({email: "sarah@", kodeord: "sarah"})
            .end((err,res)=> {
                res.should.have.status(200)
                done()
            })
            describe("login", ()=> {
                describe("POST/login", ()=>{
                    it("den burde sende en fejlkode på 400 ved forkert intastet kodeord", function(done){
                        chai
                        .request("http://localhost:7000/")
                        .post("/login")
                        .send({email: "sarah@", kodeord: "sarah"})
                        .end((err,res)=> {
                            res.should.have.status(400)
                            done()
                    })})})
                    describe("login", ()=> {
                        describe("POST /login", ()=>{
                    it("den burde sende fejlkode 400 hvis ikke brugeren eksistere", function(done){
                        chai
                        .request("http://localhost:7000/")
                        .post("/login")
                        .send({email: "sarah@", kodeord: "sarah"})
                        .end((err,res)=> {
                            res.should.have.status(400)
                            done()
                        
})})})})})})})});
*/