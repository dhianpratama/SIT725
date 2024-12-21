const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../app'); // Your Express app
const Todo = require('../models/todo.model'); // Your Mongoose model

chai.use(chaiHttp);
const { expect } = chai;

describe('Todo Routes Tests', function () {
    let findStub, findByIdStub, saveStub, updateOneStub, deleteOneStub;

    beforeEach(function () {
        findStub = sinon.stub(Todo, 'find');
        findByIdStub = sinon.stub(Todo, 'findById');
        saveStub = sinon.stub(Todo.prototype, 'save');
        updateOneStub = sinon.stub(Todo, 'updateOne');
        deleteOneStub = sinon.stub(Todo, 'deleteOne');
    });

    afterEach(function () {
        sinon.restore();
    });

    describe('GET /todos', function () {
        it('should return all todos', async function () {
            findStub.resolves([{ id: 1, title: 'Test Todo' }]);
            const res = await chai.request(app).get('/api/todos');
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([{ id: 1, title: 'Test Todo' }]);
        });
    });

    describe('GET /todos/:id', function () {
        it('should return a todo by ID', async function () {
            findByIdStub.resolves({ id: 1, title: 'Test Todo' });
            const res = await chai.request(app).get('/api/todos/1');
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({ id: 1, title: 'Test Todo' });
        });
    });

    describe('POST /todos', function () {
        it('should create a new todo', async function () {
            saveStub.resolves({ id: 1, title: 'New Todo', description: 'Test Description' });
            const res = await chai.request(app)
                .post('/api/todos')
                .send({ title: 'New Todo', description: 'Test Description' });
            expect(res.status).to.equal(200);
            expect(res.body).to.include({ title: 'New Todo', description: 'Test Description' });
        });
    });

    describe('PUT /todos/:id', function () {
        it('should update a todo by ID', async function () {
            updateOneStub.resolves();
            findByIdStub.resolves({ id: 1, title: 'Updated Todo' });
            const res = await chai.request(app)
                .put('/api/todos/1')
                .send({ title: 'Updated Todo', description: 'Updated Description' });
            expect(res.status).to.equal(200);
            expect(res.body).to.include({ title: 'Updated Todo' });
        });
    });

    describe('DELETE /todos/:id', function () {
        it('should delete a todo by ID', async function () {
            deleteOneStub.resolves();
            const res = await chai.request(app).delete('/api/todos/1');
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({ message: 'id 1 successfully deleted' });
        });
    });
});
