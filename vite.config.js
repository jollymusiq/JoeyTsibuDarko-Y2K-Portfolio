import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                about: 'about.html',
                projects: 'projects.html',
                skills: 'skills.html',
                values: 'values.html',
                contact: 'contact.html',
            },
        },
    },
});
