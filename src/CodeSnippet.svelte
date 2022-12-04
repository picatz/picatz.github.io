<script>
    export let block = '';

    function copyToClipboard(event) {
        navigator.clipboard.writeText(input);

        event.target.style.transition = 'background-color 0.5s';
        
        event.target.style.background = 'grey';
        
        // fade the element back to black with a smooth transition 
        setTimeout(function() {
            event.target.style.background = 'black';
            event.target.style.transition = '';
        }, 500);
}
</script>


<pre class="box is-clickable is-clipped" style="background: black;" on:click={copyToClipboard}>
    <code>{block}</code>
</pre>

<style>
    code {
        color: greenyellow;
    }
</style>

