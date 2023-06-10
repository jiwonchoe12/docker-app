const express = require("express")
const bodyParser = require("body-parser");

const db = require('./db');

const app = express();

app.use(bodyParser.json());

//table 생성
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, field) => {
    console.log('results', results)
})


//db lists table에 있는 모든 데이터를 프론트 서버에 보내주기
app.get('/api/values', function(req, res){
    //database에서 모든 info 가져오기
    db.pool.query('SELECT * FROM lists;', 
    (err, results, fields) => {
        if (err)
            return res.status(500).send(err)
        else
            return res.json(results)
    })
})

//클라이언트에서 입력한 값을 데이터베이스 list table에 넣어주기
app.post('/api/value', function(req, res, next) {
    //데이터베이스에 값 넣어주기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fields) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json({success: true, value: req.body.value})
        })
})

app.listen(5000, () => {
    console.log('애플리케이션이 5000번 포트에서 시작되었습니다')
})