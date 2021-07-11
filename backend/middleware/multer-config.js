const multer = require ('multer');
let regex = new RegExp("^[A-Za-z-éèêëçàâùï€$£_'.;:,@?!()\n 0-9]+$");

const MIM_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

//middleware pour enregistrer les images
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIM_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');