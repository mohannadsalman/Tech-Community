const {User} = require('../models/user.model');
const {Tochnology} = require('../models/technology.model');
const {Comment} = require('../models/comment.model');
const {Post} = require('../models/post.model');

//create our database
module.exports.createUser = (request,response) => {
    const {userName,email,password,userRole} = request.body;
    User.create({
        userName,
        email,
        password,
        userRole })
    .then(res => response.json(res))
    .catch(err => response.json(err))
}

module.exports.createTochnlogy = (request,response) => {
    const {name} = request.body;
    Tochnology.create({name})
    .then(res => response.json(res))
    .then(err => response.json(err))
}

module.exports.createPost = (request,response) => {
    const {content,projectLink,user,tochnology} = request.body;
    console.log(user)
    console.log(tochnology)
    Post.create({content,projectLink,user,tochnology})
    .then(res => User.findOneAndUpdate({_id:user}, {$push:{post:res._id,activity:{tochnologyId:tochnology,numAction: 1}}},{new:true})
        )
    .then(res => {
        console.log(res)
        //update the tochnology
        return Tochnology.findOneAndUpdate({_id:tochnology},{$push:{activity:{userId:user,numAction: 1}}},{new:true})
        })
    .then(res => response.json(res))
    .catch(err => response.json(err))
}

module.exports.createComment = (request,response) => {
    const {content,user} = request.body;
    console.log(content)
    console.log(user)
    Comment.create({content,user})
    .then(res => {
        //update user
        console.log(res)
        return User.findOneAndUpdate({_id:user}, {$push:{comment:res._id}},{new:true})
        })
    .then(res => response.json(res))
    .catch(err => response.json(err))
    
}
//***************************************************************************************************** 
//update our database
//When a user follow a tochnology
module.exports.updateUser = (request,response) => {
    const {technologyId} = request.body;
    User.findOneAndUpdate({_id: request.params.id},{$push:{followedTechnology:technologyId,activity:{technologyId:technologyId,numAction:1}}})
    .then(selectedTochnology => {
        return Tochnology.findOneAndUpdate({_id:technologyId}, {$push:{followers:request.params.id, activity:{userId:request.params.id,numAction:+1}}},{new:true})
    })
    .then(res => response.json(res))
    .catch(err => response.json(err))
}
//***************************************************************************************************** 
//Find all 
//find all tochnolgy that the user follow
module.exports.findAllFollwedTech = (request,response) => {
    const {follower} = request.body;
    Tochnology.find({followers:{$in:[follower]}})
    .then(res => response.json(res))
    .catch(err => response.json(err))
}
//find all tochnology not followed by the user
module.exports.findAllNotFollwedTech = (request,response) => {
    const {Notfollow} = request.body;
    Tochnology.find({followers:{$nin:[Notfollow]}})
    .then(res => response.json(res))
    .catch(err => response.json(err))
}

//find all posts
module.exports.findAllPosts = (request,response) => {
    const {user} = request.body;
    Post.find({user:user})
    .then(res => response.json(res))
    .catch(err => response.json(err))
}

// find all comments
module.exports.findAllComments = (request,response) => {
    const {user} = request.body;
    Comment.find({user:user})
    .then(res => response.json(res))
    .catch(err => response.json(err))
}
//***************************************************************************************************** 

//Find one Document

module.exports.findOneUser = (request,response) => {
    User.findOne({_id:request.params.id})
    .then(res => response.json(res))
    .catch(err => response.json(err))
}

module.exports.findOneTochnology = (request,response) => {
    Tochnology.findOne({_id:request.params.id})
    .then(res => response.json(res))
    .catch(err => response.json(err))
}

//***************************************************************************************************** 
// Delete Documents

module.exports.deleteComment = (request,response) => {
    const deleteComment = Comment.findOne({_id:request.params.id})
    .then(res =>{
        User.updateOne({_id:deleteComment.user_id},{comment:{$pop:{userId:deleteComment.user_id}}},{new:true})
    })
    .then (res => {
        Comment.deleteOne({_id:request.params.id})
    })
    .then(res => response.json(res))
    .catch(err => response.status(400).json(err))
}

module.exports.deletePost = (request,response) => {
    // Post.findOne({_id:request.params.id})
    User.findOneAndUpdate({_id:post.user._id},{$pull:{post:post._id1}},{new:true})
    // .then(post => {
    //     console.log(post)
    //     return User.findOneAndUpdate({_id:post.user._id},{$pop:{post:post._id}},{new:true})
    // })
    // .then(res => {
    //     console.log(res)
    //     return Post.deleteOne({_id:request.params.id})
    // })
    // .then(res => response.json(res))
    // .catch(err => response.status(400).json(err))
    // const {user} = request.body;
    //console.log(request.params)
    // User.findById(request.params.id2)
    // .then((user) => {
    //     console.log(user.post)
    //     for(var i = 0; i < user.post.length; i++) {
    //         if(user.post[i] == request.params.id1)
    //             break;
    //     }
    //     user.post.splice(i, 1);
    //     return response.json({t: user.post})
    // })
    // // .then( () => Post.deleteOne({_id:request.params.id1}))
    // // .then(res => response.json(res))
    // .catch(err => response.status(400).json(err))
    
}




