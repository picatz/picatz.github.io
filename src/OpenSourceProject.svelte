<script>
    import Command from './Command.svelte';
        
    export let name = '';
    export let link = '';
    export let description = '';
    export let install = '';
</script>

<div class="card">
    <header class="card-header">
        <p class="card-header-title">
            {name}
        </p>
        <div class="card-header-icon pull-right">
            <a href={link} class="button">
                <span class="icon">
                    <i class="fab fa-github"></i>
                </span>
            </a>
        </div>
    </header>
    <div class="card-content">
        <div class="content">
            {@html description}
        </div>
        <strong>Install</strong>
        <br>
        <Command input={install}/>
    </div>
</div>

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