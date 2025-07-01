<script>
    /**
     * @param {string[]} headers
     * @param {string[][] | (string | { code: boolean, value: string })[]} rows
     */
    export let headers = [];
    export let rows = [];
</script>

<table class="table-auto w-full rounded-lg ring-1 ring-gray-200">
    <thead class="text-left border-b border-gray-200">
        <tr>
            {#each headers as header,i }
                {#if i === 0}
                    <th class="text-gray-700 p-3 bg-gray-200 rounded-tl-lg">{header}</th>
                {:else if i === headers.length - 1}
                    <th class="text-gray-700 p-3 bg-gray-200 rounded-tr-lg">{header}</th>
                {:else}
                    <th class="text-gray-700 p-3 bg-gray-200">{header}</th>
                {/if}
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each rows as row }
            <tr class="border-b border-gray-200 whitespace-wrap w-full">
                {#each row as cell}
                    <!-- If the row is an object, and the cell is a code cell, then render the cell as a code cell -->
                    <td class="p-3">
                        {#if typeof cell === 'object'}
                            {#if cell.code }
                                <p class="text-ellipsis overflow-hidden"><code>{cell.value}</code></p>
                            {:else}
                                <p class="text-ellipsis overflow-hidden">{cell.value}</p>
                            {/if}
                        {:else}
                            {cell}
                        {/if}
                {/each}
            </tr>
        {/each}
    </tbody>
</table>