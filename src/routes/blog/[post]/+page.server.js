import { error } from '@sveltejs/kit';
import { pb } from '../../../model/pocketbase';
import { Routes } from '../../../model/api';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const post = await pb.collection('blog').getFirstListItem(`title="${params.post}"`, {
    });

    if (post) {
		return post;
	}

    // return "";
	throw error(404, 'Not found');
}