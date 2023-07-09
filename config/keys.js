dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+encodeURIComponent('YOUR_PASSWORD_HERE')+'@passport.h399pn1.mongodb.net/?retryWrites=true&w=majority';

module.exports = {
    mongoURI: dbPassword
};

//when you download this code use this code instead of above
//module.exports={ 
//    MongoURI:`mongodb+srv://your_username:your_password@your_cluster_name.mongodb.net/?retryWrites=true&w=majority`
// }



