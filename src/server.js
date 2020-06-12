const express = require('express');
const path = require('path');


const server = express();

//banco de dados
const db = require('./database/db')

//configurar pasta publica
server.use(express.static('public'));

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))

//utilizando template engine
const nunjucks = require('nunjucks');
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

server.get('/', (req, res) => {
    return res.render("index.html", { title: "Um título" })
})

server.get('/create-point', (req, res) => {

    //re.query: URL
    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {

    //req.body: Resultado do formulário
    //console.log(req.body)    

    //inserir dados no banco de dados

    //inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (
            ?,?,?,?,?,?,?
        );
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err){
        if(err){
            console.log(err)
            res.send("Erro no Cadastro")
        }

        console.log('Cadastrado com sucesso')
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData);

})

server.get('/search', (req, res) => {
    const search = req.query.search

    if(search == ""){
        //Pesquisa Vazia
        return res.render("search-results.html", {total: 0})
    }



    //consultar dados 
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length;
        //mostrar a página html com os dados do BD
        return res.render("search-results.html", {places: rows, total})
    })

})

server.listen(3000, () => {
    console.log('Server is up and running')
});