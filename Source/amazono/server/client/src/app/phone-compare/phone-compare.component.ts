import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-phone-compare',
    templateUrl: './phone-compare.component.html',
    styleUrls: ['./phone-compare.component.scss']
})

export class PhoneCompareComponent implements OnInit {

    routeParams = [];
    
    BACKEND_URL = environment.apiUrl;
    constructor(
        private route: ActivatedRoute,
        private rest: RestApiService) {}

    phone1 = {
        "title": "Samsung Galaxy S20+",
        "price": 23990000,
        "display_technology": "Dynamic AMOLED 2X",
        "display_protection": "Kính cường lực Corning Gorilla Glass 6",
        "display_resolution": "2K+ (1440 x 3200 Pixels)",
        "display_size": "Màn hình 6.7\"",
        "back_camera_resolution": "Camera sau Chính 12 MP & Phụ 64 MP, 12 MP, TOF 3D",
        "back_camera_video": "Quay phim HD 720p@960fps, Quay phim FullHD 1080p@30fps, Quay phim FullHD 1080p@60fps, Quay phim FullHD 1080p@240fps, Quay phim 4K 2160p@30fps, Quay phim 4K 2160p@60fps, Quay phim 8K 4320p@24fps",
        "back_camera_flash": "Có",
        "back_camera_advanced": "Góc siêu rộng (Ultrawide), Góc rộng (Wide), Zoom kỹ thuật số, Zoom quang học, Xoá phông, Quay chậm (Slow Motion), Trôi nhanh thời gian (Time Lapse), Ban đêm (Night Mode), A.I Camera, Lấy nét theo pha (PDAF), Quay siêu chậm (Super Slow Motion), Tự động lấy nét (AF), Chạm lấy nét, Nhận diện khuôn mặt, HDR, Toàn cảnh (Panorama), Chống rung quang học (OIS), Làm đẹp (Beautify), Chuyên nghiệp (Pro)",
        "front_camera_resolution": "10 MP",
        "front_camera_videocall": "Hỗ trợ VideoCall thông qua ứng dụng",
        "front_camera_other_infor": "Nhãn dán (AR Stickers), Flash màn hình, Quay video HD, Nhận diện khuôn mặt, Làm đẹp (Beautify), Quay video Full HD, Tự động lấy nét (AF), Góc rộng (Wide), HDR, A.I Camera, Xoá phông, Quay phim 4K",
        "operating_system": "Android 10",
        "os_version": "Android 10",
        "chipset": "Exynos 990 8 nhân",
        "cpu": "2 nhân 2.73 GHz, 2 nhân 2.6 GHz & 4 nhân 2.0 GHz",
        "gpu": "Mali-G77 MP11",
        "ram": "8 GB",
        "memory_internal": "128 GB",
        "memory_available": "Khoảng 103 GB",
        "memory_card_slot": "MicroSD, hỗ trợ tối đa 1 TB",
        "mobile_network": "Hỗ trợ 4G",
        "sim": "2 SIM Nano (SIM 2 chung khe thẻ nhớ)",
        "wifi": "Wi-Fi 802.11 a/b/g/n/ac, Dual-band, Wi-Fi Direct, Wi-Fi hotspot",
        "gps": "BDS, A-GPS, GLONASS",
        "bluetooth": "A2DP, LE, apt-X, v5.0",
        "charging_port": "2 đầu Type-C",
        "headphone_jack": "USB Type-C",
        "other_port": "NFC, OTG",
        "design": "Nguyên khối",
        "material": "Khung kim loại & Mặt lưng kính cường lực",
        "dimensions": "Dài 161.9 mm - Ngang 73.7 mm - Dày 7.8 mm",
        "weight": "188 g",
        "battery_capacity": "Pin 4500 mAh",
        "battery_type": "Pin chuẩn Li-Ion",
        "battery_technology": "Tiết kiệm pin, Siêu tiết kiệm pin, Sạc pin nhanh, Sạc pin không dây, Sạc ngược không dây",
        "advanced_security": "Mở khoá khuôn mặt, Mở khoá vân tay dưới màn hình",
        "special_features": "Âm thanh AKG\nDolby Audio™\nChuẩn Kháng nước, Chuẩn kháng bụi\nĐèn pin\nChạm 2 lần sáng màn hình\nChặn cuộc gọi\nGhi âm cuộc gọi\nSamsung DeX\nKhông gian trẻ em\nNhân bản ứng dụng\nSamsung Pay\nThu nhỏ màn hình sử dụng một tay\nTrợ lý ảo Samsung Bixby\nMàn hình luôn hiển thị AOD\nChặn tin nhắn\n",
        "recording": "Có, microphone chuyên dụng chống ồn",
        "radio": "Không",
        "watchfilm": "H.265, 3GP, MP4, AVI, WMV, H.264(MPEG4-AVC), DivX, WMV9, Xvid",
        "music": "AMR, APE, Midi, Lossless, MP3, WAV, WMA, AAC, AAC++, eAAC+, OGG, AC3, FLAC",
        "time_of_lunch": "02/2020",
    }

