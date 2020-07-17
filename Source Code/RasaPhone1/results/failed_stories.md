## yesno + inform (/var/folders/nm/7mf4hrmx0f30fs1stqhwsr5w0000gn/T/tmp2sygxmaa/10831415b3d04f47bfef3d5a266877c5_conversation_tests.md)
* greet: hi
    - utter_greet
* ask_yes_no: Máy [Samsung Galaxy A21s]{"entity": "phone_name", "role": "O"} khi mua mới có [nguyên seal]{"entity": "phone_property", "role": "O"} không
    - slot{"phone_name": "Samsung Galaxy A21s"}
    - slot{"phone_property": "nguyên seal"}
    - slot{"phone_name": "Samsung Galaxy A21s"}
    - slot{"phone_property": "nguyên seal"}
    - action_answer_yes_no
    - slot{"phone_property": null}
    - slot{"phone_property_value": null}
* inform: [Giá]{"entity": "phone_property", "role": "O"} hiện tại của máy là bao nhiêu vậy
    - slot{"phone_property": "Giá"}
    - slot{"phone_property": "Giá"}
    - ask_form
    - form{"name": "ask_form"}
    - slot{"phone_name": "Samsung Galaxy A21s"}
    - slot{"phone_property": "Giá"}
    - slot{"phone_property": "Giá"}
    - form{"name": null}
    - slot{"requested_slot": null}
    - action_answer_what   <!-- predicted: action_listen -->
    - slot{"phone_property": null}
    - slot{"phone_property_value": null}


## what + inform (/var/folders/nm/7mf4hrmx0f30fs1stqhwsr5w0000gn/T/tmp2sygxmaa/10831415b3d04f47bfef3d5a266877c5_conversation_tests.md)
* greet: hi
    - utter_greet
* ask_what: Cho em hỏi [iPhone 11]{"entity": "phone_name", "role": "O"} mấy [sim]{"entity": "phone_property", "role": "O"} vậy
    - slot{"phone_name": "iPhone 11"}
    - slot{"phone_property": "sim"}
    - slot{"phone_name": "iPhone 11"}
    - slot{"phone_property": "sim"}
    - action_answer_what
    - utter_question   <!-- predicted: action_listen -->
* affirm: dạ có
    - utter_affirm
* inform: cho hỏi có được [trả góp]{"entity": "phone_property", "role": "O"} không ạ?
    - slot{"phone_property": "trả góp"}
    - slot{"phone_property": "trả góp"}
    - ask_form
    - form{"name": "ask_form"}
    - slot{"phone_name": "iPhone 11"}
    - slot{"phone_property": "trả góp"}
    - slot{"phone_property": "trả góp"}
    - form{"name": null}
    - slot{"requested_slot": null}
    - action_answer_yes_no   <!-- predicted: action_listen -->
    - slot{"phone_property": null}
    - slot{"phone_property_value": null}


## yes no + compare (/var/folders/nm/7mf4hrmx0f30fs1stqhwsr5w0000gn/T/tmp2sygxmaa/10831415b3d04f47bfef3d5a266877c5_conversation_tests.md)
* greet: hi
    - utter_greet
* ask_yes_no: Cho hỏi [Realme C3]{"entity": "phone_name", "role": "O"} [có hàng]{"entity": "phone_property", "role": "O"} không
    - slot{"phone_name": "Realme C3"}
    - slot{"phone_property": "có hàng"}
    - slot{"phone_name": "Realme C3"}
    - slot{"phone_property": "có hàng"}
    - slot{"phone_name": "Realme C3"}
    - slot{"phone_property": "có hàng"}
    - action_answer_yes_no
    - utter_question   <!-- predicted: action_listen -->
* affirm: /affirm
    - utter_affirm
* ask_compare: Vậy giữa [realme c3]{"entity": "phone_name", "role": "first"} và [samsung galaxy a20s]{"entity": "phone_name", "role": "second"} thì nên chọn máy nào
    - slot{"phone_name": "samsung galaxy a20s"}
    - slot{"phone_name": "samsung galaxy a20s"}
    - slot{"phone_name": "samsung galaxy a20s"}
    - action_answer_compare
    - slot{"phone_name": "Realme C3"}
    - slot{"phone_property": "có hàng"}
    - slot{"phone_name": "samsung galaxy a20s"}
    - utter_question   <!-- predicted: action_listen -->
* deny: không ạ
    - utter_deny
* thank: cảm ơn bot
    - utter_thank


## what + compare (/var/folders/nm/7mf4hrmx0f30fs1stqhwsr5w0000gn/T/tmp2sygxmaa/10831415b3d04f47bfef3d5a266877c5_conversation_tests.md)
* ask_what: Cho hỏi máy [Realme 5]{"entity": "phone_name", "role": "O"} [sạc]{"entity": "phone_property", "role": "O"} [mấy tiếng]{"entity": "phone_property_value", "role": "O"} mới đầy
    - slot{"phone_name": "Realme 5"}
    - slot{"phone_property": "sạc"}
    - slot{"phone_property_value": "mấy tiếng"}
    - slot{"phone_name": "Realme 5"}
    - slot{"phone_property": "sạc"}
    - slot{"phone_property_value": "mấy tiếng"}
    - action_answer_what
    - slot{"phone_property": null}
    - slot{"phone_property_value": null}
    - slot{"phone_name": "Realme 6 Pro"}
    - slot{"phone_property": "pin"}
    - action_answer_compare   <!-- predicted: action_listen -->
    - slot{"phone_property": null}
* thank: em cảm ơn
    - utter_thank


## inform + what + inform (/var/folders/nm/7mf4hrmx0f30fs1stqhwsr5w0000gn/T/tmp2sygxmaa/10831415b3d04f47bfef3d5a266877c5_conversation_tests.md)
* inform: shop ơi cho em hỏi với
    - ask_form
    - form{"name": "ask_form"}
    - slot{"requested_slot": "phone_name"}
* form: ask_what: [Blackberry keyone]{"entity": "phone_name", "role": "O"}
    - slot{"phone_name": "Blackberry keyone"}
    - slot{"phone_name": "Blackberry keyone"}
    - form: ask_form
    - slot{"phone_name": "Blackberry keyone"}
    - slot{"requested_slot": "phone_property"}
* form: inform: máy này có [gọi hình ảnh]{"entity": "phone_property", "role": "O"} không vậy ad
    - slot{"phone_property": "gọi hình ảnh"}
    - slot{"phone_property": "gọi hình ảnh"}
    - form: ask_form
    - slot{"phone_property": "gọi hình ảnh"}
    - form{"name": null}
    - slot{"requested_slot": null}
    - action_answer_yes_no   <!-- predicted: action_listen -->
    - slot{"phone_property": null}
    - slot{"phone_property_value": null}
    - utter_question
* deny: /deny
    - utter_deny


