const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const Phone = require("../models/phone");
const dbPhone = require("../configPhone").mongoURI;
const mongoose = require("mongoose");
const puppeteer = require("puppeteer");
const url = require('url');

// config cloudinary
cloudinary.config({
    cloud_name: "xitun1234",
    api_key: "446615863382835",
    api_secret: "V9h9XGwIlGc9GYA0IjzrtUUY68Q"
});

// mongoose
//     .connect(dbPhone, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
//     .then(() => console.log("DBPhone Connected"))
//     .catch(err => console.log(err));


// api search keyword in google
router.post("/searchkeyword", (req, res, next) => {
    let PhoneName = req.body.PhoneName;
    let PhoneProperty = req.body.PhoneProperty;
    let PhoneCondition = req.body.PhonePropertyValue;

    var keyword = PhoneProperty + " " + PhoneCondition + " " + PhoneName;

    if (PhoneProperty && !PhoneCondition) {
        keyword = PhoneProperty + " " + PhoneName;
    } else if (!PhoneProperty && PhoneCondition) {
        keyword = PhoneCondition + " " + PhoneName;
    } else if (PhoneProperty && PhoneCondition) {
        keyword = PhoneProperty + " " + PhoneCondition + " " + PhoneName;
    }
    console.log(keyword);
    (async() => {
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                "--incognito",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-accelerated-2d-canvas",
                "--disable-gpu"
            ]
        });
        let result = {
            keyword: "",
            urlImage: "",
            searchLink: ""
        };

        console.log("Browser openned");

        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();
        page.setViewport({ width: 1280, height: 720 });
        const url = "https://www.google.com.vn/";
        await page.goto(url, { waitUntil: "networkidle2" });
        console.log("Page loaded");
        await page.waitFor(500);

        // input keyword
        const inputSearch = await page.evaluate(
            ({ keyword }) => {
                let inputText = document.getElementsByClassName("gLFyf gsfi");
                inputText[0].value = keyword;
                let clickButtonSearch = document.getElementsByClassName("gNO89b");
                clickButtonSearch[0].click();
            }, { keyword }
        );
        await page.waitForNavigation({ waitUntil: "domcontentloaded" });

        await page.waitForFunction("document.title.length != 16");

        const urlCurrent = await page.evaluate(() => {
            return window.location.href;
        });
        result.keyword = keyword;
        result.searchLink = urlCurrent;
        await page.waitFor(500);
        const screenshot = await page.screenshot({
            omitBackground: true,
            encoding: "binary"
        });

        function uploadScreenshot(screenshot) {
            return new Promise((resolve, reject) => {
                const uploadOptions = {};
                cloudinary.uploader
                    .upload_stream(uploadOptions, (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    })
                    .end(screenshot);
            });
        }
        // uploadScreenshot(screenshot).then((result) => {
        //     result.screenshot = result;
        // })

        let urlLink = await uploadScreenshot(screenshot);

        result.urlImage = urlLink.url;

        res.send(result);
        await browser.close();
    })();
});

