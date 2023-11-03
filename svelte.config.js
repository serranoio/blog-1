import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';


function isWebComponentSvelte(code) {
    const svelteOptionsIdx = code.indexOf('<svelte:options ')
    if(svelteOptionsIdx < 0) {
        return false
    }
    const tagOptionIdx = code.indexOf('tag=', svelteOptionsIdx)
    const svelteOptionsEndIdx = code.indexOf('>',svelteOptionsIdx);
    return tagOptionIdx > svelteOptionsIdx && tagOptionIdx < svelteOptionsEndIdx
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
	vitePlugin: {
        experimental: {
            dynamicCompileOptions({code}) {
                if(isWebComponentSvelte(code)) {
                    return {
                        customElement: true
                    }
                }
            }
        }
    }
};

export default config;
