// Using ES modules (default)
import PocketBase from 'pocketbase'
import { Contact, ContactColection, Hero, HeroCollection } from './model';
import { Routes } from './api';

export const pb = new PocketBase(Routes);

export const CreateAccountEmailPassword = async (email: string, password: string) => {

try {
    await pb.admins.create({
        email: email,
        password: password,
        passwordConfirm: password,
        avatar: 8,
    });
    
    console.log("New Admin Created");
    } catch(e) {
    // the request requires valid admin authorization to be set
    console.log('FAILED TO INSERT ALL', e)
    }
}

export const CreateAccount = async () => {

try {
    await pb.admins.create({
        email: 'admin@gmail.com',
        password: '1234567890',
        passwordConfirm: '1234567890',
        avatar: 8,
    });
    
    console.log("New Admin Created");
    
    pb.authStore.clear();
    } catch(e) {
    // the request requires valid admin authorization to be set
    console.log('FAILED TO INSERT ALL', e)
    }
}

export const Signin = async (email: string, password: string) => {

    await CreateAccountEmailPassword(email, password);

    try {


        const authData = await pb.admins.authWithPassword(
            email,
            password
            );


            return authData
        } catch(e) {


            console.log(e)
        }

}