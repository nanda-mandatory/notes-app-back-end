
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Success create new noted!',
            data: {
            noteId: id,
        },
    });
    response.code(201);
    return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'failed added note!',
    });
    response.code(500);
    return response;
};

const getAllNoteHandler = ()=>({
    status: 'success get all notes!!',
    data:{
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success get note by id!!',
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Cant find note !!',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request,h)=>{
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note)=> note.id === id);

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Update Note Success !',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Update falied, Please croscheck!!'
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHadler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if(index !== 1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Success delete note!',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Failed delete note, becais this ID blank!!',
    });
    response.code(404);
    return response;
}

module.exports = {
    addNoteHandler,
    getAllNoteHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHadler}