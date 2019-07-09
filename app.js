var express = require("express"),
    //mongo = require("mongodb"),
    //monk = require("monk"),
    http = require('http'),
    conf = require('./config/config'),
    domain = require('domain'),
    serverDm = domain.create(),
    //db = monk('localhost:27017/sanwik'),
    app = express();
var robotReg = new RegExp('Baiduspider|Googlebot|SiteMapX|BingBot|Slurp!', 'i');

/*app.configure(function () {
 app.use(express.compress());
 app.use(express.methodOverride());
 app.use(express.bodyParser());
 app.use(function (req, res, next) {
 var dm = domain.create();
 function router(req, res) {
 var path = req.path[0].toLowerCase();
 console.log(path);
 }
 dm.run(function () {
 router(req, res); // 运行
 });
 next();
 });
 app.use(express.static(__dirname));
 app.use(app.router);
 });*/


var menus_map = {
    '1': {
        "id": "1",
        "menu": "主  页",
        "url": "/"
    },
    '2': {
        "id": "2",
        "menu": "关于我们",
        "sub_menu": ["公司介绍", "企业资质", "企业文化", "企业新闻", "公司活动"],
        "page_name": "about"
    },
    '3': {
        "id": "3",
        "menu": "产品展示",
        "sub_menu": ["交通", "商业流通", "城市自助服务", "金融", "医疗", "石化", "通讯", "旅游"],
        "page_name": "products"
    },
    '4': {
        "id": "4",
        "menu": "成功案例",
        "sub_menu": ["车载自助充值", "水费自助缴费找零"],
        "page_name": "solutions"
    },
    '5': {
        "id": "5",
        "menu": "技术与支持",
        "sub_menu": ["技术支持与服务", "售后服务"],
        "page_name": "supports"
    },
    '6': {
       "id": "6",
       "menu": "加入我们",
       "sub_menu": ["工作环境","招聘列表"],
       "page_name": "joinus"
     },
    '7': {
        "id": "7",
        "menu": "联系我们",
        "sub_menu": ["联系方式", "电子地图"],
        "page_name": "contact"
    }
};

var about_us = {
    '1': {
        "id": "1",
        "description": "公司介绍",
        "image": "/static/images/aboutImg/sanwik.jpg",
        "h1": "珠海市新域智能科技有限公司",
        "h2": "专业从事自助缴费找零系统集成服务软件和硬件相配套的研发、制造型企业。",
        "h3": "公司致力于创建消费群体和运营商之间高速便捷的服务运营体系，以自助缴费找零系统为终端服务平台，从根本上解决人工收费的繁琐，实现无人值守的自动化服务。",
        "sanwik": [{
            "lead": "人才为本，专业服务——",
            "content": "新域智能秉承“诚信、创新、严谨、便捷”的发展理念，坚持“以人为本”的人才战略，" +
            "带领一支高素质、经验丰富的技术研发团队，自主研发、自主搭建，以科技领先的数字化信息平台、便捷的货币收付配套技术服务终端，" +
            "为医疗、石化、通讯、旅游、交通、商业流通、政府便民化服务等领域提供数字化自助信息查询和自助缴费服务应用解决方案及配套终端。"
        },
            {
                "lead": "科技实力，创新成果——",
                "content": "新域智能始终以完善的自动化技术服务为涉及币值流通领域的科技自动化提供高品质的配套服务终端。" +
                "经过多年探索研究，取得了多项研发成果，并已获得46项国家专利证书。" +
                "新域智能自主研发的公交卡“车载式自助充值终端”更成为全国首创的车载自助充值终端系统得到社会认可和推广运用。"
            },
            {
                "lead": "崭新机遇、全力挑战——",
                "content": "科技创新与信息化带动城市向智慧化转型，也为自助服务终端行业带来新的机遇与挑战，" +
                "新域智能将以自身的发展优势，迎接全新的市场机遇，以崭新的形象推动高端自助服务行业的发展，致力成为中国便民服务平台第一品牌，为客户、员工、社会创造价值。"
            }]

    },
    '2': {
        "id": "2",
        "description": "企业资质",
        "literal": [{
            "lead": "强大的生产制造实力", "content": "新域智能科技有限公司拥有目前中国最先进的自助设备生产线，具备国际一流的制造加工功能。" +
            "针对金融、医疗、石化、通讯、旅游、交通、商业物流、政府便民化等行业研发了零钞自助兑换终端、外币自助兑换终端、旧钞自助兑换终端、零整钞自助兑换终端、" +
            "整钞自助兑换终端、电费自助缴费找零终端、水费自助缴费找零终端、有线电视自助缴费找零终端、多功能自助缴费找零终端、政府便民化服务自助缴费找零终端等自助化服务终端。",
            "bold": "通过各大权威机构认证。"
        },
            {
                "lead": "雄厚的技术研发能力", "content": ["新域智能始终致力于自助产品核心技术的研发，拥有多年自助服务产品的研发经验，投入大量的研发资金，具备雄厚的技术储备和全面开发能力。",
                "公司拥有一支高素质的工程技术、研发团队，专业从事自助缴费找零系统集成及服务软件和硬件相配套的研发、制造。",
                "作为公司产品的核心开发、设计人员，具有丰富的自助产品技术开发经验，均可独立承担自助终端系统开发任务。"], "bold": "目前公司已在自助设备应用平台上共取得19项专利权。"
            }],
        "timage": [{
            "img": "/static/images/aboutImg/p_company.jpg",
            "span": "企业法人营业执照"
        }, {"img": "/static/images/aboutImg/p_company3.jpg", "span": "广东省公交协会理事单位"}],
        "fimage": [{"img": "/static/images/aboutImg/p_3c.jpg", "span": "国家3C认证证书"}, {
            "img": "/static/images/aboutImg/p_9001.jpg",
            "span": "ISO9001认证证书"
        }, {"img": "/static/images/aboutImg/p_standard.jpg", "span": "采用国际标准产品认可证书"}],
        "himage": [{
            "img": "/static/images/aboutImg/p_traffic.jpg",
            "span": "车载公交IC卡现金充值装置专利"
        }, {"img": "/static/images/aboutImg/p_lottery.jpg", "span": "彩票自助找零售卖服务专利"},
            {"img": "/static/images/aboutImg/p_water.jpg", "span": "水电费自助缴费找零服务专利"}, {
                "img": "/static/images/aboutImg/p_exchange.jpg",
                "span": "外币自助兑换服务终端专利"
            },
            {"img": "/static/images/aboutImg/p_paper.jpg", "span": "纸币输送及配送至多钞箱专利"}, {
                "img": "/static/images/aboutImg/p_outward.jpg",
                "span": "自助缴费找零终端外观设计专利"
            }]
    },
    '3': {
        "id": "3",
        "description": "企业文化",
        "point": "经营理念",
        "image": "/static/images/aboutImg/company.jpg",
        "cultural": [{lead: "诚信", eng: "INTEGRITY", content: "立业之道，兴业之本，真诚沟通，追求共赢"},
            {lead: "创新", eng: "INNOVATION", content: "理论创新、体制创新、管理创新、科技创新"},
            {lead: "严谨", eng: "ELABORATE", content: "个性定制、精细制作、指导培训、售后跟踪"},
            {lead: "便捷", eng: "CONVENIENT", content: "科技引领、资源整合、便民服务、智慧转型"}]
    },
    '4': {
        "id": "4",
        "description": news_list
    },
/*    '5': {
        "id": "5",
        "description": "工作环境",
        "image": "/static/images/aboutImg/joinus_list2.jpg"
    },*/
   '5': {
        "id": "5",
        "description": activities_list
    }
};

