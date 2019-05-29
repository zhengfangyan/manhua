 //app.js
 //1:复制服务器端模块
 //2:引入第三方模块
 //  mysql/express/
 const express = require("express");
 const bodyparser=require("body-parser")
 const pool=require("./pool")
 const session=require("express-session");
 //1.1引入跨域模块
 const cors=require("cors");
 /*引入路由模块*/
 var user=require("./router/user");
 //4:创建express对象
 var server = express(); 
//  配置session
server.use(session({
  secret:"128为字符串",
  resave:true,
  saveUninitialized:true
}))
 //1.2配置运行列表3000运行8080脚手架访问
 //credentials:true提高安全级别每次访问验证
 //origin允许访问的地址
 server.use(cors({origin:["http://127.0.0.1:8080","http://localhost:8080"],credentials:true}))
 //5:绑定监听端口 3000
 server.listen(5050,function(){
  console.log("服务器启动")
});
//使用body-parser中间件
server.use(bodyparser.urlencoded({extended:false}));
//托管静态资源到public目录下
 server.use(express.static("public"));
 server.use("/user",user);
 //首页轮播图
 // 1.将轮播保存在服务器端public/Image
 // 2.接收客户端发送请求，/imglist
 //Index数据
  server.get("/imglist",(req,res)=>{
  // 3.创建数据发送客户
    var sql="SELECT cid,title,img FROM ct_index_carousel";
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result}); 
    })
  });
  //index主体
   server.get("/center1",(req,res)=>{
    var sql="SELECT pid,title,limg,href,type,author,seq_top_sale,click FROM ct_index_product order by rand() limit 6";
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result});
    })
  })
  server.get("/center",(req,res)=>{
    var sql="SELECT pid,title,limg,href,type,author,seq_top_sale,click FROM ct_index_product";
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result});
    })
  })
  //product数据
  //product内容
  server.get("/cantent",(req,res)=>{
    var sql="SELECT lid,limg,title,author,type,click,href,rank,ltop_sale FROM ct_laptop";
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result});
    })
  })
  server.get("/MH",(req,res)=>{
    var type=req.query.type;
    var sql="SELECT lid,limg,title,author,type,click,href,rank,ltop_sale FROM ct_laptop WHERE type LIKE '少年|魔幻%'  UNION SELECT pid,limg,title,author,type,click,href,seq_top_sale,null as rank FROM ct_index_product where type LIKE '少年 魔幻%'"
    pool.query(sql,[type,type],(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result});
    })
  })
  server.get("/SH",(req,res)=>{
    var type=req.query.type;
    var sql="SELECT lid,limg,title,author,type,click,href,rank,ltop_sale FROM ct_laptop WHERE type LIKE '少女|生活%' UNION SELECT pid,limg,title,author,type,click,href,seq_top_sale ,null as rank FROM ct_index_product where type LIKE '少女|生活%'"
    pool.query(sql,[type,type],(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result});
    })
  })
  server.get("/GX",(req,res)=>{
    var type=req.query.type;
    var sql="SELECT lid,limg,title,author,type,click,href,rank,ltop_sale FROM ct_laptop WHERE type LIKE '%搞笑%'  UNION SELECT pid,limg,title,author,type,click,href,seq_top_sale ,null as rank FROM ct_index_product where type LIKE '%搞笑%'"
    pool.query(sql,[type,type],(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result});
    })
  })
  server.get("/KH",(req,res)=>{
    var type=req.query.type;
    var sql="SELECT lid,limg,title,author,type,click,href,rank,ltop_sale FROM ct_laptop WHERE type LIKE '%少年|科幻%'  UNION SELECT pid,limg,title,author,type,click,href,seq_top_sale ,null as rank FROM ct_index_product where type LIKE '%少年|科幻%'"
    pool.query(sql,[type,type],(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result});
    })
    })
  server.get("/TL",(req,res)=>{
    var type=req.query.type;
    var sql="SELECT lid,limg,title,author,type,click,href,rank,ltop_sale FROM ct_laptop WHERE type LIKE '%推理%'  UNION SELECT pid,limg,title,author,type,click,href,seq_top_sale ,null as rank FROM ct_index_product where type LIKE '%推理%'"
    pool.query(sql,[type,type],(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result});
    })
  })
  //Rank数据
  //rank内容
  server.get("/rank",(req,res)=>{
    var sql="SELECT lid,limg,title,author,type,click,href,ltop_sale FROM ct_laptop  order by rand() limit 30";
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result});
    })
  })
  server.get("/r_rank",(req,res)=>{
    var sql="SELECT rank FROM ct_laptop";
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result});
    })
  })
  //Refer数据
  //refer内容
   server.get("/refer",(req,res)=>{
    var type=req.query.type;
    console.log(type);
    var sql=`SELECT lid,limg,title,author,type,click,href,rank,ltop_sale FROM ct_laptop WHERE type LIKE '%${type}%'` ;
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      if(result.length>0){
        res.send({code:1,data:result});
      }else{
        res.send({code:0,msg:`"${type}"`})
      }
    })
  })
