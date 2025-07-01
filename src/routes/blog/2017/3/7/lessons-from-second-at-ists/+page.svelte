<script>
	// import metadata.json
	import metadata from './metadata.json';
	import BlogPost from '$lib/BlogPost.svelte';
	import BlogHeader from '$lib/BlogHeader.svelte';
	import Link from '$lib/Link.svelte';
	import Code from '$lib/Code.svelte';
	import Image1 from '$lib/assets/rit1.webp';
	import Image2 from '$lib/assets/rit2.webp';
	import Image3 from '$lib/assets/rit3.webp';
	import Image4 from '$lib/assets/rit4.webp';
	import Image5 from '$lib/assets/rit5.webp';
	import Image6 from '$lib/assets/rit6.webp';

	let title = metadata.title;
</script>

<BlogPost>
	<BlogHeader {title} date="3-7-2017">
		This is a re-publishing of my blog post originally posted on
		<Link
			url="https://medium.com/@KentGruber/lessons-from-second-place-at-the-information-security-talent-search-15-at-rit-412e19d885d7"
		>
			Medium</Link
		> while at Eastern Michigan University. I've since graduated and have been working as a security
		engineer at a large tech company, and find that the lessons I learned from the competition have stuck
		with me. I hope you find them useful as well; I know previous competitors have reached out to me
		to say they have. I've made some minor edits to the original post for clarity.
	</BlogHeader>

	<!-- TODO -->

	<br />

	<p>
		Today is the first day since coming in second place at the Information Security Talent Search,
		my favorite annual cyber attack/defend competition hosted at the Rochester Institute of
		Technology by SPARSA<sup>*</sup>.
	</p>

	<p class="text-gray-500 font-light text-sm mt-2">
		<sup>*</sup> SPARSA was renamed to
		<strong><Link url="https://www.ritsec.club/">RITSEC</Link></strong> after this was originally published.
	</p>

	<br />

	<p>
		I figured I’d share my experience for those who may participate in the future for these
		attack/defense style information security competitions in hopes I can share some insight into
		what it’s like to participate, or even hack the scoring engine:
	</p>

	<img src={Image1} alt="Competition Screenshot" class="w-full mt-4 rounded-lg" />
	<p class="text-center text-gray-500 font-light text-sm mt-2">
		<strong>This is what information security looks like.</strong> Posing for a camera because a team
		"paid" to make us do it as part of the event.
	</p>

	<br />

	<p>
		My team held our scored services uptime for longer than any other team thanks to — what I
		believe to be — some very smart thinking on our end and a few ballsy decisions we think ended up
		saving ourselves a lot of headaches.
	</p>

	<br />

	<p>
		We managed to successfully manage the chaos that is ISTS and I found this year's competition to
		be extremely exciting with the difference between first and second place teams being razor thin.
		Perhaps if just a few things may have gone better for some of the injects or possibly the CTF
		portion then we could have closed the gap, but we still kicked ass coming from behind.
	</p>

	<br />

	<h2 class="text-xl"><strong>Finding Vulnerabilities in the Scoring Engine</strong></h2>

	<p class="mt-2">
		This year was pretty exciting for me thanks to having found vulnerabilities within the scoring
		engine before the competition had even started this year.
	</p>

	<br />

	<p>
		In year's past, the ISTS scoring engine was written in Ruby and being maintained by <Link
			url="https://github.com/pwnbus/">pwnbus</Link
		>. I had actively started watching the repo in order to keep up to date with what might be in
		store for next year in regards to things like potential service checks to look out for, and any
		other information I could get from really understanding the details of the application that was
		ultimately scoring us during the competition.
	</p>

	<br />

	<h2 class="text-l"><strong>A New Engine, a New Hope for a Vulnerability</strong></h2>

	<p class="mt-2">
		This year would be different though. What ended up happening was that my active stalking of the <Link
			url="https://github.com/RITSPARSA/cyberengine"
		>
			scoring engine on GitHub</Link
		> was basically for nothing.
	</p>

	<br />

	<p>
		I was interested why on earth the scoring engine wasn’t being actively supported for months. It
		was because the scoring engine was being re-engineered.
	</p>

	<br />

	<p>
		Once I had found what I had suspected to be the <Link
			url="https://github.com/pwnbus/scoring_engine"
		>
			scoring engine for ISTS</Link
		>, I was very interested in what this new application was like. I told my team about my
		findings; and there was some skepticism on whether or not this would indeed be the scoring
		engine used for the competition we had been prepping for.
	</p>

	<br />

	<p>I figured it would be worth the time to hack. So I did, and I think it was.</p>

	<br />

	<p>
		The vulnerabilities during my testing up until the competition was working smoothly. I was able
		to keep up with the latest commits and keep an up-to-date version on my end to test for
		vulnerabilities, and to verify that there was no patching of vulnerabilities that I was
		definitely not planning on disclosing at the time. I was planning on sweeping the competition,
		kicking everyone off the scoreboard and locking white team out of their own application quite
		honestly.
	</p>

	<br />

	<p>
		Then, the night of the briefing before the competition, we were told that in fact the scoring
		engine would be off limits. So, I definitely couldn’t do anything with the problems I found.
	</p>

	<br />

	<p>
		I really wanted to take advantages of the stored cross-site scripting vulnerabilities I had
		found where players would be able to inject code into their IP address field which they could
		change in their scoring engine web application.
	</p>

	<br />

	<p>
		This would allow for certain pages in the web application to trigger that code when displaying
		that information as this raw user input was being trusted and being loaded like any other html
		on the page. This would allow for all sorts of nefarious things. Especially when coupled with
		social engineering attacks for white team where we could send them to legit page on their web
		application to help debug or something and take advantage of their session to do whatever we
		want. Or other teams. Whatever I wanted.
	</p>

	<br />

	<p>
		I ended up disclosing the vulnerabilities in person to the contributors to the project at the
		competition and gave a small talk on it at the end of competition before the award ceremony,
		hoping I could spark other people’s interest to both hack and contribute solutions to make the
		scoring engine better.
	</p>

	<br />

	<p>I still need to make an issue on that project to get that resolved.</p>

	<img src={Image2} alt="Exploit Screenshot" class="w-full mt-4 rounded-lg" />
	<p class="text-center text-gray-500 font-light text-sm mt-2">
		Example exploit screenshot during my testing.
	</p>

	<br />

	<h2 class="text-xl"><strong>Effective Blue Team Strategies</strong></h2>

	<p class="mt-2">
		If hacking the scoring engine wasn't going to win us the competition — and I had a feeling it
		wasn't going to be in scope, but, ya' know, I was going to do that anyway — then effective blue
		team strategies to keep ourselves afloat was going to be key.
	</p>

	<br />

	<img src={Image3} alt="Working as a team." class="w-full mt-4 rounded-lg" />
	<p class="text-center text-gray-500 font-light text-sm mt-2">
		Actively reviewing and determining our strategies at different points during the two days was
		very necessary.
	</p>

	<br />

	<p>
		A few months ago during competition practices I had been preaching one specific thing that I
		wanted to drill into everyone's minds: the first thing you do on your system is change your
		password at competition. Because, at a competition like ISTS, you're given default credentials.
		Those are really easy to auto-pwn and are specifically the type of low hanging fruit red team
		and other teams alike would love to take a bite of early on to secure their access on other
		team's systems.
	</p>

	<br />

	<p>
		However, I sort of had a revelation. Considering things like misconfigurations, backdoors, and
		the sheer hostility that is ISTS — I figured, the best possible defense we could have for
		defending against those things at the very beginning of competition would be to effectively kick
		ourselves off of that network. Which could be essentially done by turning off your computer's
		network interface.
	</p>

	<br />

	<p>
		Not only would this essentially give us an ease of mind for things like backdoors or default
		credentials for most situations. If our adversaries can literally not talk to us on the network
		— then, perfect.
	</p>

	<br />

	<p>
		This would allow us to take the time to go through those boxes, delete unnecessary users,
		changing passwords, enabling SSH keys, fortifying and auditing configuration files and give us a
		better chance of surviving on a network of other teams and professional hackers from owning our
		boxes.
	</p>

	<h2 class="text-m"><strong>The Cost of Kicking Yourself Off the Network</strong></h2>

	<p class="mt-2">
		When you have kicked yourself off the network — and you're being actively scored every X-amount
		of minutes to see if your service is working, then every minute you're not on the network with a
		working service, you're going to be punished for it.
	</p>

	<br />

	<p>
		This was very evident when we took longer securing services then we would have liked — but,
		there was some healthy skepticism on our part. Moreover, there was some instances of our an
		entire group of services being down at once for all teams. We were determined to avoid this at
		all costs.
	</p>

	<br />

	<p>
		At the very beginning of the competition we were the lowest scoring team where everyone else was
		starkly ahead of us at the very beginning because they were still being scored for their
		services because they were still on the network.
	</p>

	<br />

	<p>
		This would later to prove to pay off on our end, as we ended the competition battling it out for
		first place for scored services:
	</p>

	<br />

	<img src={Image4} alt="Scoreboard of the competition." class="w-full mt-4 rounded-lg" />
	<p class="text-center text-gray-500 font-light text-sm mt-2">
		We were team 8 ( Australia, in orange ) — It was themed, which is always neat.
	</p>

	<br />

	<h2 class="text-m"><strong>Golden Images</strong></h2>

	<p class="mt-2">
		We found one of the best possible ways to manage service uptime was to take advantage of our
		local ESXI environment that we were given in order to use features like snapshots in order to
		revert back working versions and pre-install packages and configurations we knew would be secure
		instead of relying on the boxes that was outside of our ability to administer on white team's
		ESXI. Because of this, and our team's diligence in understanding the technologies at our
		disposal, we were able to defend ourselves against a lot of chaos during the competition and
		migrate services to a known working host.
	</p>

	<br />

	<h2 class="text-m"><strong>Scripting</strong></h2>

	<p class="mt-2">
		Having several competent scripting teammates is one of the best possible assets during these
		kinds of competitions where automation for both red and blue team aspects are increasingly
		important. We were able to develop, deploy and manage our Windows and Linux services with custom
		scripts to help keep other teams out of our boxes and automate repetitive tasks including
		configurations and auditing.
	</p>

	<br />

	<p>
		There's also several instances at the competition where injects ( things you have to do to gain
		points ) where you will quite literally have to script in order to fulfill that challenge.
	</p>

	<br />

	<p>
		Whilst most of my time was spent advising other people's scripting at night during the
		competition, scripting at the event was where I was most utilized — usually where I see how far
		I can take just doing everything in BASH. I'm not sure that's really a tip or advice or
		anything. It's just generally a fun thing to do.
	</p>

	<br />

	<h2 class="text-m"><strong>Social Engineering Red Team</strong></h2>

	<p class="mt-2">
		During the end of the first day our team noticed that there was a problem in our Juniper SRX
		firewall for our team's web application which managed things like our money during the
		competition.
	</p>

	<br />

	<p>
		At this point we had gotten the GUI for the firewall up and running. None of us were super
		confident managing it all form the command-line ( though, that is how I found the policy in the
		end ). But there was nothing that we could find once we determined the source of the problem and
		ended up going back to our hotel that night not sure what in the firewall had been set.
	</p>

	<br />

	<p>
		The next morning while talking to Red Team, we mentioned our difficulties with managing our web
		application and while bragging justifiably, he wondered if we had found his policy that was
		preventing access. I'mma call that the luckiest social engineering ever.
	</p>

	<br />

	<p>
		Perfect, so I knew to look for a weird policy. At the start of the competition day two, I found
		a policy called “hi” which denied all traffic. Once we deleted and committed that, we were off
		and running again.
	</p>

	<br />

	<p>High-fives were had.</p>

	<br />

	<h2 class="text-m"><strong>Owning Mistakes and Embarrassments</strong></h2>

	<p class="mt-2">
		I made a lot of mistakes at this years event. I made mistakes the year before that; and I
		suspect I will do the same any other following year for anything else in life. The difference
		this year, for myself, was that I was basically working with that fact and not against that. I
		made most of my plans with plenty of room to mess up.
	</p>

	<br />

	<p>
		There was also the stuff they may not talk to you about: team chemistry — especially because
		this was our first competition in this group — we had some bugs to work out after the first day.
	</p>

	<br />

	<p>
		Communication and coordination became one of the biggest parts of our successes as a team; and
		almost all of our failures as a team was when we were failing in those aspects. Not because were
		were hacked. Not because our services were down. Simple communication issues like who was
		working on what CTF challenge or when injects needed to be submitted by. Those weren't the
		things we practiced as a group. When we nailed that down: <i>we killed it</i>.
	</p>

	<br />

	<h2 class="text-m"><strong>Karaoke Was Strangely Important</strong></h2>

	<p class="mt-2">
		Singing with <Link url="https://github.com/RustyBower">Rusty Bower</Link>
		and <Link url="https://github.com/zmallen">Zack Allen</Link> was amazing. That is all I have to say
		about that. Talking with them after and before was also really enjoyable. Everyone at the competition
		tend to be really awesome people.
	</p>

	<br />

	<img src={Image5} alt="Karaoke" class="w-full mt-4 rounded-lg" />
	<p class="text-center text-gray-500 font-light text-sm mt-2">
		We had to sing Bohemian Rhapsody — Red Team joined us. Then a member from every team did. Was
		not the only time we had to sing during the two days.
	</p>

	<br />

	<p>
		The best advice I can give to you about the hazing is to roll with it to an almost unnecessary
		level that it doesn't become embarrassing at your expense — and genuinely, at some points other
		teams looked more uncomfortable than we did with our improvised choreography. Asking people to
		join us was surprisingly awesome. Plus, we looked confident. Even when those were the points in
		the competition where we were being tested to see how comfortable we can take terrible
		situations and make them awesome.
	</p>

	<br />

	<h2 class="text-xl"><strong>How We Still Ended Up Winning</strong></h2>

	<p class="mt-2">
		I genuinely think that during the competition, despite any stress or problems we ran into as a
		group — we really did one thing exceedingly well I think: having fun. We were second place
		overall, <Link url="https://hackucf.org/">just behind</Link> a team with razor thin margins that
		practices — they told us — 40-something hours a week and have won competitions like national
		<Link url="http://www.nationalccdc.org/">CCDC</Link> for consecutive years in a row.
	</p>

	<br />

	<p>
		We were up against teams like <Link url="https://rpis.ec/">RPI</Link>
		who traditionally come to ISTS and destroy the competition and get
		<Link url="https://blog.cobaltstrike.com/2013/01/12/my-plug-for-rit-sparsas-ists/"
			>blogged about by Raphael Mudge</Link
		>
		for turning the competition into a botnet. After the competition, I was genuinely flattered when
		one of the RPI team members had reached out to me after the competition to join their IRC channel
		to collaborate. I thought that was pretty cool — or maybe they're going to try and steal all the
		strategies I've been discussing openly in this blog.
	</p>

	<br />

	<p>
		Regardless, both teams from <Link url="https://emuiasa.org/">Eastern Michigan University</Link>
		were scrappy as all hell — and proved we could hang with that level of skill, passion and talent.
		We didn't need the same amount of hours, or the same year-round attitude as as some of the other
		teams needed to compete. We came, we strategized, and we did a great job of conquering the challenges
		placed in front of us. Mostly importantly: we did it while having a whole lot of fun doing so.
	</p>

	<br />

	<img
		src={Image6}
		alt="Team celebrating first place victory in scored services at competition"
		class="w-full mt-4 rounded-lg"
	/>
	<p class="text-center text-gray-500 font-light text-sm mt-2">
		Terrible quality: but, this was the breakdown at the end for us. Ended in first place for scored
		services.
	</p>
</BlogPost>
