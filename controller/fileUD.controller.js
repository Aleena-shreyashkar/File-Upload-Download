const mongoose = require('mongoose');
const fileSchema = require('../model/model.js')
mongoose.model("File", fileSchema)
const File = mongoose.model("File");
const cloudinary = require('cloudinary').v2;
const Downloader = require('nodejs-file-downloader')


const fileUpload = async (req, res, next) => {
    try{
        const file = req.files.photo;
        cloudinary.uploader.upload(file.tempFilePath, { resource_type: "auto", chunk_size: 6000000 }, (err, result) => {
            if(err){
                console.log(err)
                return res.status(500).json({error:true, message:"Something went wrong"})
            }
            
            console.log(result);
            const dbfile = new File({
                fileURL: result.url,
                uploaded_at: Date.now(),
             })
            
            //  saving the cloudinary file url in DB
             dbfile.save()
             .then(user => {
                res.json({success:true, message:"File uploaded successfully", data: user})
             })
             .catch(err => {
                console.log(err)
                return res.status(500).json({error:true, message:"Something went wrong. Can't save to database"})
             })   
        })
    
    }catch(err) {
        return next(err);
    }
}

const fileDownload = async (req, res, next) => {
    try{
            const id = req.body._id;

            const file = await File.findById(id)
            if(!file){
                return res.status(404).json({message:"ID not found"})
            }

            const downloader = new Downloader({
                url: file.fileURL,
                directory: "./downloads/downloaded",
                onProgress: function (percentage,chunk) {
                    // logging percentage and chunk of data in console
                  console.log("% ", percentage);
                  console.log("Current chunk of data: ", chunk);
                  if(percentage==100) {
                      return res.status(200).json({success: true, message:"File Dowloaded successfully"});
                  }
                },
            });
                
            await downloader.download();     

    }catch(err) {
        return next(err);
    }
}

const getAllUploads = async (req, res, next) => {
    try {
        // pagination
        const page = req.query.page ? parseInst(req.query.page) : 1
        const limit = req.query.limit ? parseInt(req.query.limit) : 20
        const query = {}
        if (page < 0 || page === 0) {
            response = { "error": true, "message": "invalid page number, should start with 1" };
            return res.json(response)
        }
        query.page = limit * (page - 1)
        query.limit = limit
        File.find({}, {}, query, function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "success": true, "message": data };
            }
            res.json(response);
        });

    } catch (err) {
        return next(err);
    }
}

module.exports = { fileUpload, fileDownload, getAllUploads };
