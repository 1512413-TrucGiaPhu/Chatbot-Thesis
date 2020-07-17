from typing import Any, Text, Dict, List
import requests
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import FollowupAction, AllSlotsReset, SlotSet
from rasa_sdk.forms import FormAction
from rasa_sdk.events import (EventType)
import pymongo
from pymongo import MongoClient
import csv
import sys
import json
import logging

logger = logging.getLogger(__name__)


class AskWhatAction(Action):

    def name(self) -> Text:
        return "action_answer_what"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict]:

        # lấy các entities
        phone_name = tracker.get_slot("phone_name")
        phone_property = tracker.get_slot("phone_property")
        phone_property_value = tracker.get_slot("phone_property_value")
        
        dataPhone = {'PhoneName': phone_name, 'PhoneProperty': phone_property, 'PhonePropertyValue': phone_property_value}
       

        rPost = requests.post('http://localhost:3030/api/answer/what', data=dataPhone)
        results = rPost.json()
        ImageLink =""
    
        if results["isFlag"]:
            message = results["message"]
        else:
            messageLasted = results["message"]
            SearchKeyword = requests.post('http://localhost:3030/api/answer/searchkeyword', data=dataPhone)
            results = SearchKeyword.json()
            print(results)
            
            ImageLink = results["urlImage"]
            message =messageLasted + ". Em có tìm kiếm trên google thì thấy được kết quả. Anh/chị có thể tham khảo thử: {}".format(results['searchLink'])
        # Send responses back to the user
        dispatcher.utter_message(text=message,image=ImageLink)
        # return [AllSlotsReset()]
        return [SlotSet("phone_property", None), SlotSet("phone_property_value", None)]


class AskYesNoAction(Action):
    
    def name(self) -> Text:
        return "action_answer_yes_no"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict]:

        # lấy các entities
        phone_name = tracker.get_slot("phone_name")
        phone_property = tracker.get_slot("phone_property")
        phone_property_value = tracker.get_slot("phone_property_value")
        dataPhone = {'PhoneName': phone_name, 'PhoneProperty': phone_property, 'PhonePropertyValue': phone_property_value}
       

        rPost = requests.post('http://localhost:3030/api/answer/yesno', data=dataPhone)
        results = rPost.json()
        ImageLink =""
    
        if results["isFlag"]:
            message = results["message"]
        else:
            messageLasted = results["message"]
            SearchKeyword = requests.post('http://localhost:3030/api/answer/searchkeyword', data=dataPhone)
            results = SearchKeyword.json()
            print(results)
            
            ImageLink = results["urlImage"]
            message =messageLasted + ". Em có tìm kiếm trên google thì thấy được kết quả. Anh/chị có thể tham khảo thử: {}".format(results['searchLink'])
        # Send responses back to the user
        dispatcher.utter_message(text=message,image=ImageLink)
        # return [AllSlotsReset()]
        return [SlotSet("phone_property", None), SlotSet("phone_property_value", None)]

class AskCompareAction(Action):
    
    def name(self) -> Text:
        return "action_answer_compare"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict]:

        # lấy các entities
        entityPhoneName = tracker.get_latest_entity_values("phone_name")
        if (entityPhoneName):
            phone_name_first = next(entityPhoneName)
            phone_name_second = next(entityPhoneName)

        phone_property = tracker.get_slot("phone_property")
        print (phone_name_first)
        print(phone_name_second)
        print(phone_property)
        dataPhone = {'PhoneNameFirst': phone_name_first,'PhoneNameSecond':phone_name_second,'PhoneProperty': phone_property}

        rPost = requests.post('http://localhost:3030/api/answer/compare', data=dataPhone)
        results = rPost.json()
        # # Send responses back to the user
        dispatcher.utter_message(text=results["message"])
        # return [AllSlotsReset()]
        return [SlotSet("phone_property", None)]


