const request= require('request')
const geocode = (address , callback)=>
{

  const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2VzaGF2MjIiLCJhIjoiY2tqOHdvdWc0MGFjaTJ5cGV2eGV4and0MSJ9.j6NrQX7PrEoThCXTJsxyEA'
  request({ url , json : true}, (error , {body})=>
  {
    if(error)
    {
      callback('No internet Connectivity',undefined)
    }
    else if(body.features.length===0)
    {
      callback('no such palce with this name', undefined)

    }
    else{
      callback(undefined , {
        longitude :body.features[0].center[0],
        latitude : body.features[0].center[1],
        location :body.features[0].place_name
      })
    }
  })
}
module.exports = geocode