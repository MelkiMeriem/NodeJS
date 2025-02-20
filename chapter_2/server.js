//the address of this server connected to the network is : http://localhost:3000
const express = require("express");
//define our backend application
const app =express();
/*we configure it and then we tell it to listen to incoming requests
* port , @IP
* */
const PORT=3000;

let data=['Meriem']


// MIDDLEWARE:
// This line configures our server to expect JSON data as incoming request
app.use(express.json())


/*HTTP  [VERBS (method) : creates the endpoint]and the routes ( or path )
configure our server to handle incoming get requests to this home route : /
the method inform the nature of request and the route is a further subdirectory , basically we
direct the request to the  body of code to respond appropriately , and these locations or
routes are called endpoints
* */


//Website endpoints : for sending back html , they typically come when a user enters a url in a browser
app.get("/",(req,resp)=>{
    // This is endpoint number 1
    console.log(" Yey I hit an endpoint",req.method)
    resp.send(`
<body style="background-color: pink">
  <h1>DATA: </h1>
  <p>
    ${JSON.stringify(data)}
  </p>
  <a href="/dashboard">Dashboard</a>
</body>`)

})
app.get("/dashboard",(req,resp)=>{
    resp.send(`
<body>
<h1>Dashboard</h1>
<a href="/">Home Page</a>
</body>
`);
})

app.get("/Simple",(req,resp)=>{
    resp.sendStatus(202)
})
//API endpoints : Non visual :
//CRUD-method :
// create(u post a parsel to someone else and it creates that package in their hands)
// read (get)
// update (put)
// delete (delete)

app.get('/api/data',(req,resp)=>{
    console.log('This one was for data')
    resp.send(data);
})

app.post('/api/data',(req,resp)=>{
    // someone wants to create a user for example when they click a sign up button
    /* The user clicks the sign up button after entering their credentials , and their browser is wired up to send out
    a network request to the server to handle that action
    * */
    const newEntry=req.body;
    resp.sendStatus(201);
    data.push(newEntry.name)
})

app.delete('/api/data',(req,resp)=>{
    data.pop()
    console.log('We deleted all the element of data array')
    resp.sendStatus(203)
})

app.listen(PORT, ()=>console.log(`Server has started on ${PORT}`));