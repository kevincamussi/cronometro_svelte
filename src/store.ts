import { writable } from 'svelte/store';

export const timerStore = writable<number>(15);
export const challengeStarted = writable<boolean>(false);
export const challengeFinished = writable<boolean>(false);
export const showModal = writable<boolean>(false);

export const formData = writable<Form>({
	name: '',
	phone: '',
	email: ''
});
