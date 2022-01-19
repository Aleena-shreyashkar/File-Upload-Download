const cloudinary = require('cloudinary');
// cloudinary configuration
cloudinary.config({
    cloud_name: 'self-pro',
    api_key: '648699547468877',
    api_secret: '_vu6V74bBI8kDSIXpO66zW9dUro',
    secure: true
})
module.exports={
    MONGOURI:"mongodb+srv://minimal:12345@cluster0.utbha.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}