## ask what
* ask_what{"phone_name": "iPhone 11", "phone_property": "bộ nhớ trong"}
  - action_answer_what
  - utter_can_we_help
*  thanks
  - utter_thanks

## ask_yes_no
* ask_yes_no{"phone_name": "iPhone 11", "phone_property": "sạc không dây"}
  - action_answer_yes_no
  - utter_can_we_help
*  thanks
  - utter_thanks

## ask_compare
* ask_compare{"phone_name": "iPhone 11", "phone_name": "Samsung Galaxy S20", "phone_property": "pin"}
  - action_answer_compare
  - utter_can_we_help
*  thanks
  - utter_thanks

## happy path
* greet
  - utter_greet
* mood_great
  - utter_happy

## sad path 1
* greet
  - utter_greet
* mood_unhappy
  - utter_cheer_up
  - utter_did_that_help
* affirm
  - utter_happy

## sad path 2
* greet
  - utter_greet
* mood_unhappy
  - utter_cheer_up
  - utter_did_that_help
* deny
  - utter_goodbye

## say goodbye
* goodbye
  - utter_goodbye

## bot challenge
* bot_challenge
  - utter_iamabot
