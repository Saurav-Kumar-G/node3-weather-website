const request=require('request')
const geocode=(address,callback)=>{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2F1cmF2LWt1bWFyLTE0MDgiLCJhIjoiY2tyNXhsN3FlMDhsdDJxbHBoZTd4ZHV4bCJ9.X3R12cPiBFw_v7d5XZfDrQ'
request({url,json:true},(error,{body})=>{
    if(error)
        callback('unable to connect',undefined)
    else if(body.features.length===0)
    callback('unable to locate',undefined)
    else{
    callback(undefined,{
        latitude:body.features[0].center[1],
        longitude:body.features[0].center[0],
        location:body.features[0].place_name
    })
}
    })
}
//geocode('banglore',(error,data)=>{
  //  console.log('error',error)
    //console.log('data',data)
//})
module.exports=geocode