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