Api Link: http://localhost:2111/

https://apistarbucks.herokuapp.com/

>>  Page 1: Find a Store

>> Data to find a store:
>>> http://localhost:2111/store

>>https://apistarbucks.herokuapp.com/store

>>>  Find a store w.r.t cityId (for using in map): http://localhost:2111/store?city_id=4

>>  https://apistarbucks.herokuapp.com/store?city_id=4

>> Find a store w.r.t cityname (for using in search bar): http://localhost:2111/stores?city_name=delhi

>>>  https://apistarbucks.herokuapp.com/store?city_name=Delhi

Find a store w.r.t store name (for using in search bar): http://localhost:2111/store?name=Punjabi%20Bagh

https://apistarbucks.herokuapp.com/store?name=Punjabi%20Bagh

>>> Page 2: Menu (Fetches data for coffee as well as food)

>> Sub-category data: https://apistarbucks.herokuapp.com/category

>>> https://apistarbucks.herokuapp.com/category?type=Drinks

>> https://apistarbucks.herokuapp.com/category?id=1

>>> https://apistarbucks.herokuapp.com/category?type=Food&id=10

Page 3: Careers

Jobs w.r.t CityId and Keyword/Profile: https://apistarbucks.herokuapp.com/jobs?city_id=2&profile=Barista

Jobs w.r.t Cityname and Keyword: https://apistarbucks.herokuapp.com/jobs?city_name=Pune&profile=Barista

Jobs w.r.t CityId: https://apistarbucks.herokuapp.com/jobs?city_id=4

Jobs w.r.t CityName: https://apistarbucks.herokuapp.com/jobs??city_name=Delhi

Jobs w.r.t Keyword/Profile: https://apistarbucks.herokuapp.com/jobs?profile=Apprentice

Api for name animation (Post Call): https://apistarbucks.herokuapp.com/name

Fetching name for animation: https://apistarbucks.herokuapp.com/fetchname/620a32d2f173b2436e1192d0

Page 4: Starbucks Delivers/Filters

For filter https://apistarbucks.herokuapp.com/filter

To place order (Post Call): https://apistarbucks.herokuapp.com/placeOrder

Menu item based on user's selection (Post Call): https://apistarbucks.herokuapp.com/menuItem

Update Order (Put Call):https://apistarbucks.herokuapp.com/updateOrder/620a171210f46a95ecc712d2?status=SUCCESS

Delete Order: https://apistarbucks.herokuapp.com/deleteOrder

Page 5: Rewards

List of gift cards: https://apistarbucks.herokuapp.com/giftcards/1

Gift card based on user's selection (Post Call): https://apistarbucks.herokuapp.com/giftcards

Placing Order for gift cards (Post Call): https://apistarbucks.herokuapp.com/giftcardOrder

Updating Order for gift cards (Put Call):https://apistarbucks.herokuapp.com/updategiftOrder/620a6fa338e79a9e1a6b0d11?status=SUCCESS

