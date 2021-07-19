const request=require('request')
const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=6e6731e7a97f8e7b9d3f92f9e9e841bf&query='+latitude+','+longitude+'&units=f'
request({url,json:true},(error,{body})=>{
    if(error)
        callback('unable',undefined)
    else if(body.error)
    callback('unable to locate',undefined)
    else
    callback(undefined,body.current.weather_descriptions[0]+ ". It is currently " + body.current.temperature +" degrees out. It feels like "+body.current.feelslike +" degree out.")
    })
}
module.exports=forecast