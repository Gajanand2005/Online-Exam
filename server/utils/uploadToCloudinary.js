import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (buffer, subFolder = "general") => {
  const projectFolder = process.env.CLOUDINARY_PROJECT_FOLDER;

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `${projectFolder}/${subFolder}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });
};

export default uploadToCloudinary;
