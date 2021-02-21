# Jewler-E

Notes for Dexter:

I'm using vscode extension prettier for code formatting, I can send you my config
if you want to go down that route. Formats on save, really consistent rules looks nice

- to install, git pull -> cd server -> yarn install -> cd ../client -> yarn install
- to start client, yarn dev in client folder (updates on save), currently on localhost:3000
- to start server, yarn watch, then in another terminal tab: yarn dev. Compiles changes to
  server/dist, then updates on save
- need to have MySQL installed. This is probably where we should use docker
  // TODO docker

Within the client, src/components/\_app.tsx is a basic container, no need to touch that, comes prebuilt
client/src/pages contains all the pages of the application. Example, if a page is named store.tsx,
the page can be found at localhost:3000/store. For things that will have an ID like a specific item,
there will be a subfolder in src/pages. Example: item no. 420, located at localhost:3000/item/420 , file located at
src/pages/item/[id].tsx. The info located in brackets can be accessed in react as a parameter. The item folder
would have its own index.tsx which would be the homepage for localhost:3000/item

TODO:

- add docker
- integrate database
- set up user sessions (redis?)
- decide on graphql or rest
- work out deployment framework
- make frontend folder work with git
- orm?

Data to track:

- User

  - username
  - password
  - email
  - purchase/sale history
  - listed items
  - paypal info?
  - seller rating
  - account level
  - leaderboard stats
  - privacy data
  - reviews given/received
  - chats with buyers/sellers
  - later:
    - social profile
    - followers
    - following
    - posts
  - optional fields:
    - real name
    - phone number

- Item

  - name
  - images
  - decription
  - sale type (buy now, obo, auction, etc)
  - bids if auction
  - offers if obo
  - price
  - related items
  - ref number
  - verifiablility (maybe serial number, not sure yet)
  - if common item, sale price history
  - condition
  - sizing if applicable
  - release date if applicable
  - company
  - category
  - gender if applicable

- Categories

  - enum data type
  - list of listings
  - category descriptions
  - subcategories
    - brands
    - gender (not sure how to relate this to other categories, above or below)

- Leaderboard

  - collection of sale/purchase data for all users

- Chats
  - messages between buyers/sellers