    phone2 = {
        "name": "iPhone 7 32GB",
        "price": 9990000,
        "display_technology": "LED-backlit IPS LCD",
        "display_protection": "Kính cường lực oleophobic (ion cường lực)",
        "display_resolution": "HD (750 x 1334 Pixels)",
        "display_size": "Màn hình 4.7\"",
        "back_camera_resolution": "Camera sau 12 MP",
        "back_camera_video": "Quay phim 4K 2160p@30fps",
        "back_camera_flash": "4 đèn LED (2 tông màu)",
        "back_camera_advanced": "Tự động lấy nét (AF), Chạm lấy nét, Nhận diện khuôn mặt, HDR, Toàn cảnh (Panorama), Chống rung quang học (OIS)",
        "front_camera_resolution": "7 MP",
        "front_camera_videocall": "Hỗ trợ VideoCall thông qua ứng dụng",
        "front_camera_other_infor": "Retina Flash, Toàn cảnh (Panorama), Nhận diện khuôn mặt, Quay video Full HD, Tự động lấy nét (AF), HDR",
        "operating_system": "iOS 12",
        "os_version": "iOS 12",
        "chipset": "Apple A10 Fusion 4 nhân",
        "cpu": "2.3 GHz",
        "gpu": "Chip đồ họa 6 nhân",
        "ram": "2 GB",
        "memory_internal": "32 GB",
        "memory_available": "Khoảng 28 GB",
        "memory_card_slot": "Không",
        "mobile_network": "3G, 4G LTE Cat 9",
        "sim": "1 Nano SIM",
        "wifi": "Wi-Fi 802.11 a/b/g/n/ac, Dual-band, Wi-Fi hotspot",
        "gps": "A-GPS, GLONASS",
        "bluetooth": "A2DP, LE, v4.2",
        "charging_port": "Lightning",
        "headphone_jack": "Lightning",
        "other_port": "NFC, Air Play, OTG, HDMI",
        "design": "Nguyên khối, mặt kính cong 2.5D",
        "material": "Khung & Mặt lưng hợp kim nhôm, magie",
        "dimensions": "Dài 138.3 mm - Ngang 67.1 mm - Dày 7.1 mm",
        "weight": "138 g",
        "battery_capacity": "Pin 1960 mAh",
        "battery_type": "Pin chuẩn Li-Ion",
        "battery_technology": "Tiết kiệm pin",
        "advanced_security": "Mở khóa bằng vân tay",
        "special_features": "3D Touch\n",
        "recording": "Có, microphone chuyên dụng chống ồn",
        "radio": "Không",
        "watchfilm": "H.265, MP4, AVI, H.264(MPEG4-AVC), DivX, Xvid",
        "music": "Lossless, MP3, WAV, AAC, FLAC",
        "time_of_lunch": "11/2016",
    }

