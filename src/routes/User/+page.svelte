This is user page

<!-- have to register himself by minting nft  -->
<!-- nft image -->
<!-- user detales (title, deiscription(optional), public key(internal),account id(given by user and make sure that account id should not already exist)) -->
<!-- mint nft button (nft_mint_args) -->

<!-- create a svelte form with  -->
<!-- user detales (title, deiscription(optional), public key(internal),account id(given by user and make sure that account id should not already exist)) -->
<scrypt />
<form>
	<label for="title">Title</label>
	<input type="text" id="title" name="title" />
	<label for="description">Description</label>
	<input type="text" id="description" name="description" />
	<label for="public_key">Public Key</label>
	<input type="text" id="public_key" name="public_key" />
	<label for="account_id">Account Id</label>
	<input type="text" id="account_id" name="account_id" />
	<button type="submit">Submit</button>
</form>
