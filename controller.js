const User = require('./user.model')
const Exercise= require('./exercise.model')


module.exports={
    addUser: async(req,res)=>{
      
       const {username}=req.body
       const newUser = new User({username})
       newUser.save((err,id)=>{
           
           res.json({username,_id:id._id})
       })
       
    },
    getUsers: async(req,res)=>{
        await User.find()
        .then(users=> res.json(users))
        .catch(err => res.status(400).json('Error: '+ err));
        
    },
    addExercise: async(req,res)=>{
        const {userId,description,duration,date}=req.body
        await User.findById(userId)
        .then((e)=>{
            
            const newExercise= new Exercise({username:e.username,description,duration,date:date||new Date()})
            newExercise.save((err,id)=>{
                console.log(err,id)
                res.json({username:e.username,duration,description,date:date||new Date()})
            })
        })        
    },
    getLog: async(req,res)=>{        
        const {userId,from,to,limit}=req.query
        let count=0        
        await User.findById(userId)
        .then(async e=> {
            let exercises= await Exercise.find({username:e.username})
            let logs=exercises.map(e=>({description:e.description,duration:e.duration,date:e.date.toUTCString()}))
            console.log('ex',logs)
            let result={
                _id:e._id,
                username:e.username,
                count:logs.length,
                logs:logs
            }
            res.json(result)
        })
        
        
        
    }

}