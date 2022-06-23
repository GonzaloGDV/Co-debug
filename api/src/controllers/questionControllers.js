const {User,Question} = require("../db.js")

//en caso de comprobar hardcodeando descomentar lineas, 55-56-51-61-62
//y la constante user_try
//y comentar lineas 25-31
//esto devuelve la question creada y el usuario al que fue agregada

// const user_try={
//     sub:"id 1",
//     name:"usuario de prueba",
//     nickname:"usuario",
//     email:"usuario.com",
//     locale:"argnetina",
// }

const deleteUserQuestion=async (req,res,next)=>{
    const {id} = req.params

    try {
        await Question.destroy({
            where:{
                id
            }
        })
        // res.send(await User.findOne({include:Question}))
        res.send("borrado correctamente")        
    } catch (error) {
        next(error)
    }
}

const putUserQuestion=async (req,res,next)=>{
    const {id,text,title} = req.body

    try {
        await Question.update({text,title},{
            where:{
                id:parseInt(id)
            }
        })
        let questionUpdated=await Question.findByPk(id)

        res.send({
            text,
            title
        })
    } catch (error) {
        next(error)
    }
}

//les dijimos que manden el id del usuario, pero no es necesario


const postQuestion = async (req,res,next)=>{
   const {sub,text,title} = req.body

//    let user
    
    try {
        // user = await User.findByPk(user_try.sub)
        // if(!user)user = await  User.create(user_try)
        const user = await User.findByPk(sub)
        const newQuestion = await Question.create({text,title})
        newQuestion.setUser(user)
        // const user_whit_question=await User.findAll({include:Question})
        // res.send([newQuestion,user_whit_question])
        res.send(newQuestion)

   } catch (error) {
        next(error)
   }
}

const getSingleQuestion=async (req,res,next)=>{
    const id = req.params.id

    try {
        let questionFound = await Question.findByPk(id)
        let user=await questionFound.getUser()
        let answers=await questionFound.getAnswers()

        res.send(
            {
                user:{
                    name:user.name,
                },
                ...questionFound.dataValues,
                answers
            }
        )

    } catch (error) {
        next(error)
    }
}

module.exports={
    deleteUserQuestion,
    putUserQuestion,
    postQuestion,
    getSingleQuestion
}