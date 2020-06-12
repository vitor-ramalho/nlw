const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./src/database/database.db")



module.exports = db;
/* 
//utilizar objeto de banco de dados
db.serialize(() => {
    //criar tabelas
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do sul",
        "Papéis e Papelão"
    ];

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log('Cadastrado com sucesso')
        console.log(this)
    }

    db.run(query, values, afterInsertData);

    
    //deletar dados da tabela
    
    db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
        if(err){
            return console.log(err)
        }
        
        console.log("Registro deletado com sucesso!");
    })

    //consultar dados 
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }

        console.log('Aqui estão seus registros')
        console.log(rows)
    }) 
})
*/