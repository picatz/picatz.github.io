<script>
    export let posts = {};
    export let random = false;
    export let exclude = [];

    function formatDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString([], options);
    }

    function filter() {
        posts = Object.entries(posts).reduce((acc, [id, post]) => {
            if (!exclude.includes(id)) {
                acc[id] = post;
            }
            return acc;
        }, {});
        if (random) {
            return Object.entries(posts).sort(() => Math.random() - 0.5).slice(0, 3);
        } else {
            return Object.entries(posts).slice(0, 3);
        }
    }
</script>

<div class="section">
    <h3 class="title is-size-3">Read More</h3>
    <div class="columns is-mobile is-multiline">
        {#each filter() as [id, post]}
            <a href="/#blog/{id}" class="column">
                <div class="card post">
                    <div class="card-content">
                        <p class="title is-size-4">
                            {post.title}
                        </p>
                        <p class="subtitle is-size-6 has-text-grey">
                            {formatDate(post.date)}
                        </p>
                        <p>
                            {post.excerpt}
                        </p>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>

<style>
    .post {
        box-shadow: 0 2px 3px rgba(hsl(0, 0%, 4%).2), 0 0 0 6px hsl(0, 0%, 4%);
        transition: all 0.5s ease-in-out;
        height: 100%;
    }

    .post:hover {
        box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 2px 4px 0 rgba(10,10,10,.1);
        transition: all 0.5s ease-in-out;
        transform: scale(0.98);
    }
</style>