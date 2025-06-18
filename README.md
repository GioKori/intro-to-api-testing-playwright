| Test Case                        | HTTP Method | Expected Status Code |
| -------------------------------- | ----------- | -------------------- |
| Get order with correct ID        | GET         | 200                  |
| Get order with incorrect ID      | GET         | 400                  |
| Delete order with correct ID     | DELETE      | 204                  |
| Delete order with incorrect ID   | DELETE      | 400                  |
| Post order with correct data     | POST        | 200                  |
| Post order with incorrect data   | POST        | 400                  |
| Put order with correct API key   | PUT         | 200                  |
| Put order with incorrect API key | PUT         | 401                  |

### homework 10

| Test Case                                                       | HTTP Method | Status Code |
|-----------------------------------------------------------------| ----------- | ----------- |
| POST method - 1st case checks positive scenario for low risk    | POST        | 200         |
| POST method - 2nd case checks positive scenario for medium risk | POST        | 200         |
| POST method - 3rd case checks positive scenario for high risk   | POST        | 200         |
