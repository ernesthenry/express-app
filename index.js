import express, { request } from "express"
import data from './data/data'

const app = express();

const PORT = 3000;


// method to use JSON
// app.use(express.json())
app.use(express.urlencoded({extended: true}))


// this is for the public folder on path /
app.use(express.static('public'))

// this is for images folder on path images
app.use('/images', express.static('images'))

// app.get("/", (req,res)=>
// res.json(data)
// )

app.post('/newItem', (req,res) =>{
    console.log(req.body)
    res.send(req.body)
})

app.get('/item/:id', (req,res, next) =>{
    // This is the middleware that pulls the data
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user])
    // middleware that uses the request object
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    // everything above is middleware
    res.send(data[user]);
    next()
}, (req,res) =>
    console.log('Did you get the right data?')
);

app.route('/item')
.get((req, res) => {
    throw new Error();
    // res.download("images/ernest.jpg")
    // res.redirect('http://www.linkedin.com')
    // res.end()  Ends a call to an api
    res.send(`a get request with /item route on port ${PORT}`)
})
.post((req,res)=>
    res.send(`a post request with /newItem route on port ${PORT}`)
)
.put((req,res)=>
    res.send(`a put request with /item route on port ${PORT}`)
)
.delete((req,res)=>
    res.send(`a delete request with /item route on port ${PORT}`)
)

// Error handling function

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send(`Red alert! Red alert! ${err.stack}`)
})

app.listen(PORT, ()=> {
    console.log(`Your server is running on port ${PORT}`)
});

