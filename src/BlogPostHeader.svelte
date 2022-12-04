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

<div class="content" style="padding-bottom: 5rem">
    <div class="is-pulled-left">
        <h1>{formatTitle(title)}</h1>
        <p>{formatDate(date)}</p>
    </div>

    <div class="is-pulled-right">
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