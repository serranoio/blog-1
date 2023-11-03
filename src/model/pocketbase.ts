// Using ES modules (default)
import PocketBase from 'pocketbase'
import { Hero, HeroCollection } from './model';
import { Route } from './api';

export const pb = new PocketBase(Route);

export const CreateAccount = async () => {

try {
    await pb.admins.create({
        email: 'admin@gmail.com',
        password: '1234567890',
        passwordConfirm: '1234567890',
        avatar: 8,
    });
    
    console.log("New Admin Created");

    // insert everything into the db now, then clear
    pb.collection(HeroCollection).create(Hero)
    console.log("Inserted All Initial")
    pb.authStore.clear();
    } catch(e) {
    // the request requires valid admin authorization to be set
    // console.log(e)
}



}


export const Signin = async (email: string, password: string) => {

    try {
        const authData = await pb.admins.authWithPassword(
            email,
            password
            );


            return authData
        } catch(e) {


        } finally {

        }

}