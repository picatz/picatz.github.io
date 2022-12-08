<script>
    export let title = '';
    export let id = '';
    export let date = '';

    function formatDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString([], options);
    }
</script>

<div class="card">
    <a href="/#blog/{id}">
        <header class="card-header">
            <p class="card-header-title">
                <span class="tag" style="margin-right: 1rem">
                    {formatDate(date)}
                  </span>
                {title}
            </p>
        </header>
    </a>
</div>

<br>

<style>
    .card {
        box-shadow: 0 2px 3px rgba(hsl(0, 0%, 4%).2), 0 0 0 6px hsl(0, 0%, 4%);
        transition: all 0.5s ease-in-out;
    }

    .card:hover {
        box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 2px 4px 0 rgba(10,10,10,.1);
        transition: all 0.5s ease-in-out;
        transform: scale(0.98);
    }
</style>