import express from "express";
import bodyParser from "body-parser";
import pg from "pg" ;


const db = new pg.Client({
    user : "postgres" ,
    host : "localhost" ,
    database : "book_note" ,
    password : "onana44" ,
    port : 5432 ,
  });

  db.connect() ;

const app = express();
const port = 3000;
let id_book = 0;
 
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")) ;
 
app.get("/", async (req, res) => {
    try{
        const requete = await db.query("SELECT * FROM book") ;
        console.log(requete.rows) ;
        res.render("index.ejs", {book : requete.rows}) ;
    }catch(err){
        console.log("voici l'erreur jojo  "+err) ;
    }

  });

  app.post("/add", (req, res) => {
    res.render("form.ejs") ;
  });  
  
  app.post("/add-book", async (req, res) => {
   const book_title = req.body["Titre"];
    const book_author = req.body["auteur"] ;
    const book_year = req.body["Annee"];

    try{
       const res =  db.query("INSERT INTO book (title,author,year) VALUES ($1,$2,$3)",
       [book_title , book_author , book_year]
       )  ;
    }catch(err){
       console.log("voici l'erreur jojo  "+err) ;
    }
    res.redirect("/");
  });  

  app.post("/update",async(req,res) =>{
     id_book = req.body.btnValue ;
    const requete = await db.query("SELECT * FROM book WHERE id = $1" ,[id_book]) ;
   
    const info_book = [] ;
    info_book.push(requete.rows[0].title);
    info_book.push(requete.rows[0].message);
    res.render("livre.ejs",{info : info_book});
    
  })

  app.post("/update1",async(req,res) =>{
    const story = req.body.book_story ;
    // console.log("jojo ta story ici :  "+story);
    //  console.log("contenue" +story.lengh) ;
 

      const requete = await db.query("UPDATE book SET message = $1 WHERE id = $2 RETURNING * ; " ,
      [story,id_book]) ;
      console.log( "requete : "+requete.rows);
      const info_book = [] ;
      info_book.push(requete.rows[0].title);
      info_book.push(requete.rows[0].message);
      res.render("livre.ejs",{info : info_book});
  
  })
  
  app.post("/delete_book",async(req,res) =>{
     db.query("DELETE FROM book WHERE id = $1",[req.body.btnDelete]);
     res.redirect("/#carte");
   })
   
   app.post("/get_book",async(req,res) =>{
    const search = req.body["search-book"] ;
    console.log(search.toLowerCase()) ;
    const requete = await db.query(
      "SELECT * FROM book WHERE LOWER(title) LIKE   $1 || '%' ;",
      [search.toLowerCase()]
    );
     res.render("index.ejs", {book : requete.rows}) ;
   }) ;

  app.post("/acceuil",async(req,res) =>{
   res.redirect("/") ;
  })
  
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });
  