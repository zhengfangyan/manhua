const express=require("express");
const router=express.Router();
const pool=require("../pool");
//Login数据
//login内容
router.get("/login",(req,res)=>{
  var uname=req.query.uname;
  var upwd=req.query.upwd;
  var sql="SELECT uid,uname,upwd FROM ct_user WHERE uname= ? AND upwd=md5(?)";
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err;
    if(result.length==1){
      res.send({code:1,msg:"登录成功"})
    }else{
      res.send({code:-1,msg:"用户名或密码有误"});
    }
  })
})
//reg数据
//reg内容
router.post("/regist",(req,res)=>{
  console.log(req.body);
  var {uname,phone,upwd,toupwd}=req.body;
  console.log(uname,phone,upwd,toupwd)
  var sql="select * from ct_user where uname=?";
  pool.query(sql,[uname],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:0,msg:"该用户名已被注册"});
      return;
    }
    else{
      pool.query("INSERT INTO ct_user VALUES(null,?,?,md5(?),md5(?))",[uname,phone,upwd,toupwd],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
          res.write(JSON.stringify({code:1,msg:"注册成功"}));
        }else{
          res.write(JSON.stringify({code:0,msg:"注册失败"}));
        }
          res.end();
    })
  }
  })
})
module.exports=router;