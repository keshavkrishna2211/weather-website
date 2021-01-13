const path=require('path')
const express = require('express')
const hbs =require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()
const port = process.env.PORT || 3000
//define path for express config
const PublicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//set up static dierctory to serve
app.use(express.static(PublicDirectoryPath))

app.get('',(req, res)=>{
  res.render('index',{
    title : 'Weather',
    name : 'Keshav'
  })
})
app.get('/about',(req,res)=>
{
  res.render('about', {
    title : 'About Me',
    name :'Keshav'
  })
})
app.get('/help',(req, res)=>{
  res.render('help',{
    helpText : ' feel free to ask',
    title :'Help',
    name :'Keshav'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address)
  {
    return res.send({
      error :' Provide the address'
    })
  }
  geocode(req.query.address,(error ,{latitude,longitude,location}={})=>{
    if(error)
    {
     return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData)=>
    { if(error){
      return res.send({error})
    }
    res.send(
      {
        forecast:forecastData,
        location,
        address:req.query.address
      }
    )
     
    })
  })


})
app.get('/products',(req,res)=>
{if(!req.query.search)
  {
     return res.send({error:'you must provide a search term'})
  }
  
  res.send({
    products:[]
  })
})
app.get('/help/*',(req,res)=>{
  res.render('error',{
    title : '404',
    name : 'Keshav',
    errorMessage : ' Article is not found'
  })
})
app.get('*',(req,res)=>{
  res.render('error',{
    errorMessage : 'Page not found',
    name : 'Keshav',
    title:'404'
  })
})
app.listen(port,()=>{
  console.log('server is up to port 3000'+port)
})
