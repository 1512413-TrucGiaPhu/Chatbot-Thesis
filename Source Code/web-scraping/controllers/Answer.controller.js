const mongoose = require("mongoose");
const puppeteer = require("puppeteer");
const Schema = mongoose.Schema;
require("../models/Phone");
const Phone = mongoose.model("phones");
const cloudinary = require("cloudinary").v2;

// config cloudinary
cloudinary.config({
    cloud_name: "xitun1233",
    api_key: "615838359941522",
    api_secret: "dXw65IqrLZ5_MhnRGHg9Qjf4buU",
});

mongoose
    .connect("mongodb://nghia:zxc123@ds137581.mlab.com:37581/phone-list", {
        useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));



// Xử lý tìm từ khóa google puppeteer
module.exports.SearchKeyword = function(req, res) {
    let PhoneName = req.body.PhoneName;
    let PhoneProperty = req.body.PhoneProperty;
    let keyword = PhoneProperty + " " + PhoneName;
    console.log(keyword);
    (async() => {
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                "--incognito",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-accelerated-2d-canvas",
                "--disable-gpu",
            ],
        });
        let result = {
            "keyword": "",
            "urlImage": "",
            "searchLink": ""
        }

        console.log("Browser openned");

        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();
        page.setViewport({ width: 1280, height: 720 });
        const url = "https://www.google.com.vn/";
        await page.goto(url, { waitUntil: "networkidle2" });
        console.log("Page loaded");
        await page.waitFor(500);

        // input keyword
        const inputSearch = await page.evaluate(({ keyword }) => {
            let inputText = document.getElementsByClassName("gLFyf gsfi");
            inputText[0].value = keyword;
            let clickButtonSearch = document.getElementsByClassName("gNO89b");
            clickButtonSearch[0].click();


        }, { keyword });
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
            encoding: "binary",
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
        };
        // uploadScreenshot(screenshot).then((result) => {
        //     result.screenshot = result;
        // })

        let urlLink = await uploadScreenshot(screenshot);

        result.urlImage = urlLink.url;

        res.send(result);
        await browser.close();
    })();
};

var jsonTranslate = {
    "name": ["iPhone 11 Pro Max 64GB"],
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
    "back_camera_advanced": ["Góc siêu rộng (Ultrawide)",
        "Góc rộng (Wide)",
        "Nhãn dán (AR Stickers)",
        "Xoá phông", "Chụp bằng cử chỉ",
        "Tự động lấy nét (AF)",
        "Chạm lấy nét",
        "Nhận diện khuôn mặt",
        "HDR",
        "Toàn cảnh (Panorama)",
        "Làm đẹp (Beautify)", "Chuyên nghiệp (Pro)", "xóa phông cam sau", "xóa phông"
    ],
    "front_camera_resolution": ["12 MP", "cam trước", "chụp ảnh"],
    "front_camera_videocall": ["video call"],
    "front_camera_other_infor": ["Xoá phông camera trước", "Quay phim 4K", "Nhãn dán (AR Stickers)",
        "Retina Flash", "Quay video HD", "Nhận diện khuôn mặt", "Quay video Full HD", "Tự động lấy nét (AF)", "HDR", "Quay chậm (Slow Motion)", "Xóa phông cam trước"
    ],
    "operating_system": ["hệ điều hành", "ios", "android"],
    "os_version": ["phiên bản ios", "phiên bản android", "android mấy"],
    "chipset": ["chipset", "cấu hình"],
    "cpu": ["tốc độ cpu", "cpu"],
    "gpu": ["gpu"],
    "ram": ["ram"],
    "memory_internal": ["bộ nhớ trong", "bộ nhớ máy", "bộ nhớ"],
    "memory_available": ["bộ nhớ còn lại", "bộ nhớ khả dụng"],
    "memory_card_slot": ["thẻ nhớ ngoài", "thẻ nhớ"],
    "mobile_network": ["mạng di động", "4G"],
    "sim": ["sim"],
    "Wifi": ["wifi", "mạng wifi"],
    "gps": ["gps", "định vị"],
    "bluetooth": ["bluetooth"],
    "charging_port": ["Cổng kết nối", "cổng sạc"],
    "headphone_jack": ["jack tai nghe"],
    "other_port": ["kết nối khác"],
    "design": ["thiết kế"],
    "material": ["vật liệu", "chất liệu"],
    "dimensions": ["kích thước"],
    "weight": ["trọng lượng"],
    "battery_capacity": ["pin", "dung lượng pin"],
    "battery_type": ["loại pin"],
    "battery_technology": ["công nghệ pin"],
    "advanced_security": ["Mở khoá khuôn mặt Face ID"],
    "special_features": ["Đèn pin", "Sạc pin không dây", "Dolby Audio™", "Chuẩn Kháng nước", "Chuẩn kháng bụi", "Sạc pin nhanh", "Apple Pay"],
    "recording": ["Có microphone chuyên dụng chống ồn", "ghi âm"],
    "radio": ["radio"],
    "watchfilm": ["H.264(MPEG4-AVC)", "xem phim"],
    "music": ["Lossless, MP3, AAC, FLAC", "nghe nhạc"],
    "time_of_lunch": ["ngày ra mắt"]
}

function translateProperty(slotProperty, jsonTranslate) {
    result = [];

    for (var key in jsonTranslate) {
        for (var i = 0; i < jsonTranslate[key].length; i++) {
            if (slotProperty.toLowerCase() == jsonTranslate[key][i]) {
                result.push(key)
            }
        }
    }
    return result;
}

module.exports.QueryMongo = function(req, res) {
    var PhoneName = req.body.PhoneName;
    var mongo_property = req.body.MongoProperty;


    Phone.find({ name: new RegExp(PhoneName, "i"), [mongo_property]: { $exists: true } },
        function(err, result) {
            if (err) res.send(err);
            else res.send(result[0]);
        }
    );

};


module.exports.queryMongoProperty = function(req, res) {
    var PhoneProperty = req.params.PhoneProperty;
    console.log(PhoneProperty);
    var mongo_property = translateProperty(PhoneProperty, jsonTranslate);
    res.status(200).json(mongo_property);


};