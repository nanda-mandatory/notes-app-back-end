const { addNoteHandler,
    getAllNoteHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHadler}
    = require('./handler');

const routes= [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler:editNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHadler,
    },
];
module.exports = routes;