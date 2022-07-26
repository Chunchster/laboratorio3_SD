const mongoose = require('mongoose');

require('dotenv').config();
const urlMONGODB = process.env.urlMONGODB
    ? process.env.urlMONGODB
    :'mongodb://localhost/mongo_practice';

//Conectamos a la Base de Datos
mongoose.connect(urlMONGODB)
.then(() => console.log('CONECTADO'))
.catch((e) => console.log(`Error de conexión: ${e}`))

//Declaramos las constantes. .
const Schema = mongoose.Schema;
const Model = mongoose.model;
const ObjectId = mongoose.Types.ObjectId;

//Creamos los esquemas. .
// const moviesSchema = new Schema(
//     {
//         title: {type: String,require: true},
//         writer: {type: String},
//         year: {type: Number},
//         actors: {type: Array},
//         franchise: {type: String},
//         synopsis: {type: String}
//     }
// );

const movieSchema = new Schema(
    {
        title: {type: String},
        year: {type: Number},
        imdbId: {type: String},
        genre: {type: String},
        viewerRating: {type: Number},
        viewerVotes: {type: Number},
        director: {type: String}
    }
)

const userSchema = new Schema(
    {
        username: {type: String},
        first_name: {type: String},
        last_name: {type: String},
        full_name:{
            first: {type: String},
            last: {type: String}
        }  
    }
);

const postSchema = new Schema(
    {
        username:{type: String},
        title: {type: String},
        body: {type: String}
    }
);

const commentSchema = new Schema(
    {
        username: {type: String},
        comment: {type: String},
        post: {type: ObjectId}
    }
);

//Creamos los modelos. .
const MovieModel = new Model('movie', movieSchema);
const UserModel = new Model('user', userSchema);
const PostModel = new Model('post', postSchema);
const CommentModel = new Model('comment', commentSchema);

//Create - Crear
const create_CRUD = async () => {
    const pelicula = new MovieModel(
        {
            title: {type: String,require: true},
            writer: {type: String},
            year: {type: Number},
            actors: {type: Array},
            franchise: {type: String},
            synopsis: {type: String}
        }
    )
    const resultado = await pelicula.save()
    console.log(resultado)
};

//create_CRUD();

//Read - Mostrar
const read_CRUD = async () => {
    const pelicula = await MovieModel.find().limit(1)
    console.log(pelicula)
};

//read_CRUD();

//Update - Actualizar
const update_CRUD = async (id) => {
    const pelicula = await MovieModel.updateOne({_id: id},
    {
        $set: {
            title: {type: String,require: true},
            writer: {type: String}
        }
    });
    console.log('Actualizado');
};

//update_CRUD('fdhbfsjfjafaf');//id

//Delete - Eliminar
const delete_CRUD = async (id) => {
    const pelicula = await MovieModel.deleteOne({_id: id});
    console.log(`Documento eliminado\n${pelicula}`);
}

//delete_CRUD('fdhbfsjfjafaf');//id
