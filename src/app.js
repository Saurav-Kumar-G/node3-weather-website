const path=require('path')
const express=require('express')
const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()

const port=process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        names:'saurav'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        names:'saurav kumar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'helpful text',
        title:'helpp',
        names:'kela ji'
    })
})
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.send('<h1>WEATHER</hi>')
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'provide address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        return res.send({error})
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error)
            return res.send({error})

            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
    })
})
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
    return res.send({
        error:'can not show'
    })
}
//console.log(req.query.search)
//res.send({
  //  products:[]
//})
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'saurav',
        errormessage:'bahut kela hard'
})
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'saurav',
        errormessage:'bahut hard bahut hard'
    })
})
    app.listen(port,()=>{
        console.log('server on port'+port)
    })