
const { spec } = require('pactum');

const baseURL = 'https://practice.expandtesting.com/notes/api';

let Token = '';
let noteid = '';
const noteSchema = require('../schemas/note-schema.json')

describe('Log in + Functionalities', () => {
    before( async () => {});


    it('Log In', async () => {
        await spec().post(`${baseURL}/users/login`)
            .withForm({
                'email': 'andrei.panoiu96@example.com',
                'password': 'Parola123!'
            })
            .expectStatus(200)
            .expectBodyContains("Login successful")
            .returns(ctx => {
                Token = ctx.res.body.data.token;
            });
            });
    

    it('Create Note', async () => {
        await spec()
            .post(`${baseURL}/notes`)
            .withForm({
                'title': 'Sedinta munca',
                'description': 'Nu uita de sedinta de la 13:00',
                'category': 'Work'
            })
            .withHeaders('x-auth-token', Token)
            .expectStatus(200)
            .inspect()
            
    })

    it('Get all the notes', async () =>{
        await spec()
            .get(`${baseURL}/notes`)
            .withHeaders('x-auth-token', Token)
            .expectStatus(200)
            .expectJsonSchema(noteSchema)
            .returns(ctx => {
                noteid = ctx.res.body.data[0].id;
            });
                
            });

    it('Delete notes by id', async () =>{
        await spec()
            .withHeaders('x-auth-token', Token)
            .delete(`${baseURL}/notes/${noteid}`)
            .expectStatus(200)
            .expectBodyContains('Note successfully deleted')
    })
})