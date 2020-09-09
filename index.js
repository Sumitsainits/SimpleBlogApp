const express = require('express');
const Pool = require('pg').Pool;
const bodyParser = require('body-parser');
const port = 5000;

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'genericpassword',
    port: 5432,
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    next();
  });

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())
app.use(express.json({
    type: ['application/json', 'text/plain']
}));


app.post('/register', (req, res) => {
    console.log(req.body);
    const { name, email, pass } = req.body
    pool.query("INSERT INTO users (name, emailid, password, loggedin) VALUES ($1, $2, crypt($3,gen_salt('md5')), $4)", [name, email, pass, false], (error, results) => {
        if (error) {
            console.log(error.code);
            if (error.code == '23505') {
                res.send({ error: "Given email is already redistered.Please try to register with different account." });
                return
            }
            res.send({ error: 'Server error.Please try ater some time' });
            return
        }
        console.log(results);
        res.send({ data: "Users added successfully" })
    })
});

app.post('/login', (req, res) => {
    console.log(req.body);
    const { email, pass } = req.body;
    pool.query("select * from users where emailid=$1 and password=crypt($2,password)", [email, pass], (error, results) => {
        console.log(results)
        if (error) {
            console.log(error);
            return
        }
        if (results.rows[0] == undefined){
            res.send({error:'User id and password didnot match'});
            return
        }
        pool.query('update users set loggedin = true where emailid=$1',[results.rows[0].emailid],(error,result)=>{
            if(error) console.log(error);
            console.log("Required feild changes successfully");
        })
        console.log(results.rows[0].name);
        res.send({error:"",...results.rows[0]});
    })
});


app.post('/savepost', (req, res) => {
    const { title, post, emailid, time } = req.body;
    pool.query('insert into posts(emailid,posttext,title,timeofpost) values ($1, $2, $3, $4); ', [emailid, post, title, time], (errors, results) => {
        if (errors) throw errors
        pool.query('SELECT id from posts ORDER BY id DESC LIMIT 1;',(error,results)=>{
            if(error){
                res.send({...error});
                return
            }
            res.send({error:"",...results.rows[0]});
        })
    })
})

app.post('/deletepost', (req, res) => {
    pool.query('delete from posts where id = $1;',[req.body.id], (errors, results) => {
        if (errors) {
            res.send({error:"Unable to delete your post"});
            return
        }
        console.log(results.rows);
        res.send({error:"",data:"Data removed successfully",id:req.body.id});
    })
})

app.get('/getallposts', (req, res) => {
    pool.query('select users.name, posts.id,  posts.emailid, posts.title, posts.posttext, posts.timeofpost  from users    right join posts on users.emailid = posts.emailid;', (errors, results) => {
        if (errors) throw errors
        console.log(results.rows);
        res.send(results.rows);
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

