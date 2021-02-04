# Jewler-E

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
