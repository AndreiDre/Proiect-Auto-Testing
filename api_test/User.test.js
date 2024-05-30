const { spec, request } = require('pactum');

const baseURL = 'https://practice.expandtesting.com/notes/api'

describe( 'Register user test', () => {
    before(async() => {
       
    });

  it('register new user success', async () => {
    
   await spec().post(`${baseURL}/users/register`)
      .withBody({
        'name': "AndreiP",
        'email': "andrei.panoiu96@example.com",
        'password': "Parola123!"
    })
    .inspect()
    .expectStatus(201);
});

it('register new user fail', async () => {
    
    await spec().post(`${baseURL}/users/register`)
       .withJson({
         'name': " ",
         'email': "andrei.panoiu96@exmple.com",
         'password': "Parola123!"
     })
     .inspect()
     .expectStatus(400).expectJsonLike({
        message: 'User name must be between 4 and 30 characters',
      });
 });
});

