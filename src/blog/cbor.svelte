<script>
    import BlogPostHeader from '../BlogPostHeader.svelte'
    import Command from '../Command.svelte'
    import CodeSnippet from '../CodeSnippet.svelte'

    import ReadMore from '../ReadMore.svelte'
    import blogPosts from '../posts.js'
	import Footer from '../Footer.svelte'
</script>

<section class="section">
    <BlogPostHeader id="cbor" title="CBOR" date="2022-12-30" />

    <div class="box">
        <p>
            <i class="fas fa-book fa-1x is-grey has-text-grey" style="margin-right: 0.5rem;"></i>
            <a href="https://www.rfc-editor.org/rfc/rfc8949.html">Concise Binary Object Representation </a> (<strong>CBOR</strong>)
            is a data format designed to be concise and extensible. It is used by <a href="https://www.w3.org/TR/webauthn"><strong>WebAuthn</strong></a> (<a href="https://fidoalliance.org/specs/fido-v2.0-id-20180227/fido-client-to-authenticator-protocol-v2.0-id-20180227.html#message-encoding">CTAP2</a>),
            which was the reason I started looking into it in the first place. This is a summary of my findings with attacks and mitigations to consider when using CBOR.
        </p>
    </div>
   
   <h2 class="subtitle"><strong>Concise Binary Object Representation</strong></h2>

    <p>
        CBOR allows for the representation of a wide range of data types in a compact binary
        format. It is designed to be extensible and self-describing, so that types of the encoded
        data can be determined without any out-of-band information, making it "schemaless". 
    </p>

    <br>
 
    <p>
        This is achieved by using a <a href="https://www.iana.org/assignments/cbor-tags/cbor-tags.xhtml">tag</a>
        system, where each data type is assigned a unique tag. The tag is used to determine the type of the
        encoded data from the initial byte of a value, followed by the data itself. The tag is stored in the
        most significant 5 bits of the initial byte, while the remaining 3 bits are <i>generally</i> used to 
        determine the length of the data, with exceptions for some tags. The initial byte and any additional bytes
        consumed to construct the argument are collectively referred to as the "head" of the "data item".
    </p>

    <br>

    <!-- Table of CBOR tag types with ther corresponding byte value from the IANA registry. -->
    <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tag Number</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td><a href="https://www.rfc-editor.org/rfc/rfc8949.html#name-standard-date-time-string">Date Time (String)</a></td>
                <td><code>0</code></td>
            </tr>
            <tr>
                <td><a href="https://www.rfc-editor.org/rfc/rfc8949.html#name-epoch-based-date-time">Date Time (Epoch)</a></td>
                <td><code>1</code></td>
            </tr>
            <tr>
                <td><a href="https://www.rfc-editor.org/rfc/rfc8949.html#name-positive-bignum">Positive Bignum</a></td>
                <td><code>2</code></td>
            </tr>
            <tr>
                <td><a href="https://www.rfc-editor.org/rfc/rfc8949.html#name-negative-bignum">Negative Bignum</a></td>
                <td><code>3</code></td>
            </tr>
            <tr>
                <td><a href="https://www.rfc-editor.org/rfc/rfc8949.html#name-decimal-fractions-and-bigfl">Decimal Fraction</a></td>
                <td><code>4</code></td>
            </tr>
            <tr>
                <td><a href="https://www.rfc-editor.org/rfc/rfc8949.html#name-decimal-fractions-and-bigfl">Big Float</a></td>
                <td><code>5</code></td>
            </tr>
            <tr>
                <td><a href="https://www.rfc-editor.org/rfc/rfc8949.html#name-expected-later-encoding-for">Base64URL</a></td>
                <td><code>21</code></td>
            </tr>
            <tr>
                <td><a href="https://www.rfc-editor.org/rfc/rfc8949.html#name-expected-later-encoding-for">Base64</a></td>
                <td><code>22</code></td>
            </tr>
            <tr>
                <!-- https://www.rfc-editor.org/rfc/rfc4648#section-8 -->
                <td><a href="https://www.rfc-editor.org/rfc/rfc8949.html#name-expected-later-encoding-for">Base16</a></td>
                <td><code>23</code></td>
            </tr>
        </tbody>
      </table>

    <div class="box">
        <p>
            <i class="fas fa-info-circle fa-1x is-grey has-text-grey" style="margin-right: 0.5rem;"></i>
            This is not an exhaustive list of all the tags. <a href="https://www.iana.org/">IANA</a> maintains 
            a <a href="https://www.iana.org/assignments/cbor-tags/cbor-tags.xhtml">registry</a> of all the tags.
        </p>
    </div>

    <br>

    <p>
        CBOR is similar to formats such as <a href="https://www.json.org/json-en.html">JSON</a>, <a href="https://bsonspec.org/">BSON</a>, 
        <a href="https://msgpack.org/index.html">MessagePack</a>, or <a href="https://developers.google.com/protocol-buffers">Protcol Buffers</a>. The following table shows the
        encoded bytes for a simple message in each format.
    </p>

    <br>

    <table class="table is-striped is-fullwidth" id="comparison">
        <thead>
            <tr>
                <th>Format</th>
                <th>Encoded Bytes</th>
                <th>Size (bytes)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>JSON</td>
                <td><code>{"{"}"hello":"world"{"}"}</code></td>
                <td>17</td>
            </tr>
            <tr>
                <td>BSON</td>
                <td><code>\x16\x00\x00\x00\x02hello\x00\x06\x00\x00\x00world\x00\x00</code></td>
                <td>22</td>
            </tr>
            <tr>
                <td>MessagePack</td>
                <td><code>\x81\xa5\x68hello\xa5\x77world</code></td>
                <td>15</td>
            </tr>
            <tr>
                <td>CBOR</td>
                <td><code>\xa1\x65hello\x65world</code></td>
                <td>13</td>
            </tr>
            <tr>
                <td>Protocol Buffers</td>
                <td><code>\x0a\x05world</code></td>
                <td>7</td>
            </tr>
        </tbody>
    </table>

    <br>

    <p>
        Looking at the table, we can see that CBOR is <i>not</i> the smallest format, but it is still <i>relatively</i> small. It is
        most similar to <a href="https://msgpack.org/index.html">MessagePack</a>, which it actually <a href="https://www.rfc-editor.org/rfc/rfc7049#section-9">took inspiration from</a>.
        
        Unlike the rest of the examples shown, <a href="https://developers.google.com/protocol-buffers">Protcol Buffers</a> is <i>not</i> a
        schemaless format. It requires a <a href="https://developers.google.com/protocol-buffers/docs/proto3#simple">schema to be defined</a>, 
        which is then used to encode and decode the data. This is why it can ommit the field name "<code>hello</code>" and just reference it by a field number (<code>\x0a</code>).
    </p>

    <br>

    <p>
        The advantage of a <i>schemaless</i> format like CBOR is that the sender and receiver do not need to agree on a schema,
        which can be a challenge when working with multiple parties. The disadvantage is that the data is often not
        as compact, and it is not as easy to validate the data being received, resulting in a potential 
        security risk from maliciously crafted messages. It's a double-edged sword.
    </p>

    <br>

    <p>
        CBOR implements a variety of potentially dangerous data types that can be used by an attacker,
        such as indefinite length maps and arrays, duplicate map keys, arbitrary precision numbers, and more. These data types
        can be used to launch a denial of service attack (resource exhaustion), and need to be handled carefully. These 
        attacks are discussed in the <a href="https://www.rfc-editor.org/rfc/rfc8949#name-security-considerations">Security Considerations</a>
        section of the RFC.
    </p>

    <br>

    <p>
        To make this clear, let's consider an infinite array (<code>\x9f</code>) of infinite UTF-8 text strings (<code>\x7f</code>), which is a valid CBOR data type.
        If a server were to decode this, it would <i>essentially</i> need to allocate an <i>infinite</i> amount of memory to 
        store the strings. This would cause the server to eventually run out of available memory, and crash or become unresponsive.
    </p>

    <br>

    <CodeSnippet language="cbor" block="
    \x9f\x7f\x61\x61\xff...\xff
    "/>
    
    <div class="box">
        <p>
            <i class="fas fa-info-circle fa-1x is-grey has-text-grey" style="margin-right: 0.5rem;"></i>
            Each <code>\x61\x61</code> is single character (<code>"a"</code>), and the <code>0xff</code> is the "break code",
            one for each string in the array, and one more to terminate the array. Depending on the decoder implementation,
            and network transport, an infinite amount of <code>\x61\x61</code> could be sent by the attacker. This would
            be very cheap for an attacker to send, and would balloon the memory usage of the decoder. Variations of this attack
            exist in each of the other formats, and is not solely a CBOR problem.
        </p>
    </div>

    <br>

    <div class="columns is-vcentered is-mobile">
        <div class="column is-two-fifths">
            <div class="box">
                <p class="has-text-centered"><strong>Attacker</strong></p>
                <div class="box">
                    <p class="has-text-centered is-clipped"><code>\x9f\x7f\x61\x61...</code></p>
                </div>
            </div>
        </div>

        <div class="column has-text-centered is-narrow is-one-fifth">
            <i class="fas fa-arrow-right fa-2x is-grey has-text-grey"></i>
            <p id="stream" class="has-text-centered is-clipped"><code>\x61\x61</code></p>
        </div>

        <div class="column is-two-fifthsd">
            <div class="box">
                <p class="has-text-centered"><strong>Server</strong></p>
                <div class="box">
                    <p id="memory" class="has-text-centered is-clipped"><code>[(_ "a", ...)]</code></p>
                </div>
            </div>
        </div>
    </div>

    <br>

    <p>
        There are a number of ways to mitigate these attacks, such as limiting the size of the data being decoded,
        limiting the depth of the data structure, or restricting the types allowed in the data structure (generally do not allow infinite maps and arrays).
        Network transport level limits on the number of bytes that can be sent by a single client for a logical request can also be used to mitigate these attacks, along with restricting
        the number of requests that can be sent by a single client in a given time period. <a href="https://en.wikipedia.org/wiki/Mutual_authentication#mTLS">mTLS</a> can also be used to 
        ensure that only trusted clients are able to connect to the server. While you're at it, add idle/read/write timeouts to mitigate
        <a href="https://en.wikipedia.org/wiki/Slowloris_(computer_security)">slow-loris</a>-like  attacks. Doing these in combination enables <a href="https://en.wikipedia.org/wiki/Defense_in_depth_(computing)">defense in depth</a>.
    </p>

    <br>

    <p>
        Additionally, CBOR implementations can be "<a href="https://www.rfc-editor.org/rfc/rfc7049#section-3.9">canonical</a>", which means that the same data structure will always be encoded to the same bytes. This is useful for signing and verifying 
        the integrity of the data (<a href="https://www.rfc-editor.org/rfc/rfc8152">COSE</a>). Implementations can also provide a "<a href="https://www.rfc-editor.org/rfc/rfc7049#section-3.10">strict mode</a>", which should be used when 
        decoding data from an untrusted source. This should ensure that invalid data is rejected and reliably reduced to a single interpreation. Also check what is the default behavior of the implementation, and if it is safe.
    </p>

    <br>

    <p>
        While investigating a popular Go CBOR package, <a href="https://github.com/fxamacker/cbor"><code>github.com/fxamacker/cbor/v2</code></a>, I found a number of
        security options to be <i>insecure by default</i> (such as <a href="https://pkg.go.dev/github.com/fxamacker/cbor/v2#DecOptions.DupMapKey"><code>DupMapKey</code></a> and 
        <a href="https://pkg.go.dev/github.com/fxamacker/cbor/v2#DecOptions.IndefLength"><code>IndefLength</code></a>). This is not so much a problem with the package itself,
        but rather with the usage of the package in specific contexts. Thankfully, the package documentation does <a href="https://github.com/fxamacker/cbor#quick-start">reccomend</a> 
        to use a <a href="https://pkg.go.dev/io#LimitedReader"><code>io.LimitReader</code></a>, and its various safety options, so read the documentation carefully.
    </p>

    <br>

    <p>
        Moreover, because of the flexibility the attacker has in choosing the data structure to send, there are a number of different ways a malicious message can be crafted. So, 
        even if using several security options, it may still possible to craft a large (or otherwise dangerous) message. Looking at the options used in
        <a href="https://github.com/go-webauthn/webauthn/blob/92fc402ba062c37788e600352092ee8e61dd9fc2/protocol/webauthncbor/webauthncbor.go"><code>github.com/go-webauthn/webauthn</code></a>
        for example:
    </p>

    <br>

    <CodeSnippet language="go" block="
    const nestedLevelsAllowed = 4
    
    var ctap2CBORDecMode, _ = cbor.DecOptions{'{'}
        DupMapKey:       cbor.DupMapKeyEnforcedAPF,
        MaxNestedLevels: nestedLevelsAllowed,
        IndefLength:     cbor.IndefLengthForbidden,
        TagsMd:          cbor.TagsForbidden,
    }.DecMode()
    "/>

    <br>

    <p>
        Indefinite length arrays and maps are not allowed, and duplicate map keys are not allowed. However, the defaults are still used for <i>other</i> options like
        <a href="https://pkg.go.dev/github.com/fxamacker/cbor/v2#DecOptions.MaxArrayElements"><code>MaxArrayElements</code></a> and
        <a href="https://pkg.go.dev/github.com/fxamacker/cbor/v2#DecOptions.MaxMapPairs"><code>MaxMapPairs</code></a> which defaults to <code>131072</code>, which is a fairly
        large number when combined with large values used in the data itself. However, in practice, it is <i>unlikely</i> that an attacker will be able to exploit
        this for WebAuthn. Instead, it would likely end up being a DoS attack at the JSON decoding level, because the CBOR decoding would happen after the JSON decoding (via 
        the base64 encoded <a href="https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAttestationResponse/attestationObject"><code>attestationObject</code></a>). 
        But, this isn't strictly true, and is still worth mentioning. Worst case, an attacker could use CBOR's slightly smaller size to send a larger message than JSON would 
        typically allow. Depending on how the implementation is written, and HTTP server configuration, this could be a problem. It depends.
    </p>

    <br>

    <p>
        Overall, CBOR is an interesting format that is worth looking into. If you're using it in a context where you need to decode data from an untrusted source,
        check out the decoder options that may (or may not be) available to you, and consider adding additional limits than what might be provided by default.
    </p>

    <br>

    <p>
        The attacks and mitigations mentioned here are not specific to CBOR, and can be applied to various other formats. Always be careful when decoding data from an 
        untrusted source, and always implement defense in depth while doing so.
    </p>

</section>

<ReadMore posts={blogPosts} random="true" exclude='["cbor"]'/>
<Footer/>

<style>
    #comparison tbody tr:nth-child(4) {
        border: 2px solid #485fc7;
    }

    @keyframes stream {
        0% { 
            transform: translateX(0); 
        }
        100% { 
            transform: translateX(100%); 
            opacity: 0;
        }
    }

    #stream {
        animation: stream 2s ease-in-out infinite; 
    }

    @keyframes memory {
        0% { 
            transform: scale(100%); 
        }
        100% {  
            transform: scale(115%); 
        }
    }

    #memory {
        animation: memory 10s ease-in infinite;
        border: 2px solid #e3342f;
        background-color: #f5f5f5;
        border-radius: 5px;
    }
</style>