var products_list = {

    '1': {
        '1': {
            "id": "1",
            "name": "自助售卡充值终端",
            "class_rul": "/products/1/",
            "detail_url": "/products/1/1",
            "thumbnail": '/static/images/productsImg/traffic7_m1.jpg',
            "no": 'YH8107',
            "use": "主要适用于公交巴士、地铁、商贸超市、公交站点、学校、社区等场所的安装使用，可提供发卡、纸币、银行卡自助充值等服务。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/traffic7_s1.jpg', '/static/images/productsImg/traffic7_s2.jpg'],
            "large_img": ['/static/images/productsImg/traffic7_l1.jpg', '/static/images/productsImg/traffic7_l2.jpg'],
            "detail": ['/static/images/productsImg/traffic7_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/traffic7_d11.jpg",
            "operate": "/static/images/productsImg/traffic7_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "基本参数", content: ["SW-GJ8000A大堂式"]},
                {name: "主控模块", content: ["工业级嵌入式主板/嵌入式LINUX操作系统", "DDR3内存：2G/高速电子双硬盘8Gx2"]},
                {
                    name: "现金处理模块", content: ["接收1-100元人民币纸币智能清分和多面额混合补钞", "1元、5元、10元、20元人民币智能优化循环找零",
                    "钞票接收速度等于或小于1.5秒/张", "找零速度：一张约2秒、5张约4秒、10张约6.5秒", "补钞箱储量：500张；存钞箱储量：1000张"]
                },
                {name: "银行卡支付模块", content: ["加密键盘（100mm*100mm）", "银行卡信息读写"]},
                {name: "票卡发售模块", content: ["IC储值卡信息读写", "票箱存储量：1000张（0.5mm票卡）x 2", "发卡速度：1张/秒"]},
                {name: "监控模块", content: ["四路监控摄像头；监控硬盘：500G", "数字式实时硬盘录像回放；支持网络操作", "人体接近感应监测、震动报警"]},
                {name: "显示模块", content: ["15寸红外触摸液晶显示屏"]}, {name: "凭条打印模块", content: ["80mm纸宽热敏打印机，自动切纸"]},
                {name: "电源模块", content: ["电源输入：~220V；功率：最大350W；待机：150W"]},
                {name: "工作环境", content: ["工作温度：0-50度；工作湿度：20-90%"]},
                {name: "尺度", content: ["宽：600mm;高：1820mm;深：1000mm"]}
            ]
        },
        '2': {
            "id": "2",
            "name": "车载自助充值终端",
            "class_rul": "/products/1/",
            "detail_url": "/products/1/2",
            "thumbnail": '/static/images/productsImg/traffic3_m1.jpg',
            "no": 'YH8103',
            "use": "主要适用于交通行业等，可提供纸币自助充值服务。",
            "description": [

                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/traffic3_s1.jpg', '/static/images/productsImg/traffic3_s2.jpg'],
            "large_img": ['/static/images/productsImg/traffic3_l1.jpg', '/static/images/productsImg/traffic3_l2.jpg'],
            "detail": ['/static/images/productsImg/traffic3_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/traffic3_d11.jpg",
            "operate": "/static/images/productsImg/traffic3_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "基本参数", content: ["SW-GJ8000B车载式"]},
                {name: "主控模块", content: ["CPU:ARM/内存:512M/4G flash闪存", "100M 有线网卡", "4.3寸电阻触摸液晶显示屏"]},
                {
                    name: "现金处理模块", content: ["接收1-100元人民币纸币", "入币速度3秒/张，光学防钓鱼",
                    "纸币接受率99.8%，无卡币通道设计", "钞箱储量：1000张"]
                },
                {name: "IC卡模块", content: ["IC/RF卡读写"]},
                {name: "凭条打印模块", content: ["58mm纸宽热敏打印机，自动切纸"]},
                {name: "银行卡支付模块(可选件)", content: ["加密键盘(100mm*100mm)", "银行卡信息读取及写入"]},
                {name: "电源模块", content: ["电源输入：~220V；功率：最大100W；待机：5W(车载式：24v/36v输入)"]},
                {name: "工作环境", content: ["工作温度：0-50度；工作湿度：20-90%"]},
                {name: "尺度", content: ["车载式 宽：330mm;高：1100mm;深：260mm", "挂壁式 宽：330mm;高：440mm;深：260mm"]}
            ]

        },
        '3': {
            "id": "3",
            "name": "壁挂式自助充值终端",
            "class_rul": "/products/1/",
            "detail_url": "/products/1/3",
            "thumbnail": '/static/images/productsImg/traffic1_m2.jpg',
            "no": 'YH8101',
            "use": "主要适用于公交巴士、地铁、商贸超市、公交站点、学校、社区等场所的安装使用，可提供发卡、纸币、银行卡自助充值等服务。",
            "description": [
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/traffic1_s3.jpg', '/static/images/productsImg/traffic1_s2.jpg'],
            "large_img": ['/static/images/productsImg/traffic1_l1.jpg', '/static/images/productsImg/traffic1_l2.jpg'],
            "detail": ['/static/images/productsImg/traffic1_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/traffic1_d11.jpg",
            "operate": "/static/images/productsImg/traffic1_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "基本参数", content: ["SW-GJ8000C挂壁式"]},
                {name: "主控模块", content: ["CPU:ARM/内存:512M/4G flash闪存", "100M 有线网卡", "4.3寸电阻触摸液晶显示屏"]},
                {
                    name: "现金处理模块", content: ["接收1-100元人民币纸币", "入币速度3秒/张，光学防钓鱼",
                    "纸币接受率99.8%，无卡币通道设计", "钞箱储量：1000张"]
                },
                {name: "IC卡模块", content: ["IC/RF卡读写"]},
                {name: "凭条打印模块", content: ["58mm纸宽热敏打印机，自动切纸"]},
                {name: "银行卡支付模块(可选件)", content: ["加密键盘(100mm*100mm)", "银行卡信息读取及写入"]},
                {name: "电源模块", content: ["电源输入：~220V；功率：最大100W；待机：5W(车载式：24v/36v输入)"]},
                {name: "工作环境", content: ["工作温度：0-50度；工作湿度：20-90%"]},
                {name: "尺度", content: ["车载式 宽：330mm;高：1100mm;深：260mm", "挂壁式 宽：330mm;高：440mm;深：260mm"]}
            ]

        },

        '4': {
            "id": "4",
            "name": "高速公路自助缴费找零终端",
            "class_rul": "/products/1/",
            "detail_url": "/products/1/4",
            "thumbnail": '/static/images/productsImg/traffic5_m1.jpg',
            "no": 'YH8105',
            "use": "主要适用于收费高速公路，可提供发卡、纸币自助缴纳高速公路费用服务。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/traffic5_s1.jpg', '/static/images/productsImg/traffic5_s2.jpg', '/static/images/productsImg/traffic5_s3.jpg'],
            "large_img": ['/static/images/productsImg/traffic5_l1.jpg', '/static/images/productsImg/traffic5_l2.jpg', '/static/images/productsImg/traffic5_l3.jpg'],
            "detail": ['/static/images/productsImg/traffic5_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/traffic5_d11.jpg",
            "operate": "/static/images/productsImg/traffic5_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {name: "安装方式", content: ["大堂式"]},
                {name: "维护方式", content: ["后台维护"]},
                {name: "主控模块", content: ["操作系统:嵌入式LINUX操作系统", "主板:工业级嵌入式主板 ;DDR3内存:2G", "高速电子双硬盘:系统运行盘8G、数据备份盘8G"]},
                {name: "入钞模块", content: ["可接收100、50、20、10、5、1元人民币纸币", "入钞方式:纵向单张入钞； 入钞保护:钞票识别器", "插拔式钞箱：单个钞箱容量达2500张"]},
                {
                    name: "出钞模块",
                    content: ["50、20、10、5、1元人民币的智能优化出钞组合", "出钞方式：摩擦式横向成叠出钞 ； 出钞保护：电动闸门/成叠钞票回收", "插拔式钞箱：单个钞箱容量达3000张 ； 出钞速度：7张/秒"]
                },
                {name: "输入设备", content: ["液晶显示键盘输入"]},
                {name: "显示单元", content: ["LED显示屏"]},
                {name: "凭条打印机", content: ["80mm纸宽热敏打印机（纸卷直径80mm）具有黑标点位和图形打印，默认支持英文和中文，可以扩展字库，支持半切和全切"]},
                {name: "日志打印机", content: ["76mm纸宽针式打印机(纸卷直径80mm)支持电子日志。默认支持英文和中文"]},
                {name: "视频监控", content: ["支持数字式实时硬盘录像和录像回放；支持网络操作；支持动态检测、视频遮挡检测。区域屏蔽功能。", "监控硬盘：500G"]},
                {name: "振动报警器", content: ["支持震动报警输入"]},
                {name: "人体感应监测器", content: ["人性智能化的感应监测"]},
                {name: "保险柜", content: ["配备符合UL291 24H标准的机械锁和数字密码锁"]},
                {name: "机柜门状态检测", content: ["实时检测保险柜、电子柜前/后门状态"]},
                {name: "指示灯", content: ["控制出钞口、入钞口，凭条口指示灯；", "四种指示灯状态：亮、灭、慢闪和快闪"]},
                {name: "音效", content: ["双声道立体声环绕功放系统"]},
                {name: "电源输入", content: ["AC200V 50HZ"]},
                {name: "总功率", content: ["350W"]},
                {name: "电源管理模块", content: ["重要部件顺序上电"]},
                {name: "UPS电源(选件)", content: ["1000W.智能15分钟不间断电源"]},
                {name: "外观尺寸", content: ["高1700mm；宽960mm；深1070mm"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]

        },
        '5': {
            "id": "5",
            "name": "地铁自助售票缴费找零终端",
            "class_rul": "/products/1/",
            "detail_url": "/products/1/5",
            "thumbnail": '/static/images/productsImg/traffic4_m1.jpg',
            "no": 'YH8104',
            "use": "主要适用于于地铁、高铁等，可提供自助购买地铁票，并可对地铁卡进行缴费充值，循环播放企业广告等功能，操作流程清晰，便于用户使用。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/traffic4_s1.jpg', '/static/images/productsImg/traffic4_s2.jpg', '/static/images/productsImg/traffic4_s3.jpg'],
            "large_img": ['/static/images/productsImg/traffic4_l1.jpg', '/static/images/productsImg/traffic4_l2.jpg', '/static/images/productsImg/traffic4_l3.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "功能简介", div: "auto"}],
            "auto": ["自助购票功能：可接收100元、50元、20元、10元、5元、1元纸币和1元硬币进行现金购票及银行卡购票。",
                "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币和1元硬币优化找零。",
                "100元、50元、20元、10元、5元、1元人民币收储量均达3000张，并可循环使用。",
                "年卡办理并发放。",
                "发放地铁票。",
                "感应区可实现二代身份证、手机支付购票、条码获取地铁票优惠、网购订单换取地铁票等。",
                "自助打印凭条。",
                "立体声语音提示功能。",
                "待机广告循环播放。",
                "实时监控。"]

        },
        '6': {
            "id": "6",
            "name": "停车场自助缴费找零终端",
            "class_rul": "/products/1/",
            "detail_url": "/products/1/6",
            "thumbnail": '/static/images/productsImg/traffic2_m1.jpg',
            "no": 'YH8102',
            "use": "主要适用于停车场收费，可提供发卡、纸币自助缴纳停车费用服务。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/traffic2_s1.jpg', '/static/images/productsImg/traffic2_s2.jpg', '/static/images/productsImg/traffic2_s3.jpg'],
            "large_img": ['/static/images/productsImg/traffic2_l1.jpg', '/static/images/productsImg/traffic2_l2.jpg', '/static/images/productsImg/traffic2_l3.jpg'],
            "detail": ['/static/images/productsImg/traffic5_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/traffic2_d11.jpg",
            "operate": "/static/images/productsImg/traffic2_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {name: "安装方式", content: ["大堂式"]},
                {name: "维护方式", content: ["后台维护"]},
                {name: "主控模块", content: ["操作系统:嵌入式LINUX操作系统", "主板:工业级嵌入式主板 ;DDR3内存:2G", "高速电子双硬盘:系统运行盘8G、数据备份盘8G"]},
                {name: "入钞模块", content: ["可接收100、50、20、10、5、1元人民币纸币", "入钞方式:纵向单张入钞； 入钞保护:钞票识别器", "插拔式钞箱：单个钞箱容量达2500张"]},
                {
                    name: "出钞模块",
                    content: ["50、20、10、5、1元人民币的智能优化出钞组合", "出钞方式：摩擦式横向成叠出钞 ； 出钞保护：电动闸门/成叠钞票回收", "插拔式钞箱：单个钞箱容量达3000张 ； 出钞速度：7张/秒"]
                },
                {name: "输入设备", content: ["液晶显示键盘输入"]},
                {name: "显示单元", content: ["LED显示屏"]},
                {name: "凭条打印机", content: ["80mm纸宽热敏打印机（纸卷直径80mm）具有黑标点位和图形打印，默认支持英文和中文，可以扩展字库，支持半切和全切"]},
                {name: "日志打印机", content: ["76mm纸宽针式打印机(纸卷直径80mm)支持电子日志。默认支持英文和中文"]},
                {name: "视频监控", content: ["支持数字式实时硬盘录像和录像回放；支持网络操作；支持动态检测、视频遮挡检测。区域屏蔽功能。", "监控硬盘：500G"]},
                {name: "振动报警器", content: ["支持震动报警输入"]},
                {name: "人体感应监测器", content: ["人性智能化的感应监测"]},
                {name: "保险柜", content: ["配备符合UL291 24H标准的机械锁和数字密码锁"]},
                {name: "机柜门状态检测", content: ["实时检测保险柜、电子柜前/后门状态"]},
                {name: "指示灯", content: ["控制出钞口、入钞口，凭条口指示灯；", "四种指示灯状态：亮、灭、慢闪和快闪"]},
                {name: "音效", content: ["双声道立体声环绕功放系统"]},
                {name: "电源输入", content: ["AC200V 50HZ"]},
                {name: "总功率", content: ["350W"]},
                {name: "电源管理模块", content: ["重要部件顺序上电"]},
                {name: "UPS电源(选件)", content: ["1000W.智能15分钟不间断电源"]},
                {name: "外观尺寸", content: ["高1700mm；宽960mm；深1070mm"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]

        }

    },

    '2': {
        '1': {
            "id": "1",
            "name": "电彩自助销售终端",
            "class_rul": "/products/2/",
            "detail_url": "/products/2/1",
            "thumbnail": '/static/images/productsImg/busness2_m2.jpg',
            "no": 'YH8202',
            "use": "主要适用于福利彩票行业，可提供自助购买彩票、打印发票、凭条、自助缴费和优化找零的功能，方便广大彩民购票服务。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/busness2_s1.jpg', '/static/images/productsImg/busness2_s2.jpg', '/static/images/productsImg/busness2_s3.jpg'],
            "large_img": ['/static/images/productsImg/busness2_l1.jpg', '/static/images/productsImg/busness2_l2.jpg', '/static/images/productsImg/busness2_l3.jpg'],
            "detail": ['/static/images/productsImg/busness2_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/busness2_d11.jpg",
            "operate": "/static/images/productsImg/busness2_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {name: "安装方式", content: ["大堂式"]},
                {name: "维护方式", content: ["后台维护"]},
                {name: "主控模块", content: ["操作系统:嵌入式LINUX操作系统", "主板:工业级嵌入式主板 ;DDR3内存:2G", "高速电子双硬盘:系统运行盘8G、数据备份盘8G"]},
                {name: "入钞模块", content: ["可接收100、50、20、10、5、1元人民币纸币", "入钞方式:纵向单张入钞； 入钞保护:钞票识别器", "插拔式钞箱：单个钞箱容量达2500张"]},
                {
                    name: "出钞模块",
                    content: ["50、20、10、5、1元人民币的智能优化出钞组合", "出钞方式：摩擦式横向成叠出钞 ； 出钞保护：电动闸门/成叠钞票回收", "插拔式钞箱：单个钞箱容量达3000张 ； 出钞速度：7张/秒"]
                },
                {name: "银行卡支付模块", content: ["加密键盘（100mm*100mm）银行卡信息读写"]},
                {name: "彩票识别兑奖模块", content: ["80mm热敏纸彩票自动扫描识别打印"]},
                {name: "输入设备", content: ["红外触摸屏"]},
                {name: "显示单元", content: ["17英寸彩色红外触摸液晶显示屏"]},
                {name: "后维护屏", content: ["12英寸彩色电阻触摸液晶显示屏"]},
                {name: "彩票打印机", content: ["80mm纸宽热敏纸质彩票专用打印机"]},
                {name: "日志打印机", content: ["76mm纸宽针式打印机(纸卷直径80mm)支持电子日志。默认支持英文和中文"]},
                {name: "视频监控", content: ["支持数字式实时硬盘录像和录像回放；支持网络操作；支持动态检测、视频遮挡检测。区域屏蔽功能。", "监控硬盘：500G"]},
                {name: "振动报警器", content: ["支持震动报警输入"]},
                {name: "人体感应监测器", content: ["人性智能化的感应监测"]},
                {name: "保险柜", content: ["配备符合UL291 24H标准的机械锁和数字密码锁"]},
                {name: "机柜门状态检测", content: ["实时检测保险柜、电子柜前/后门状态"]},
                {name: "指示灯", content: ["控制出钞口、入钞口，凭条口指示灯；", "四种指示灯状态：亮、灭、慢闪和快闪"]},
                {name: "音效", content: ["双声道立体声环绕功放系统"]},
                {name: "电源输入", content: ["AC200V 50HZ"]},
                {name: "总功率", content: ["350W"]},
                {name: "电源管理模块", content: ["重要部件顺序上电"]},
                {name: "UPS电源(选件)", content: ["1000W.智能15分钟不间断电源"]},
                {name: "外观尺寸", content: ["高1700mm；宽960mm；深1070mm"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]

        },

        '2': {
            "id": "2",
            "name": "彩票自助投注终端",
            "class_rul": "/products/2/",
            "detail_url": "/products/2/2",
            "thumbnail": '/static/images/productsImg/busness1_m1.jpg',
            "no": 'YH8201',
            "use": "主要适用于福利彩票行业，可提供自助购买彩票、打印发票、凭条、自助缴费和优化找零的功能，方便广大彩民购票服务。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/busness1_s1.jpg', '/static/images/productsImg/busness1_s2.jpg', '/static/images/productsImg/busness1_s3.jpg'],
            "large_img": ['/static/images/productsImg/busness1_l1.jpg', '/static/images/productsImg/busness1_l2.jpg', '/static/images/productsImg/busness1_l3.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/busness1_d11.jpg",
            "operate": "/static/images/productsImg/busness1_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {name: "安装方式", content: ["大堂式"]},
                {name: "维护方式", content: ["后台维护"]},
                {name: "主控模块", content: ["操作系统:嵌入式LINUX操作系统", "主板:工业级嵌入式主板 ;DDR3内存:2G", "高速电子双硬盘:系统运行盘8G、数据备份盘8G"]},
                {name: "入钞模块", content: ["可接收100、50、20、10、5、1元人民币纸币", "入钞方式:纵向单张入钞； 入钞保护:钞票识别器", "插拔式钞箱：单个钞箱容量达2500张"]},
                {
                    name: "出钞模块",
                    content: ["50、20、10、5、1元人民币的智能优化出钞组合", "出钞方式：摩擦式横向成叠出钞 ； 出钞保护：电动闸门/成叠钞票回收", "插拔式钞箱：单个钞箱容量达3000张 ； 出钞速度：7张/秒"]
                },
                {name: "银行卡支付模块", content: ["加密键盘（100mm*100mm）银行卡信息读写"]},
                {name: "彩票识别兑奖模块", content: ["80mm热敏纸彩票自动扫描识别打印"]},
                {name: "输入设备", content: ["红外触摸屏"]},
                {name: "显示单元", content: ["17英寸彩色红外触摸液晶显示屏"]},
                {name: "后维护屏", content: ["12英寸彩色电阻触摸液晶显示屏"]},
                {name: "彩票打印机", content: ["80mm纸宽热敏纸质彩票专用打印机"]},
                {name: "日志打印机", content: ["76mm纸宽针式打印机(纸卷直径80mm)支持电子日志。默认支持英文和中文"]},
                {name: "视频监控", content: ["支持数字式实时硬盘录像和录像回放；支持网络操作；支持动态检测、视频遮挡检测。区域屏蔽功能。", "监控硬盘：500G"]},
                {name: "振动报警器", content: ["支持震动报警输入"]},
                {name: "人体感应监测器", content: ["人性智能化的感应监测"]},
                {name: "保险柜", content: ["配备符合UL291 24H标准的机械锁和数字密码锁"]},
                {name: "机柜门状态检测", content: ["实时检测保险柜、电子柜前/后门状态"]},
                {name: "指示灯", content: ["控制出钞口、入钞口，凭条口指示灯；", "四种指示灯状态：亮、灭、慢闪和快闪"]},
                {name: "音效", content: ["双声道立体声环绕功放系统"]},
                {name: "电源输入", content: ["AC200V 50HZ"]},
                {name: "总功率", content: ["350W"]},
                {name: "电源管理模块", content: ["重要部件顺序上电"]},
                {name: "UPS电源(选件)", content: ["1000W.智能15分钟不间断电源"]},
                {name: "外观尺寸", content: ["高1700mm；宽960mm；深1070mm"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]
        },
        '3': {
            "id": "3",
            "name": "即开型彩票自助销售终端",
            "class_rul": "/products/2/",
            "detail_url": "/products/2/3",
            "thumbnail": '/static/images/productsImg/busness3_m1.jpg',
            "no": 'YH8203',
            "use": "主要适用于福利彩票行业，可提供自助购买彩票、打印发票、凭条、自助缴费和优化找零的功能，方便广大彩民购票服务。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/busness3_s1.jpg', '/static/images/productsImg/busness3_s2.jpg', '/static/images/productsImg/busness3_s3.jpg'],
            "large_img": ['/static/images/productsImg/busness3_l1.jpg', '/static/images/productsImg/busness3_l2.jpg', '/static/images/productsImg/busness3_l3.jpg'],
            "detail": ['/static/images/productsImg/busness4_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/busness3_d11.jpg",
            "operate": "/static/images/productsImg/busness3_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {name: "安装方式", content: ["大堂式"]},
                {name: "维护方式", content: ["后台维护"]},
                {name: "主控模块", content: ["操作系统:嵌入式LINUX操作系统", "主板:工业级嵌入式主板 ;DDR3内存:2G", "高速电子双硬盘:系统运行盘8G、数据备份盘8G"]},
                {name: "入钞模块", content: ["可接收100、50、20、10、5、1元人民币纸币", "入钞方式:纵向单张入钞； 入钞保护:钞票识别器", "插拔式钞箱：单个钞箱容量达2500张"]},
                {
                    name: "出钞模块",
                    content: ["50、20、10、5、1元人民币的智能优化出钞组合", "出钞方式：摩擦式横向成叠出钞 ； 出钞保护：电动闸门/成叠钞票回收", "插拔式钞箱：单个钞箱容量达3000张 ； 出钞速度：7张/秒"]
                },
                {name: "银行卡支付模块", content: ["加密键盘（100mm*100mm）银行卡信息读写"]},
                {name: "彩票识别兑奖模块", content: ["80mm热敏纸彩票自动扫描识别打印"]},
                {name: "输入设备", content: ["红外触摸屏"]},
                {name: "显示单元", content: ["17英寸彩色红外触摸液晶显示屏"]},
                {name: "后维护屏", content: ["12英寸彩色电阻触摸液晶显示屏"]},
                {name: "彩票打印机", content: ["80mm纸宽热敏纸质彩票专用打印机"]},
                {name: "日志打印机", content: ["76mm纸宽针式打印机(纸卷直径80mm)支持电子日志。默认支持英文和中文"]},
                {name: "视频监控", content: ["支持数字式实时硬盘录像和录像回放；支持网络操作；支持动态检测、视频遮挡检测。区域屏蔽功能。", "监控硬盘：500G"]},
                {name: "振动报警器", content: ["支持震动报警输入"]},
                {name: "人体感应监测器", content: ["人性智能化的感应监测"]},
                {name: "保险柜", content: ["配备符合UL291 24H标准的机械锁和数字密码锁"]},
                {name: "机柜门状态检测", content: ["实时检测保险柜、电子柜前/后门状态"]},
                {name: "指示灯", content: ["控制出钞口、入钞口，凭条口指示灯；", "四种指示灯状态：亮、灭、慢闪和快闪"]},
                {name: "音效", content: ["双声道立体声环绕功放系统"]},
                {name: "电源输入", content: ["AC200V 50HZ"]},
                {name: "总功率", content: ["350W"]},
                {name: "电源管理模块", content: ["重要部件顺序上电"]},
                {name: "UPS电源(选件)", content: ["1000W.智能15分钟不间断电源"]},
                {name: "外观尺寸", content: ["高1700mm；宽960mm；深1070mm"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]
        },
        '4': {
            "id": "4",
            "name": "餐饮缴费终端",
            "class_rul": "/products/2/",
            "detail_url": "/products/2/4",
            "thumbnail": '/static/images/productsImg/busness4_m2.jpg',
            "no": 'YH8204',
            "use": "主要适用于于快餐业，可提供自助餐饮查询、自助纸币缴费找零、自助银行卡缴费服务。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/busness4_s3.jpg'],
            "large_img": ['/static/images/productsImg/busness4_l1.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "功能简介", div: "auto", content: "aaaaaa"},],
            "auto": ["自助点餐功能：可自由点餐，同时可读取会员卡、感应条码优惠券或取优惠。",
                "发卡功能：自助发放会员卡",
                "感应功能：可感应条码优惠券、感应会员卡（可选）、感应二代身份证（可选）。",
                "自助缴费功能：可接收100元、50元、20元、10元、5元、1元纸币和1元硬币进行现金缴费及银行卡缴费。",
                "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币和1元硬币优化找零。",
                "100元、50元、20元、10元、5元、1元人民币收储量均达3000张，并可循环使用。",
                "自助打印发票。",
                "自助打印凭条。",
                "立体声语音提示功能。",
                "待机广告循环播放。",
                "实时监控。"]
        },
        '5': {
            "id": "5",
            "name": "超市自助收银找零终端",
            "class_rul": "/products/2/",
            "detail_url": "/products/2/5",
            "thumbnail": '/static/images/productsImg/busness5_m1.jpg',
            "no": 'YH8204',
            "use": "主要适用于于中小型超市，可提供自助购物查询、自助纸币缴费找零、自助银行卡缴费服务。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/busness5_s1.jpg', '/static/images/productsImg/busness5_s2.jpg', '/static/images/productsImg/busness5_s3.jpg'],
            "large_img": ['/static/images/productsImg/busness5_l1.jpg', '/static/images/productsImg/busness5_l2.jpg', '/static/images/productsImg/busness5_l3.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "功能简介", div: "auto", content: "aaaaaa"},],
            "auto": ["自助查询功能：可查询商品分布，新到货品、打折促销活动，优惠获取等。",
                "发卡功能：自助发放会员卡。",
                "感应功能：可感应条码优惠券、感应会员卡（可选）。",
                "自助缴费功能：可接收100元、50元、20元、10元、5元、1元纸币和1元硬币进行现金缴费及银行卡缴费。",
                "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币和1元硬币优化找零。",
                "100元、50元、20元、10元、5元、1元人民币收储量均达3000张，并可循环使用。",
                "自助打印发票。",
                "自助打印凭条、优惠券（可选）。",
                "立体声语音提示功能。",
                "待机广告循环播放。",
                "实时监控。"]
        },
        '6': {
            "id": "6",
            "name": "酒店系统缴费终端",
            "class_rul": "/products/2/",
            "detail_url": "/products/2/6",
            "thumbnail": '/static/images/productsImg/busness6_m1.jpg',
            "no": 'YH8204',
            "use": "主要适用于于酒店行业，可提供自助查询房价、自助纸币缴费找零、自助银行卡缴费服务。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/busness6_s1.jpg'],
            "large_img": ['/static/images/productsImg/busness6_l1.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "功能简介", div: "auto", content: "aaaaaa"},],
            "auto": ["自助选房功能：可感应二代身份证自由选择客房进行订房。",
                "发卡功能：智能发放钥匙门卡。",
                "感应功能：可感应会员卡、二代身份证。",
                "自助缴费功能：可接收100元、50元、20元、10元、5元、1元纸币和1元硬币进行现金缴费及银行卡缴费。",
                "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币和1元硬币优化找零。",
                "100元、50元、20元、10元、5元、1元人民币收储量均达3000张，并可循环使用。",
                "自助打印发票。",
                "自助打印凭条。",
                "立体声语音提示功能。",
                "待机广告循环播放。",
                "实时监控。"]
        }

    },

    '3': {
        '1': {
            "id": "1",
            "name": "城市智能自助服务终端",
            "class_rul": "/products/3/",
            "detail_url": "/products/3/1",
            "thumbnail": '/static/images/productsImg/government1_m1.jpg',
            "no": 'YH8301',
            "use": "主要适用于各行业，可提供预付电费、水费、物业费、有线电视费、交通违章罚款等，身份证绑定、自助历史记录查询、自助打印等功能，为缴费者提供安全快捷的缴费环境和24小时服务体系。",
            "description": [
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/government1_s1.jpg', '/static/images/productsImg/government1_s2.jpg', '/static/images/productsImg/government1_s3.jpg'],
            "large_img": ['/static/images/productsImg/government1_l1.jpg', '/static/images/productsImg/government1_l2.jpg', '/static/images/productsImg/government1_l3.jpg'],
            "detail": ['/static/images/productsImg/government2_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/government1_d11.jpg",
            "operate": "/static/images/productsImg/government1_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {name: "安装方式", content: ["大堂式"]},
                {name: "维护方式", content: ["后台维护"]},
                {name: "主控模块", content: ["操作系统:嵌入式LINUX操作系统", "主板:工业级嵌入式主板 ;DDR3内存:2G", "高速电子双硬盘:系统运行盘8G、数据备份盘8G"]},
                {name: "入钞模块", content: ["可接收100、50、20、10、5、1元人民币纸币", "入钞方式:纵向单张入钞； 入钞保护:钞票识别器", "插拔式钞箱：单个钞箱容量达2500张"]},
                {
                    name: "出钞模块",
                    content: ["50、20、10、5、1元人民币的智能优化出钞组合", "出钞方式：摩擦式横向成叠出钞 ； 出钞保护：电动闸门/成叠钞票回收", "插拔式钞箱：单个钞箱容量达3000张 ； 出钞速度：7张/秒"]
                },
                {name: "银行卡支付模块", content: ["加密键盘（100mm*100mm）银行卡信息读写"]},
                {name: "彩票识别兑奖模块", content: ["80mm热敏纸彩票自动扫描识别打印"]},
                {name: "输入设备", content: ["红外触摸屏"]},
                {name: "显示单元", content: ["17英寸彩色红外触摸液晶显示屏"]},
                {name: "后维护屏", content: ["12英寸彩色电阻触摸液晶显示屏"]},
                {name: "彩票打印机", content: ["80mm纸宽热敏纸质彩票专用打印机"]},
                {name: "日志打印机", content: ["76mm纸宽针式打印机(纸卷直径80mm)支持电子日志。默认支持英文和中文"]},
                {name: "视频监控", content: ["支持数字式实时硬盘录像和录像回放；支持网络操作；支持动态检测、视频遮挡检测。区域屏蔽功能。", "监控硬盘：500G"]},
                {name: "振动报警器", content: ["支持震动报警输入"]},
                {name: "人体感应监测器", content: ["人性智能化的感应监测"]},
                {name: "保险柜", content: ["配备符合UL291 24H标准的机械锁和数字密码锁"]},
                {name: "机柜门状态检测", content: ["实时检测保险柜、电子柜前/后门状态"]},
                {name: "指示灯", content: ["控制出钞口、入钞口，凭条口指示灯；", "四种指示灯状态：亮、灭、慢闪和快闪"]},
                {name: "音效", content: ["双声道立体声环绕功放系统"]},
                {name: "电源输入", content: ["AC200V 50HZ"]},
                {name: "总功率", content: ["350W"]},
                {name: "电源管理模块", content: ["重要部件顺序上电"]},
                {name: "UPS电源(选件)", content: ["1000W.智能15分钟不间断电源"]},
                {name: "外观尺寸", content: ["高1700mm；宽960mm；深1070mm"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]
        },

        '2': {
            "id": "2",
            "name": "自助缴费终端-穿墙式",
            "class_rul": "/products/3/",
            "detail_url": "/products/3/2",
            "thumbnail": '/static/images/productsImg/government2_m1.jpg',
            "no": 'YH8302',
            "use": "主要适用于便民服务，可提供查询商品分布，新到货品、打折促销活动，优惠获取等信息。",
            "description": [

                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/government2_s1.jpg', '/static/images/productsImg/government2_s2.jpg', '/static/images/productsImg/government2_s3.jpg'],
            "large_img": ['/static/images/productsImg/government2_l1.jpg', '/static/images/productsImg/government2_l2.jpg', '/static/images/productsImg/government2_l3.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "功能简介", div: "auto", content: "aaaaaa"},],
            "auto": ["自助购票功能：可接收100元、50元、20元、10元、5元、1元纸币和1元硬币进行现金购票及银行卡购票。",
                "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币和1元硬币优化找零。",
                "100元、50元、20元、10元、5元、1元人民币收储量均达3000张，并可循环使用。",
                "年卡办理并发放。",
                "发放门票。",
                "感应区可实现二代身份证、条码获取门票优惠、网购订单换取门票等。",
                "自助打印凭条。",
                "立体声语音提示功能。",
                "待机广告循环播放。",
                "实时监控。"]
        },

        '3': {
            "id": "3",
            "name": "电费自助缴费终端",
            "class_rul": "/products/3/",
            "detail_url": "/products/3/3",
            "thumbnail": '/static/images/productsImg/government3_m1.jpg',
            "no": 'YH8303',
            "use": "主要适用于供电行业，可提供预付电费充值卡自助充值、身份证绑定、自助历史记录查询、自助打印等功能，为缴费者提供安全快捷的缴费环境和24小时服务体系。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/government3_s1.jpg', '/static/images/productsImg/government3_s2.jpg', '/static/images/productsImg/government3_s3.jpg'],
            "large_img": ['/static/images/productsImg/government3_l1.jpg', '/static/images/productsImg/government3_l2.jpg', '/static/images/productsImg/government3_l3.jpg'],
            "detail": ['/static/images/productsImg/government2_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/government3_d11.jpg",
            "operate": "/static/images/productsImg/government3_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {name: "安装方式", content: ["大堂式"]},
                {name: "维护方式", content: ["后台维护"]},
                {name: "主控模块", content: ["操作系统:嵌入式LINUX操作系统", "主板:工业级嵌入式主板 ;DDR3内存:2G", "高速电子双硬盘:系统运行盘8G、数据备份盘8G"]},
                {name: "入钞模块", content: ["可接收100、50、20、10、5、1元人民币纸币", "入钞方式:纵向单张入钞； 入钞保护:钞票识别器", "插拔式钞箱：单个钞箱容量达2500张"]},
                {
                    name: "出钞模块",
                    content: ["50、20、10、5、1元人民币的智能优化出钞组合", "出钞方式：摩擦式横向成叠出钞 ； 出钞保护：电动闸门/成叠钞票回收", "插拔式钞箱：单个钞箱容量达3000张 ； 出钞速度：7张/秒"]
                },
                {name: "银行卡支付模块", content: ["加密键盘（100mm*100mm）银行卡信息读写"]},
                {name: "彩票识别兑奖模块", content: ["80mm热敏纸彩票自动扫描识别打印"]},
                {name: "输入设备", content: ["红外触摸屏"]},
                {name: "显示单元", content: ["17英寸彩色红外触摸液晶显示屏"]},
                {name: "后维护屏", content: ["12英寸彩色电阻触摸液晶显示屏"]},
                {name: "彩票打印机", content: ["80mm纸宽热敏纸质彩票专用打印机"]},
                {name: "日志打印机", content: ["76mm纸宽针式打印机(纸卷直径80mm)支持电子日志。默认支持英文和中文"]},
                {name: "视频监控", content: ["支持数字式实时硬盘录像和录像回放；支持网络操作；支持动态检测、视频遮挡检测。区域屏蔽功能。", "监控硬盘：500G"]},
                {name: "振动报警器", content: ["支持震动报警输入"]},
                {name: "人体感应监测器", content: ["人性智能化的感应监测"]},
                {name: "保险柜", content: ["配备符合UL291 24H标准的机械锁和数字密码锁"]},
                {name: "机柜门状态检测", content: ["实时检测保险柜、电子柜前/后门状态"]},
                {name: "指示灯", content: ["控制出钞口、入钞口，凭条口指示灯；", "四种指示灯状态：亮、灭、慢闪和快闪"]},
                {name: "音效", content: ["双声道立体声环绕功放系统"]},
                {name: "电源输入", content: ["AC200V 50HZ"]},
                {name: "总功率", content: ["350W"]},
                {name: "电源管理模块", content: ["重要部件顺序上电"]},
                {name: "UPS电源(选件)", content: ["1000W.智能15分钟不间断电源"]},
                {name: "外观尺寸", content: ["高1700mm；宽960mm；深1070mm"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]
        },
        '4': {
            "id": "4",
            "name": "水费自助缴费终端",
            "class_rul": "/products/3/",
            "detail_url": "/products/3/4",
            "thumbnail": '/static/images/productsImg/government4_m1.jpg',
            "no": 'YH8304',
            "use": "主要适用于供电行业，可提供预付电费充值卡自助充值、身份证绑定、自助历史记录查询、自助打印等功能，为缴费者提供安全快捷的缴费环境和24小时服务体系。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/government4_s1.jpg', '/static/images/productsImg/government4_s2.jpg', '/static/images/productsImg/government4_s3.jpg'],
            "large_img": ['/static/images/productsImg/government4_l1.jpg', '/static/images/productsImg/government4_l2.jpg', '/static/images/productsImg/government4_l3.jpg'],
            "detail": ['/static/images/productsImg/government2_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/government4_d11.jpg",
            "operate": "/static/images/productsImg/government4_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {name: "安装方式", content: ["大堂式"]},
                {name: "维护方式", content: ["后台维护"]},
                {name: "主控模块", content: ["操作系统:嵌入式LINUX操作系统", "主板:工业级嵌入式主板 ;DDR3内存:2G", "高速电子双硬盘:系统运行盘8G、数据备份盘8G"]},
                {name: "入钞模块", content: ["可接收100、50、20、10、5、1元人民币纸币", "入钞方式:纵向单张入钞； 入钞保护:钞票识别器", "插拔式钞箱：单个钞箱容量达2500张"]},
                {
                    name: "出钞模块",
                    content: ["50、20、10、5、1元人民币的智能优化出钞组合", "出钞方式：摩擦式横向成叠出钞 ； 出钞保护：电动闸门/成叠钞票回收", "插拔式钞箱：单个钞箱容量达3000张 ； 出钞速度：7张/秒"]
                },
                {name: "银行卡支付模块", content: ["加密键盘（100mm*100mm）银行卡信息读写"]},
                {name: "彩票识别兑奖模块", content: ["80mm热敏纸彩票自动扫描识别打印"]},
                {name: "输入设备", content: ["红外触摸屏"]},
                {name: "显示单元", content: ["17英寸彩色红外触摸液晶显示屏"]},
                {name: "后维护屏", content: ["12英寸彩色电阻触摸液晶显示屏"]},
                {name: "彩票打印机", content: ["80mm纸宽热敏纸质彩票专用打印机"]},
                {name: "日志打印机", content: ["76mm纸宽针式打印机(纸卷直径80mm)支持电子日志。默认支持英文和中文"]},
                {name: "视频监控", content: ["支持数字式实时硬盘录像和录像回放；支持网络操作；支持动态检测、视频遮挡检测。区域屏蔽功能。", "监控硬盘：500G"]},
                {name: "振动报警器", content: ["支持震动报警输入"]},
                {name: "人体感应监测器", content: ["人性智能化的感应监测"]},
                {name: "保险柜", content: ["配备符合UL291 24H标准的机械锁和数字密码锁"]},
                {name: "机柜门状态检测", content: ["实时检测保险柜、电子柜前/后门状态"]},
                {name: "指示灯", content: ["控制出钞口、入钞口，凭条口指示灯；", "四种指示灯状态：亮、灭、慢闪和快闪"]},
                {name: "音效", content: ["双声道立体声环绕功放系统"]},
                {name: "电源输入", content: ["AC200V 50HZ"]},
                {name: "总功率", content: ["350W"]},
                {name: "电源管理模块", content: ["重要部件顺序上电"]},
                {name: "UPS电源(选件)", content: ["1000W.智能15分钟不间断电源"]},
                {name: "外观尺寸", content: ["高1700mm；宽960mm；深1070mm"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]
        },
        '5': {
            "id": "5",
            "name": "有线电视自助缴费终端",
            "class_rul": "/products/3/",
            "detail_url": "/products/3/5",
            "thumbnail": '/static/images/productsImg/government5_m1.jpg',
            "no": 'YH8305',
            "use": "主要适用于供电行业，可提供预付电费充值卡自助充值、身份证绑定、自助历史记录查询、自助打印等功能，为缴费者提供安全快捷的缴费环境和24小时服务体系。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/government5_s1.jpg', '/static/images/productsImg/government5_s2.jpg', '/static/images/productsImg/government5_s3.jpg'],
            "large_img": ['/static/images/productsImg/government5_l1.jpg', '/static/images/productsImg/government5_l2.jpg', '/static/images/productsImg/government5_l3.jpg'],
            "detail": ['/static/images/productsImg/government2_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/government5_d11.jpg",
            "operate": "/static/images/productsImg/government5_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {name: "安装方式", content: ["大堂式"]},
                {name: "维护方式", content: ["后台维护"]},
                {name: "主控模块", content: ["操作系统:嵌入式LINUX操作系统", "主板:工业级嵌入式主板 ;DDR3内存:2G", "高速电子双硬盘:系统运行盘8G、数据备份盘8G"]},
                {name: "入钞模块", content: ["可接收100、50、20、10、5、1元人民币纸币", "入钞方式:纵向单张入钞； 入钞保护:钞票识别器", "插拔式钞箱：单个钞箱容量达2500张"]},
                {
                    name: "出钞模块",
                    content: ["50、20、10、5、1元人民币的智能优化出钞组合", "出钞方式：摩擦式横向成叠出钞 ； 出钞保护：电动闸门/成叠钞票回收", "插拔式钞箱：单个钞箱容量达3000张 ； 出钞速度：7张/秒"]
                },
                {name: "银行卡支付模块", content: ["加密键盘（100mm*100mm）银行卡信息读写"]},
                {name: "彩票识别兑奖模块", content: ["80mm热敏纸彩票自动扫描识别打印"]},
                {name: "输入设备", content: ["红外触摸屏"]},
                {name: "显示单元", content: ["17英寸彩色红外触摸液晶显示屏"]},
                {name: "后维护屏", content: ["12英寸彩色电阻触摸液晶显示屏"]},
                {name: "彩票打印机", content: ["80mm纸宽热敏纸质彩票专用打印机"]},
                {name: "日志打印机", content: ["76mm纸宽针式打印机(纸卷直径80mm)支持电子日志。默认支持英文和中文"]},
                {name: "视频监控", content: ["支持数字式实时硬盘录像和录像回放；支持网络操作；支持动态检测、视频遮挡检测。区域屏蔽功能。", "监控硬盘：500G"]},
                {name: "振动报警器", content: ["支持震动报警输入"]},
                {name: "人体感应监测器", content: ["人性智能化的感应监测"]},
                {name: "保险柜", content: ["配备符合UL291 24H标准的机械锁和数字密码锁"]},
                {name: "机柜门状态检测", content: ["实时检测保险柜、电子柜前/后门状态"]},
                {name: "指示灯", content: ["控制出钞口、入钞口，凭条口指示灯；", "四种指示灯状态：亮、灭、慢闪和快闪"]},
                {name: "音效", content: ["双声道立体声环绕功放系统"]},
                {name: "电源输入", content: ["AC200V 50HZ"]},
                {name: "总功率", content: ["350W"]},
                {name: "电源管理模块", content: ["重要部件顺序上电"]},
                {name: "UPS电源(选件)", content: ["1000W.智能15分钟不间断电源"]},
                {name: "外观尺寸", content: ["高1700mm；宽960mm；深1070mm"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]
        },

        '6': {
            "id": "6",
            "name": "物业综合收费服务终端",
            "class_rul": "/products/3/",
            "detail_url": "/products/3/6",
            "thumbnail": '/static/images/productsImg/government6_m1.jpg',
            "no": 'YH8306',
            "use": "主要适用于便民服务，可提供查询物业费用，缴纳物业费用及找零。",
            "description": [

                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/government6_s1.jpg'],
            "large_img": ['/static/images/productsImg/government6_l1.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "功能简介", div: "auto", content: "aaaaaa"},],
            "auto": ["自助购票功能：可接收100元、50元、20元、10元、5元、1元纸币和1元硬币进行现金购票及银行卡购票。",
                "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币和1元硬币优化找零。",
                "100元、50元、20元、10元、5元、1元人民币收储量均达3000张，并可循环使用。",
                "年卡办理并发放。",
                "发放门票。",
                "感应区可实现二代身份证、条码获取门票优惠、网购订单换取门票等。",
                "自助打印凭条。",
                "立体声语音提示功能。",
                "待机广告循环播放。",
                "实时监控。"]

        },
        '7': {
            "id": "7",
            "name": "机动车违章缴费终端",
            "class_rul": "/products/3/",
            "detail_url": "/products/3/7",
            "thumbnail": '/static/images/productsImg/government7_m1.jpg',
            "no": 'YH8307',
            "use": "主要适用于交通行业，提供自助查询、纸币缴费找零、银行卡自助缴纳机动车违章罚款等服务。",
            "description": [

                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/government7_s1.jpg'],
            "large_img": ['/static/images/productsImg/government7_l1.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "功能简介", div: "auto", content: "aaaaaa"},],
            "auto": ["自助购票功能：可接收100元、50元、20元、10元、5元、1元纸币和1元硬币进行现金购票及银行卡购票。",
                "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币和1元硬币优化找零。",
                "100元、50元、20元、10元、5元、1元人民币收储量均达3000张，并可循环使用。",
                "年卡办理并发放。",
                "发放门票。",
                "感应区可实现二代身份证、条码获取门票优惠、网购订单换取门票等。",
                "自助打印凭条。",
                "立体声语音提示功能。",
                "待机广告循环播放。",
                "实时监控。"]

        }


    },

    '4': {
        '1': {
            "id": "1",
            "name": "旧钞自助充值终端",
            "class_rul": "/products/4/",
            "detail_url": "/products/4/1",
            "thumbnail": '/static/images/productsImg/finance1_m1.jpg',
            "no": 'YH8401',
            "use": "主要适用于银行业等，可提供旧钞兑换新钞的自助服务，回收旧钞提升人民币形象，减轻柜台压力等。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/finance1_s1.jpg', '/static/images/productsImg/finance1_s2.jpg', '/static/images/productsImg/finance1_s3.jpg'],
            "large_img": ['/static/images/productsImg/finance1_l1.jpg', '/static/images/productsImg/finance1_l2.jpg', '/static/images/productsImg/finance1_l3.jpg'],
            "detail": ['/static/images/productsImg/finance1_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/finance1_d11.jpg",
            "operate": "/static/images/productsImg/finance1_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {name: "安装方式", content: ["大堂式"]},
                {name: "维护方式", content: ["后台维护"]},
                {name: "主控模块", content: ["操作系统:嵌入式LINUX操作系统", "主板:工业级嵌入式主板 ;DDR3内存:2G", "高速电子双硬盘:系统运行盘8G、数据备份盘8G"]},
                {name: "入钞模块", content: ["可接收100、50、20、10、5、1元人民币纸币", "入钞方式:纵向单张入钞； 入钞保护:钞票识别器", "插拔式钞箱：单个钞箱容量达2500张"]},
                {
                    name: "出钞模块",
                    content: ["50、20、10、5、1元人民币的智能优化出钞组合", "出钞方式：摩擦式横向成叠出钞 ； 出钞保护：电动闸门/成叠钞票回收", "插拔式钞箱：单个钞箱容量达3000张 ； 出钞速度：7张/秒"]
                },
                {name: "银行卡支付模块", content: ["加密键盘（100mm*100mm）银行卡信息读写"]},
                {name: "彩票识别兑奖模块", content: ["80mm热敏纸彩票自动扫描识别打印"]},
                {name: "输入设备", content: ["红外触摸屏"]},
                {name: "显示单元", content: ["17英寸彩色红外触摸液晶显示屏"]},
                {name: "后维护屏", content: ["12英寸彩色电阻触摸液晶显示屏"]},
                {name: "彩票打印机", content: ["80mm纸宽热敏纸质彩票专用打印机"]},
                {name: "日志打印机", content: ["76mm纸宽针式打印机(纸卷直径80mm)支持电子日志。默认支持英文和中文"]},
                {name: "视频监控", content: ["支持数字式实时硬盘录像和录像回放；支持网络操作；支持动态检测、视频遮挡检测。区域屏蔽功能。", "监控硬盘：500G"]},
                {name: "振动报警器", content: ["支持震动报警输入"]},
                {name: "人体感应监测器", content: ["人性智能化的感应监测"]},
                {name: "保险柜", content: ["配备符合UL291 24H标准的机械锁和数字密码锁"]},
                {name: "机柜门状态检测", content: ["实时检测保险柜、电子柜前/后门状态"]},
                {name: "指示灯", content: ["控制出钞口、入钞口，凭条口指示灯；", "四种指示灯状态：亮、灭、慢闪和快闪"]},
                {name: "音效", content: ["双声道立体声环绕功放系统"]},
                {name: "电源输入", content: ["AC200V 50HZ"]},
                {name: "总功率", content: ["350W"]},
                {name: "电源管理模块", content: ["重要部件顺序上电"]},
                {name: "UPS电源(选件)", content: ["1000W.智能15分钟不间断电源"]},
                {name: "外观尺寸", content: ["高1700mm；宽960mm；深1070mm"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]
        },

        '2': {
            "id": "2",
            "name": "零钞自助充值终端",
            "class_rul": "/products/4/",
            "detail_url": "/products/4/2",
            "thumbnail": '/static/images/productsImg/finance2_m1.jpg',
            "no": 'YH8402',
            "use": "主要适用于银行业等，可提供零钞兑换整钞,整钞兑换零钞的自助服务。方便消费者对钞票的使用。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/finance2_s1.jpg', '/static/images/productsImg/finance2_s2.jpg'],
            "large_img": ['/static/images/productsImg/finance2_l1.jpg', '/static/images/productsImg/finance2_l2.jpg'],
            "detail": ['/static/images/productsImg/finance3_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/finance2_d11.jpg",
            "operate": "/static/images/productsImg/finance2_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {name: "安装方式", content: ["大堂式"]},
                {name: "维护方式", content: ["后台维护"]},
                {name: "主控模块", content: ["操作系统:嵌入式LINUX操作系统", "主板:工业级嵌入式主板 ;DDR3内存:2G", "高速电子双硬盘:系统运行盘8G、数据备份盘8G"]},
                {name: "入钞模块", content: ["可接收100、50、20、10、5、1元人民币纸币", "入钞方式:纵向单张入钞； 入钞保护:钞票识别器", "插拔式钞箱：单个钞箱容量达2500张"]},
                {
                    name: "出钞模块",
                    content: ["50、20、10、5、1元人民币的智能优化出钞组合", "出钞方式：摩擦式横向成叠出钞 ； 出钞保护：电动闸门/成叠钞票回收", "插拔式钞箱：单个钞箱容量达3000张 ； 出钞速度：7张/秒"]
                },
                {name: "银行卡支付模块", content: ["加密键盘（100mm*100mm）银行卡信息读写"]},
                {name: "彩票识别兑奖模块", content: ["80mm热敏纸彩票自动扫描识别打印"]},
                {name: "输入设备", content: ["红外触摸屏"]},
                {name: "显示单元", content: ["17英寸彩色红外触摸液晶显示屏"]},
                {name: "后维护屏", content: ["12英寸彩色电阻触摸液晶显示屏"]},
                {name: "彩票打印机", content: ["80mm纸宽热敏纸质彩票专用打印机"]},
                {name: "日志打印机", content: ["76mm纸宽针式打印机(纸卷直径80mm)支持电子日志。默认支持英文和中文"]},
                {name: "视频监控", content: ["支持数字式实时硬盘录像和录像回放；支持网络操作；支持动态检测、视频遮挡检测。区域屏蔽功能。", "监控硬盘：500G"]},
                {name: "振动报警器", content: ["支持震动报警输入"]},
                {name: "人体感应监测器", content: ["人性智能化的感应监测"]},
                {name: "保险柜", content: ["配备符合UL291 24H标准的机械锁和数字密码锁"]},
                {name: "机柜门状态检测", content: ["实时检测保险柜、电子柜前/后门状态"]},
                {name: "指示灯", content: ["控制出钞口、入钞口，凭条口指示灯；", "四种指示灯状态：亮、灭、慢闪和快闪"]},
                {name: "音效", content: ["双声道立体声环绕功放系统"]},
                {name: "电源输入", content: ["AC200V 50HZ"]},
                {name: "总功率", content: ["350W"]},
                {name: "电源管理模块", content: ["重要部件顺序上电"]},
                {name: "UPS电源(选件)", content: ["1000W.智能15分钟不间断电源"]},
                {name: "外观尺寸", content: ["高1700mm；宽960mm；深1070mm"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]
        },
        '3': {
            "id": "3",
            "name": "外币自助充值终端",
            "class_rul": "/products/4/",
            "detail_url": "/products/4/3",
            "thumbnail": '/static/images/productsImg/finance3_m1.jpg',
            "no": 'YH8403',
            "use": "主要适用于银行业等，可提供零钞兑换整钞,整钞兑换零钞的自助服务。方便消费者对钞票的使用。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/finance3_s1.jpg'],
            "large_img": ['/static/images/productsImg/finance3_l1.jpg'],
            "detail": ['/static/images/productsImg/finance3_4.jpg'],
            "detai": [{id: "1", name: "功能特点", div: "function"},
                {id: "2", name: "用户操作", div: "operate"},
                {id: "3", name: "智能管理", div: "manage"},
                {id: "4", name: "技术参数", div: "parameter"}],
            "function": "/static/images/productsImg/finance3_d11.jpg",
            "operate": "/static/images/productsImg/finance3_d21.jpg",
            "manage": "/static/images/productsImg/traffic7_d31.jpg",
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {name: "安装方式", content: ["大堂式"]},
                {name: "维护方式", content: ["后台维护"]},
                {name: "主控模块", content: ["操作系统:嵌入式LINUX操作系统", "主板:工业级嵌入式主板 ;DDR3内存:2G", "高速电子双硬盘:系统运行盘8G、数据备份盘8G"]},
                {name: "入钞模块", content: ["可接收100、50、20、10、5、1元人民币纸币", "入钞方式:纵向单张入钞； 入钞保护:钞票识别器", "插拔式钞箱：单个钞箱容量达2500张"]},
                {
                    name: "出钞模块",
                    content: ["50、20、10、5、1元人民币的智能优化出钞组合", "出钞方式：摩擦式横向成叠出钞 ； 出钞保护：电动闸门/成叠钞票回收", "插拔式钞箱：单个钞箱容量达3000张 ； 出钞速度：7张/秒"]
                },
                {name: "银行卡支付模块", content: ["加密键盘（100mm*100mm）银行卡信息读写"]},
                {name: "彩票识别兑奖模块", content: ["80mm热敏纸彩票自动扫描识别打印"]},
                {name: "输入设备", content: ["红外触摸屏"]},
                {name: "显示单元", content: ["17英寸彩色红外触摸液晶显示屏"]},
                {name: "后维护屏", content: ["12英寸彩色电阻触摸液晶显示屏"]},
                {name: "彩票打印机", content: ["80mm纸宽热敏纸质彩票专用打印机"]},
                {name: "日志打印机", content: ["76mm纸宽针式打印机(纸卷直径80mm)支持电子日志。默认支持英文和中文"]},
                {name: "视频监控", content: ["支持数字式实时硬盘录像和录像回放；支持网络操作；支持动态检测、视频遮挡检测。区域屏蔽功能。", "监控硬盘：500G"]},
                {name: "振动报警器", content: ["支持震动报警输入"]},
                {name: "人体感应监测器", content: ["人性智能化的感应监测"]},
                {name: "保险柜", content: ["配备符合UL291 24H标准的机械锁和数字密码锁"]},
                {name: "机柜门状态检测", content: ["实时检测保险柜、电子柜前/后门状态"]},
                {name: "指示灯", content: ["控制出钞口、入钞口，凭条口指示灯；", "四种指示灯状态：亮、灭、慢闪和快闪"]},
                {name: "音效", content: ["双声道立体声环绕功放系统"]},
                {name: "电源输入", content: ["AC200V 50HZ"]},
                {name: "总功率", content: ["350W"]},
                {name: "电源管理模块", content: ["重要部件顺序上电"]},
                {name: "UPS电源(选件)", content: ["1000W.智能15分钟不间断电源"]},
                {name: "外观尺寸", content: ["高1700mm；宽960mm；深1070mm"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]
        }
    },

    '5': {

        '1': {
            "id": "1",
            "name": "医疗挂号打印一体终端",
            "class_rul": "/products/5/",
            "detail_url": "/products/5/1",
            "thumbnail": '/static/images/productsImg/medical1_m1.jpg',
            "no": 'YH8501',
            "use": "主要适用于适用医院行业，可提供纸币自助缴费找零、银行卡自助缴费、诊疗卡自助缴费充值等服务，有效的解决了医院排队缴费难的困局。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/medical1_s1.jpg', '/static/images/productsImg/medical1_s2.jpg', '/static/images/productsImg/medical1_s3.jpg'],
            "large_img": ['/static/images/productsImg/medical1_l1.jpg', '/static/images/productsImg/medical1_l2.jpg', '/static/images/productsImg/medical1_l3.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "技术参数", div: "parameter"}],
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {
                    name: "主控模块",
                    content: ["CPU:ARM11", "操作系统:嵌入式LINUX操作系统", "工控板:嵌入式工控电脑板 ;DDR3内存:2G", "STTA接口硬盘：500G", "ATX电源：开关电源"]
                },
                {name: "显示设备", content: ["17-22英寸触摸显示屏任选"]},
                {name: "性能", content: ["全数控、绿色节能环保，显示器高清1080P"]},
                {
                    name: "机柜",
                    content: ["流线型外型，外表面豪华进口金属漆，采用高清冷轧钢材料，具有防锈，防磁，防静电等功能。", "颜色：标配 银灰机体配灰黑面板、银兰机体配兰面板（颜色可根据需求定制）"]
                },
                {name: "电源输入", content: ["AC200V 50HZ", "功耗：180W", "提供6孔220V交流带开关电源插座"]},
                {name: "音响", content: ["双声道，立体声环绕功放系统", "功率：2x2W"]},
                {name: "散热", content: ["工控正压风扇"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]
        },
        '2': {
            "id": "2",
            "name": "医疗自助缴费终端",
            "class_rul": "/products/5/",
            "detail_url": "/products/5/2",
            "thumbnail": '/static/images/productsImg/medical2_m1.jpg',
            "no": 'YH8502',
            "use": "主要适用于银行业等，可提供纸币自助缴费找零、银行卡自助缴费、诊疗卡自助缴费充值等服务，有效的解决了医院排队缴费难的困局。。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/medical2_s1.jpg', '/static/images/productsImg/medical2_s2.jpg', '/static/images/productsImg/medical2_s3.jpg'],
            "large_img": ['/static/images/productsImg/medical2_l1.jpg', '/static/images/productsImg/medical2_l2.jpg', '/static/images/productsImg/medical2_l3.jpg'],
            "detail": [''],
            "detai": "",
            "detai": [{id: "1", name: "技术参数", div: "parameter"}],
            "parameter": [{name: "指标项目", content: ["技术要求"]},
                {
                    name: "主控模块",
                    content: ["CPU:ARM11", "操作系统:嵌入式LINUX操作系统", "工控板:嵌入式工控电脑板 ;DDR3内存:2G", "STTA接口硬盘：500G", "ATX电源：开关电源"]
                },
                {name: "显示设备", content: ["17-22英寸触摸显示屏任选"]},
                {name: "性能", content: ["全数控、绿色节能环保，显示器高清1080P"]},
                {
                    name: "机柜",
                    content: ["流线型外型，外表面豪华进口金属漆，采用高清冷轧钢材料，具有防锈，防磁，防静电等功能。", "颜色：标配 银灰机体配灰黑面板、银兰机体配兰面板（颜色可根据需求定制）"]
                },
                {name: "电源输入", content: ["AC200V 50HZ", "功耗：180W", "提供6孔220V交流带开关电源插座"]},
                {name: "音响", content: ["双声道，立体声环绕功放系统", "功率：2x2W"]},
                {name: "散热", content: ["工控正压风扇"]},
                {name: "工作环境", content: ["温度：负20摄氏度至50摄氏度", "湿度:10%-90%"]}
            ]
        },
        '3': {
            "id": "3",
            "name": "医疗自助建档挂号终端",
            "class_rul": "/products/5/",
            "detail_url": "/products/5/3",
            "thumbnail": '/static/images/productsImg/medical3_m1.jpg',
            "no": 'YH8502',
            "use": "主要适用于银行业等，可提供纸币自助缴费找零、银行卡自助缴费、诊疗卡自助缴费充值等服务，有效的解决了医院排队缴费难的困局。。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/medical3_s1.jpg', '/static/images/productsImg/medical3_s2.jpg', '/static/images/productsImg/medical3_s3.jpg'],
            "large_img": ['/static/images/productsImg/medical3_l1.jpg', '/static/images/productsImg/medical3_l2.jpg', '/static/images/productsImg/medical3_l3.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "功能简介", div: "auto"},],
            "auto": ["自助建档挂号、自动发放诊疗卡、现金缴费找零。",
                "自助缴费功能:可接收20、10、5、1元的人民币纸币。",
                "智能找零功能：10、5、1元的人民币智能优化找零。",
                "身份证识别自动建档挂号功能。",
                "自助查询功能：帮助患者了解医院、科室、医生等相关信息。",
                "自动发放诊疗卡功能：1000张大容量IC卡储量。",
                "监控功能：监控终端各个模块运行状况。"
            ]
        }
    },

    '6': {
        '1': {
            "id": "1",
            "name": "石化缴费终端",
            "class_rul": "/products/6/",
            "detail_url": "/products/6/1",
            "thumbnail": '/static/images/productsImg/petrifaction1_m2.jpg',
            "no": 'YH8601',
            "use": "主要适用于石油等，可提供自助缴费、加油卡充值、优化找零、自助打印凭条、发票的功能，提高加油效率节省宝贵时间。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/petrifaction1_s3.jpg'],
            "large_img": ['/static/images/productsImg/petrifaction1_l1.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "功能简介", div: "auto"},],
            "auto": ["自助购票功能：可接收100元、50元、20元、10元、5元、1元纸币和1元硬币进行现金购票及银行卡购票。",
                "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币和1元硬币优化找零。",
                "100元、50元、20元、10元、5元、1元人民币收储量均达3000张，并可循环使用。",
                "加油卡充值。",
                "自助打印发票。",
                "自助打印凭条。",
                "立体声语音提示功能。",
                "待机广告循环播放。",
                "实时监控。"]
        }
    },

    '7': {
        '1': {
            "id": "1",
            "name": "话费自助缴费终端",
            "class_rul": "/products/7/",
            "detail_url": "/products/7/1",
            "thumbnail": '/static/images/productsImg/communication1_m2.jpg',
            "no": 'YH8701',
            "use": "主要适用于通讯行业等，可提供话费自助缴费找零功能，实现查询、缴费、发票打印“缴费一站式服务”，方便消费者使用。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/communication1_s3.jpg', '/static/images/productsImg/communication2_s3.jpg'],
            "large_img": ['/static/images/productsImg/communication1_l1.jpg', '/static/images/productsImg/communication2_l1.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "功能简介", div: "auto"},],
            "auto": ["自助购票功能：可接收100元、50元、20元、10元、5元、1元纸币和1元硬币进行现金购票及银行卡购票。",
                "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币和1元硬币优化找零。",
                "100元、50元、20元、10元、5元、1元人民币收储量均达3000张，并可循环使用。",
                "感应区可实现二代身份证、条码获取门票优惠、网购订单换取门票等。",
                "自助打印发票。",
                "自助打印凭条。",
                "立体声语音提示功能。",
                "待机广告循环播放。",
                "实时监控。"]
        }
    },

    '8': {
        '1': {
            "id": "1",
            "name": "旅游景区自助售票终端",
            "class_rul": "/products/8/",
            "detail_url": "/products/8/1",
            "thumbnail": '/static/images/productsImg/tourism1_m2.jpg',
            "no": 'YH8801',
            "use": "主要适用于旅游行业等，可提供自助购票、智能找零、发放门票、自助打印凭条的服务。",
            "description": [
                '超大容量钞箱双通道自动分箱技术，充分延长服务周期，减少清机频率。',
                '快捷简单的用户操作，化繁为简的设计。',
                '便捷安全的管理员操作，智能化的管理系统。'
            ],
            "small_img": ['/static/images/productsImg/tourism1_s3.jpg'],
            "large_img": ['/static/images/productsImg/tourism1_l1.jpg'],
            "detail": [''],
            "detai": [{id: "1", name: "功能简介", div: "auto"},],
            "auto": ["自助购票功能：可接收100元、50元、20元、10元、5元、1元纸币和1元硬币进行现金购票及银行卡购票。",
                "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币和1元硬币优化找零。",
                "100元、50元、20元、10元、5元、1元人民币收储量均达3000张，并可循环使用。",
                "年卡办理并发放。",
                "发放门票。",
                "感应区可实现二代身份证、条码获取门票优惠、网购订单换取门票等。",
                "自助打印凭条。",
                "立体声语音提示功能。",
                "待机广告循环播放。",
                "实时监控。"]

        }

    }

};

var products_background = {
    '1': {
        "id": "1",
        "category": "交通",
        "product_url": "/products/1",
        "img_url": "/static/images/homeImg/traffic.png",
        "tip": " 新域智能充分利用在自助设备方面的成熟技术与优势，成功进入智能交通系统与高速公路、停车场出入控制领域。" +
        "在研发与制造交通自助售检票终端设备的同时，与业内知名公司紧密合作，提供全面的交通客运自助售票解决方案。" +
        "自助系统解决方案利用自动售票机、自动检票机等终端设备，通过计算机...",
        "information": ["21世纪以来，“绿色交通· 低碳出行”的倡议得到了社会的认同和广泛的推广，公交、地铁等交通工具作为城市公共交通运输的重要载体，" +
        "已成为倡行“绿色交通”的重要桥梁，更成为市民和游客出行的首选交通工具。新的发展机遇并将带来的新的挑战，城市人口不断增加，" +
        "加之城际交通网络逐步完善带来的新人流，城市交通日益紧张，公共车成为市民出行的交通工具。" +
        "因此，更进一步完善城市公共交通管理、提高市民使用公交卡乘车也成为公交集团重视的问题。城市购买点稀疏，充值点少，远不能满足市民购卡、充值的需求，出现了许多“死卡”、“空卡”。" +
        "大多城市，“购卡难”“充值难”成为公交卡推广的主要瓶颈。"],
        "advantage": [
            "“自助售检票”服务：利用自动售票机、自动检票机等终端设备，通过计算机网络等设备和软件系统,完成自助售检票。" +
            "为城市场馆、停车场、高速公路、轨道交通、客运站点运营商实现自动售票、自动检票、自动收费、自动统计的封闭式票务管理平台和工具。",
            "交通自助售票服务系统以实现售票、检票、收费、计费、综合统计、设备监控的全过程自动化为目标，",
            "在现金处理：实现100元、50元、20元、10元、5元、1元人民币纸币的收取与找零。",
            "对运营公司而言：交通自助售票服务系统的应用可大量节省人力开支，提高售检票效率和效益；",
            "对乘客（观众）而言：避免了排队购票、手工找零、人工检票的繁琐，使得乘客（观众）出入场馆、交通出行、出入场馆更加快捷方便。"]

    },
    '2': {
        "id": "2",
        "category": "商业流通",
        "product_url": "/products/2",
        "img_url": "/static/images/homeImg/commercial.jpg",
        "tip": "国民经济的持续快速发展，为中国零售业的发展提供了良好的宏观环境。新形势的购物商场是集旅游、购物、娱乐、休闲、餐饮、文化等多功能服务于一体的商业综合体，" +
        "它包含着多种商业业态和有计划的商铺聚集，其须满足一定地区全龄层、全客层消费者的需要，达到整体最优的经营状。许多商超都存在着结账排长龙的情况...",
        "information": ["国民经济的持续快速发展，为中国零售业的发展提供了良好的宏观环境。新形势的购物商场是集旅游、购物、娱乐、休闲、餐饮、文化等多功能服务于一体的商业综合体，" +
        "它包含着多种商业业态和有计划的商铺聚集，其须满足一定地区全龄层、全客层消费者的需要，达到整体最优的经营状态。但许许多多的商超都存在着结账排长龙的情况，" +
        "这严重的影响着消费者的消费心情，浪费消费者的宝贵时间为消费者带来相应的困扰，也大幅度的增加了工作人员的工作量。" +
        "针对以上情况新域智能结合新域智能充分考虑了行业需求就消费者的利益制定相应方案，推出一款集自助购票、智能找零、发放门票、自助打印凭条为一体的商超自助收银找零终端，" +
        "解决商贸城、超市自助收银找零，实现商贸城全天侯无人值守的现金收付自动化服务；为广大消费者提供安全、便捷、可靠的服务"],
        "advantage": ["自助购票功能：可接收100元、50元、20元、10元、5元、1元纸币进行现金购票及银行卡购票，为消费者节约时间，提高消费效益。",
            "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币优化找零，降低服务窗口人员的工作量，减少人力资源支出。",
            "自助打印凭条可减轻工作人员的工作量，减少消费者的等候时间。",
            "提供立体声语音提示、待机广告循环播放、实时监控等功能，让消费者更安全、明朗的操作。",
            "解决商贸百货城购物现金自助充值回收服务"]
    },
    '3': {
        "id": "3",
        "category": "城市自助服务",
        "product_url": "/products/3",
        "img_url": "/static/images/homeImg/goverment.jpg",
        "tip": "日常生活中，缴水电费、电话费、物业费、有线电视费、交通违章罚款等等费用往往要去银行、邮局、各营业厅经过长时间的排队等待办理。" +
        "随着生活节奏的加快及新住宅区市郊分布，缴费难成为困扰人们生活的烦恼。如何提供一种更完善便利、不受时间和空间限制的便民化缴费服务...",
        "information": ["党的十八大明确提出了“工业化、信息化、城镇化和农业现代化”的“新四化”发展要求，十八届三中全会着重强调了要在新型城镇化建设中融入智慧城市的概念。" +
        "“智慧生态城市，四化同步发展，五位一体建设”，必将成为新时期我国城乡发展的重要理念和经营模式。",
            "日常生活中，缴水电费、电话费、物业费、有线电视费、交通违章罚款等等费用往往要去银行、邮局、各营业厅经过长时间的排队等待办理。" +
            "随着生活节奏的加快及新住宅区市郊分布，缴费难成为困扰人们生活的烦恼。如何提供一种更完善便利、不受时间和空间限制的便民化缴费服务，是政府民生工程十分关注的问题。",
            "新域智能充分考虑自助缴费系统的具体业务需求，从提高系统响应速度，优化终端界面及操作便利性出发，推出综合行业自助服务系统解决方案，" +
            "集成了自助缴纳水电费、电话费、物业费、有线电视费、交通违章罚款，预付费充值卡自助充值、自助历史记录查询、自助打印等功能，兼容各种磁卡、射频卡，" +
            "为各类缴费者提供安全快捷的缴费环境和24小时服务体系对提高国民素质、普及科技教育、提升政府为民服务形象、减缓城市交通压力、节能环保、节约社会资源、提高社会工作效率等方面影响意义深远。"],
        "advantage": ["提供多功能自助缴费渠道，实现全天候无人值守的现金收付自动化服务；",
            "提供缴费、查询自助式服务，降低各行业窗口工作量，为运营商节约人工成本；",
            "为缴费者提供轻松、便捷、可靠的缴费环境，提高服务品质，提升政府便民工程形象；",
            "支持银行卡闪付模式；",
            "支持银行卡圈存功能；",
            "采用我司研发的全球最先进的现金处理系统，可识别和清分1-100元人民币纸币，实现1-50元人民币纸币智能优化组合找零；",
            "所有终端设备与前置服务器通过有线及无线网络的形式链接组成一个局域网，通过Internet互联网可以实现各类公共服务项目一站式查询、缴费。" +
            "前置服务器的数据统计业务平台可提供准确的业务统计数据，用客观数据能够更加具体、准确的把握资金活动的整体情况。"]
    },
    '4': {
        "id": "4",
        "category": "金融",
        "product_url": "/products/4",
        "img_url": "/static/images/homeImg/finance.jpg",
        "tip": "银行系统需要采用新技术提高服务的安全性和质量。随着高端自助设备日益普及，金融自助服务终端功能不断完善，" +
        "自助银行作为一种新颖高效的服务方式成为业界关注的热点，也成为商业银行现代化水平的重要标志...",
        "information": ["银行系统需要采用新技术提高服务的安全性和质量。随着高端自助设备日益普及，金融自助服务终端功能不断完善，自助银行作为一种新颖高效的服务方式成为业界关注的热点，" +
        "也成为商业银行现代化水平的重要标志之一。针对以上情况，新域智能结合自身在自助服务终端强大的研发设计与丰富制造经验，推出银行自助服务系统解决方案。" +
        "系统设备在现金处理的完整性、结构设计的严谨性、操作及维护的便捷性、运营的稳定可靠性，后期技术支持兼容性上均处于行业领先水平"],
        "advantage": ["增加营业灵活性  自助银行可根据银行业务需求灵活配置到车站、码头、高等学府、商业繁华地段，保持24小时营业，可与银行传统营业网点的业务调整保持一致，" +
        "有很强的灵活性和可伸缩性。",
            "降低营运成本  客户使用自助设备就能完成各种金融交易(存、取款及其他中间业务)，可显著减少营业厅人力成本支出。"]
    },
    '5': {
        "id": "5",
        "category": "医疗",
        "product_url": "/products/5",
        "img_url": "/static/images/homeImg/medical.jpg",
        "tip": "随着医疗体制改革的不断深入，解决广大群众看病难的问题是当前政府和医院最为关心的事情。" +
        "据统计，就诊者在一次医疗过程中，花在排队的时间占总时间的70%左右。" +
        "其中，门诊挂号排队、取化验单排队、交费排队以及取药排队是医院解决看病难问题首先会考虑的...",
        "information": ["随着医疗体制改革的不断深入，解决广大群众看病难的问题是当前政府和医院最为关心的事情。" +
        "据统计，就诊者在一次医疗过程中，花在排队的时间占总时间的70%左右。" +
        "其中，门诊挂号排队、取化验单排队、交费排队以及取药排队是医院解决看病难问题首先会考虑的。" +
        "为此，新域智能推出医院自助服务系统解决方案，将自助挂号、自助排队，化验单自助查询打印，以及市民卡自助充值功能合为一体，" +
        "兼容各种磁卡、射频卡，条形码，为广大就诊者提供轻松、方便、快捷、安全、可靠的就诊环境，为医院减轻人力负担，提高服务质量。 "],
        "advantage": ["提供挂号、分诊排队、取单排队、取药排队、信息查询等业务的自助式服务，降低医院服务窗口工作量，减少人力资源支出；",
            "根据流量智能分配取药/分诊窗口，防止个别窗口因就诊者过多产生拥堵，缩短就诊者的等候时间，使医院的医疗秩序规范化、门诊管理现代化，提升医院就诊环境及服务质量；",
            "自助式服务减少就诊者交叉传染的机率；",
            "无人值守的现代化自助设备大大扩展了有效挂号时间，可以让就诊者随时挂号；",
            "挂号单上提示就诊科室/专家区域，解决就诊者“迷路”现象；",
            "自助式缴费，减少频繁找零时间； ",
            "设备采用触摸屏输入方式，便于就诊者操作。"]
    },

    '6': {
        "id": "6",
        "category": "石化",
        "product_url": "/products/6",
        "img_url": "/static/images/homeImg/petrifaction.jpg",
        "tip": "近年来，随着中国国民经济的快速发展、交通基础设施的不断改善，机动车辆的快速增加，加油站已成为民众生活中不可或缺的一部分。" +
        "随着车辆数量的急剧上涨，加油站常因加油高峰排队加油的人潮造成交通堵塞，秩序混乱。" +
        "如何提高加油效率，减少车主等候时间，是加油站面临的一个重要问题....",
        "information": ["近年来，随着中国国民经济的快速发展、交通基础设施的不断改善，机动车辆的快速增加，加油站已成为民众生活中不可或缺的一部分。随着车辆数量的急剧上涨，" +
        "加油站常因加油高峰排队加油的人潮造成交通堵塞，秩序混乱，许多司机也因此在加油这个环节中浪费了宝贵的时间。如何提高加油效率，减少车主等候时间，是加油站面临的一个重要问题。" +
        "为了解决这一难题，新域智能对此进行深入的探索并推出一款石化缴费终端，可为广大的消费者提供便捷的服务，大幅度的减少缴费、找零、打印凭条等程序所占用的时间,提升加油站运营管理效益。"],
        "advantage": ["提供自助缴费功能：可接收100元、50元、20元、10元、5元、1元纸币进行现金缴费、银行卡缴费，可减少机位空缺，避免司机产生烦躁情绪。",
            "可提供自助加油卡充值：可减少司机排队等候时间，降低加油站服务人员的工作量，减少人力资源支出，提高工作效率。",
            "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币优化找零，减少司机的等待时间，缓解高峰期车辆蜂拥而至，造成治安混乱，堵塞交通的现象。",
            "自助打印发票、自助打印凭条，可在收银环节缩短开票时间提高加油站服务效率，缓解了加油站高峰期间现场管理压力，促进了加油站销量稳步增长。",
            "立体声语音提示功能、待机广告循环播放、实时监控，为司机提供安全可靠、简单便捷的操作环境"]
    },
    '7': {
        "id": '7',
        "category": "通讯",
        "product_url": "/products/7",
        "img_url": "/static/images/homeImg/communication.jpg",
        "tip": "近年来，通信行业一直保持着用户群的激增及产品的高速更新，用户希望在营业厅得到更便利、丰富、人性化的服务与更直观的新产品功能体验。" +
        "新域智能针对通信运营商的具体业务需求，推出通信行业自助服务系统解决方案，为用户提供自助取号排队、自助缴费与新业务体验...",
        "information": ["近年来，通信行业一直保持着用户群的激增及产品的高速更新，用户希望在营业厅得到更便利、丰富、人性化的服务与更直观的新产品功能体验。" +
        "新域智能针对通信运营商的具体业务需求，推出通信行业自助服务系统解决方案，为用户提供自助取号排队、自助缴费与新业务体验等服务，" +
        "消费者不再需要为办理一笔缴费到营业网点等待办理业务，或是在常规营业网点排队去咨询新的通讯产品，而是可以随时在自助服务系统终端设备上完成，既方便消费者，" +
        "同时为通信运营商降低服务成本，提升企业形象。"],
        "advantage": ["真正实现查询、缴费、发票打印“缴费一站式服务”，方便消费者；",
            "降低服务窗口工作量，节约服务成本，缓解常规营业点日常客流压力，提升公司的服务形象，是经济效益和社会效益的双赢；",
            "实现24小时无人值守服务，用户消费时间灵活自主；",
            "系统远程控制终端设备的运行状态，包括开设新业务、暂停服务、程序升级、下传广告、上传日志等，实现网点运行状态零维护。"]
    },
    '8': {
        "id": '8',
        "category": "旅游",
        "product_url": "/products/8",
        "img_url": "/static/images/homeImg/travel.jpg",
        "tip": "旅游业是我国第三产业发展的主力。随着国家调整资源配置、转变经济发展方式，旅游经济对国民经济发展的促进作用将会进一步增强。" +
        "旅游可以作为现代人类社会中一种不断发展的休闲生活方式，能够丰富见识，放松压力，愉悦心灵，享受人生的美妙。但是旅游排队购票也成为一种很大困扰...",
        "information": ["旅游业是我国第三产业发展的主力，旅游经济是我国国民经济不可缺少的重要部分。随着国家调整资源配置、转变经济发展方式，旅游经济对国民经济发展的促进作用将会进一步增强。" +
        "旅游可以作为现代人类社会中一种不断发展的休闲生活方式，能够丰富见识，放松压力，愉悦心灵，享受人生的美妙。但是旅游排队购票也成为一种很大困扰。" +
        "为此，新域智能充分考虑了行业需求就消费者的利益制定相应方案，推出一款集自助购票、智能找零、发放门票、自助打印凭条为一体的旅游景区自助售票找零终端，" +
        "为广大消费者提供安全、便捷、可靠的服务。"],
        "advantage": ["自助购票功能：可接收100元、50元、20元、10元、5元、1元纸币进行现金购票及银行卡购票，为消费者节约时间，提高消费效益。",
            "智能找零功能：可由此服务终端智能进行50元、20元、10元、5元、1元纸币优化找零，降低服务窗口人员的工作量，减少人力资源支出。",
            "年卡办理并发放、门票发放、感应区可实现二代身份证、条码获取门票优惠、网购订单换取门票等，为消费者提供便捷高效的消费环境。",
            "自助打印凭条：可减轻工作人员的工作量，减少消费者的等候时间。",
            "提供立体声语音提示、待机广告循环播放、实时监控等功能，让消费者更安全、明朗的操作。"]
    }
};

var news_list = {
    '1': {
        'id': '1',
        'first_title': '全国首创！！',
        'second_title': '公交车载自助充值系统上线!',
        'title': '全国首创！公交车载自助充值系统上线！',
        'time': '2013年12月13日',
        'content_url': '/about/4/1',
        'icon_img':'/static/images/iconImg/top.png',
        'img_url': '/static/images/homeImg/current_news.jpg',
        'large_img': ['/static/images/newsImg/news_large11.jpg', '/static/images/newsImg/news_large12.jpg', '/static/images/newsImg/news_large13.jpg'],
        'small_img': ['/static/images/newsImg/news_small11.jpg', '/static/images/newsImg/news_small12.jpg', '/static/images/newsImg/news_small13.jpg'],
        'news_url': 'http://www.cutv.com/city/zhuhai/2013-10-11/1381478018821.shtml',
        // "video_url":"/static/images/video/newsVideo.mp4",
        "video_url": "/static/images/video/newsVideo.swf",
        'keyword': "交协领导莅临我司参观指导工作，全国首款自助售卡充值终端即将面世...",
        'summary': "摘要：珠海新域智能科技有限公司研发的“车载自助充值系统”正式上线，市民只需在公交车车载机器上插入公交卡放入钞票，便可轻松完成公交卡充值。",
        'p': ["由珠海新域智能科技有限公司研发，并与珠海市公交集团合作推广的“车载自助充值系统”正式上线，开启移动充值新时代 。",
            "为确保“车载自助充值系统”试运行顺利开展，公交集团与新域公司经过历时两个多月的时间，完成了系统开发、车载自助设备安装、设备稳定性的调试与结构调整、" +
            "充值功能的调试和对账测试、以及对设备通讯网络的稳定性调试优化等。在保证系统安全和具备上线网络条件的前提下，于今日正式在601路的10台车上上线试运行。",
            "市民只需在公交车车载在机器上方“入卡口”插入公交卡，系统验卡后当“入钞口”为绿灯时放入钞票，“车载自助充值系统”可收取10元、20元、50元、100元人民币，单次单张币充值，不设找零。" +
            "设备上方屏幕即会显示“正在充值，请勿移动卡片”。待系统提示充值成功，打印凭条后，充值完成，市民拔出IC卡即可。整个充值流程不到两分钟。便可轻松完成公交卡充值。",
            "即便车辆在行进过程中产生颠簸，该系统也能正常运行。“如果因为小故障未能充值成功，钞票会自动吐出来。”该终端还安装了先进的假币识别系统，“如果遇到假币，会自动识别吐出”。",
            "“车载式自助充值终端”成功出现在乘客的面前，正式在珠海市公交车601线路上启用，引起了市民的关注，" +
            "珠海电视台、南方都市报、珠海特区报、珠江晚报等媒体对此进行了全面的采访报道，“车载式自助充值终端”的面世得到了市民、网友的广泛赞同。",
            "该自助充值系统项目属全国首创，无论对珠海公交还是珠海新域公司都是一次大胆的尝试，系统从上线试运行到正式运行，标志着珠海公交科技建设发展又迈出历史性的一步。"
        ]
    },
    '2': {
        'id': '2',
        'first-title': '',
        'second-title': '公交车载自助充值终端单台日交易总额破2万！！',
        'title': '公交车载自助充值终端单台日交易总额破2万！！',
       /* 'special':["于3月23日，继公交车载自助充值终端单台日交易金额突破3千元之后，又一个振奋人心的事情发生了，那就是目前在K5和601路公交车上安装的13台公交车载自助充值终端日交易总额已突破" +
            "<span style='color: red;font-weight:bold;'>2万</span>元，高达20070元。新域智能科技有限公司致力于智慧化城市的建设和发展，" +
            "目前已取得如此好的成果，为新域智能点赞，为珠海点赞！！！"],*/
        'content_url': '/about/4/2',
        'time': '2015年3月23日',
        'icon_img':'/static/images/iconImg/new.png',
        'img_url': '',
        'large_img': "",
        'small_img': [],
        'news_url': '',
        'keyword': "",
        'summary': "",
        'p':["于3月23日，继公交车载自助充值终端单台日交易金额突破3千元之后，又一个振奋人心的事情发生了，那就是目前在K5和601路公交车上安装的13台公交车载自助充值终端日交易总额已突破" +
            "<span style='color: red;font-weight:bold;'>2万</span>元，高达20070元。新域智能科技有限公司致力于智慧化城市的建设和发展，" +
            "目前已取得如此好的成果，为新域智能点赞，为珠海点赞！！！"]
    },
    '3': {
        'id': '3',
        'first-title': '',
        'second-title': '宜春公交公司一行人员来我司访问、考察',
        'title': '宜春公交公司一行人员来我司访问、考察',
        'content_url': '/about/4/3',
        'time': '2015年3月7日',
        'icon_img':'/static/images/iconImg/new.png',
        'img_url': '',
        'large_img': ['/static/images/newsImg/yichun01.png', '/static/images/newsImg/yichun02.png','/static/images/newsImg/yichun03.png', '/static/images/newsImg/yichun04.png',
            '/static/images/newsImg/yichun05.png', '/static/images/newsImg/yichun06.png'],
        'small_img': [],
        'news_url': '',
        'keyword': "",
        'summary': "",
        'p': ["2015年3月7号、8号，宜春公交公司副总经理一行人员来新域智能科技有限公司访问、考察。参观了公司的生产规模、研发团队，与龚总及公司市场部等技术人员进行了充分的沟通，" +
            "了解了我公司的规模及公司发展方向，并亲自对我公司研发生产的产品进行了实际操作。此次访问考察，宜春公交公司对我公司的产品实用性和高度可靠性及发展前景做出了高度评价，" +
            "最终与我公司签订了自助售卡充值终端供货合同，且对我公司提出的智慧化城市的理念表示非常认可，并表示与我公司在智慧化城市建设方面有着广阔的合作空间，希望能建立长期的战略伙伴关系。"]
    },
    '4': {
        'id': '4',
        'first-title': '单台日交易破3千',
        'second-title': '公交车载自助充值终端单台日交易金额破3千！！',
        'title': '公交车载自助充值终端单台日交易金额破三千',
        'content_url': '/about/4/4',
        'time': '2015年3月5日',
        'icon_img':'',
        'img_url': '',
        'large_img': ['/static/images/newsImg/rijiaoyi01.jpg'],
        'small_img': ['/static/images/newsImg/rijiaoyi21.jpg'],
        'news_url': '',
        'keyword': "",
        'summary': "摘要：新域智能科技有限公司研发的公交车载自助充值终端单台日交易金额破三千元大关！",
        'p': ["新域智能科技有限公司研发并已投入使用的公交车载自助充值终端单台日交易金额已突破三千！！！",
            "随着生活节奏的加快，有时候在搭乘公交车时突然发现公交卡上余额不足，为此深感不便的人们将不在愁烦了。" +
            "由新域智能科技有限公司研发生产的公交车载自助充值设备，在您搭乘公交车时即可自助充值，省时省力，已逐渐被广大市民信任、依赖，" +
            "目前日交易金额单台充值已突破三千元，高达<span style='color: red;font-weight:bold;'>3320</span>元!!!"]
    },
    '5': {
        'id': '5',
        'first-title': '权威认证',
        'second-title': '获得“采用国际标准产品标志”认证',
        'title': '获得“采用国际标准产品标志”认证',
        'content_url': '/about/4/5',
        'time': '2014年4月14日',
        /*'icon_img':'/static/images/iconImg/new.png',*/
        'img_url': '/static/images/p_standard2.jpg',
        'large_img': ['/static/images/newsImg/news_large21.jpg', '/static/images/newsImg/news_large22.jpg'],
        'small_img': ['/static/images/newsImg/news_small21.jpg', '/static/images/newsImg/news_small22.jpg'],
        'news_url': 'http://www.cutv.com/city/zhuhai/2013-10-11/1381478018821.shtml',
        'keyword': "",
        'summary': "摘要：新域智能科技有限公司多功能现金自助缴费终端产品通过国家标准化管理委员会的严格检测，获得“采用国际标准产品标志”证书。",
        'p': ["采标标志是我国产品采用国际标准的一种专用说明标志，标志企业产品质量达到或超越国际先进水平，符合或超越最新国际标准。",
            "近日，新域智能自主创新产品多功能现金自助服务终端经过国家标准化管理委员会的严格审查检测，所有项目全部符合达到最新国际标准，荣获“采用国际标准产品标志”证书",
            "一直坚持进行产品的自主创新，研发和产品质量的严格把关，并率先引进了多项最新国际标准。此次，新域智能能够通过国家标准化管理委员会的认定，" +
            "将不仅为创新类产品的品质树立一项新的标准，而且为产商在选购质量优异的产品时提供了更好的依据与信心。再次体现了新域智能在业内的产品及科技地位的领先，彰显了行业领航地位。",
            "此次获得“采用国际标准证书”不仅表明了产品品质获得了国家质量相关部门认可，更是对国内创新类产品与国际接轨起到了一个推动作用，" +
            "为中国的创新产品更好的打入国际市场，受到国际消费者的认可做了更好的铺垫"]
    },
    '6': {
        'id': '6',
        'first-title': '权威认证',
        'second-title': '经国家机构认可，获得ISO9001认证',
        'title': '经国家机构认可，获得ISO9001认证',
        'content_url': '/about/4/6',
        'time': '2014年2月24日',
        'img_url': '/static/images/p_9001.jpg',
        'large_img': ['/static/images/newsImg/news_large31.jpg', '/static/images/newsImg/news_large32.jpg'],
        'small_img': ['/static/images/newsImg/news_small31.jpg', '/static/images/newsImg/news_small32.jpg'],
        'keyword': "交协领导莅临我司参观指导工作，全球首款自助售卡充值终端即将面世...",
        'news_url': 'http://www.cutv.com/city/zhuhai/2013-10-11/1381478018821.shtml',
        'summary': "摘要：新域智能科技有限公司经一系列严格的审查考核，满足ISO9001：2008质量管理体系标准要求，获得认证证书。",
        'p': ["ISO9001:2008是由国际标准化组织组织编写的《质量管理体系要求》新版标准，已于2008年发布并实施，" +
        "相对于旧版标准可以更科学地改善组织质量管理体系中的薄弱环节，进一步提高质量管理体系的有效性。",
            "2014年2月，质量认证中心审核专员莅临我公司进行审核，经过对各部门贯彻质量管理体系工作情况以及生产车间现场管理方式的全面审核，" +
            "专家组成员一致认定重炉的质量管理体系符合认证要求，运行有效，顺利通过了质量体系监督审查工作，获得IOS9001认证。",
            "公司自2011年建立质量体系以来，全体员工在体系“持续改进”原则的指引下，以产品质量为关注焦点的理念不断增强，形成了按文件要求工作的好习惯，" +
            "同时公司完善了很多规章制度和工作程序，建立了持续改进的有效机制。其管理水平和产品质量得到了不断的提高，有利地促进了公司各项工作的开展，成效明显。",
            "本次认证的通过标志着我公司各项管理系统已经达到国际相关标准，我们的目标不仅仅是获得一张质量认证证书，更重要的是在今后的工作中要持续依据ISO 9001标准实施规范化管理，" +
            "认真贯彻体系要求，进一步提高全员质量意识，促进每位员工各司其职、各尽其责，推动公司生产、技术、质量、安全再上新台阶"]
    },
    '7': {
        'id': '7',
        'first-title': '权威认证',
        'second-title': '经国家机构认可，获得3C认证',
        'title': '经国家机构认可，获得3C认证',
        'content_url': '/about/4/7',
        'time': '2014年2月20日',
        'img_url': '/static/images/p_3c.jpg',
        'large_img': ['/static/images/newsImg/news_large41.jpg', '/static/images/newsImg/news_large42.jpg'],
        'small_img': ['/static/images/newsImg/news_small41.jpg', '/static/images/newsImg/news_small42.jpg'],
        'keyword': "交协领导莅临我司参观指导工作，全球首款自助售卡充值终端即将面世...",
        'news_url': 'http://www.cutv.com/city/zhuhai/2013-10-11/1381478018821.shtml',
        'summary': "摘要：新域智能科技有限公司经国家质量认证中心审查小组严格审查，获得由CQC中国质量认证中心颁发的3C认证证书。",
        'p': ["3C认证由国家公布统一的目录，确定统一适用的国家标准、技术规则和实施程序，制定统一的标志标识，规定统一的收费标准，" +
        "凡列入强制性产品认证目录内的产品，必须经国家指定的认证机构认证合格，取得相关证书并加施认证标志后，方能出厂、进口、销售和在经营服务场所使用。",
            "2014年2月，3C认证监督审核小组三位成员如期抵达我司，以3C认证产品实施规则及相关文件、" +
            "产品安全认证标准及产品描述报告为依据，先后到我司生产车间（仓库）、采购部门及质量检验部门，通过对产品生产过程控制和过程检验、" +
            "关键制造工艺和材料检验及内部质量审核等项目进行严格审核后认为，我司领导重视完善3C产品质量体系的实施和运行，" +
            "公司管理者代表指定的质量方针符合公司的经营宗旨，相关职能层次上也建立了相应的质量目标。经审核，我司顺利通过国家强制性3C认证监督审核。",
            "贯彻实施质量体系及3C认证是公司的一项长期工作，要常抓不懈，要把品质意识和质量目标灌输到每一位员工，从而使品质管理进入到更高的水平。"]
    },
    '8 ': {
        'id': '8',
        'first-title': '公交协会',
        'second-title': '协办广东省公共交通编委会会议',
        'title': '协办广东省公共交通编委会会议',
        'content_url': '/about/4/8',
        'time': '2013年12月12日',
        'img_url': '/static/images/current_news.jpg',
        'large_img': ['/static/images/newsImg/news_large51.jpg', '/static/images/newsImg/news_large52.jpg', '/static/images/newsImg/news_large53.jpg',
            '/static/images/newsImg/news_large54.jpg', '/static/images/newsImg/news_large55.jpg', '/static/images/newsImg/news_large57.jpg', '/static/images/newsImg/news_large56.jpg'],
        'small_img': ['/static/images/newsImg/news_small51.jpg', '/static/images/newsImg/news_small52.jpg', '/static/images/newsImg/news_small53.jpg',
            '/static/images/newsImg/news_small54.jpg', '/static/images/newsImg/news_small55.jpg', '/static/images/newsImg/news_small57.jpg', '/static/images/newsImg/news_small56.jpg'],
        'keyword': "交协领导莅临我司参观指导工作，全球首款自助售卡充值终端即将面世...",
        'news_url': 'http://www.cutv.com/city/zhuhai/2013-10-11/1381478018821.shtml',
        'summary': "摘要：由新域智能科技有限公司协办的广东省公共交通编委会会议圆满结束",
        'p': ["2013年12月11日，广东省公共交通编委会会议在公交协会理事单位新域智能公司协办下于珠海海泉湾顺利召开。与会人员包括省直有关单位负责人、省公交协会和省内骨干公交企业负责人以及先进代表共61人",
            "会议中各常务理事发表重要讲话，并交流了公共交通工作经验，总结了近年来广东省城市公交在保障能力、公交体系、服务水平、" +
            "管理模式科技引领以及绿色发展方面取得的成绩。贯彻落实国务院关于城市优先发展公共交通的指导意见和省政府的实施意见，研究部署下一阶段的工作。",
            "广东省公共交通编委会会议的召开，统一了认识，明确了目标和责任，是广东省城市公共交通发展的一个里程碑，对提升公交服务水平，促进行业持续、快速、健康发展必将起到积极的推动作用。",
            "新域智能做为广东省城市公共交通理事单位，通过会议更觉清晰明确发展目标及方向，同时也倍感压力。面对新的机遇和挑战，压力同时也是动力，新域智能定会肩负责任，勇敢前行，创造新高峰。"]
    },
    '9': {
        'id': '9',
        'first-title': '工信部考察',
        'second-title': '广东省工信部莅临我司考察研讨',
        'title': '广东省工信部莅临我司考察研讨',
        'content_url': '/about/4/9',
        'time': '2012年12月21日',
        'img_url': '/static/images/current_news.jpg',
        'large_img': ['/static/images/newsImg/news_large61.jpg', '/static/images/newsImg/news_large62.jpg', '/static/images/newsImg/news_large63.jpg'],
        'small_img': ['/static/images/newsImg/news_small61.jpg', '/static/images/newsImg/news_small62.jpg', '/static/images/newsImg/news_small63.jpg'],
        'keyword': "交协领导莅临我司参观指导工作，全球首款自助售卡充值终端即将面世...",
        'news_url': 'http://www.cutv.com/city/zhuhai/2013-10-11/1381478018821.shtml',
        'summary': "摘要：广东省工信部相关工作人员莅临我司就银行卡、现金自助服务相关问题进行深入考察研讨。",
        'p': ["2012年12月21日早，广东省工信部相关人员莅临我司。参观了我司生产车间、产品展厅，并观摩设备整体结构，各模块功能演示，以及设备使用全流程。" +
        "并银行卡、现金自助缴费服务终端提出相关问题，同时提出相关意见及建议，得到满意答复。" +
        "结束时，对我司的研发实力及生产能力表示充分肯定。"]
    },
    '10': {
        'id': '10',
        'first-title': '银行业交流',
        'second-title': '广东省银行业相关人员莅临我司交流研讨',
        'title': '广东省银行业相关人员莅临我司交流研讨',
        'content_url': '/about/4/10',
        'time': '2012年12月10日',
        'img_url': '/static/images/current_news.jpg',
        'large_img': ['/static/images/newsImg/news_large71.jpg', '/static/images/newsImg/news_large72.jpg', '/static/images/newsImg/news_large73.jpg', '/static/images/newsImg/news_large74.jpg'],
        'small_img': ['/static/images/newsImg/news_small71.jpg', '/static/images/newsImg/news_small72.jpg', '/static/images/newsImg/news_small73.jpg', '/static/images/newsImg/news_small74.jpg'],
        'keyword': "交协领导莅临我司参观指导工作，全球首款自助售卡充值终端即将面世...",
        'news_url': 'http://www.cutv.com/city/zhuhai/2013-10-11/1381478018821.shtml',
        'summary': "摘要：广东省银行业业内相关人员莅临我司就银行卡、现金自助服务相关问题进行考察交流，并提出意见与建议",
        'p': ["2012年12月10日早，广东省银行业内人员莅临我司。参观了我司生产车间、产品展厅，并观摩设备整体结构，各模块功能演示，以及设备使用全流程。" +
        "并对入钞模块及出钞模块提出相关问题，与技术人员进行深入探究。" +
        "结束时，对我司的研发实力及生产能力表示高度赞赏。"]
    },
    '11': {
        'id': '11',
        'first-title': '顺德水业',
        'second-title': '佛山顺德水业公司莅临我司交流研讨',
        'title': '佛山顺德水业公司莅临我司交流研讨',
        'content_url': '/about/4/11',
        'time': '2012年10月30日',
        'img_url': '/static/images/current_news.jpg',
        'large_img': ['/static/images/newsImg/news_large81.jpg', '/static/images/newsImg/news_large82.jpg', '/static/images/newsImg/news_large83.jpg', '/static/images/newsImg/news_large84.jpg'],
        'small_img': ['/static/images/newsImg/news_small81.jpg', '/static/images/newsImg/news_small82.jpg', '/static/images/newsImg/news_small83.jpg', '/static/images/newsImg/news_small84.jpg'],
        'keyword': "交协领导莅临我司参观指导工作，全球首款自助售卡充值终端即将面世...",
        'news_url': 'http://www.cutv.com/city/zhuhai/2013-10-11/1381478018821.shtml',
        'summary': "摘要：佛山顺德水业公司莅临我司就水费自助缴费找零项目进行深入合作交流研讨。",
        'p': ["2012年10月30日早，佛山顺德水业公司莅临我司就水费自助缴费找零合作项目进行深入交流研讨。",
            "佛山顺德水业公司一行人员观摩了我司水费自助缴费找零设备样机整体使用，并对各个功能模块进行深入了解，提出相关疑问，我司技术人员对此一一解答。",
            "随后，于会议室对水务自助缴费找零系统定制终端、服务器、监控端的问题提出相关疑问及要求"]
    },
    '12': {
        'id': '12',
        'first-title': '外国公司交流',
        'second-title': '意大利汉琳德公司莅临我司交流研讨',
        'title': '意大利汉琳德公司莅临我司交流研讨',
        'content_url': '/about/4/12',
        'time': '2012年10月19日',
        'img_url': '/static/images/current_news.jpg',
        'large_img': ['/static/images/newsImg/news_large91.jpg', '/static/images/newsImg/news_large92.jpg', '/static/images/newsImg/news_large93.jpg'],
        'small_img': ['/static/images/newsImg/news_small91.jpg', '/static/images/newsImg/news_small92.jpg', '/static/images/newsImg/news_small93.jpg'],
        'keyword': "交协领导莅临我司参观指导工作，全球首款自助售卡充值终端即将面世...",
        'news_url': 'http://www.cutv.com/city/zhuhai/2013-10-11/1381478018821.shtml',
        'summary': "摘要：意大利汉琳德公司莅临我司就设备打印部件相关问题进行交流合作研讨。",
        'p': ["2012年10月19日下午，意大利汉琳德著名打印机生产公司，一行人员莅临我公司参观，受到我司领导热情接待。",
            "意大利汉琳德合作商参观了我司生产车间、产品展厅，并观摩设备整体结构，各模块功能演示，以及设备使用全流程。",
            "随后，于会议室与我司技术人员就设备功能模块展开激烈的交流讨论，提出相关意见及建议。",
            "会后，汉琳德对我司研发实力及产品质量表示高度赞赏，希望回国后尽快开展深化合作事宜。"]
    }
};

var activities_list = {
    '1': {
        'id': '1',
        'second-title': '2015年珠海新域智能科技有限公司年会',
        'title': '2015年珠海市新域智能科技有限公司年会',
        'content_url': '/about/6/1',
        'time': '2014年12月7日',
        'large_img': ['/static/images/activitiesImg/nianhui01.jpg', '/static/images/activitiesImg/nianhui02.jpg',
		'/static/images/activitiesImg/nianhui03.jpg', '/static/images/activitiesImg/nianhui04.jpg',
		'/static/images/activitiesImg/nianhui05.jpg', '/static/images/activitiesImg/nianhui06.jpg',
		'/static/images/activitiesImg/nianhui07.jpg', '/static/images/activitiesImg/nianhui08.jpg',
		'/static/images/activitiesImg/nianhui09.jpg', '/static/images/activitiesImg/nianhui10.jpg','/static/images/activitiesImg/nianhui11.jpg'],
        'p': ["2015年12月7日，珠海市新域智能科技有限公司PAERT BEGIN!!!!!!!",
            "大家尽情吃，尽情喝，尽情表演，尽情兴奋~~~~"]
    },

    '2': {
        'id': '2',
        'second-title': '珠海市新域智能科技有限公司工会成立',
        'title': '珠海市新域智能科技有限公司工会成立',
        'content_url': '/about/6/2',
        'time': '2014年12月7日',
        'large_img': ['/static/images/activitiesImg/gonghui01.jpg', '/static/images/activitiesImg/gonghui02.jpg'],
        'p': ["2014年12月7日，珠海市新域智能科技有限公司工会成立，经提名及公司领导层投票确定，工会主席：卢强； 组织委员：朱丽红； 宣传委员：吴成龙； 女工委员：黄莎； 经费审查委员：张晨 "
            ]
    }
};

var patent_list = {
    '1': {
        'id': '1',
        'name': "彩票自助找零售买服务终端专利",
        'smallimg': '/static/images/patentImg/patent1s.jpg',
        'bigimg': '/static/images/patentImg/patent1b.jpg'
    },
    '2': {
        'id': '2',
        'name': "车载公交IC卡现金充值装置专利",
        'smallimg': '/static/images/patentImg/patent2s.jpg',
        'bigimg': '/static/images/patentImg/patent2b.jpg'
    },
    '3': {
        'id': '3',
        'name': "旧钞自助兑换服务终端专利",
        'smallimg': '/static/images/patentImg/patent3s.jpg',
        'bigimg': '/static/images/patentImg/patent3b.jpg'
    },
    '4': {
        'id': '4',
        'name': "外币自助兑换服务终端专利",
        'smallimg': '/static/images/patentImg/patent4s.jpg',
        'bigimg': '/static/images/patentImg/patent4b.jpg'
    },
    '5': {
        'id': '5',
        'name': "一种水电费自助缴费找零服务终端专利",
        'smallimg': '/static/images/patentImg/patent5s.jpg',
        'bigimg': '/static/images/patentImg/patent5b.jpg'
    },
    '6': {
        'id': '6',
        'name': "一种税务自助缴费找零服务终端专利",
        'smallimg': '/static/images/patentImg/patent6s.jpg',
        'bigimg': '/static/images/patentImg/patent6b.jpg'
    },
    '7': {
        'id': '7',
        'name': "一种医疗自助缴费找零服务终端专利",
        'smallimg': '/static/images/patentImg/patent7s.jpg',
        'bigimg': '/static/images/patentImg/patent7b.jpg'
    },
    '8': {
        'id': '8',
        'name': "一种银行多面值存取款服务终端专利",
        'smallimg': '/static/images/patentImg/patent8s.jpg',
        'bigimg': '/static/images/patentImg/patent8b.jpg'
    },
    '9': {
        'id': '9',
        'name': "一种纸币输送通道及可配备多钱箱的自助终端专利",
        'smallimg': '/static/images/patentImg/patent9s.jpg',
        'bigimg': '/static/images/patentImg/patent9b.jpg'
    },
    '10': {
        'id': '10',
        'name': "纸币对中装置及使用该装置的纸币存取机专利",
        'smallimg': '/static/images/patentImg/patent10s.jpg',
        'bigimg': '/static/images/patentImg/patent10b.jpg'
    },
    '11': {
        'id': '11',
        'name': "自助缴费找零加油服务终端专利",
        'smallimg': '/static/images/patentImg/patent11s.jpg',
        'bigimg': '/static/images/patentImg/patent11b.jpg'
    },
    '12': {
        'id': '12',
        'name': "综合自助缴费找零服务终端专利",
        'smallimg': '/static/images/patentImg/patent12s.jpg',
        'bigimg': '/static/images/patentImg/patent12b.jpg'
    },
    '13': {
        'id': '13',
        'name': "残旧纸币自助兑换机专利",
        'smallimg': '/static/images/patentImg/patent13s.jpg',
        'bigimg': '/static/images/patentImg/patent13b.jpg'
    },
    '14': {
        'id': '14',
        'name': "多面值自助缴费找零终端专利",
        'smallimg': '/static/images/patentImg/patent14s.jpg',
        'bigimg': '/static/images/patentImg/patent14b.jpg'
    },
    '15': {
        'id': '15',
        'name': "一种纸币存取钱箱及使用该钱箱的多面值纸币存取机专利",
        'smallimg': '/static/images/patentImg/patent15s.jpg',
        'bigimg': '/static/images/patentImg/patent15b.jpg'
    },
    '16': {
        'id': '16',
        'name': "一种皱钞整平装置专利",
        'smallimg': '/static/images/patentImg/patent16s.jpg',
        'bigimg': '/static/images/patentImg/patent16b.jpg'
    },
    '17': {
        'id': '17',
        'name': "自助缴费找零终端外观设计专利",
        'smallimg': '/static/images/patentImg/patent17s.jpg',
        'bigimg': '/static/images/patentImg/patent17b.jpg'
    },
    '18': {
        'id': '18',
        'name': "出入钞分体式彩票自助终端专利",
        'smallimg': '/static/images/patentImg/patent18s.jpg',
        'bigimg': '/static/images/patentImg/patent18b.jpg'
    },
    '19': {
        'id': '19',
        'name': "出入钞循环式彩票自助终端专利",
        'smallimg': '/static/images/patentImg/patent19s.jpg',
        'bigimg': '/static/images/patentImg/patent19b.jpg'
    }
    /* '20':{'id':'20','name':"一种具有找零功能的自助加油终端专利",'smallimg':'/static/images/patentImg/patent20s.jpg','bigimg':'/static/images/patentImg/patent20b.jpg'},
     '21':{'id':'21','name':"纸币对中装置、使用该装置的纸币存取机及纸币对中方法",'smallimg':'/static/images/patentImg/patent21s.jpg','bigimg':'/static/images/patentImg/patent21b.jpg'},
     '22':{'id':'22','name':"一种带找零功能的便民综合自助缴费终端专利",'smallimg':'/static/images/patentImg/patent22s.jpg','bigimg':'/static/images/patentImg/patent22b.jpg'},
     '23':{'id':'23','name':"人民币自助兑换终端专利",'smallimg':'/static/images/patentImg/patent23s.jpg','bigimg':'/static/images/patentImg/patent23b.jpg'},
     '24':{'id':'24','name':"一种纸币存储及叠钞钱箱专利",'smallimg':'/static/images/patentImg/patent24s.jpg','bigimg':'/static/images/patentImg/patent24b.jpg'},
     '25':{'id':'25','name':"一种处理业务逻辑界面及控制外围设备的方法和系统专利",'smallimg':'/static/images/patentImg/patent25s.jpg','bigimg':'/static/images/patentImg/patent25b.jpg'}*/
};

var result = {
    data: [],
    count: 100
};

result.data;

var supports_list = {
    "1": {
        "id": "1",
        "description": '技术支持与服务',
        "information": [{"item": "技术支持及服务项目", "content": ["具体服务内容"]}, {"item": "设备更换", "content": ["设备故障诊断", "硬件设备送修"]},
            {"item": "提供设备", "content": ["提供各种硬件设备配件"]}, {
                "item": "软件维护",
                "content": ["操作系统安装", "数据库安装", "应用软件安装", "其他系统软件安装"]
            },
            {"item": "系统培训", "content": ["硬件设备基本操作规程培训", "硬件基本设备故障修复培训", "操作系统及数据库的培训", "其他操作系统软件和应用软件的培训"]},
            {"item": "例行设备检测", "content": ["网络系统检测", "服务器检测", "关键设备及配置情况检测", "重要软件系统设计通知"]},
            {"item": "技术交流及通知服务", "content": ["新产品通知"]}, {"item": "现场服务", "content": ["提供专业技术人员进行现场服务"]}],

        "describe": []
    },
    "2": {
        "id": '2',
        "description": "售后服务",
        "information": [],
        "describe": [{"item": "维护服务", "content": ["及时电话或书面解答用户提出的疑问，必要时派人员到现场服务，帮助用户解决技术问题，保证系统的正常运行。"]},
            {
                "item": "维修服务", "content": ["故障保修时，由用户指定的联系人书面或电话通知我公司；", "我公司接通知后1小时派员到使用现场处理；",
                "系统自验收合格之日起，免费保修一年，终身维护;", "免费维修期内人为或自然灾害引起的故障或损坏，仅收取维修成本费（更换配件费用除外）。"]
            },
            {
                "item": "以下情况不属保修范围",
                "content": ["因不正常操作及人为或自然灾害而引起的损坏；", "自行拆卸改换机内任何部分（如：线路、零件）后造成损坏；", "非我方指定的专业技术人员指导安装而引起的故障。"]
            },
            {
                "item": "更新改进服务", "content": ["产品设计更新或软件版本升级，即时通知和协助用户进行已运行系统的改进提高，并无偿提供软 件新版本，使系统随时处于最先进的水平和最完善的状态。",
                "用户对系统改制、扩容、拆点等不同要求，公司将及时、准确地予以满足。"]
            },
            {
                "item": "建立用户档案，完善产品质量", "content": ["受理和收集用户投诉/咨询信息，保证用户提出的问题和要求能得到及时处理，并对处理情况进行跟踪和验证。" +
            "同时建立用户档案，记录产品使用情况，为今后公司产品的质量改进提供依据。"]
            }]
    }
};


 var joinus_list = {
  '1': {
      'id': '1',
      'description': '工作环境',
      'surroundingimg':'/static/images/aboutImg/joinus_list2.jpg',
      'information':''
  },
  '2': {
      'id': '2',
      'description': '招聘列表',
      'surroundingimg':'',
      'information':[{'item':'嵌入式软件工程师&nbsp&nbsp4人','duty':[],'require':["熟悉linux操作","精通C/C++语言","本科及以上学历","有3年以上windows API编程经验",
      "踏实好学，基础扎实，优秀应届生也可考虑"],'other':[]},
          {'item':'WEB前端工程师&nbsp&nbsp3人','duty':["WebApp的软件开发","根据项目任务计划按时完成软件编码和单元测试工作","在高级开发工程师的指导下完成模块内设计工作"],
              'require':["良好的Javascript编程功底；熟悉Javascript中的类、继承、闭包概念","能够熟练使用Javascript进行HTML DOM操作","熟悉CSS2，了解CSS3",
              "至少熟练使用下列其中一种框架优先： angularjs、bootstrap jQuery、jQueryMobile", "良好的技术理解和表达能力, 能承担一定的工作压力","熟悉c语言，能熟练操作linux 系统优先"],'other':[]},
          {'item':'服务器开发工程师&nbsp&nbsp6人','duty':[],'require':["2年以上Linux平台服务开发经验"," 熟练掌握Linux C/C++开发环境，熟悉多线程和多进程程序开发",
              " 熟练掌握Linux 下Socket网络编程开发","熟练掌握常用的分布式模型，能对大型开源项目做代码分析和系统优化","能够自我驱动，乐于接受挑战，热爱探索和钻研","沟通、理解能力强，有良好的团队合作精神",
              "有数据库（MongoDB/Redis/memcached/MySQL）研发经验者优先","熟悉TCP/IP协议及不同的网络服务模型研发经验者优先","计算机相关专业/本科，英语阅读能力优秀者优先"],'other':["3年以上服务器端开发经验",
              "扎实的Java基础","熟练运用Junit或Testng进行单元测试开发","熟练运用MySql,Oracle进行数据库开发","了解或掌握Maven，了解持续集成理念","有良好的团队合作精神,有责任感,有较好的沟通能力","熟悉AKKA WEBSOCKET 等优先考虑",
              " 熟悉TCP/IP协议及不同的网络服务模型研发经验者优先","计算机相关专业/本科，英语阅读能力优秀者优先"]},
          {'item':'技术文档工程师&nbsp&nbsp2人','duty':["负责产品使用手册、维护手册的编写、排版、审核和持续改进","负责面向客户技术方案及市场推广的产品技术资料的编写","建立和编写公司产品企业标准","起草产品专利申报资料","对公司的所有技术文档资料进行统一整理及维护","公司安排的其它工作"],
              'require':["25~40岁，大专以上学历，读懂英文技术文档25~40岁，大专以上学历，读懂英文技术文档","熟练使用机械绘图软件，机电类相关专业背景及具有类似工作经验者优先","有良好的沟通能力，能与内外部客户进行有效、清晰的沟通",
              "具有一定的用户角色分析能力，能够熟练撰写用户使用说明、用户需求说明书等","能够分析公司技术产品的功能需求，对产品上的不足提出解决方案","有良好的文字表达能力，善于归纳与综合，思路清晰，逻辑性好，能熟练使用相关文档工具","有较强的学习能力和主动性；执行力强，踏实稳定，有良好的团队合作精神和严谨的工作态度"],'other':[]},
          {'item':'工艺工程师&nbsp&nbsp1人','duty':["按设计图纸和设计文件要求，编写装配工艺文件","根据机械工程师和电子工程师设计文件，输出对应的布线作业指导书。"],'require':["具有机电一体化知识背景，或三年以上电子产品装配工艺工作经验","熟练掌握电子装联专业知识，同时具有机械加工的相关专业知识和技能",
              "能使用制图软件（如：PROE等）进行二维、三维图形设计"],'other':[]},
          {'item':'软件测试工程师&nbsp&nbsp2人','duty':["依据需求文档及设计文档，编写测试用例","根据测试计划，搭建、维护和管理测试环境","完成软件产品不同阶段的各种测试与系统测试","依据测试用例执行手工测试，反馈并跟踪验证产品BUG及用例缺陷，直至问题解决","" +
              "测试工具/系统的研究和应用","总结测试，提交测试分析报告","负责测试相关文档及使用说明书的撰写","公司安排的其它工作"],'require':["专科及以上,计算机相关专业；具备1年以上软件测试工作经验","掌握基本的软件测试理论，熟悉软件测试的基本方法、流程和规范，会编写测试用例，测试报告",
              "具有逆向思维能力和缜密的逻辑推理能力，热爱并致力于软件测试工作，具有独立分析能力和解决问题的能力","熟悉linux操作系统，可以搭建测试环境","熟练运用各种测试用例设计方法","较强的口头交流和技术文档撰写能力，思路清晰，重点突出","" +
              "有较强的学习能力和主动性；执行力强，踏实稳定，有良好的团队合作精神和严谨的工作态度"],'other':[]},
          {'item':'机械工程师&nbsp&nbsp2人','duty':[],'require':["机械设计、机械制造等相关专业，专科以上学历","3年以上产品设计经验，设计过产品、部件或机构等","熟练运用CAD、ProE(Creo)、熟悉CAD出图","了解钣金、注塑、机加、表面处理等加工方法和工艺",
              "能吃苦耐劳，可承受工作压力，有良好的团队合作精神"],'other':[]},
          {'item':'电子工程师&nbsp&nbsp2人','duty':[],'require':["本科，电子或计算机专业，经验丰富者放宽到专科","两年以上工作经验","熟悉ARM等相关处理器，能熟练编写嵌入式linux底层驱动，会一些应用软件开发","有一定的设计文件编写能力"],'other':[]},
          {'item':'项目经理助理&nbsp&nbsp3-4人','duty':[],'require':["专科以上学历 ，电子等相关专业","二年以上相关工作经验，30岁左右，简历请附相片","较强的分析、解决问题能力，思路清晰，考虑问题细致、周全 。","熟练使用办公软件、办公自动化设备。",
              "做事客观、严谨负责、踏实、敬业。","具有很强的人际沟通、协调、组织能力以及高度的团队精神，责任心强。"],'other':[]},
          {'item':'业务经理&nbsp&nbsp3-5人','duty':[],'require':["形象端庄，为人诚实可信，人品好","语言表达能力优秀，善于协调多种人际关系","在IT领域有过2年及以上系统集成等相关业务开拓经历，并有成功个案","勤奋好学，有较强的抗压能力",
              "有AFC等自助设备业务销售经验者优先","机电一体化，计算机及自动化等相关专业，专科及以上学历"],'other':[]},
          {'item':'项目经理&nbsp&nbsp2-3人','duty':["根据公司总体规划，实现项目经营战略和目标，并能独立处理和解决所负责的任务","实施和执行具体项目，诊断并解决项目过程中的各种问题","严格按质量要求、合同要求，在规定时间内完成项目分配任务","负责对内与对外的所有沟通和协调工作"],
              'require':["本科及以上学历，计算机、机电类、等理工专业，有项目经理资格证","2年以上项目技术管理工作经验","较强的逻辑思维能力，良好的语言表达和组织能力","积极主动，具备团队意识，具有高度的责任心，能够承受较强的工作压力",
              "良好的团队合作和协调能力，较好的与人沟通能力","精通成本和质量控制，具备优秀的沟通、合同谈判和签约能力，良好的决策判断能力和计划组织能力"],'other':[]},]
  }
 };

var contact_list = {
    '1': {
        'id': '1',
        'description': '联系方式',
        'information': '<h1>珠海市新域智能科技有限公司</h1>' +
        '<ul><li>地 址：珠海市南屏科技园屏工西路11号</li>' +
        '<li>电 话：0756-6865889    6865890</li>' +
        '<li>传 真：0756-2265162</li>' +
        '<li>网 址：新域智能.中国</li>' +
        '<li>邮 编：519060</li>'
    },
    '2': {
        'id': '2',
        'description': '电子地图',
        'information': '<p>珠海市新域智能科技有限公司</p> '

    }
    /*	'2': {
     'id': '2',
     'description': '在线留言'
     },*/
};

var solutions_list = {
    '1': {
        "id": "1",
        "description": "车载自助充值（珠海公交运作）",
        "information": "内容更新中...",
        "title": ["城市背景", "行业需求", "推广", "反响", "", "跟进完善"],
        "background": ["珠海是中国的六个经济特区之一，位于广东省珠江口的西南部，东与香港隔海相望，南与澳门相连，西邻新会、台山市，北与中山市接壤。" +
        "据2011年末数据显示，珠海仅有160万长居人口，广东省人口规模最小的地级市。但是，近几年，随着珠海市交通运输网络的完善" +
        "（珠海金湾国际机场、高栏港/九洲港、广珠铁路、轻轨设施等形成了较为全面的海、路、空交通运输网络），珠海城市发展迅猛，" +
        "横琴新区（国家级新区）的确立以及建设中的港珠澳大桥更是给珠海迎来了新的发展机遇，并吸引着更多的高新人才进驻，珠海必将成为珠三角经济发展的又一中心城市。"],
        "requirement": ["新的发展机遇并将带来的新的挑战，珠海城市人口不断增加，加之城际交通网络逐步完善带来的新人流，珠海的城市交通日益紧张，公共车成为珠海市民出行的交通工具。" +
        "因此，更进一步完善珠海市的城市公共交通管理、提高市民使用公交卡乘车也成为珠海市公交集团重视的问题。据数据显示，珠海市现行有公交车1800辆，贯穿珠海全市，部分线路链接中山市。" +
        "每日公交车客运量约为88万人次，公交卡发行量约为50万张，刷卡率仅为70%，全市购买点稀疏，充值点100余个，远不能满足市民购卡、充值的需求，出现了许多“死卡”、“空卡”。" +
        "与大多城市一样，“购卡难”“充值难”成为珠海公交卡推广的主要瓶颈。"],
        "spread": ["以解决珠海市公交卡推广中面临的“购卡难”“充值难”问题、提升珠海市公交卡的发行量和刷卡率为目标，珠海市公交集团与珠海市新域智能科技有限公司携手合作，" +
        "制定了自助售卡/充值终端投放计划：于充值点尤稀缺的西区（金湾区、斗门区）为主要解决区域，首选于跨区域公交线路上投放“车载式自助充值终端”，然后逐一向全市普及推广，" +
        "从根本上解决公交卡推广的瓶颈问题，提升珠海市市民使用公交卡搭乘公交车的意识，减少假币带来的财政损失，提高珠海市公交集团信息化管理水平和服务质量，" +
        "大大推进城市的信息化进程，助力珠海市智慧化城市建设。"],
        "reaction": ["2013年10月，经过了1个月的测试，“车载式自助充值终端”成功出现在乘客的面前，正式在珠海市公交车601线路上启用，引起了市民的关注，" +
        "珠海电视台、南方都市报、珠海特区报、珠江晚报等媒体对此进行了全面的采访报道，“车载式自助充值终端”的面世得到了市民、网友的广泛赞同。"],
        "showimg": [{"title": "电视报道：", "name": "珠海市电视台新闻频道", "image": "/static/images/aboutImg/s_tv2.jpg"},
            {"title": "报纸报道：", "name": "珠海市特区报", "image": "/static/images/aboutImg/s_newspaper.jpg"},
            {"name": "珠江晚报", "image": "/static/images/aboutImg/s_newspaper2.jpg"},
            {"name": "南方都市报", "image": "/static/images/aboutImg/s_newspaper3.jpg"},
            {"title": "微博互动：", "image": "/static/images/aboutImg/s_weibo.jpg"}],
        "function": [],
        "result": ["珠海市新域智能科技有限公司研发的“车载式自助充值终端”是全国首创性的研发成果，“车载式自助充值终端”的成功面世并逐步在珠海市内的全线公交上推广应用，" +
        "将成为公交卡自助充值的新模式，配合珠海市新域智能科技有限公司研发的自助售卡充值终端、挂壁式充值终端、自助退卡充值终端的组合投放，将能彻底解决“购卡难”“充值难”的推广瓶颈。"]

    },
    "2": {
        "id": "2",
        "description": "水费自助缴费找零（顺德水务运作）",
        "information": "内容更新中...",
        "title": ["项目背景", "项目需求", "", "解决形式", "系统功能特点", "运作效果"],
        "background": ["全国大中城市的公共服务领域普遍存在公共服务网点稀少、现有网点办事窗口数量有限、工作效率偏低所导致的用户办理业务时交通出行不便、耗时，" +
        "在服务窗口前长时间排队等候，影响服务质量、降低客户满意度等现象。",
            "本方案是新域智能在现有设计研发成果的基础上，专门针对珠海市市政公用行业的龙头企业——珠海水务集团有限公司量身定制的一套软硬件一体化的“水费自助缴费找零服务系统解决方案”。" +
            "力争通过本套方案提高珠海市用户对贵司供水服务品牌的认知度，让用户感受到供水企业对他们的关心和重视，从而增进彼此间的信任和感情，树立良好的供水服务企业形象！"],
        "requirement": ["实现24小时无人值守的用户现金自助缴费找零服务。", "全币值现金处理，智能优化找零：", "系统可处理100元、50元、20元、10元、5元、1元人民币纸币的识别及清分；",
            "系统可实现50元、20元、10元、5元、1元人民币智能优化组合找零。", "支持银行卡服务。", "提高工作效率、降低人工成本、改善服务质量。"],
        "spread": [],
        "reaction": ["水费自助缴费找零服务终端可在供水企业服务中心、营业大厅、收费大厅或居民较集中的区域安装使用。居民用户可以自助完成水费查询、" +
        "缴费、找零等一系列所需服务。 此终端通过二代身份证 （身份证号码）或用户卡 （用户卡号）即可登陆个人账户,查看所有缴费信息或相关资料," +
        "选择性完成缴费找零、账户预存、打印发票/凭条等系统服务功能。通过新域控制系统服务器远程监控各网点的每台水费自助缴费找零终端的使用状况以及远程维护。"],
        "showimg": [{"name": "服务流程：", "image": "/static/images/aboutImg/s_plan.jpg"}],
        "function": [{
            "title": "自助缴费找零设备终端：", "content": [{"no": "功能编码", "name": "功能/子功能名称", "information": ["功能说明"]},
                {"no": "F101", "name": "信息查询", "information": ["查询用水信息、用水常识、政策法规以及供水企业信息等"]},
                {"no": "F101-001", "name": "用水查询", "information": ["可以查询用户档案、欠费清单、已缴清单、用水清单、售水清单等信息"]},
                {"no": "F101-002", "name": "企业形象", "information": ["展示供水公司简介，领导班子成员的基本情况，机构设置划分等"]},
                {"no": "F101-003", "name": "服务承诺", "information": ["包括供水服务“十项承诺”、员工服务“十个不准”、“优质服务年”活动、“八项承诺”等"]},
                {"no": "F101-004", "name": "业务指南", "information": ["包括用水指南、收费标准、报装指南、报修指南等"]},
                {"no": "F101-005", "name": "政策法规", "information": ["用户通过触摸屏的导航菜单，浏览包括中华人民共和国供水法、供水供应与使用条例、供用水监督管理办法等"]},
                {"no": "F101-006", "name": "用水常识", "information": ["包括用水基本常识、工业性企业如何节约用水、水量计量小常识等"]},
                {
                    "no": "F102",
                    "name": "广告播放",
                    "information": ["终端在无人使用（睡眠）的时候可以播放广告", "支持外接广告屏时时播放广告", "支持定时定点投放广告", "支持播放VCD、MPG、AVI、FLASH等格式广告", "广告播放规则通过浏览器下载到客户端，广告文件通过系统的软件分发模块自动分发至各个终端"]
                },
                {
                    "no": "F103",
                    "name": "现金缴费/预存",
                    "information": ["接受100、50、20、10、5、1元人民币及50、20、10、5、1元智能化组合找零的全球领先的现金入出钞模块"]
                },
                {
                    "no": "F104",
                    "name": "发票打印",
                    "information": ["可以在终端上打印水费收据或水量水费清单，系统提供用户近一年的代扣收据打印和水量水费清单打印，并只允许打印一次"]
                },
                {
                    "no": "F105",
                    "name": "身份识别",
                    "information": ["可以通过IC卡读写器读卡，实现用户快速识别；并且考虑到今后二代身份证使用，预留了二代身份证阅读器的位置及使用功能"]
                }]
        },
            {
                "title": "自助缴费找零远程监控管理：", "content": [{"no": "功能编码", "name": "功能/子功能名称", "information": ["功能说明"]},
                {"no": "F106", "name": "监控服务", "information": ["可以查看每个终端设备的运行情况，并可对终端设备进行控制，如开关机、钞箱余量等"]},
                {"no": "F107", "name": "终端机后台管理", "information": ["对各个终端设备进行统一管理"]},
                {"no": "F107-001", "name": "设备管理", "information": ["设备基本信息管理、设备参数维护管理、查看设备状态"]},
                {"no": "F107-002", "name": "状态预警", "information": ["对设备的运行状态进行预警"]},
                {"no": "F107-003", "name": "故障管理", "information": ["在自助终端设备出现故障时自动报警"]},
                {"no": "F107-004", "name": "远程控制", "information": ["对终端设备进行远程操控"]},
                {"no": "F107-005", "name": "查询统计", "information": ["交易种类和交易金额统计"]},
                {"no": "F107-006", "name": "现金对账", "information": ["完成自助终端设备与业务系统的现金对账功能"]},
                {"no": "F107-007", "name": "交易处理", "information": ["处理每笔交易信息"]},
                {"no": "F107-008", "name": "系统管理", "information": ["用户管理、权限管理"]},
                {"no": "F107-009", "name": "日志管理", "information": ["详细记录操作步骤结果"]}]
            }],
        "result": ["该项目现已投入运行，充分满足了用户对信息查询、现金缴费、发票打印等自助服务的需求，全面提高了顺德水业的服务质量和工作效率。"]
    },
    "3": {
        "id": "3",
        "description": "彩票自助购票方案",
        "information": "内容更新中...",
        "citybg": "",
        "industrybg": "内容更新中..."
    }
};


conf.manualRouter = {//手动路由
    "get:/api/menus": function (req, res) {
        var menus = [];
        for (var key in menus_map) {
            menus.push(menus_map[key]);
        }
        res.sendjson(menus);
    },
    "get:/api/menus/{id}": function (req, res) {
        res.sendjson(menus_map[req.path[2]]);
    },
    "get:/api/description/{id}": function (req, res) {
        res.sendjson(about_us[req.path[2]]);
    },
    "get:/api/description": function (req, res) {
        var descriptions = [];

        for (var key in about_us) {
            descriptions.push(about_us[key]);
        }

        res.sendjson(descriptions);
    },
    "get:/api/products_list": function (req, res) {
        var lists = [];

        for (var key in products_list) {
            lists.push(products_list[key]);
        }
        res.sendjson(lists);
    },
    "get:/api/products_list/{id}": function (req, res) {
        res.sendjson(products_list[req.path[2]]);
    },
    "get:/api/products_list/{categoryId}/{productId}": function (req, res) {
        res.sendjson(products_list[req.path[2]][req.path[3]]);
    },
    "get:/api/supports_resource": function (req, res) {
        var supports = [];

        for (var key in supports_list) {
            supports.push(supports_list[key]);
        }

        res.sendjson(supports);
    },
    "get:/api/supports_resource/{id}": function (req, res) {
        res.sendjson(supports_list[req.path[2]]);
    },


    "get:/api/contact_resource": function (req, res) {
        var contact = [];

        for (var key in contact_list) {
            contact.push(contact_list[key]);
        }

        res.sendjson(contact);
    },

    "get:/api/contact_resource/{id}": function (req, res) {
        res.sendjson(contact_list[req.path[2]]);
    },

    "get:/api/solutions_resource": function (req, res) {
        var solutions = [];
        for (var key in solutions_list) {
            solutions.push(solutions_list[key]);
        }

        res.sendjson(solutions);
    },

    "get:/api/solutions_resource/{id}": function (req, res) {
        res.sendjson(solutions_list[req.path[2]]);
    },

    "get:/api/news_resource": function (req, res) {
        var news = [];
        for (var key in news_list) {
            news.push(news_list[key]);
        }

        res.sendjson(news);
    },

      "get:/api/news_resource/{id}": function (req, res) {
        res.sendjson(news_list[req.path[2]]);
    },

    "get:/api/activites_resource": function (req, res) {
        var activies = [];
        for (var key in activities_list) {
            activies.push(activities_list[key]);
        }

        res.sendjson(activies);
    },

    "get:/api/activites_resource/{id}": function (req, res) {
        res.sendjson(activities_list[req.path[2]]);
    },

    "get:/api/home_product_background": function (req, res) {
        var home_tips = [];

        for (var key in products_background) {
            home_tips.push(products_background[key]);
        }

        res.sendjson(home_tips);
    },
    "get:/api/home_product_background/{id}": function (req, res) {
        res.sendjson(products_background[req.path[2]]);
    },


    "get:/api/patent_list": function (req, res) {
        var patents = [];
        for (var key in patent_list) {
            patents.push(patent_list[key]);
        }
        res.sendjson(patents);
    },
    "get:/api/patent_list/{id}": function (req, res) {
        res.sendjson(patent_list[req.path[2]]);
    },

    "get:/api/joinus_resource":function(req,res){
        var joinus = [];
        for(var key in joinus_list) {
            joinus.push(joinus_list[key]);
        }
        res.sendjson(joinus);
    },
    "get:/api/joinus_resource/{id}":function(req,res){
        res.sendjson(joinus_list[req.path[2]]);
    }
};
module.exports.conf = conf;
var rrestjs = require('rrestjs');

/*
 app.get('/joinus_resource', function(req, res) {
 var joinus = [];

 for(var key in joinus_list) {
 joinus.push(joinus_list[key]);
 }

 res.send(joinus);
 });

 app.get('/joinus_resource/:id', function(req, res) {
 res.send(joinus_list[req.params.id]);
 });
 */


serverDm.run(function () {
    function router(req, res) {
        var path = req.path[0].toLowerCase();
        console.log(path);
        /*  var path = req.path[0].toLowerCase();
         console.log(path);

         if (path === 'api') {

         } else if (path === 'robots.txt') {
         res.setHeader('Content-Type', 'text/plain');
         res.send("s");
         } else {
         //res.setHeader('Content-Type', 'text/html');
         res.sendfile("static/index.html"); //index.html
         }*/
    }

    function handler(req, res) {
        var path = req.path[0].toLowerCase();
        if (path == 'api') {
            return true;
        }else if (robotReg.test(req.useragent)) {
	    res.redirect(req.url+'?_escaped_fragment_=');	    
	    return false;
        }else if (path == 'sitemap.xml') {
	    res.sendfile("sitemap.xml");
	    return false;
	}
        else {
            res.sendfile("static/index.html");
            return false;
        }

    }

    http.createServer(handler).listen(rrestjs.config.listenPort);
});
