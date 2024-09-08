<script lang="ts">
	import { formData } from '../../store';

	let data = $formData;
</script>

<div class="p-4">
	<h2 class="text-xl font-bold">Candidato</h2>
	<p><strong>Name:</strong> <span>{data.name}</span></p>
	<p><strong>Phone:</strong> <span>{data.phone}</span></p>
	<p><strong>Email:</strong> <span>{data.email}</span></p>

	<a href="/" class="btn bg-red-600 text-white hover:bg-red-400">Voltar</a>
</div>
