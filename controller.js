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
            
            const newExercise= new Exercise({userId:e._id,description,duration,date:date||new Date()})
            newExercise.save((err,id)=>{
                console.log(err,id)
                res.send({_id:e._id,username:e.username,duration:parseInt(id.duration),description,date:id.date.toDateString()})
            })
        })        
    },
    getLog: async(req,res)=>{   
      console.log(req.query)     
        const {userId,from,to,limit}=req.query
        let count=0        
        await User.findById(userId)
        .then(async e=> {
            console.log(e)
            let exercises= await Exercise.find({userId})
            console.log(exercises)
            if(limit){
              exercises=exercises.splice(0,limit)
            }
            let log=exercises.map(el=>({description:el.description,duration:el.duration,date:el.date.toDateString()}))
            console.log('ex',log)
            let result={
                _id:e._id,
                username:e.username,
                count:log.length,
                log,
            }
            res.json(result)
        })
        
        
        
    }

}