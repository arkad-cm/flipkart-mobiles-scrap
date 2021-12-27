# flipkart-mobiles-scrap

### Prerequisites
* **Node.js**
* **MongoDB** (Provide mongodb connection string in the `.env` file)

### Instructions
* Run the following commands 
  * `npm install`
  * `npm run build`
  * `npm start`
* **It updates the database every 5 mins with latest changes (Customizable)**
* Send a **GET** request to `/scrap` to scrap mobiles from Flipkart and store in DB
* Method also supports paging. For eg.
  1. **GET** `/scrap?pages=10` - Will scrap 10 pages of mobile details
  2. **GET** `/scrap?from=2&to=3` - Will scrap 2 pages - 2 and 3
* Send a **GET** request to `/db` to get all stored details from DB
* Method also supports paging. For eg.
  1. **GET** `/db?page=2&size=20` - Will give records of page 2, each page having 20 records
* Send a **GET** request to `/db/clear` to clear the Database
* Send a **GET** request to `/logs/debug?lines=100` to get the last 100 lines of debug logs
* Send a **GET** request to `/logs/error?lines=100` to get the last 100 lines of error logs