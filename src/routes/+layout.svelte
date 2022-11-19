<!-- top nav with all linkes -->
<nav>
	<a href="/">Home</a>
	<a href="/User">User</a>
	<!-- User Dashboard -->
	<a href="/User/Dashboard">User Dashboard</a>
	<!-- company  -->
	<a href="/Company">Company</a>
	<!-- company Dashboard -->
	<a href="/Company/Dashboard">Company Dashboard</a>
</nav>
<slot />

<!-- style top nav -->
<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: #ff3e00;
	}
	nav a {
		color: #fff;
		text-decoration: none;
	}
</style>