class AskForm(FormAction):

    def name(self) -> Text:
        return "ask_form"

    @staticmethod
    def required_slots(tracker: Tracker):
        if (not (tracker.get_slot('phone_property_value') is None)):
            return ['phone_name', 'phone_property','phone_property_value']
        else:
            return ['phone_name', 'phone_property']
        

    def slot_mappings(self):
        return {"phone_name": [self.from_entity(entity="phone_name")],
                "phone_property": [self.from_entity(entity="phone_property")],
                "phone_property_value": [self.from_entity(entity="phone_property_value")]}

    def submit(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict]:
        phone_name = tracker.get_slot("phone_name")
        
        phone_property = tracker.get_slot("phone_property")
        phone_property_value = tracker.get_slot("phone_property_value")
        print (phone_property)
         # Lay danh sach intent
        intent_ranking = tracker.latest_message.get("intent_ranking", [])
        print(intent_ranking)
        def getIntentNext(intent_ranking):
            result = []

            for intent in intent_ranking:
                if (intent.get("name") == "ask_yes_no"):
                    result.append(intent)
                elif (intent.get("name") == "ask_what"):
                    result.append(intent)
            if len(result) == 2:
                item1 = result[0]
                item2 = result[1]

                if item1["confidence"] > item2["confidence"]:
                    return item1["name"]
                else:
                    return item2["name"] 
            elif len(result) == 1:
                return result[0]["name"]
            elif len(result) == 0:
                return "ask_yes_no"
        ActionNext = getIntentNext(intent_ranking)

        print(ActionNext)
        
        if ActionNext == "ask_what":
            return [FollowupAction('action_answer_what')] 
        elif ActionNext == "ask_yes_no":
            return [FollowupAction('action_answer_yes_no')]
        else:
            return []      



class ActionDefaultAskAffirmation(Action):
    """Asks for an affirmation of the intent if NLU threshold is not met."""

    def name(self):
        return "action_default_ask_affirmation"

    def __init__(self):
        import pandas as pd

        self.intent_mappings = pd.read_csv('intent_description_mapping.csv', encoding='utf-8')
        self.intent_mappings.fillna("", inplace=True)
        self.intent_mappings.entities = self.intent_mappings.entities.map(
            lambda entities: {e.strip() for e in entities.split(",")}
        )

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[EventType]:
        # Lay danh sach intent
        intent_ranking = tracker.latest_message.get("intent_ranking", [])
        
        if len(intent_ranking) > 1:
            diff_intent_confidence = intent_ranking[0].get(
                "confidence"
            ) - intent_ranking[1].get("confidence")

            if diff_intent_confidence < 0.2:
                intent_ranking = intent_ranking[:2]
            else:
                intent_ranking = intent_ranking[:1]

        first_intent_names = [
            intent.get("name", "")
            for intent in intent_ranking
            if intent.get("name", "") != "out_of_scope"
        ]


        message_title = (
            "Xin lỗi Anh/Chị. Em không chắc là đã hiểu ý của anh/chị. Ý của anh/chị là ..."
        )

        entities = tracker.latest_message.get("entities", [])
        entities = {e["entity"]: e["value"] for e in entities}

        entities_json = json.dumps(entities)

        buttons = []
        for intent in first_intent_names:
            logger.debug(intent)
            logger.debug(entities)
            buttons.append(
                {
                    "title": self.get_button_title(intent, entities),
                    "payload": "/{}{}".format(intent, entities_json)
                }
            )

        # /out_of_scope is a retrieval intent
        # you cannot send rasa the '/out_of_scope' intent
        # instead, you can send one of the sentences that it will map onto the response

        buttons.append(
            {
                "title": "Một cái gì khác",
                "payload": "Tôi đang hỏi bạn câu hỏi ngoài phạm vi"
            }
        )

        dispatcher.utter_message(text=message_title, buttons=buttons)
        
        return []

    
    def get_button_title(self, intent: Text, entities: Dict[Text, Text]) -> Text:
        default_utterance_query = self.intent_mappings.intent == intent
        utterance_query = (self.intent_mappings.entities == entities.keys()) & (default_utterance_query)
        
        utterances = self.intent_mappings[utterance_query].button.tolist()
        
        if len(utterances) > 0:
            button_title = utterances[0]
        else:
            utterances = self.intent_mappings[default_utterance_query].button.tolist()
            button_title = utterances[0] if len(utterances) > 0 else intent
        return button_title.format(**entities)