var jsonTranslate = {
    "name": [""],
    "price": ["giá", "tiền"],
    "display_technology": ["công nghệ màn hình", "loại màn hình"],
    "display_resolution": ["độ phân giải màn hình", "độ phân giải"],
    "display_size": ["kích cỡ màn hình"],
    "display_protection": ["mặt kính cảm ứng", "kính cảm ứng"],
    "back_camera_resolution": ["camera sau",
        "cam sau",
        "độ phân giải cam sau",
        "độ phân giải camera sau", "chụp ảnh"
    ],
    "back_camera_video": ["quay phim", "quay video"],
    "back_camera_flash": ["đèn flash"],
    "back_camera_advanced": [],
    "front_camera_resolution": ["cam trước", "camera trước"],
    "front_camera_videocall": ["video call", "gọi hình ảnh", "gọi zalo"],
    "front_camera_other_infor": [],
    "operating_system": ["hệ điều hành", "ios", "android"],
    "os_version": ["phiên bản ios", "phiên bản android", "android mấy"],
    "chipset": ["chipset", "chip"],
    "cpu": ["tốc độ cpu", "cpu"],
    "gpu": ["gpu"],
    "ram": ["ram"],
    "memory_internal": ["bộ nhớ trong", "bộ nhớ máy", "bộ nhớ"],
    "memory_available": ["bộ nhớ còn lại", "bộ nhớ khả dụng"],
    "memory_card_slot": ["thẻ nhớ ngoài", "thẻ nhớ"],
    "mobile_network": ["mạng di động", "4G"],
    "sim": ["sim"],
    "wifi": ["wifi", "mạng wifi"],
    "gps": ["gps", "định vị"],
    "bluetooth": ["bluetooth"],
    "charging_port": ["Cổng kết nối", "cổng sạc"],
    "headphone_jack": ["jack tai nghe"],
    "other_port": ["kết nối khác"],
    "design": ["thiết kế", "thân liền", "thân máy"],
    "material": ["vật liệu", "chất liệu"],
    "dimensions": ["kích thước"],
    "weight": ["trọng lượng", "nặng"],
    "battery_capacity": ["pin", "dung lượng pin", ],
    "battery_type": ["loại pin"],
    "battery_technology": ["công nghệ pin", "sạc", "sạc pin"],
    "advanced_security": ["mở khóa"],
    "special_features": [],
    "recording": ["ghi âm"],
    "radio": ["radio"],
    "watchfilm": ["xem phim"],
    "music": ["MP3", "nghe nhạc"],
    "time_of_lunch": ["ngày ra mắt"],
    "chơi game": ["chơi game", "game", "pubg", "liên quân", "free fire", "honkai impact 3", "bigo live"],

    "Chuẩn Kháng nước": ["chống nước", "kháng nước"],
    "AOD": ["Màn hình luôn hiển thị", "always on display"],
    "Nhân bản ứng dụng": ["nhân bản ứng dụng", "nhân đôi ứng dụng"],
    "Checksim": ["2 sim", "hai sim", "một sim", "1 sim"],
    "Sạc ngược": ["sạc pin cho thiết bị khác", "sạc cho thiết bị khác", "sạc ngược cho thiết bị khác"],
    "Sạc pin không dây": ["sạc không dây"],
    "Videocall": ["videocall", "video call", "gọi video", "gọi zalo", "gọi facebook", "call video", "gọi hình ảnh"],
    // "Micro USB": ["usb"],
    "Wi-Fi 802.11": ["5ghz", "5 GHZ", "5 ghz"],
    "sạc pin nhanh": ["sạc nhanh"],
    "discount": ["khuyến mãi", "giảm giá"],
    "warranty": ["bảo hành"],
    "checkNew": ["mới", "new seal", "nguyên seal", "100%"],
    "isAvailable": ["có hàng", "còn hàng", "hàng"],
    "Type-C": ["type c", "type-c"],
    "configureHigh": ['cao', 'cấu hình cao', "max setting"],
    "configureMedium": ['ổn', 'mượt', 'bình thường', 'tốt', 'cấu hình', 'lag', 'đồ họa trung bình cao'],
    "configureLow": ['thấp', 'cấu hình thấp'],
    "BatteryCalculator": ['xài', 'sử dụng', 'bao lâu', 'dùng', 'bao nhiêu', 'mấy tiếng', 'lâu'],
    "companyName": ['hãng', 'nhà sản xuất', 'hãng sản xuất'],
    "paperInstallment": ['thủ tục', 'giấy tờ', 'trả góp'],
};

function translateProperty(slotProperty, jsonTranslate) {
    result = [];

    for (var key in jsonTranslate) {
        for (var i = 0; i < jsonTranslate[key].length; i++) {
            if (slotProperty.toLowerCase() == jsonTranslate[key][i]) {
                result.push(key);
            }
        }
    }
    if (result.length > 0) {
        return result[0];
    } else {
        return slotProperty;
    }
}

// Tìm giá trị của thuộc tính
function SearchPropertyValue(obj, searchValue) {
    return Object.keys(obj).some(function(key) {
        var tempKey = obj[key].toString().toLowerCase();

        return tempKey.includes(searchValue.toString().toLowerCase());
    });
}

// Tìm tên thuộc tính
function SearchPropertyKey(obj, searchKey) {
    return Object.keys(obj).includes(searchKey);
}

