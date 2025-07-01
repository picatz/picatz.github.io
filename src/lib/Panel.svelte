<script>
    /** 
     * @param {string} icon
     * @param {string} iconColor
     * @param {string} color
     * @param {string} ring
     * @param {string} ringColor
     */
    export let icon = 'fa-info-circle';
    export let iconColor = 'text-slate-500';
    export let color = 'bg-gray-200';
    export let ring = ''; 
    export let ringColor = '';
</script>
 
<div class="{color} p-2 rounded-lg {ring} {ringColor}">
    <p class="m-4">
      <i class="fas {icon} fa-1x {iconColor} mr-2"></i>
      <slot/>
    </p>   
</div> 