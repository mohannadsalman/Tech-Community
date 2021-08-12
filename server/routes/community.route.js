const CommunityController = require('../controllers/commnity.controller');

module.exports = app => {
    //user routes
    app.post('/api/user',CommunityController.createUser);
    app.get('/api/user',CommunityController.findOneUser);
    app.put('/api/updateUser/:id', CommunityController.updateUser);
    //tochnology routes
    app.post('/api/tochnology', CommunityController.createTochnlogy);
    app.get('/api/tochnology/:id', CommunityController.findOneTochnology);
    app.get('/api/followedTechnology',CommunityController.findAllFollwedTech);
    app.get('/api/notFollowedTechnology',CommunityController.findAllNotFollwedTech);
    //post routes
    app.post('/api/post',CommunityController.createPost);
    app.get('/api/posts',CommunityController.findAllPosts);
    app.delete('/api/post/:id1/:id2',CommunityController.deletePost)
    //comment routes
    app.post('/api/comment', CommunityController.createComment);
    app.get('/api/comments',CommunityController.findAllComments);
    app.delete('/api/comment/:id1/:id2', CommunityController.deleteComment);
}