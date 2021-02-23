const User = require('./user.model')
const Exercise= require('./exercise.model')


module.exports={
    addUser: async(req,res)=>{
       console.log(req.body)
       const {username}=req.body
       const newUser = new User({username})
       newUser.save((err,id)=>{
           console.log(id)
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
        await User.findOne({_id:userId})
        .then((e)=>{
            console.log(e)
            const newExercise= new Exercise({_id:userId,description,duration,date})
            newExercise.save((err,id)=>{
                console.log(err,id)
                res.json({_id:userId,username:e.username,duration,description,date})
            })
        })        
    },
    getLog: async(req,res)=>{
        console.log(req.params)
        console.log(req.query)
        await Exercise.findOne({_id:userId})
    }

}