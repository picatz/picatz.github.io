<script>
    export let show = true;
    export let content = '';

    function close() {
        show = false;
    }
</script>

{#if show}

<div class="notification is-primary is-bold is-radiusless has-background-black-bis">
    <button class="delete" on:click={close}></button>
    {@html content}
</div>

{/if}



<style>
    .notification {
        margin-bottom: 0;
        margin-top: 0;
        transition: all 1s;
    }
</style>