function AnswerGameCondition(jsonPhone, phone_property_value) {
    var result = {
        message: ''
    };
    if (jsonPhone['operating_system'].toLowerCase().search('android') != -1) {
        if (jsonPhone.ram >= '4 GB' && jsonPhone.price > 5000000 && jsonPhone.price <= 8000000) {
            result['message'] = "Chào anh/chị!Dạ theo em kiểm tra thì Điện thoại " + jsonPhone.name + " sử dụng chip " + jsonPhone.chipset + ", cpu: " + jsonPhone.cpu + ", ram: " + jsonPhone.ram + " nên đáp ứng tốt nhu cầu chơi game ở mức cấu hình mượt đó ạ. Thông tin đến anh/chị!";
        } else if (jsonPhone.ram > '4 GB' && jsonPhone.price > 8000000) {
            result['message'] = "Chào anh/chị!Dạ theo em kiểm tra thì Điện thoại " + jsonPhone.name + " sử dụng chip " + jsonPhone.chipset + ", cpu: " + jsonPhone.cpu + ", ram: " + jsonPhone.ram + " nên đáp ứng nhu cầu chơi game ở mức cấu hình cao đó ạ. Thông tin đến anh/chị!";
        } else if (jsonPhone.ram <= '4 GB' && jsonPhone.price <= 5000000) {
            result['message'] = "Chào anh/chị!Dạ theo em kiểm tra thì Điện thoại " + jsonPhone.name + " sử dụng chip " + jsonPhone.chipset + ", cpu: " + jsonPhone.cpu + ", ram: " + jsonPhone.ram + " nên đáp ứng nhu cầu chơi game ở mức bình thường đó ạ. Thông tin đến anh/chị!";
        }
    } else if (jsonPhone['operating_system'].toLowerCase().search('ios') != -1) {
        if (jsonPhone.ram <= '2 GB') {
            result['message'] = "Chào anh/chị!Dạ theo em kiểm tra thì Điện thoại " + jsonPhone.name + " sử dụng chip " + jsonPhone.chipset + ", cpu: " + jsonPhone.cpu + ", ram: " + jsonPhone.ram + " nên đáp ứng nhu cầu chơi game ở mức bình thường đó ạ. Thông tin đến anh/chị!";
        } else if (jsonPhone.ram == '3 GB') {
            result['message'] = "Chào anh/chị!Dạ theo em kiểm tra thì Điện thoại " + jsonPhone.name + " sử dụng chip " + jsonPhone.chipset + ", cpu: " + jsonPhone.cpu + ", ram: " + jsonPhone.ram + " nên đáp ứng tốt nhu cầu chơi game ở mức cấu hình mượt đó ạ. Thông tin đến anh/chị!";
        } else if (jsonPhone.ram == '4 GB') {
            result['message'] = "Chào anh/chị!Dạ theo em kiểm tra thì Điện thoại " + jsonPhone.name + " sử dụng chip " + jsonPhone.chipset + ", cpu: " + jsonPhone.cpu + ", ram: " + jsonPhone.ram + " nên đáp ứng nhu cầu chơi game ở mức cấu hình cao đó ạ. Thông tin đến anh/chị!";
        }
    }
    return result;
}

function getCompanyName(phone_name) {
    var res = phone_name.slice(0, phone_name.search(' '));
    if (res.search('iPhone') != -1) {
        res = 'Apple';
    }
    return res;
}

function calBatteryUsageTime(jsonPhone) {
    // lấy dung lượng pin
    var stringTemp = jsonPhone.battery_capacity;
    var batteryCapacity = stringTemp.replace(/[^0-9]/g, '');
    var result = (parseInt(batteryCapacity, 10) / 2000) * (250 / 100);

    var minTime = Math.floor(result);
    var maxTime = minTime + 1.5;

    result = minTime + " - " + maxTime + " giờ";
    return result;
}

function calBatteryChargingTime(jsonPhone) {
    // lấy dung lượng pin
    var stringTemp = jsonPhone.battery_capacity;
    var batteryCapacity = stringTemp.replace(/[^0-9]/g, '');
    var timeChargeDefault = 0;

    if (SearchPropertyValue(jsonPhone, 'sạc pin nhanh') || SearchPropertyValue(jsonPhone, 'sạc nhanh')) {
        timeChargeDefault = ((batteryCapacity / 3) + 1000) / 1000;
    } else if (jsonPhone.price >= 2000000) {
        timeChargeDefault = ((batteryCapacity / 2) + 1000) / 1000;
    } else if (jsonPhone.price < 2000000) {
        timeChargeDefault = ((batteryCapacity / 1) + 1000) / 1000;
    }
    var fomartTimeCharge = parseFloat(timeChargeDefault);

    fomartTimeCharge = Math.round(fomartTimeCharge * 1000) / 1000;

    maxTimeCharge = Math.ceil(timeChargeDefault);

    result = fomartTimeCharge + " - " + maxTimeCharge + " giờ";

    return result;
}

