const express=require('express')

const router=express.Router()
const fs=require('fs')
const mysql=require('mysql')

const db=mysql.createPool({
    host:'127.0.0.1',//数据库的ip地址
    user:'root',//登录数据库的账号
    password:'admin123',//登录数据库的密码
    database:'movie_database'//指定要操作哪个数据库
})

/*视频流函数*/
function Stream(req,res) {
    let path = '../static/movie/原神·水手服妮露.mp4'
    let stat = fs.statSync(path);
    let fileSize = stat.size;
    let range = req.headers.range;
    //fileSize 3332038
    if (range) {
        //有range头才使用206状态码

        let parts = range.replace(/bytes=/, "").split("-");
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;

        // end 在最后取值为 fileSize - 1
        end = end > fileSize - 1 ? fileSize - 1 : end;

        let chunksize = (end - start) + 1;
        let file = fs.createReadStream(path, {start, end});
        let head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        let head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
        // res.setHeader("content-type","application/vnd.apple.mpegurl")
    }
}

/*视频展示栏裁剪函数，控制每次只返回12条数据*/
function ArrayClip(arr=[],page=1){
    const newArr=arr.slice((page-1)*12,page*12)
    return newArr
}

/*从输入中随机返回12条数据，用于相关推荐栏*/
function RandomClip(arr=[]){
    const newArr=new Array()
    if(arr.length<12) return arr
    while (true){
        let index=parseInt(Math.random()*(arr.length+1))
        newArr.push(arr[index])
        if(newArr.length==12) return newArr
    }
}

/*获取首页侧边导航栏的接口*/
router.get('/home/navigation',(req,res)=>{
    let sql='select * from home_navigation'
    db.query(sql,(err,result)=>{
        res.send({
            status:200,
            data:result
        })
    })
})

/*获取首页轮播图的接口*/
router.get('/home/carousel',(req, res)=>{
    db.query('select * from home_carousel',(err,result)=>{
        // console.log('获取轮播图成功')
        res.send({
            status:200,
            msg:'成功',
            data:result
        })
    })
})

/*获取首页各分类的图片*/
router.get('/home/typeItem',(req, res)=>{
    const sql = 'select typeId,typeName,typeEnglish from home_typeItem'
    let arr = new Array()
    db.query(sql, (err, result1) => {
        new Promise((resolve, reject)=>{
            result1.forEach(item => {
                const sql2 = `select imgId, imgText, imgUrl, onlyIndex, belongType
                          from home_allImg
                          where belongType = \'${item.typeName}\'`
                db.query(sql2, (err, result2) => {
                    item.typeList = RandomClip(result2)
                    arr.push(item)
                    if(arr.length==result1.length){
                        resolve(1)
                    }
                })
            })
        }).then((value)=>{
            res.send({
                status:200,
                msg:'请求成功',
                data:arr
            })
        })
    })

})

/*点击从home页面跳转到视频详情页面*/
router.post('/movieDetail/:onlyIndex',(req,res)=>{
    const sql=`select detailId,detailName,detailText,detailType,detailMsg,detailEpisodes,imgUrl,onlyIndex from movie_detail where onlyIndex=\'${req.params.onlyIndex}\'`
    db.query(sql,(err,result)=>{
        res.send({
            status:200,
            msg:'请求成功',
            data:result[0]//因为点击的只有一个，所以使用唯一标识取出的只有对应的那一个数据，直接返回
        })
    })
})

/*视频详情页面的相关推荐栏*/
router.post('/movieDetail/recommend/:onlyIndex',(req, res)=>{
    const dataList=new Array()
    const sql=`select belongType from home_allimg where onlyIndex=\'${req.params.onlyIndex}\'`
    db.query(sql,(err,typeResult)=>{
        const sql2=`select * from home_allimg where belongType=\'${typeResult[0].belongType}\'`
        const recommendList=new Object()
        recommendList.typeName='相关推荐'
        recommendList.typeEnglish='About Recommend'
        db.query(sql2,(err,recommendResult)=>{
            recommendResult.forEach((item,index)=>{
                if(item.onlyIndex===req.params.onlyIndex){
                    recommendResult.splice(index,1)
                }
            })
            recommendList.typeList=RandomClip(recommendResult)
            dataList.push(recommendList)
            res.send({status:200,msg:'请求成功',data:dataList})
        })
    })

})


/*从视频详情点击跳转，根据集数跳转到对应视频*/
router.post('/moviePlay',(req, res)=>{
    const {onlyIndex,index}=req.body
    const sql=`select playName,allEpisodesUrl from movie_play where onlyIndex=\'${onlyIndex}\'`
    db.query(sql,(err,result)=>{
        const {playName,allEpisodesUrl}=result[0]
        const realIndex=`第${index}话.mp4`
        const oneEpisodeUrl=allEpisodesUrl+`/${playName} ${realIndex}`
        console.log(oneEpisodeUrl)
        res.send({
            status:200,
            msg:'请求成功',
            data:{oneEpisodeUrl}
        })
    })
})

/*首页通过侧边导航栏跳转到对应总类别*/
router.post('/home/type',(req, res)=>{
    let {type}=req.body
    let allType=new Array()
    const newSql=`select * from type_new where belongtype=\'${type}\'`
    const rankSql=`select * from type_rank where belongtype=\'${type}\'`
    const lastSql=`select * from type_lastest where belongtype=\'${type}\'`
    db.query(newSql,(err,newResult)=>{
        let newObj=new Object()
        newObj.typeName='新片上线'
        newObj.typeEnglish='New Moviework'
        newObj.typeList=ArrayClip(newResult)
        allType.push(newObj)
        db.query(rankSql,(err,rankResult)=>{
            let newObj=new Object()
            newObj.typeName='排行榜'
            newObj.typeEnglish='Rank Work'
            newObj.typeList=ArrayClip(rankResult)
            allType.push(newObj)
            db.query(lastSql,(err,lastResult)=>{
                let newObj=new Object()
                newObj.typeName='最近更新'
                newObj.typeEnglish='Lastest Update'
                newObj.typeList=ArrayClip(lastResult)
                allType.push(newObj)
                res.send({status:200,msg:'请求成功',data:allType})
                console.log('获取总类型成功')
            })
        })
    })
})

/*总类别从类别首页跳转到库*/
router.post('/home/typeStore',(req, res)=>{
    let {type,page}=req.body
    let arr=new Array()
    let obj=new Object()
    const sql=`select * from home_allimg where belongtype=\'${type}\'`
    db.query(sql,(err,result)=>{
        obj.typeList=ArrayClip(result,page)
        arr.push(obj)
        res.send({status:200,msg:'请求成功',data:arr})
    })
    console.log('跳转到库',page)
})

/*总类别切换排行榜类型 day-week-month*/
router.post('/home/type/rank',(req, res)=>{
    let {rankType}=req.body
    let {a}=req.params
    const sql='select * from type_rank'
    console.log(rankType)
    db.query(sql,(err,result)=>{
       let arr=new Array()
        result.forEach((item)=>{
            arr.push(item.rank)
        })
        const rankArr=arr.map((item)=>{
            let reg = new RegExp(`${rankType}[0-9]+`, 'g')
           item=item.match(reg)
            console.log(item)
        })
    })
    res.send({status:200,msg:'请求成功'})
})

module.exports=router