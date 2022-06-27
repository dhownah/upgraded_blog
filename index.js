/*const express = require('express')
const app = express()
const port = 4000
app.listen(port,()=>{
	console.log(`App listening on port ${port}`)
})*/

const express=require('express')
const path = require('path')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const app = express()

const port = 4000
//const BlogPost = require('./models/BlogPost.js')

const mongoose = require('mongoose')
/*
 ADD DATABASE HERE
*/

//TODO validation not working
// Validation Middleware
const validateMiddleWare=(req,res,next)=>{
	if(!(req.files && req.files.image) || req.body.title==null){
		return res.redirect('/posts/new')
	}
	next()
}


const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'public/views'))
// USE function registers a middle ware with Express App
app.use(express.static(path.resolve(__dirname,'public')))
//app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//Modifies the request object and adds the request.files property
app.use(fileUpload())
app.use('posts/store',validateMiddleWare)


app.listen(port,()=>{
	console.log(`App listening on port ${port}`)
})



/*app.get('/',(req,res)=>{
	//res.sendfile(path.resolve(__dirname,'public/views/index.html'))
	res.render('index')
})*/
/*app.get('/',async (req,res) =>{
    const blogposts = await BlogPost.find({})
    console.log(blogposts)
    res.render('index',{
        blogposts
    })
})*/
app.get('/', homeController)

// Standard static HTML Pages to refactor MVC
/*app.get('/about',(req,res)=>{
	//res.sendfile(path.resolve(__dirname,'public/views/about.html'))
	res.render('about')
})


app.get('/post',(req,res)=>{
	//res.sendfile(path.resolve(__dirname,'public/views/post.html'))
	res.redirect('/')
})
app.get('/contact',(req,res)=>{
	//res.sendfile(path.resolve(__dirname,'public/views/contact.html'))
	res.render('contact')
})
*/

/*app.get('/post/:id',async(req,res)=>{
	const blogpost = await BlogPost.findById(req.params.id)
	res.render('post',{
		blogpost
	})
})*/
app.get('/post/:id',getPostController)


//replace to Controllers
/*app.get('/posts/new',(req,res)=>{
	res.render('create')
})*/
 

 app.get('/posts/new', newPostController)



//***********READ
//retrieve data entered into a form. With bodyParser
/*app.post('/posts/store',(req,res)=>{
	console.log(req.body)
	res.redirect('/')
})*/

//Saving Posts to the Database
/*app.post('/posts/store',(req,res)=>{
	// model creates a new doc with browser data
	BlogPost.create(req.body,(error,blogpost)=>{
		res.redirect('/')
	})
})*/

// use a feature in ES8 called <async> and <await> for asynchronous method calling 
// CREATE: img folder for images
/*app.post('/posts/store',async (req,res) =>{    
    let image = req.files.image
    image.mv(path.resolve(__dirname,'public/img',image.name),
        async (error)=>{
            await BlogPost.create({
                ...req.body,
                image:'/img/' + image.name
            })
            res.redirect('/')
        })

})*/
app.post('/post/store', storePostController)
//Displaying a List of Blog Posts
/*app.get('/', async (req,res)=>{
	//retrieved all the blog posts and assigning them to the variable <blogposts>
	const blogposts = await BlogPost.find({})
	res.render('index',{
		blogPosts:blogposts
	})
})*/

//index.ejs view now has access to the blogposts variable (SHORTEN OF UPPER SCRIPT)
/*app.get('/',async(req,res)=>{
	const blogposts = await BlogPost.find({})
	console.log(blogposts)
	res.render('index',{
		blogposts
	})
})*/




