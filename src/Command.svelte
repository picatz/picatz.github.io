<!-- 
    This is a Svelete component that implements a code block used
    to display the installation instructions for the various
    tools that I have written.

    On click, it copies the command to the clipboard and highlights
    the box green to indicate that the command was copied with 
    a success message container a font awesome clipboard icon.
-->

<script>
    export let input = '';

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

<code class="box is-clickable is-clipped" style="background: black; color: greenyellow;" on:click={copyToClipboard}>
    <span class="has-text-weight-bold" style="color:white">$</span>
    <span id="command-input">{input}</span>
</code>