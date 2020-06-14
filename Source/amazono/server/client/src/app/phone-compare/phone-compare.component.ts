import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
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

    translateProps = {
        "title": "Tên",
        "price": "Giá",
        "display_technology": "Công nghệ màn hình",
        "display_protection": "Mặt kính cảm ứng",
        "display_resolution": "Độ phân giải",
        "display_size": "Màn hình rộng",
        "back_camera_resolution": "Độ phân giải cam chính",
        "back_camera_video": "Quay phim cam chính",
        "back_camera_flash": "Flash cam chính",
        "back_camera_advanced": "Tính năng cam chính",
        "front_camera_resolution": "Độ phân giải cam selfie",
        "front_camera_videocall": "Video call cam selfie",
        "front_camera_other_infor": "Thông tin khác cam selfie",
        "operating_system": "Hệ điều hành",
        "os_version": "Version hệ điều hành",
        "chipset": "Chipset (hãng SX CPU)",
        "cpu": "CPU",
        "gpu": "GPU",
        "ram": "RAM",
        "memory_internal": "Bộ nhớ trong",
        "memory_available": "Bộ nhớ khả dụng",
        "memory_card_slot": "Thẻ nhớ ngoài",
        "mobile_network": "Mạng di động",
        "sim": "SIM",
        "wifi": "Wi-Fi",
        "gps": "GPS",
        "bluetooth": "Bluetooth",
        "charging_port": "Cổng sạc",
        "headphone_jack": "Cổng tai nghe",
        "other_port": "Truyền dữ liệu",
        "design": "Thiết kế",
        "material": "Chất liệu",
        "dimensions": "Kích thước",
        "weight": "Trọng lượng",
        "battery_capacity": "Dung lượng pin",
        "battery_type": "Loại pin",
        "battery_technology": "Công nghệ pin",
        "advanced_security": "Bảo mật nâng cao",
        "special_features": "Tính năng đặc biệt",
        "recording": "Ghi âm",
        "radio": "Radio",
        "watchfilm": "Xem phim",
        "music": "Nghe nhạc",
        "time_of_lunch": "Thời điểm ra mắt",
    }

    phoneList = [];
    phoneKeys = Object.keys(this.translateProps);
    phoneNames = [];

    selectedPhone0 : any;
    selectedPhone1 : any;
    selectedPhone2 : any;


    constructor(
        private route: ActivatedRoute,
        private rest: RestApiService
        ) {}


    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            let searchEndpointArr = [];
            Object.values(params).forEach(async (val, index) => {
                this.routeParams.push(val);
                searchEndpointArr.push(() => {`${this.BACKEND_URL}/productsearch/?name=${val}`});
                const result: any = await this.rest.get(`${this.BACKEND_URL}/productsearch/?name=${val}`);
                this.phoneList.push(result.product);
            })
        })

        this.rest.get(`${this.BACKEND_URL}/products`).then((result: any) => {
            result.products.forEach(product=> {
                this.phoneNames.push({label: product.title, value: {id: product._id, name: product.title, image: product.image}});
            })
        })
    }

    onDropdownClick(phone, section) {
        this.rest.get(`${this.BACKEND_URL}/product/${phone.id}`).then((result:any) => {
            this.phoneList[section] = result.product;
        })
    }

}