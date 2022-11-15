<!-- -------------------------------------------------- -->
<script lang="ts">
	import type { Company } from 'src/wallet/structs_enums';
	// import {} from 'src/wallet/view';

	let company: Company = {
		name: 'Company Name',
		icon: '',
		industries: 'Industries',
		description: 'Description',
		location: 'Location',
		reference: 'Reference'
	};

	function request_verification(company: Company) {
		console.log('request_verification', company);
	}
</script>

<!-- this page will have -->
This is company page

<!-- company registration (Company(line 23 structs enum)) (call request_verification)  -->

<form>
	<label for="name">Company Name</label>
	<input type="text" id="name" name="name" bind:value={company.name} />

	<label for="icon">Company Icon(url)</label>
	<input type="text" id="icon" name="icon" bind:value={company.icon} />

	<label for="industries">Company Industries</label>
	<input type="text" id="industries" name="industries" bind:value={company.industries} />

	<label for="description">Company Description</label>
	<input type="text" id="description" name="description" bind:value={company.description} />

	<label for="location">Company Location</label>
	<input type="text" id="location" name="location" bind:value={company.location} />

	<label for="reference">Company Reference</label>
	<input type="text" id="reference" name="reference" bind:value={company.reference} />

	<button type="button" on:click={() => request_verification(company)}>Submit</button>
</form>
