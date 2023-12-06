# Inventory App

**About this application:**
Hello, this is my first project trying out Node/Express and MongoDB/Mongoose. I did it as part of the [NodeJS course](https://www.theodinproject.com/lessons/nodejs-inventory-application) in The Odin Project. The project is not perfect as I myself have noticed that there are inefficiencies in how I used Pug templating and MongoDB database calls. As I have already spent quite a bit of time doing this project, I will move to the next one and try my best to improve on these inefficiencies.

I have attached project information and screenshots below. Thank you for reading.

#

**Built with:**

- Pug
- Tailwind
- Node / Express
- MongoDB / Mongoose

View Live @ [Render Free Hosting](https://inventory-4k9m.onrender.com/)

- username: admin
- password: 0101
  _Note: I am only using the free tier which means that the initial load might take quite a minute or two. The images will also be missing (undefined) as the free tier server resets every time it goes to sleep mode._

_If you are interested on how the website looks with uploaded images I have attached screenshots below_

#

**How to run the application:**
Step 1: Install npm dependencies

```
npm install
```

Step 2: Create an .env file on root and add your MongoDB URI

```
// inside .env file
MONGODB_URI="YOUR_MONGODB_URI"
```

Step 3: Run the application

```
npm run start
```

Step 4: Run tailwind watch (Optional)

```
npm run tailwind-watch
```

#

**Mongoose Schema:**
<img src="https://i.imgur.com/Z59SkW9.jpeg">

#

**Screenshots:**
Homepage
<img src="https://i.imgur.com/IZX1YBB.png">
Categories
<img src="https://i.imgur.com/DFO88Mu.png">
Items
<img src="https://i.imgur.com/POTkv0Z.png">
Item Details
<img src="https://i.imgur.com/f91fbRf.png">
