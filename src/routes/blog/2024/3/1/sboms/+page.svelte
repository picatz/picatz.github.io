<script>
    import metadata from './metadata.json';
    import BlogHeader from '$lib/BlogHeader.svelte';
    import BlogPost from '$lib/BlogPost.svelte';
    import Panel from '$lib/Panel.svelte';
    import Link from '$lib/Link.svelte';
    import Table from '$lib/Table.svelte';
    import Graph from '$lib/Graph.svelte';

    // Genereate fake SBOM graph data for the sake of the example 
    // to use in the blog post.


    // Nodes are a list of D3 force graph nodes that represent
    // the components of a software supply chain.
    const nodes = Array.from({ length: 7 }, (_, i) => ({ id: i, label: i }));
</script>

<BlogPost>
    <BlogHeader title={metadata.title} date="3-1-2024">
        <strong>Software Bill of Materials</strong> (SBOMs) provides a comprehensive list of components
        that make up a particular software package or application. It serves as a transparent and informative 
        inventory, similar to an ingredient list on the side of a box of cereal.
    </BlogHeader>

    <div class="mt-6">
        <h2 class="text-l"><strong>
            Why are SBOMs important?
        </strong></h2>

        <p class="mt-2">
            SBOMs enable consumers to make informed decisions about the software they use. They provide crucial 
            visibility into the software supply chain, which is increasingly essential. With SBOMs, organizations can better understand 
            and manage the risk exposure introduced by third-party components.
        </p>
        
        <br>

        <h2 class="text-l"><strong>
            Supply Chains are Graphs
        </strong></h2> 

        <p class="mt-2">
            A critical aspect of SBOMs, regardless of the format, is that they can represent software components 
            as a <Link url="https://en.wikipedia.org/wiki/Graph_theory">graph</Link>. This is important 
            because software supply chains are fundamentally graphs themselves, with components connected through 
            complex relationships. SBOMs model these interconnections between different components, allowing us to 
            visualize and understand how they are linked. This graph-based approach is a powerful concept that can 
            be leveraged to identify vulnerabilities and track the flow of software components throughout the entire 
            supply chain ecosystem.
        </p>
        
        <br>

        <div class="bg-gray-800 p-4 rounded-lg">
            <Graph nodes={[
                // Nodes simulating a software supply chain graph
                { id: 0, label: 0 },
                { id: 1, label: 1 },
                { id: 2, label: 2 },
                { id: 3, label: 3 },
                { id: 4, label: 4 },
                { id: 5, label: 5 },
                { id: 6, label: 6 },
            ]} links={[
                { source: 0, target: 1 },
                { source: 1, target: 2 },
                { source: 1, target: 3 },
                { source: 2, target: 4 },
                { source: 3, target: 4 },
                { source: 4, target: 5 },
                { source: 5, target: 6 },
                { source: 6, target: 3 },
            ]} />
        </div>
        
        <br>

        <p>
            More specifically, a single SBOM document provided by a software vendor only captures a 
            <Link url="https://mathworld.wolfram.com/Subgraph.html">subgraph</Link> of 
            the overarching software supply chain graph. 
        </p>
        
        <br>

        <div class="bg-gray-800 p-4 rounded-lg">
            <Graph nodes={[
                // Nodes simulating a software supply chain graph
                { id: 0, label: 1 },
                { id: 1, label: 2 },
                { id: 2, label: 3 },
            ]} links={[
                { source: 0, target: 1 },
                { source: 0, target: 2 },
            ]} />
        </div>

        <br>
            
        <p>
            To truly understand the full context and 
            implications of a particular software package, we need a more comprehensive view of the 
            supply chain. This may require traversing and integrating additional graphs containing 
            detailed information like vulnerability data, function call hierarchies, or specific 
            build environment details used to create the component. 
        </p>
        
        <br>
            
        <p>
            Since not all of this supplementary information may be included in a vendor's SBOM, so it is 
            crucial to recognize that the SBOM itself is just one piece of a much larger interconnected puzzle.
            We can also can't forget that these graphs are constantly evolving.
        </p>

        <br>

        <h3 class="text-l"><strong>Historical Context</strong></h3>

        <p class="mt-2">
            To help put all this SBOM <i>stuff</i> into perspective, let's revisit some major cybersecurity incidents from 
            recent years. In 2018, the Equifax breach was caused by a known vulnerability in Apache Struts  (<Link url="https://nvd.nist.gov/vuln/detail/cve-2017-5638"><code>CVE-2017-5638</code></Link>), 
            which was used in one of their web applications. Despite the patch's availability, Equifax failed to update their 
            software, allowing the exploit. 
        </p>

        <br>

        <p>
            Fast forward to 2021, the SolarWinds breach was a supply chain attack where hackers compromised SolarWinds' build 
            system and injected malware into Orion software updates, distributing it to thousands of customers. An SBOM could 
            have enabled SolarWinds' customers to better understand Orion's components, identifying the compromised updates 
            more easily.
        </p>

        <br>

        <p>
            Then, in 2022, the Log4Shell (<Link url="https://nvd.nist.gov/vuln/detail/cve-2021-44228"><code>CVE-2021-44228</code></Link>) 
            vulnerability was discovered in the popular Java logging library, Log4j. This vulnerability was widely exploited, and 
            affected thousands of organizations. An SBOM would have made it easier for organizations to understand the components 
            of their software, and identify the affected versions of Log4j.
        </p>

        <br>
 
        <ol class="items-center sm:flex p-2">
            <li class="relative mb-6 sm:mb-0">
                <div class="flex items-center">
                    <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white sm:ring-8 shrink-0">
                        <svg class="w-2.5 h-2.5 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </div>
                    <div class="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
                </div>
                <div class="mt-3 sm:pe-8">
                    <h3 class="text-lg font-semibold text-gray-900">Apache Struts</h3>
                    <time class="block mb-2 text-sm font-normal leading-none text-gray-400">2017</time>
                    <p class="text-base font-normal text-gray-500">
                        Equifax failed to update their software, and suffered a massive breach as a result.
                    </p>
                </div>
            </li>
            <li class="relative mb-6 sm:mb-0">
                <div class="flex items-center">
                    <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white sm:ring-8 shrink-0">
                        <svg class="w-2.5 h-2.5 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </div>
                    <div class="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
                </div>
                <div class="mt-3 sm:pe-8">
                    <h3 class="text-lg font-semibold text-gray-900">SolarWinds</h3>
                    <time class="block mb-2 text-sm font-normal leading-none text-gray-400">2021</time>
                    <p class="text-base font-normal text-gray-500">
                        Hackers compromised the SolarWinds build system, and injected malware into the Orion software updates.
                    </p>
                </div>
            </li>
            <li class="relative mb-6 sm:mb-0">
                <div class="flex items-center">
                    <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white sm:ring-8 shrink-0">
                        <svg class="w-2.5 h-2.5 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </div>
                    <div class="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
                </div>
                <div class="mt-3 sm:pe-8">
                    <h3 class="text-lg font-semibold text-gray-900">Log4Shell</h3>
                    <time class="block mb-2 text-sm font-normal leading-none text-gray-400">2022</time>
                    <p class="text-base font-normal text-gray-500">
                        The Log4Shell vulnerability was widely exploited, and affected thousands of organizations.
                    </p>
                </div>
            </li>
        </ol>

        <br>

        <Panel icon="fa-flag-usa" color="bg-white" ring="ring-1" ringColor="ring-gray-300">
            To combat the growing threat of cyber attacks, the Biden administration issued an <Link url="https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/">executive order</Link> requiring
            SBOMs for all software sold to the federal government.
        </Panel>

        <br>
    </div>
</BlogPost>
