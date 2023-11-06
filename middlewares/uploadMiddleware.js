// Import the multer package for handling file uploads
import multer from "multer";

// Set up the storage location and naming convention for the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination folder for the uploads
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    // Define the file naming convention
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

// Function to filter out unwanted file types
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Initialize multer with the defined storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Export the upload middleware for use in routes
export default upload;
