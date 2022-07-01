import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async(req, res) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?id=1581130&appid=05f149a851779d5c599f4979a1f30bfd';
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
    if(data){
        res.render('weather', {data:data})
    }else{
        res.end('<h1>ERROR</h1>');
    }


})

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});
