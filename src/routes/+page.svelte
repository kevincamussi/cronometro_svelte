<script lang="ts">
	import { timerStore, challengeStarted, formData, showModal } from '../store';

	export let name: string = '';
	export let phone: string = '';
	export let email: string = '';
	export let countdown: number;
	export let timer: NodeJS.Timeout;
	export let challengeSuccess: boolean = false;
	export let challengeFinished: boolean = false;

	const startTimer = () => {
		timer = setInterval(() => {
			timerStore.update((currentTime) => {
				if (currentTime > 0) {
					return currentTime - 1;
				} else {
					clearInterval(timer);
					if (!challengeSuccess) {
						showModal.set(true);
						challengeSuccess = false;
						challengeFinished = true;
					}
					return 0;
				}
			});
		}, 1000);
	};

	const startChallenge = () => {
		formData.set({ name, phone, email });
		challengeStarted.set(true);
		timerStore.set(15);
		startTimer();
	};

	const closeModal = () => {
		showModal.set(false);
		challengeStarted.set(false);
		challengeFinished = false;
		timerStore.set(0);
	};

	const submitChallenge = () => {
		clearInterval(timer);
		showModal.set(true);
		challengeSuccess = true;
		challengeFinished = true;
		challengeStarted.set(false);
	};

	$: {
		countdown = $timerStore;
	}
</script>

<div class="p-4">
	<form class="space-y-4">
		<div>
			<label for="name" class="block">Name</label>
			<input
				data-testid="name-input"
				id="name"
				type="text"
				bind:value={name}
				class="input input-bordered w-full"
				placeholder="Name"
				disabled={$challengeStarted}
			/>
		</div>
		<div>
			<label for="phone" class="block">Phone</label>
			<input
				data-testid="phone-input"
				id="phone"
				type="number"
				bind:value={phone}
				class="input input-bordered w-full"
				placeholder="Phone"
				disabled={$challengeStarted}
			/>
		</div>
		<div>
			<label for="email" class="block">Email</label>
			<input
				data-testid="email-input"
				id="email"
				type="email"
				bind:value={email}
				class="input input-bordered w-full"
				placeholder="Email"
				disabled={$challengeStarted}
			/>
		</div>

		<button
			disabled={$challengeStarted}
			type="button"
			on:click={startChallenge}
			class="btn bg-gray-500 text-white hover:text-black">Iniciar Desafio</button
		>

		{#if $challengeStarted && !challengeFinished}
			<div class="mt-4">
				<p>Tempo Restante: 00m e {countdown}s</p>
				<button
					type="button"
					on:click={submitChallenge}
					class="btn mt-2 bg-green-400 text-white hover:bg-green-900">Enviar</button
				>
			</div>
		{/if}
	</form>
</div>

{#if $showModal}
	<dialog id="my_modal_3" class="modal modal-open">
		<div
			class="modal-backdrop"
			on:click={closeModal}
			role="button"
			tabindex="0"
			on:keydown={closeModal}
		></div>
		<div class="modal-box">
			<form method="dialog">
				<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2" on:click={closeModal}
					>✕</button
				>
			</form>
			<h3 class="text-lg font-bold">
				{challengeSuccess
					? 'Desafio finalizado com sucesso!'
					: 'Oops! Você não terminou o desafio a tempo'}
			</h3>
			<p class="py-4">
				{challengeSuccess
					? 'Desafio realizado com sucesso'
					: 'Infelizmente, você não terminou o desafio a tempo'}
			</p>
		</div>
	</dialog>
{/if}
