const request = require('request')
const forecast=(latitude , longitude , callback)=>
{
  const url ='http://api.weatherstack.com/current?access_key=7e0559845be2952c7439740981993eaf&query='+latitude+','+longitude+'&units=f'
  request({url, json :true}, (error , {body})=>{
    if(error)
    {
      callback('No network connectivity', undefined)
    }
    else if(body.error)
    { 
      callback('Unable to search', undefined)
    }
    else{
      callback(undefined ,{
        data : body.current.weather_descriptions[0] + ' . It is currently '+ body.current.temperature + ' degrees out . It feels like '+ body.current.feelslike +' degree.'
      })
    }
  })
}





module.exports=forecast