const axios = require('axios')

// 控制层  
exports.textCtrl = (req, res) => {
  
  res.status(200).send({data: [
    {
        "id": 10,
        "btitle": "BLOCK_HEIGHT",
        "bread": "558708.0000000000",
        "bcomment": 0
    },
    {
        "id": 11,
        "btitle": "HUSD_AMOUNT",
        "bread": "212.3278000000",
        "bcomment": 0
    },
    {
        "id": 12,
        "btitle": "BTC_AMOUNT",
        "bread": "0.0141508200",
        "bcomment": 0
    }
  ]})
}

// 获取横向滚动条内容
exports.channelsCtrl = (req, res) => {
    res.status(200).send({data: [
        {
            "id": 0,
            name:'前端'
        },{
            "id": 1,
            name:'html'
        },{
            "id": 2,
            name:'css'
        },{
            "id":3,
            name:'js'
        },{
            "id": 4,
            name:'vue'
        },{
            "id": 5,
            name:'react'
        },{
            "id": 6,
            name:'angular'
        },
      ]}
    )
}

// 获取展示内容
exports.articleCtrl = (req, res) => {
    res.status(200).send({data: [
        {
            "id": 0,
            art_id:1,
            title:"Est eu ipsum exercitation sint qui cillum anim officia cupidatat deserunt amet.",
            auth_id:11,
            auth_name:'auth_name',
            comment_count:111,
            is_top:1,
            pubdate:'2019-05-04 14:00:00',
            cover:{
                type:0,
                images:['']
            }
        },{
            "id": 1,
            art_id:1,
            title:"Elit nisi enim occaecat enim enim sint cupidatat reprehenderit sunt ullamco proident consectetur.",
            auth_id:11,
            auth_name:'auth_name',
            comment_count:111,
            is_top:1,
            pubdate:'2019-05-04 14:00:00',
            cover:{
                type:1,
                images:['https://cdn.jsdelivr.net/gh/flutterchina/website@1.0/images/flutter-mark-square-100.png']
            }
        },{
            "id": 2,
            art_id:1,
            title:"Id laboris quis ea reprehenderit laboris aliqua.",
            auth_id:11,
            auth_name:'auth_name',
            comment_count:111,
            is_top:1,
            pubdate:'2019-05-04 14:00:00',
            cover:{
                type:3,
                images:[
                    'https://cdn.jsdelivr.net/gh/flutterchina/website@1.0/images/flutter-mark-square-100.png',
                    'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=d66483fa0f3b5bb5aada28ac57babe5c/c83d70cf3bc79f3d068c6661b6a1cd11728b2976.jpg',
                    'https://cdn.jsdelivr.net/gh/flutterchina/website@1.0/images/flutter-mark-square-100.png'
                ]
            }
        },{
            "id":3,
            art_id:1,
            title:"Incididunt consectetur ex incididunt proident aliquip amet consectetur.",
            auth_id:11,
            auth_name:'auth_name',
            comment_count:111,
            is_top:1,
            pubdate:'2019-05-04 14:00:00',
            cover:{
                type:1,
                images:['https://cdn.jsdelivr.net/gh/flutterchina/website@1.0/images/flutter-mark-square-100.png']
            }
        },{
            "id": 4,
            art_id:1,
            title:"Aliquip consequat veniam aliqua in amet exercitation.",
            auth_id:11,
            auth_name:'auth_name',
            comment_count:111,
            is_top:1,
            pubdate:'2019-05-04 14:00:00',
            cover:{
                type:1,
                images:['https://cdn.jsdelivr.net/gh/flutterchina/website@1.0/images/flutter-mark-square-100.png']
            }
        },{
            "id": 5,
            art_id:1,
            title:"Ea nisi magna dolore ut cillum ipsum.",
            auth_id:11,
            auth_name:'auth_name',
            comment_count:111,
            is_top:0,
            pubdate:'2019-05-04 14:00:00',
            cover:{
                type:1,
                images:['https://cdn.jsdelivr.net/gh/flutterchina/website@1.0/images/flutter-mark-square-100.png']
            }
        },{
            "id": 6,
            art_id:1,
            title:"Elit reprehenderit eu voluptate non officia eiusmod et voluptate reprehenderit elit dolor.",
            auth_id:11,
            auth_name:'auth_name',
            comment_count:111,
            is_top:0,
            pubdate:'2019-05-04 14:00:00',
            cover:{
                type:1,
                images:['https://cdn.jsdelivr.net/gh/flutterchina/website@1.0/images/flutter-mark-square-100.png']
            }
        },
      ]}
    )

}


