import { error } from '@sveltejs/kit';
import { CreateAccount, pb } from '../model/pocketbase';
import { ContactColection, HeroCollection } from '../model/model';



/** @type {import('./$types').PageLoad} */
export async function load() {
    CreateAccount()

    const hero = await pb.collection(HeroCollection).getFullList();
    const contact = await pb.collection(ContactColection).getFullList();

    if (hero) {
        return {
            hero: hero,
            contact: contact
        }
    }

	// const post = await pb.collection('blog').getFirstListItem(`title=""`, {
    // });

    return;
    // if (post) {
	// 	return post;
	// }

    // return "";
	throw error(404, 'Not found');
}