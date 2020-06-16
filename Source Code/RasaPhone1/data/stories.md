##<!-- ## happy path
* greet
  - utter_greet
* ask_what
  - action_answer_what

## happy path
* greet
    - utter_greet
* inform{"phone_name": "iPhone 11"}
    - ask_form
    - form{"name": "ask_form"}
    - form{"name": null}
    - utter_question
* thank
    - utter_thank

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

## thank
* thank
  - utter_thank



## affirm
* affirm
  - utter_affirm

## deny
* deny
  - utter_deny


## New Story Test ActionYesNo
* ask_yes_no
  - action_answer_yes_no
  - utter_question

## New Story Test ActionWhat
* ask_what
  - action_answer_what
  - utter_question
## new story test inform
* greet
  - utter_greet
* inform
  - ask_form
  - form{"name": "ask_form"}
  - form{"name": null}    
  - utter_question
* thank
  - utter_thank

## New Story
- slot{"phone_property_value":"khuyến mãi"}
* ask_what{"phone_name":"iPhone 11","phone_property_value":"khuyến mãi"}
    - slot{"phone_property_value":"khuyến mãi"}
    - slot{"phone_name":"iPhone 11"}
    - action_answer_what
    - utter_question
## interactive_story_1
* ask_yes_no{"phone_name": "Vivo Y17", "phone_property": "chơi game", "phone_property_value": "tốt"}
    - slot{"phone_name": "Vivo Y17"}
    - slot{"phone_property": "chơi game"}
    - slot{"phone_property_value": "tốt"}
    - action_answer_yes_no
    - reset_slots
    - utter_question

## New Story Test ActionCompare
* ask_compare
  - action_answer_compare
  - utter_question