    phone3= {
        "name": "iPhone Xs 256GB",
        "price": 23990000,
        "display_technology": "OLED",
        "display_protection": "Kính cường lực oleophobic (ion cường lực)",
        "display_resolution": "1125 x 2436 Pixels",
        "display_size": "Màn hình 5.8\"",
        "back_camera_resolution": "Camera sau Chính 12 MP & Phụ 12 MP",
        "back_camera_video": "Quay phim FullHD 1080p@30fps, Quay phim FullHD 1080p@60fps, Quay phim FullHD 1080p@120fps, Quay phim FullHD 1080p@240fps, Quay phim 4K 2160p@24fps, Quay phim 4K 2160p@30fps, Quay phim 4K 2160p@60fps",
        "back_camera_flash": "4 đèn LED (2 tông màu)",
        "back_camera_advanced": "Điều chỉnh khẩu độ, A.I Camera, Quay chậm (Slow Motion), Xoá phông, Zoom quang học, Tự động lấy nét (AF), Chạm lấy nét, Nhận diện khuôn mặt, HDR, Toàn cảnh (Panorama), Chống rung quang học (OIS)",
        "front_camera_resolution": "7 MP",
        "front_camera_videocall": "Có",
        "front_camera_other_infor": "Nhận diện khuôn mặt, Quay video Full HD, Góc rộng (Wide), HDR",
        "operating_system": "iOS 12",
        "os_version": "iOS 12",
        "chipset": "Apple A12 Bionic 6 nhân",
        "cpu": "2 nhân 2.5 GHz & 4 nhân 1.6 GHz",
        "gpu": "Apple GPU 4 nhân",
        "ram": "4 GB",
        "memory_internal": "256 GB",
        "memory_available": "Khoảng 249 GB",
        "memory_card_slot": "Không",
        "mobile_network": "Hỗ trợ 4G",
        "sim": "1 eSIM & 1 Nano SIM",
        "wifi": "Wi-Fi 802.11 a/b/g/n/ac, Dual-band, Wi-Fi hotspot",
        "gps": "A-GPS, GLONASS",
        "bluetooth": "A2DP, LE, v5.0",
        "charging_port": "Lightning",
        "headphone_jack": "Lightning",
        "other_port": "NFC, OTG",
        "design": "Nguyên khối",
        "material": "Khung thép không gỉ & Mặt lưng kính cường lực",
        "dimensions": "Dài 143.6 mm - Ngang 70.9 mm - Dày 7.7 mm",
        "weight": "177 g",
        "battery_capacity": "Pin 2658 mAh",
        "battery_type": "Pin chuẩn Li-Ion",
        "battery_technology": "Tiết kiệm pin, Sạc pin nhanh, Sạc pin không dây",
        "advanced_security": "Mở khoá khuôn mặt Face ID",
        "special_features": "Apple Pay\nChuẩn Kháng nước, Chuẩn kháng bụi\nSạc pin nhanh\n3D Touch\n",
        "recording": "Có, microphone chuyên dụng chống ồn",
        "radio": "Không",
        "watchfilm": "H.265, 3GP, MP4, AVI, WMV, H.263, H.264(MPEG4-AVC)",
        "music": "Midi, Lossless, MP3, WAV, WMA, WMA9, AAC, AAC+, AAC++, eAAC+",
        "time_of_lunch": "11/2018",
    }

    //phoneList = [this.phone1, this.phone2, this.phone3];
    phoneList = [];
    phoneKeys = Object.keys(this.phone1);

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            let searchEndpointArr = [];
            Object.values(params).forEach(async (val) => {
                this.routeParams.push(val);

                searchEndpointArr.push(() => {`${this.BACKEND_URL}/productsearch/?name=${val}`});

                const result: any = await this.rest.get(`${this.BACKEND_URL}/productsearch/?name=${val}`);
                this.phoneList.push(result.product);
            })
            
        })
    }
}