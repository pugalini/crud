const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());



mongoose.connect('mongodb://localhost:27017/crud_app',{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if (!err){
        console.log("connected to db")
    }
    else{
        console.log("error")
    }
})

const Schema={
  name:String,
  emailAddress:String,
  items:String,
  qty:Number,
  rdd:String
}
const newData = mongoose.model('datas',Schema);


app.post("/post",async(req,res)=>{
  console.log("inserted post");

  const data = new newData({
    name:req.body.name,
    emailAddress:req.body.emailAddress,
    items:req.body.items,
    qty:req.body.qty,
    rdd:req.body.rdd
  })
  const val =await data.save();
  res.json(val);
})

app.get('/fetch/:name',function(req,res){
  fetchname=req.params.name;
  newData.find(({name:fetchname}),function(err,value){
    if(err){
      res.sendStatus('error')
    }
    else{ 
    if(value.length==0)
    {
      res.send('data does not exits');
    }
    else{
      res.send(value);
    }
  }
  })
})
app.get("/fetchall",(req,res)=>{
    newData.find((err,val)=>{
        if(err){
            console.log(err);
        }else{
            res.json(val)
        }
    })
})





app.put("/update/:name", async (req, res) => {

  let upname= req.body.name;
  let upemailAddress=req.body.emailAddress;
  let upitems= req.body.items;
  let upqty= req.body.qty;
  let uprdd=req.body.rdd;

  newData.findOneAndUpdate({name:upname},{$set:{emailAddress:upemailAddress,items:upitems,qty:upqty,rdd:uprdd}},
      {new:true},(err,data)=>{
          if(err){
              res.send("ERROR")
          }else{
          if(data==null){
              res.send("nothing found")
          }else{
              res.send(data)
          }
      }
      })
}) 
app.delete('/del/:name',function(req,res){
    let delname=req.params.name;
    newData.findOneAndDelete(({name:delname}),function(err,docs){
        if (err){
            res.send("ERROR")
        }else{
        if(docs==null){
            res.send("wrong")
        }
        else{
            res.send(docs);
        }
    }
    })
})
    
app.listen(8080,()=>{
  console.log("port 8080");
})
