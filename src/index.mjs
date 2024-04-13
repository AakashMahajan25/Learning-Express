import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
const mockUsers = [
    {"id": 1, "name": 'Aakash'},
    {"id": 2, "name": 'Aman'}
];

app.get('/', (request, response) => {
    response.status(201).send({message: "Hello"});
})

app.get('/api/users', (request, response) => {
    console.log(request.query);
    const { query: { filter, value } = {} } = request;
    if (filter && value) {
        const filteredUsers = mockUsers.filter((user) => {
            return user[filter] && user[filter].includes(value);
        });
        return response.send(filteredUsers);
    } else {
        return response.status(400).send('Missing filter or value in query');
    }
});


app.get('/api/users/:id', (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    if (isNaN(parsedId)) return response.status(400).send({msg: "Bad Request: Invalid ID"}); 
    else {
        console.log(parsedId)
    };
    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});