import { Server, Faker, uid } from 'react-mock';
import Registration from './Routes/Registration/Registration';
const apiRoute = '/create';


const requestandler = (request, generator) => {
    const guides = {...Registration.registrationRequest}

    return [200, { 'Content-Type': 'application/json'}, JSON.stringify(guides)];
}


const errorFormat = {
    maessage: Faker.lorem.sentence()
};

Server.mockPost(apiRoute, requestandler, 3001);
Server.on();