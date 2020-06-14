# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/core/actions/#custom-actions/


# This is a simple example for a custom action which utters "Hello World!"
import requests
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

jsonTranslate = {
    "name": ["iPhone 11 Pro Max 64GB"],
    "display_technology": ["công nghệ màn hình", "loại màn hình"],
    "display_resolution": ["độ phân giải màn hình", "độ phân giải"],
    "display_size": ["kích cỡ màn hình"],
    "display_protection": ["mặt kích cảm ứng"],
    "back_camera_resolution": ["camera sau",
                "cam sau",
                "độ phân giải cam sau",
                "độ phân giải camera sau", "chụp ảnh"],
    "back_camera_video": ["quay phim", "quay video"],
    "back_camera_flash": ["đèn flash"],
    "back_camera_advanced": ["Góc siêu rộng (Ultrawide)",
    "Góc rộng (Wide)",
    "Nhãn dán (AR Stickers)",
    "Xoá phông","Chụp bằng cử chỉ",
    "Tự động lấy nét (AF)",
    "Chạm lấy nét",
    "Nhận diện khuôn mặt",
    "HDR",
    "Toàn cảnh (Panorama)",
    "Làm đẹp (Beautify)", "Chuyên nghiệp (Pro)", "xóa phông cam sau", "xóa phông"],
    "front_camera_resolution": ["12 MP", "cam trước", "chụp ảnh"],
    "front_camera_videocall": ["video call"],
    "front_camera_other_infor": ["Xoá phông camera trước", "Quay phim 4K", "Nhãn dán (AR Stickers)",
     "Retina Flash", "Quay video HD", "Nhận diện khuôn mặt", "Quay video Full HD", "Tự động lấy nét (AF)", "HDR", "Quay chậm (Slow Motion)", "Xóa phông cam trước"],
    "operating_system": ["hệ điều hành", "ios"],
    "os_version": ["phiên bản ios"],
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
    "material": ["vật liệu"],
    "dimensions": ["kích thước"],
    "weight": ["trọng lượng"],
    "battery_capacity": ["pin", "dung lượng pin"],
    "battery_type": ["loại pin"],
    "battery_technology": ["công nghệ pin"],
    "advanced_security": ["Mở khoá khuôn mặt Face ID"],
    "special_features": ["Đèn pin","Sạc pin không dây","Dolby Audio™","Chuẩn Kháng nước", "Chuẩn kháng bụi","Sạc pin nhanh","Apple Pay"],
    "recording": ["Có microphone chuyên dụng chống ồn", "ghi âm"],
    "radio": ["radio"],
    "watchfilm": ["H.264(MPEG4-AVC)", "xem phim"],
    "music": ["Lossless, MP3, AAC, FLAC", "nghe nhạc"],
    "time_of_lunch": ["ngày ra mắt"]
}

def translateProperty(slotProperty: Text, jsonTranslate):
    result = []
    
    for index in jsonTranslate:
        for item in jsonTranslate[index]:
            if slotProperty.lower() == item.lower():
                result.append(index)
            elif slotProperty.lower() == 'face id':
                result.append('advanced_security')
                return result
    
    return result



class AskWhatAction(Action):

    def name(self) -> Text:
        return "action_answer_what"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict]:

        phone_name = tracker.get_slot("phone_name")
        phone_property = tracker.get_slot("phone_property")
        # mongo_property = translateProperty(phone_property, jsonTranslate)
        print("phonename", phone_name)
        print("phoneproperty", phone_property)
        result = requests.get(f'http://localhost:3030/api/productsearch/?name={phone_name}')
        # query database
        print(result.text)

        # if len(results) > 0:
        #     ketqua=""
        #     if len(mongo_Property) >1:
        #         for item in mongo_Property:
        #             ketqua+=results[item] + " "
        #         message = "Dạ chào Anh/Chị. Em kiểm tra thì thấy sản phẩm {} có {} là {}".format(
        #             results['name'], phone_property,ketqua)
        #     else:
        #         message = "Dạ chào Anh/Chị. Em kiểm tra thì thấy sản phẩm {} có {} là {}".format(
        #             results['name'], phone_property,results[mongo_Property[0]])
        # else:
        #     message = "Xin lỗi Anh/Chị. Em vừa kiểm tra thì không tìm thấy thông tin nào khớp với câu hỏi của Anh/Chị. Mong Anh/Chị thông cảm giúp bên em!"

        # Send responses back to the user
        dispatcher.utter_message(text=result.text)
        return []


class AskYesNoAction(Action):

    def name(self) -> Text:
        return "action_answer_yes_no"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict]:

        phone_name = tracker.get_slot("phone_name")
        phone_property = tracker.get_slot("phone_property")
        # mongo_property = translateProperty(phone_property, jsonTranslate)
        print("phonename", phone_name)
        print("phoneproperty", phone_property)
        result = requests.get(f'http://localhost:3030/api/productsearch/?name={phone_name}')
        # query database
        print(result.text)

        # if len(results) > 0:
        #     ketqua=""
        #     if len(mongo_Property) >1:
        #         for item in mongo_Property:
        #             ketqua+=results[item] + " "
        #         message = "Dạ chào Anh/Chị. Em kiểm tra thì thấy sản phẩm {} có {} là {}".format(
        #             results['name'], phone_property,ketqua)
        #     else:
        #         message = "Dạ chào Anh/Chị. Em kiểm tra thì thấy sản phẩm {} có {} là {}".format(
        #             results['name'], phone_property,results[mongo_Property[0]])
        # else:
        #     message = "Xin lỗi Anh/Chị. Em vừa kiểm tra thì không tìm thấy thông tin nào khớp với câu hỏi của Anh/Chị. Mong Anh/Chị thông cảm giúp bên em!"

        # Send responses back to the user
        dispatcher.utter_message(text=result)
        return []


class AskCompareAction(Action):

    def name(self) -> Text:
        return "action_answer_compare"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict]:

        phone_name = tracker.get_slot("phone_name")

        phone_property = tracker.get_slot("phone_property")
        # mongo_property = translateProperty(phone_property, jsonTranslate)

        print("phonename", phone_name)
        print("phoneproperty", phone_property)
        result = requests.get(f'http://localhost:3030/api/productsearch/?name={phone_name}')
        # query database
        print(result.text)


        # Send responses back to the user
        dispatcher.utter_message(text=result)
        return []

#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []
