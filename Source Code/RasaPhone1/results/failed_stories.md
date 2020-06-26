## happy path 1 (C:\Users\LUCKYS~1\AppData\Local\Temp\tmps5i2gh76\6f8c02ef732b4f87ab35d80105eb5a26_conversation_tests.md)
* greet: hello there!
    - utter_greet
* mood_great: amazing   <!-- predicted: deny: amazing -->
    - utter_happy   <!-- predicted: utter_deny -->


## happy path 2 (C:\Users\LUCKYS~1\AppData\Local\Temp\tmps5i2gh76\6f8c02ef732b4f87ab35d80105eb5a26_conversation_tests.md)
* greet: hello there!
    - utter_greet
* mood_great: amazing   <!-- predicted: deny: amazing -->
    - utter_happy   <!-- predicted: utter_deny -->
* goodbye: bye-bye!
    - utter_goodbye


## sad path 1 (C:\Users\LUCKYS~1\AppData\Local\Temp\tmps5i2gh76\6f8c02ef732b4f87ab35d80105eb5a26_conversation_tests.md)
* greet: hello
    - utter_greet
* mood_unhappy: not good   <!-- predicted: deny: not good -->
    - utter_cheer_up   <!-- predicted: utter_deny -->
    - utter_did_that_help   <!-- predicted: action_listen -->
* affirm: yes
    - utter_happy   <!-- predicted: utter_affirm -->


## sad path 2 (C:\Users\LUCKYS~1\AppData\Local\Temp\tmps5i2gh76\6f8c02ef732b4f87ab35d80105eb5a26_conversation_tests.md)
* greet: hello
    - utter_greet
* mood_unhappy: not good   <!-- predicted: deny: not good -->
    - utter_cheer_up   <!-- predicted: utter_deny -->
    - utter_did_that_help   <!-- predicted: action_listen -->
* deny: not really
    - utter_goodbye   <!-- predicted: utter_deny -->


## sad path 3 (C:\Users\LUCKYS~1\AppData\Local\Temp\tmps5i2gh76\6f8c02ef732b4f87ab35d80105eb5a26_conversation_tests.md)
* greet: hi
    - utter_greet
* mood_unhappy: very terrible   <!-- predicted: ask_yes_no: very terrible -->
    - utter_cheer_up   <!-- predicted: action_answer_yes_no -->
    - utter_did_that_help   <!-- predicted: action_listen -->
* deny: no
    - utter_goodbye   <!-- predicted: utter_deny -->


## bot challenge (C:\Users\LUCKYS~1\AppData\Local\Temp\tmps5i2gh76\6f8c02ef732b4f87ab35d80105eb5a26_conversation_tests.md)
* bot_challenge: are you a bot?   <!-- predicted: thank: are you a bot? -->
    - utter_iamabot   <!-- predicted: utter_thank -->


