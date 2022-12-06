<!--
    This is a component that display a blog post.
-->

<script>
    export let id = '';
    export let title = '';
    export let date = '';

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString([], options);
    }

    function formatTitle(title) {
        return title.replace(/-/g, ' ');
    }

    function formatLink(title) {
        return title.replace(/ /g, '-');
    }
</script>

<div class="columns is-mobile">
    <div class="column is-8">
        <h1 class="title is-2">
            {formatTitle(title)}
        </h1>
        <h2 class="subtitle is-4">
            {formatDate(date)}
        </h2>
    </div>
    <div class="column is-4">
        <div class="buttons is-right">
            <a href="/">
                <button class="button">
                    <p class="is-clickable is-primary">
                        <span class="icon">
                            <i class="fas fa-home"></i>
                        </span>
                    </p>
                </button>
            </a>
            <a href="https://github.com/picatz">
                <button class="button">
                    <p class="is-clickable is-primary">
                        <span class="icon">
                            <i class="fab fa-github"></i>
                        </span>
                    </p>
                </button>
            </a>
        </div> 
    </div>
</div>