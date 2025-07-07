<script lang="ts">
	// import metadata.json
	import metadata from './metadata.json';
	import BlogHeader from '$lib/BlogHeader.svelte';
	import BlogPost from '$lib/BlogPost.svelte';
	import ReadMore from '$lib/BlogReadMore.svelte';
	import Panel from '$lib/Panel.svelte';
	import Table from '$lib/Table.svelte';
	import Code from '$lib/Code.svelte';
	import Link from '$lib/Link.svelte';
</script>

<BlogPost>
	<BlogHeader title={metadata.title} date="12-29-2022">
		<a href="https://www.rfc-editor.org/rfc/rfc8949.html" class="text-blue-500"
			>Concise Binary Object Representation
		</a>
		(<strong>CBOR</strong>) is a data format designed to be concise and extensible. It is used by
		<a href="https://www.w3.org/TR/webauthn" class="text-blue-500"><strong>WebAuthn</strong></a>
		(<a
			href="https://fidoalliance.org/specs/fido-v2.0-id-20180227/fido-client-to-authenticator-protocol-v2.0-id-20180227.html#message-encoding"
			class="text-blue-500">CTAP2</a
		>), which was the reason I started looking into it in the first place. This is a summary of my
		findings with attacks and mitigations to consider when using CBOR.
	</BlogHeader>

	<div class="mt-6">
		<h2 class="text-l"><strong>Concise Binary Object Representation</strong></h2>

		<p class="mt-2">
			CBOR allows for the representation of a wide range of data types in a compact binary format.
			It is designed to be extensible and self-describing, so that types of the encoded data can be
			determined without any out-of-band information, making it "schemaless".
		</p>

		<br />

		<p>
			This is achieved by using a <a
				href="https://www.iana.org/assignments/cbor-tags/cbor-tags.xhtml">tag</a
			>
			system, where each data type is assigned a unique tag. The tag is used to determine the type of
			the encoded data from the initial byte of a value, followed by the data itself. The tag is stored
			in the most significant 5 bits of the initial byte, while the remaining 3 bits are
			<i>generally</i> used to determine the length of the data, with exceptions for some tags. The initial
			byte and any additional bytes consumed to construct the argument are collectively referred to as
			the "head" of the "data item".
		</p>

		<br />

		<Table
			headers={['Name', 'Tag Number']}
			rows={[
				['Date Time (String)', '0'],
				['Date Time (Epoch)', '1'],
				['Positive Bignum', '2'],
				['Negative Bignum', '3'],
				['Decimal Fraction', '4'],
				['Big Float', '5'],
				['Base64URL', '21'],
				['Base64', '22'],
				['Base16', '23']
			]}
		/>

		<br />

		<Panel>
			This is not an exhaustive list of all the tags. IANA maintains a <a
				href="https://www.iana.org/assignments/cbor-tags/cbor-tags.xhtml"
				class="text-blue-500">registry</a
			> of tags you can refer to.
		</Panel>

		<br />

		<p>
			CBOR is similar to otherformats such as <Link url="https://www.json.org/json-en.html"
				>JSON</Link
			>, <Link url="https://bsonspec.org/">BSON</Link>,
			<Link url="https://msgpack.org/index.html">MessagePack</Link>, or <Link
				url="https://developers.google.com/protocol-buffers">Protcol Buffers</Link
			>. The following table shows the encoded bytes for a simple message in each format.
		</p>

		<br />

		<Table
			headers={['Format', 'Bytes', 'Size']}
			rows={[
				['JSON', { value: '{"hello":"world"}', code: true }, 17],
				[
					'BSON',
					{
						value: '\\x16\\x00\\x00\\x00\\x02hello\\x00\\x06\\x00\\x00\\x00world\\x00\\x00',
						code: true
					},
					22
				],
				['MessagePack', { value: '\\x81\\xa5\\x68hello\\xa5\\x77world', code: true }, 15],
				['CBOR', { value: '\\xa1\\x65hello\\x65world', code: true }, 13],
				['Protocol Buffers', { value: '\\x0a\\x05world', code: true }, 7]
			]}
		/>

		<br />

		<p>
			Looking at the table, we can see that CBOR is <i>not</i> the smallest format, but it is still
			<i>relatively</i>
			small. It is most similar to MessagePack, which it actually
			<a href="https://www.rfc-editor.org/rfc/rfc7049#section-9">took inspiration from</a>. Unlike
			the rest of the examples shown, Protcol Buffers is <i>not</i> a schemaless format. It requires
			a schema to be defined, which is then used to encode and decode the data. This is why it can
			ommit the field name "<code>hello</code>" and just reference it by a field number (<code
				>\x0a</code
			>).
		</p>

		<br />

		<p>
			The advantage of a <i>schemaless</i> format like CBOR is that the sender and receiver do not need
			to agree on a schema, which can be a challenge when working with multiple parties. The disadvantage
			is that the data is often not as compact, and it is not as easy to validate the data being received,
			resulting in a potential security risk from maliciously crafted messages. It's a double-edged sword.
		</p>

		<br />

		<p>
			CBOR implements a variety of potentially dangerous data types that can be used by an attacker,
			such as indefinite length maps and arrays, duplicate map keys, arbitrary precision numbers,
			and more. These data types can be used to launch a denial of service attack (resource
			exhaustion), and need to be handled carefully. These attacks are discussed in the <a
				href="https://www.rfc-editor.org/rfc/rfc8949#name-security-considerations"
				>Security Considerations</a
			>
			section of the RFC.
		</p>

		<br />

		<p>
			To make this clear, let's consider an infinite array (<code>\x9f</code>) of infinite UTF-8
			text strings (<code>\x7f</code>), which is a valid CBOR data type. If a server were to decode
			this, it would <i>essentially</i> need to allocate an <i>infinite</i> amount of memory to store
			the strings. This would cause the server to eventually run out of available memory, and crash or
			become unresponsive.
		</p>

		<br />

		<Code>
			<span class="text-indigo-200"
				>\x9f\x7f<span class="text-red-500">\x61\x61\xff</span>...\xff</span
			>
		</Code>

		<br />

		<div class="bg-gray-200 p-2 rounded-lg">
			<p class="m-4">
				<i class="fas fa-info-circle fa-1x text-slate-500 mr-2"></i>
				Each <code>\x61\x61</code> is single character (<code>"a"</code>), and the <code>0xff</code>
				is the "break code", one for each string in the array, and one more to terminate the array.
			</p>
		</div>

		<br />

		<p>
			Depending on the decoder implementation, and network transport, an infinite amount of <code
				>\x61\x61</code
			> could be sent by the attacker.
		</p>

		<br />

		<div class="flex flex-wrap items-center justify-center">
			<div class="w-2/5">
				<div class="bg-white rounded-lg p-4">
					<p class="text-center font-semibold">Attacker</p>
					<div class="bg-gray-800 rounded-lg p-4">
						<p class="text-center overflow-hidden">
							<code>
								<span class="text-indigo-200"
									>\x9f\x7f<span class="text-red-500">\x61\x61\xff</span>...</span
								>
							</code>
						</p>
					</div>
				</div>
			</div>

			<div class="w-1/5 flex items-center justify-center mt-4">
				<hr class="w-1/3 border-t-2 border-gray-500" />
				<p id="stream" class="text-center text-red-500 overflow-hidden">
					<code>\x61\x61\xff</code>
				</p>
				<i class="fas fa-arrow-right text-gray-500 text-2x l mr-1"></i>
			</div>

			<div class="w-2/5">
				<div class="bg-white rounded-lg p-4">
					<p class="text-center font-semibold">Server</p>
					<div class="bg-gradient-to-r from-gray-200 to-gray-400 rounded-lg p-4">
						<p id="memory" class="text-center overflow-hidden">
							<code>
								Array[<span class="text-red-500">"a"</span>, <span class="text-red-500">"a"</span>,
								<span class="text-red-500">"a"</span>, <span class="text-red-500">...</span>]
							</code>
						</p>
					</div>
				</div>
			</div>
		</div>

		<br />

		<p>
			This attacks would be very cheap for an attacker to send, and would balloon the memory usage
			of the decoder on the server.
		</p>

		<br />

		<Panel
			icon="fa-lightbulb"
			color="bg-amber-300"
			iconColor="text-amber-500"
			ring="ring-2"
			ringColor="ring-amber-500"
		>
			Variations of this attack exist in each of the other codecs. This is not solely a CBOR
			problem.
		</Panel>

		<br />

		<p>
			There are a number of ways to mitigate these kinds of attacks, such as limiting the size of
			the data being decoded, limiting the depth of the data structure, or restricting the types
			allowed in the data structure (generally do not allow infinite maps and arrays).
		</p>

		<br />

		<p>
			Network transport level limits on the number of bytes that can be sent by a single client for
			a logical request can also be used to mitigate these attacks, along with restricting the
			number of requests that can be sent by a single client in a given time period. While you're at
			it, add idle/read/write timeouts to mitigate
			<Link url="https://en.wikipedia.org/wiki/Slowloris_(computer_security)">slow-loris</Link>-like
			attacks.
		</p>

		<br />

		<p>
			<Link url="https://en.wikipedia.org/wiki/Mutual_authentication#mTLS">mTLS</Link> can also be used
			to ensure that only trusted clients are able to connect to the server.
		</p>

		<br />

		<p>
			Doing any these in combination enables <a
				href="https://en.wikipedia.org/wiki/Defense_in_depth_(computing)">defense in depth</a
			>.
		</p>
		<br />
	</div>
</BlogPost>