// 获取 我的频道
exports.userChannelsCtrl = (req, res) => {
    res.status(200).send({
        data:{
            channels:[{
                id:0,
                name:'热门'
            },{
                id:1,
                name:'html'
            },{
                id:2,
                name:'css'
            },{
                id:3,
                name:'js'
            },]
        }
    })
}

// 获取 推荐频道我的频道
exports.allChannelsCtrl = (req, res) => {
    res.status(200).send({
        data:{
            channels:[{
                id:0,
                name:'热门'
            },{
                id:1,
                name:'html'
            },{
                id:2,
                name:'css'
            },{
                id:3,
                name:'js'
            },{
                id:4,
                name:'vue'
            },{
                id:5,
                name:'react'
            },{
                id:6,
                name:'flutter'
            },{
                id:7,
                name:'RN'
            },]
        }
    })
}

// 获取用户信息
exports.userInfoCtrl = (req, res) => {
    res.status(200).send({
        data:{
            en_name:'nordon',
            zh_name:'王耀'
        }
    })
}

// 获取文章详情
exports.articleDetailCtrl = (req, res) => {
    console.log('文章id',req.query.id);
    
    res.status(200).send({
        data:{
            art_id:req.query.id + 1,
            title:'Adipisicing officia pariatur dolor eiusmod consequat reprehenderit fugiat nulla cillum aliqua.',
            pubdate:'2019-05-05 22:10:00',
            auth_id:req.query.id + 11,
            auth_name:`王耀-${Math.floor(Math.random() * 1000)}号`,
            auth_photo:'https://cdn.jsdelivr.net/gh/flutterchina/website@1.0/images/flutter-mark-square-100.png',
            is_followed:true,
            recomments:[
                {
                    title:`${Math.floor(Math.random() * 1000)} pms 威武雄壮 ~~~`,
                    id:Math.floor(Math.random() * 1000)
                },
                {
                    title:`${Math.floor(Math.random() * 1000)} pms 威武雄壮 ~~~`,
                    id:Math.floor(Math.random() * 1000)
                }, 
                {
                    title:`${Math.floor(Math.random() * 1000)} pms 威武雄壮 ~~~`,
                    id:Math.floor(Math.random() * 1000)
                }, 
                {
                    title:`${Math.floor(Math.random() * 1000)} pms 威武雄壮 ~~~`,
                    id:Math.floor(Math.random() * 1000)
                }, 
                {
                    title:`${Math.floor(Math.random() * 1000)} pms 威武雄壮 ~~~`,
                    id:Math.floor(Math.random() * 1000)
                }, 
            ],
            content:`Aliqua ea velit "occaecat" 'cillum' nostrud sit. Consectetur exercitation aliquip mollit nulla et nostrud ullamco aliqua ipsum occaecat deserunt exercitation. Est anim proident labore dolore commodo velit ex ea laboris excepteur id aliqua.
          
            Culpa irure cillum nulla fugiat dolor. Incididunt ipsum ipsum do eiusmod est non cupidatat aute commodo ex pariatur proident nisi. Labore et in veniam sint magna excepteur duis. Laborum consequat sit duis culpa amet eiusmod aliquip deserunt amet ut labore. Dolore consequat culpa ipsum anim do reprehenderit ullamco incididunt mollit ad duis. Consequat minim commodo Lorem qui qui ipsum occaecat.
          
            Laboris consequat sit nulla consectetur est dolor consequat in velit nisi. Dolore proident dolor voluptate sunt aliquip dolore tempor et mollit ad officia anim. Quis deserunt eu officia dolor. Lorem in sint voluptate cillum officia nulla duis eiusmod ad aliqua exercitation nulla eu.`
        }
    })
}