router.post('/queryMongo', (req, res, next) => {
    var PhoneName = req.body.PhoneName;
    var mongo_property = req.body.MongoProperty;

    Phone.find({ name: new RegExp(PhoneName, "i"), [mongo_property]: { $exists: true } },
        function(err, result) {
            if (err) res.send(err);
            else res.send(result[0]);
        }
    );
});


async function ActionYesNo(phone_name, phone_property, phone_property_value) {
    // init result
    var result = {
        message: '',
        isFlag: false
    };

    async function findResult() {
        try {
            // query by phoneName
            params = {
                "PhoneName": phone_name,
                "PhoneProperty": "price",
                "MongoProperty": "price"
            }

            // call api query database
            const response = await axios.post('http://localhost:3030/api/answer/querymongo', params);
            if (response.data) {
                jsonPhone = response.data;
            } else {
                result["message"] = "Chào anh/chị. Em vừa kiểm tra thì hệ thống bên em không có thông tin của mẫu điện thoại " + phone_name + " . Anh/chị giúp em kiểm tra lại tên của điện thoại với ạ. Thông tin đến anh/chị";
                result["isFlag"] = true;
                return result;
            }

            // case 1: Chỉ có phoneName & phoneProperty
            if (phone_property && !phone_property_value) {

                var translatePhoneProperty = translateProperty(phone_property, jsonTranslate);

                var __searchPropertyKey = SearchPropertyKey(jsonPhone, translatePhoneProperty);
                if (__searchPropertyKey) {
                    result["message"] = "Chào anh/chị. Sau quá trình em kiểm tra thì máy " + phone_name + " có " + phone_property + ": " + jsonPhone[translatePhoneProperty] + " . Xin thông tin đến anh/chị!";
                    result["isFlag"] = true;
                    return result;
                } else {
                    // tìm giá trị thuộc tính
                    var __searchPropertyValue = SearchPropertyValue(jsonPhone, translatePhoneProperty);

                    // tìm thấy
                    if (__searchPropertyValue) {
                        result["message"] = "Chào anh/chị. Sau quá trình em kiểm tra thì máy " + phone_name + " có hỗ trợ " + phone_property + ". Xin thông tin đến anh/chị!";
                        result["isFlag"] = true;
                        return result;
                    } else if (__searchPropertyValue === false) {
                        //  special case handling
                        if (translatePhoneProperty == "isAvailable") {
                            result["message"] = "Chào anh/chị. Hiện tại sản phẩm Điện thoại " + phone_name + " bên em còn hàng đó ạ. Giá của máy là " + jsonPhone.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) + " . Anh/chị có thể tham khảo nha. Thông tin đến anh/chị";
                            result["isFlag"] = true;
                        } else if (translatePhoneProperty == "checkNew") {
                            result["message"] = "Chào anh/chị. Hiện tại bên em chỉ kinh doanh điện thoại mới nguyên seal, chính hãng Việt Nam ạ. Bên em không có kinh doanh máy cũ. Thông tin đến anh/chị";
                            result["isFlag"] = true;
                        } else if (translatePhoneProperty == "discount") {
                            result["message"] = "Chào anh/chị. Dạ hiện sản phẩm Điện thoại " + phone_name + ' bên em đang có chương trình khuyến mãi. Giá hiện tại là ' + (jsonPhone.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) + '. Giảm thêm 5% (' + ((jsonPhone.price * 5) / 100).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) + ') cho khách hàng mua online có sinh nhật trong tháng này ạ. Xin thông tin đến anh/chị';
                            result["isFlag"] = true;
                        } else if (translatePhoneProperty == "warranty") {
                            result["message"] = "Chào anh/chị. Dạ hiện sản phẩm " + phone_name + " hỗ trợ Bảo hành chính hãng 12 tháng và 1 đổi 1 trong vòng 1 tháng nếu sản phẩm có lỗi từ nhà sản xuất. Thông tin đến anh/chị";
                            result["isFlag"] = true;
                        } else if (translatePhoneProperty == "paperInstallment") {
                            result["message"] = "Chào anh/chị ! Dạ nếu anh/chị đủ 20 - 60 tuổi, có CMND và Hộ khẩu hoặc CMND và Bằng lái xe thì anh/chị có thể mua trả góp được rồi anh/chị nha, nếu anh/chị cần bên em hỗ trợ gì thêm anh/chị có thể phản hồi bên dưới anh/chị nhé. Thông tin đến anh/chị !";
                            result["isFlag"] = true;
                        } else if (translatePhoneProperty.search('game') != -1) {
                            result["message"] = AnswerGameCondition(jsonPhone, phone_property_value).message;
                            result["isFlag"] = true;
                        } else {
                            result["message"] = "Chào anh/chị. Sau quá trình kiểm tra dữ liệu của hệ thống bên em thì máy " + phone_name + " không có hỗ trợ " + phone_property;
                            result["isFlag"] = false;
                        }
                        return result;
                    }
                }
                // case 2
            } else if (phone_property && phone_property_value) {

                // tìm từ đồng nghĩa
                var translatePhoneProperty = translateProperty(phone_property, jsonTranslate);
                var translatePhonePropertyValue = translateProperty(phone_property_value, jsonTranslate);
                // kiểm tra dữ liệu
                if (jsonPhone[translatePhoneProperty]) {
                    var __findValueInKey = jsonPhone[translatePhoneProperty].toLowerCase().includes(translatePhonePropertyValue.toString().toLowerCase());
                } else if (translatePhoneProperty.search('game') != -1 && translatePhonePropertyValue.search('configure') != -1) {
                    result["message"] = AnswerGameCondition(jsonPhone, phone_property_value).message;
                    result["isFlag"] = true;
                } else {
                    result["message"] = "Chào anh/chị. Sau quá trình kiểm tra dữ liệu của hệ thống bên em thì bên em không đủ yếu tố để trả lời câu hỏi của anh/chị. Mong anh/chị thông cảm giúp bên em. Em vừa tham khảo google thì có thông tin như sao"
                    result["isFlag"] = false;
                }

                // tìm value trong keyProperty
                if (__findValueInKey) {
                    result["message"] = "Chào anh/chị. Sau quá trình em kiểm tra thì thấy máy " + phone_name + " có " + phone_property + " hỗ trợ " + phone_property_value;
                    result["isFlag"] = true;
                } else if (__findValueInKey === false) {
                    result["message"] = "Chào anh/chị. Sau quá trình em kiểm tra thì thấy " + phone_property + " chỉ có " + jsonPhone[translatePhoneProperty] + " và không hỗ trợ " + phone_property_value;
                    result["isFlag"] = true;
                }
                return result;
                // case 3
            } else if (!phone_property && !phone_property_value) {
                result["message"] = "Chào anh/chị. Sau quá trình kiểm tra dữ liệu của hệ thống bên em thì bên em không đủ yếu tố để trả lời câu hỏi của anh/chị. Mong anh/chị thông cảm giúp bên em. Em vừa tham khảo google thì có thông tin như sao"
                result["isFlag"] = false;
                return result;
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    return findResult().then(function(res) {
        // console.log(res);
        result = res;
    }).then(() => {
        return result;
    }).catch(function(err) {
        if (err) console.log(err);
        throw err;
    })
}

router.post('/yesno', (req, res, next) => {
    var PhoneName = req.body.PhoneName;
    var PhoneProperty = req.body.PhoneProperty;
    var PhonePropertyValue = req.body.PhonePropertyValue;

    var resultTemp;

    ActionYesNo(PhoneName, PhoneProperty, PhonePropertyValue).then(function(result) {
        resultTemp = result;
        res.send(resultTemp);
    })
});


async function ActionWhat(phone_name, phone_property, phone_property_value) {
    // init result
    var result = {
        message: '',
        isFlag: false
    };

    async function findResult() {
        try {
            // query by phoneName
            params = {
                "PhoneName": phone_name,
                "PhoneProperty": "price",
                "MongoProperty": "price"
            }

            // call api query database
            const response = await axios.post('http://localhost:3030/api/answer/querymongo', params)
            if (response.data) {
                jsonPhone = response.data;
            } else {
                result["message"] = "Chào anh/chị. Em vừa kiểm tra thì hệ thống bên em không có thông tin của mẫu điện thoại " + phone_name + " . Anh/chị giúp em kiểm tra lại tên của điện thoại với ạ. Thông tin đến anh/chị";
                result["isFlag"] = true;
                return result;
            }

            // case 1: Chỉ có phoneName & phoneProperty
            if (phone_property && !phone_property_value) {

                var translatePhoneProperty = translateProperty(phone_property, jsonTranslate);

                var __searchPropertyKey = SearchPropertyKey(jsonPhone, translatePhoneProperty);

                if (__searchPropertyKey) {
                    result["message"] = "Chào anh/chị. Sau quá trình em kiểm tra thì máy " + phone_name + " có " + phone_property + ": " + jsonPhone[translatePhoneProperty] + " . Xin thông tin đến anh/chị!";
                    result["isFlag"] = true;
                    return result;
                } else {
                    // tìm giá trị thuộc tính
                    var __searchPropertyValue = SearchPropertyValue(jsonPhone, translatePhoneProperty);

                    // tìm thấy
                    if (__searchPropertyValue) {
                        result["message"] = "Chào anh/chị. Sau quá trình em kiểm tra thì máy " + phone_name + " có hỗ trợ " + phone_property + ". Xin thông tin đến anh/chị!";
                        result["isFlag"] = true;
                        return result;
                    } else if (__searchPropertyValue === false) {
                        //  special case handling
                        if (translatePhoneProperty == "isAvailable") {
                            result["message"] = "Chào anh/chị. Hiện tại sản phẩm Điện thoại " + phone_name + " bên em còn hàng đó ạ. Giá của máy là " + jsonPhone.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) + " . Anh/chị có thể tham khảo nha. Thông tin đến anh/chị";
                            result["isFlag"] = true;
                        } else if (translatePhoneProperty == "checkNew") {
                            result["message"] = "Chào anh/chị. Hiện tại bên em chỉ kinh doanh điện thoại mới nguyên seal, chính hãng Việt Nam ạ. Bên em không có kinh doanh máy cũ. Thông tin đến anh/chị";
                            result["isFlag"] = true;
                        } else if (translatePhoneProperty == "discount") {
                            result["message"] = "Chào anh/chị. Dạ hiện sản phẩm Điện thoại " + phone_name + ' bên em đang có chương trình khuyến mãi. Giá hiện tại là ' + (jsonPhone.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) + '. Giảm thêm 5% (' + ((jsonPhone.price * 5) / 100).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) + ') cho khách hàng mua online có sinh nhật trong tháng này ạ. Xin thông tin đến anh/chị';
                            result["isFlag"] = true;
                        } else if (translatePhoneProperty == "paperInstallment") {
                            result["message"] = "Chào anh/chị ! Dạ nếu anh/chị đủ 20 - 60 tuổi, có CMND và Hộ khẩu hoặc CMND và Bằng lái xe thì anh/chị có thể mua trả góp được rồi anh/chị nha, nếu anh/chị cần bên em hỗ trợ gì thêm anh/chị có thể phản hồi bên dưới anh/chị nhé. Thông tin đến anh/chị !";
                            result["isFlag"] = true;
                        } else if (translatePhoneProperty == "companyName") {
                            result["message"] = "Chào anh/chị ! Dạ sản phẩm " + phone_name + " là máy của hãng " + getCompanyName(phone_name) + " . Thông tin đến anh/chị !";
                            result["isFlag"] = true;
                        } else if (translatePhoneProperty.search('configure') != -1) {
                            result["message"] = "Chào anh/chị ! Dạ em kiểm tra thì thấy sản phẩm " + phone_name + " có cấu hình là Chip " + jsonPhone.chipset + " , CPU: " + jsonPhone.cpu + " , GPU: " + jsonPhone.gpu + " , RAM: " + jsonPhone.ram + " . Thông tin đến anh/chị !";
                            result["isFlag"] = true;
                        } else if (translatePhoneProperty == "warranty") {
                            result["message"] = "Chào anh/chị. Dạ hiện sản phẩm " + phone_name + " hỗ trợ Bảo hành chính hãng 12 tháng và 1 đổi 1 trong vòng 1 tháng nếu sản phẩm có lỗi từ nhà sản xuất. Thông tin đến anh/chị";
                            result["isFlag"] = true;
                        } else {
                            result["message"] = "Chào anh/chị. Sau quá trình kiểm tra dữ liệu của hệ thống bên em thì không đủ thông tin để trả lời cho câu hỏi này.Em vừa tham khảo qua google thì có thông tin như sau.";
                            result["isFlag"] = false;
                        }
                        return result;
                    }
                }
                // case 2
            } else if (phone_property && phone_property_value) {

                // tìm từ đồng nghĩa
                var translatePhoneProperty = translateProperty(phone_property, jsonTranslate);
                var translatePhonePropertyValue = translateProperty(phone_property_value, jsonTranslate);
                // kiểm tra dữ liệu
                if (translatePhonePropertyValue == "BatteryCalculator") {
                    if (translatePhoneProperty == "battery_technology") {
                        var chargeTime = calBatteryChargingTime(jsonPhone);
                        result["message"] = "Chào anh/chị. Dạ theo em kiểm tra sản phẩm " + phone_name + " có thể sạc đầy pin trong khoảng " + chargeTime + " anh/chị nhé. Thông tin đến anh/chị";
                        result["isFlag"] = true;
                    } else {
                        var resultBatteryUsageTime = calBatteryUsageTime(jsonPhone);
                        result["message"] = "Chào anh/chị. Dạ sản phẩm " + phone_name + " có thể sử dụng trong khoảng " + resultBatteryUsageTime + " tuỳ độ sáng màn hình, kết nối, tác vụ,... anh/chị nhé. Thông tin đến anh/chị."
                        result["isFlag"] = true;
                    }
                } else if (jsonPhone[translatePhoneProperty]) {
                    var __findValueInKey = jsonPhone[translatePhoneProperty].toLowerCase().includes(translatePhonePropertyValue.toString().toLowerCase());
                } else {
                    result["message"] = "Chào anh/chị. Sau quá trình kiểm tra dữ liệu của hệ thống bên em thì bên em không đủ yếu tố để trả lời câu hỏi của anh/chị. Mong anh/chị thông cảm giúp bên em. Em vừa tham khảo google thì có thông tin như sao"
                    result["isFlag"] = false;
                }

                // tìm value trong keyProperty
                if (__findValueInKey) {
                    result["message"] = "Chào anh/chị. Sau quá trình em kiểm tra thì thấy máy " + phone_name + " có " + phone_property + " hỗ trợ " + phone_property_value;
                    result["isFlag"] = true;
                } else if (__findValueInKey === false) {
                    result["message"] = "Chào anh/chị. Sau quá trình em kiểm tra thì thấy " + phone_property + " chỉ có " + jsonPhone[translatePhoneProperty] + " và không hỗ trợ " + phone_property_value;
                    result["isFlag"] = true;
                }
                return result;
                // case 3
            } else if (!phone_property && !phone_property_value) {
                result["message"] = "Chào anh/chị. Sau quá trình kiểm tra dữ liệu của hệ thống bên em thì bên em không đủ yếu tố để trả lời câu hỏi của anh/chị. Mong anh/chị thông cảm giúp bên em. Em vừa tham khảo google thì có thông tin như sao"
                result["isFlag"] = false;
                return result;
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    return findResult().then(function(res) {
        // console.log(res);
        result = res;
    }).then(() => {
        return result;
    }).catch(function(err) {
        if (err) console.log(err);
        throw err;
    })

}

router.post('/what', (req, res, next) => {
    var PhoneName = req.body.PhoneName;
    var PhoneProperty = req.body.PhoneProperty;
    var PhonePropertyValue = req.body.PhonePropertyValue;
    var resultTemp;

    ActionWhat(PhoneName, PhoneProperty, PhonePropertyValue).then(function(result) {
        resultTemp = result;
        res.send(resultTemp);
    })
});

router.post('/compare', (req, res, next) => {
    var PhoneNameFirst = req.body.PhoneNameFirst;
    var PhoneNameSecond = req.body.PhoneNameSecond;
    var PhoneProperty = req.body.PhoneProperty;
    var linkCompare;

    if (PhoneNameFirst && PhoneNameSecond)
    {
        linkCompare = `http://localhost:4200/phone-compare?name1=${PhoneNameFirst}&name2=${PhoneNameSecond}`;
    }

    var message = "Chào anh/chị. Sau quá trình em kiểm tra thì thấy dữ liệu cần so sánh hơi nhiều. Vì thế, em lập ra 1 bảng so sánh chi tiết của điện thoại " 
    + PhoneNameFirst + " và điện thoại " + PhoneNameSecond + ". Em gửi anh/chị đường link tham khảo: " + url.format(linkCompare);
    
    res.send({message: message});
});

module.exports = router;