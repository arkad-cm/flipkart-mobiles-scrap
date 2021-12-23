# flipkart-mobiles-scrap

### Prerequisites
* **Node.js**
* **MongoDB** (Provide mongodb connection string in the `.env` file)

### Instructions
* Run the following commands 
  * `npm install`
  * `npm run build`
  * `npm start`
* Send a **GET** request to `/scrap`
* Method also supports paging. For eg.
  1. **GET** `/scrap?pages=10` - Will scrap 10 pages of mobile details
  2. **GET** `/scrap?from=2&to=3` - Will scrap 2 pages - 2 and 3
* Send a **GET** request to `/scrap/clear` to clear the Database