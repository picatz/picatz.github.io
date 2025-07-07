<script lang="ts">
import { onMount } from 'svelte';
import * as d3 from 'd3';

/**
 * @typedef {Object} Props
 * @property {any} nodes
 * @property {any} links
 * @property {any} [classes]
 * @property {any[]} [nodeFunctions] - functions applied to node elements
 * @property {any[]} [labelFunctions] - functions applied to label elements
 * @property {any[]} [linkFunctions] - functions applied to link elements
 */

/** @type {Props} */
let {
       nodes,
       links,
       classes = ['h-96'],
       nodeFunctions = [],
       labelFunctions = [],
       linkFunctions = []
} = $props();

	const canvasID = 'graph' + Math.random().toString(36).substring(7);

	let nodeElements;
	let labelElements;
	let linkElements; // Add linkElements to module scope
	let expandedLabels = new Map(); // Store expanded labels for nodes
	let dragStart, dragging, dragEnd; // Drag functions

	// Function to highlight a node by its label
	export function highlightNode(label) {
		if (nodeElements && labelElements) {
			// Reset all nodes first
			nodeElements
				.transition()
				.duration(200)
				.attr('r', 25)
				.attr('fill', '#3b5779')
				.attr('stroke', 'none')
				.attr('stroke-width', 0);

			labelElements.transition().duration(200).attr('fill', 'white').attr('font-weight', 'normal');

			// Highlight the matching node
			nodeElements
				.filter((d) => d.label === label)
				.transition()
				.duration(200)
				.attr('r', 30)
				.attr('fill', '#ef4444')
				.attr('stroke', '#fbbf24')
				.attr('stroke-width', 3);

			labelElements
				.filter((d) => d.label === label)
				.transition()
				.duration(200)
				.attr('fill', '#fbbf24')
				.attr('font-weight', 'bold');
		}
	}

	// Function to highlight a node and expand its signature with special highlighting
	export function highlightNodeWithSignature(nodeLabel, highlightText, expandedSignature) {
		if (nodeElements && labelElements) {
			// Reset all nodes first
			resetHighlight();

			// Find and highlight the target node
			const targetNode = nodeElements.filter((d) => d.label === nodeLabel);
			targetNode
				.transition()
				.duration(200)
				.attr('r', 35)
				.attr('fill', '#ef4444')
				.attr('stroke', '#fbbf24')
				.attr('stroke-width', 3);

			// Hide the original label for this node
			labelElements.filter((d) => d.label === nodeLabel).style('opacity', 0);

			// Create expanded signature with highlighted parts
			const svg = d3.select(labelElements.node().parentNode);
			const nodeData = nodes.find((n) => n.label === nodeLabel);

			if (nodeData && expandedSignature) {
				// Store the expanded signature
				expandedLabels.set(nodeLabel, expandedSignature);

				// Split the signature to highlight specific parts
				const parts = expandedSignature.split(highlightText);
				const group = svg.append('g').datum(nodeData).attr('class', 'expanded-label');

				let textY = 0;

				// Create multi-line text with highlighting
				parts.forEach((part, i) => {
					if (part) {
						const lines = wrapText(part, 300);
						lines.forEach((line, lineIndex) => {
							group
								.append('text')
								.attr('font-family', 'monospace')
								.attr('font-size', '10px')
								.attr('text-anchor', 'middle')
								.attr('fill', 'white')
								.attr('dy', textY)
								.text(line);
							textY += 12;
						});
					}

					// Add highlighted text between parts (except after the last part)
					if (i < parts.length - 1) {
						group
							.append('text')
							.attr('font-family', 'monospace')
							.attr('font-size', '10px')
							.attr('font-weight', 'bold')
							.attr('text-anchor', 'middle')
							.attr('fill', '#fbbf24')
							.attr('dy', textY)
							.text(highlightText);
						textY += 12;
					}
				});

				// Position the group
				group.attr('transform', `translate(${nodeData.x || 0}, ${nodeData.y || 0})`);
			}
		}
	}

	// Helper function to wrap text
	function wrapText(text, maxWidth) {
		const words = text.split(/\s+/);
		const lines = [];
		let currentLine = '';

		words.forEach((word) => {
			const testLine = currentLine ? currentLine + ' ' + word : word;
			if (testLine.length * 6 < maxWidth) {
				// Approximate character width
				currentLine = testLine;
			} else {
				if (currentLine) lines.push(currentLine);
				currentLine = word;
			}
		});

		if (currentLine) lines.push(currentLine);
		return lines;
	}
	// Function to reset all node highlighting
	export function resetHighlight() {
		if (nodeElements && labelElements && linkElements) {
			// Remove any expanded labels
			const parentSvg = d3.select(labelElements.node().parentNode);
			parentSvg.selectAll('.expanded-label').remove();

			// Reset nodes
			nodeElements
				.transition()
				.duration(200)
				.attr('r', 25)
				.attr('fill', '#3b5779')
				.attr('stroke', 'none')
				.attr('stroke-width', 0)
				.attr('opacity', 1);

			// Reset links
			linkElements
				.transition()
				.duration(200)
				.attr('stroke', 'gray')
				.attr('stroke-width', 1)
				.attr('opacity', 0.6)
				.style('filter', 'none');

			// Restore all original labels (make them visible again)
			labelElements
				.style('opacity', 1)
				.transition()
				.duration(200)
				.attr('fill', 'white')
				.attr('font-weight', 'normal')
				.attr('opacity', 1);

			// Reapply the original node and link functions
			nodeFunctions.forEach((f) => f(nodeElements));
			linkFunctions.forEach((f) => f(linkElements));
		}
	}

	// Function to highlight the vulnerability path
	export function highlightPath(pathNodeLabels) {
		if (nodeElements && labelElements && linkElements) {
			// Reset first
			resetHighlight();

			// Get the node IDs for the path
			const pathNodeIds = pathNodeLabels
				.map((label) => {
					const node = nodes.find((n) => n.label === label);
					return node ? node.id : null;
				})
				.filter((id) => id !== null);

			// Dim all nodes and links first
			nodeElements.transition().duration(200).attr('fill', '#1e293b').attr('opacity', 0.3);

			labelElements.transition().duration(200).attr('fill', '#64748b').attr('opacity', 0.5);

			linkElements.transition().duration(200).attr('stroke', '#374151').attr('opacity', 0.2);

			// Highlight path nodes
			nodeElements
				.filter((d) => pathNodeIds.includes(d.id))
				.transition()
				.duration(300)
				.delay((d, i) => i * 100) // Stagger the animation
				.attr('fill', '#ef4444')
				.attr('stroke', '#fbbf24')
				.attr('stroke-width', 3)
				.attr('r', 30)
				.attr('opacity', 1);

			// Highlight path node labels
			labelElements
				.filter((d) => pathNodeIds.includes(d.id))
				.transition()
				.duration(300)
				.delay((d, i) => i * 100)
				.attr('fill', '#fbbf24')
				.attr('font-weight', 'bold')
				.attr('opacity', 1);

			// Highlight path edges
			linkElements
				.filter((d) => {
					return pathNodeIds.includes(d.source.id) && pathNodeIds.includes(d.target.id);
				})
				.transition()
				.duration(300)
				.delay(200)
				.attr('stroke', '#3b82f6')
				.attr('stroke-width', 4)
				.attr('opacity', 1)
				.style('filter', 'drop-shadow(0 0 8px #3b82f6)');
		}
	}

       onMount(() => {
               const forceGraph = d3.select<HTMLElement, unknown>('#' + canvasID);
               const graphEl = forceGraph.node();
               let width = graphEl ? graphEl.getBoundingClientRect().width : 0;
               let height = graphEl ? graphEl.getBoundingClientRect().height : 0;

		const svg = forceGraph.append('svg').attr('width', width).attr('height', height);

		const simulation = d3
			.forceSimulation(nodes)
			.force('charge', d3.forceManyBody().strength(-200))
			.force('link', d3.forceLink(links).distance(100))
			.force('center', d3.forceCenter(width / 2, height / 2));

		linkElements = svg
			.selectAll('line')
			.data(links)
			.enter()
			.append('line')
			.attr('stroke', 'gray')
			.attr('stroke-opacity', 0.6)
			.attr('stroke-width', 1);
		linkFunctions.forEach((f) => f(linkElements));

		nodeElements = svg
			.selectAll('circle')
			.data(nodes)
			.enter()
			.append('circle')
			.attr('r', 25)
			.attr('fill', '#3b5779');

		nodeFunctions.forEach((f) => f(nodeElements));

		dragStart = function (event, d) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		};

		dragging = function (event, d) {
			d.fx = event.x;
			d.fy = event.y;
		};

		dragEnd = function (event, d) {
			if (!event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		};
		nodeElements.call(d3.drag().on('start', dragStart).on('drag', dragging).on('end', dragEnd));

		labelElements = svg
			.selectAll('text')
			.data(nodes)
			.enter()
			.append('text')
			.attr('font-family', 'monospace')
			.text((d) => d.label)
			.attr('font-size', 12)
			.attr('dy', 4)
			.attr('text-anchor', 'middle')
			.attr('fill', 'white');

		labelFunctions.forEach((f) => f(labelElements));

		labelElements.call(d3.drag().on('start', dragStart).on('drag', dragging).on('end', dragEnd));

		simulation.on('tick', () => {
			linkElements
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y);

			nodeElements.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

			labelElements.attr('x', (d) => d.x).attr('y', (d) => d.y);

			// Update expanded labels position
			const svg = d3.select(labelElements.node().parentNode);
			svg.selectAll('.expanded-label').attr('transform', (d) => `translate(${d.x}, ${d.y})`);
		});

               window.addEventListener('resize', () => {
                       if (!graphEl) return;
                       width = graphEl.getBoundingClientRect().width;
                       height = graphEl.getBoundingClientRect().height;

                       svg.attr('width', width).attr('height', height);
                       simulation.force('center', d3.forceCenter(width / 2, height / 2));
                       simulation.alpha(1).restart();
               });
	});
</script>

<slot />

<div id={canvasID} class={classes.join(' ')}></div>
