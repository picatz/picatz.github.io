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