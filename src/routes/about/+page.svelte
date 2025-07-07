<script lang="ts">
	import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
	<title>About - Kent Gruber</title>
	<meta
		name="description"
		content="Learn more about Kent Gruber, security engineer and technical writer."
	/>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-slate-950">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
		<!-- Introduction -->
		<div class="mb-8 sm:mb-12 lg:mb-16">
			<div class="prose prose-sm sm:prose-base lg:prose-lg prose-slate dark:prose-invert mx-auto">
				<p>
					I'm a security engineer with a passion for discovering vulnerabilities, building secure
					systems, and sharing knowledge about cybersecurity practices. My work focuses on static
					analysis, vulnerability research, and helping teams build more secure software.
				</p>

				<p class="hidden sm:block">
					With expertise in various programming languages and security tools, I enjoy diving deep
					into code to understand how systems work and where they might be vulnerable. I believe
					that security is everyone's responsibility and strive to make security knowledge
					accessible to all developers.
				</p>

				<p class="hidden lg:block">
					When I'm not analyzing code or writing about security, you can find me contributing to
					open source projects, attending security conferences, or exploring new technologies that
					can make the internet a safer place.
				</p>
			</div>
		</div>

		<!-- Experience Section -->
		<div class="mb-8 sm:mb-12 lg:mb-16">
			<h2
				class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 lg:mb-8 text-center"
			>
				Experience
			</h2>
			<div class="space-y-4 sm:space-y-6">
				<!-- Temporal -->
				<div
					class="group bg-white dark:bg-slate-900 rounded-lg sm:rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
				>
					<div class="flex items-start space-x-3 sm:space-x-4">
						<div
							class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
						>
							T
						</div>
						<div class="flex-1 min-w-0">
							<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
								<div class="mb-2 sm:mb-0">
									<h3 class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
										Staff Application Security Engineer
									</h3>
									<div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1">
										<p class="text-purple-600 dark:text-purple-400 font-medium">Temporal</p>
										<span class="hidden sm:inline text-slate-400">•</span>
										<span
											class="hidden sm:flex text-sm text-slate-500 dark:text-slate-400 items-center space-x-1"
										>
											<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
												<path
													d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2M12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5Z"
												/>
											</svg>
											<span>Remote</span>
										</span>
									</div>
								</div>
								<span
									class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 self-start"
								>
									Current
								</span>
							</div>
							<p
								class="text-slate-600 dark:text-slate-400 text-sm mb-2 sm:mb-3 flex items-center space-x-1"
							>
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M9 11H7V9H9V11M13 11H11V9H13V11M17 11H15V9H17V11M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V8H19V19Z"
									/>
								</svg>
								<span>July 2025 - Present</span>
							</p>
							<p class="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
								Working on security initiatives for the durable execution platform that powers
								mission-critical applications.
							</p>
						</div>
					</div>
				</div>

				<!-- HashiCorp -->
				<div
					class="group bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
				>
					<div class="flex items-start space-x-3 sm:space-x-4">
						<div
							class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
						>
							H
						</div>
						<div class="flex-1 min-w-0">
							<div class="mb-2">
								<h3 class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
									Senior Product Security Engineer
								</h3>
								<div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1">
									<p class="text-slate-800 dark:text-slate-200 font-medium">HashiCorp</p>
									<span class="hidden sm:inline text-slate-400">•</span>
									<span
										class="hidden sm:flex text-sm text-slate-500 dark:text-slate-400 items-center space-x-1"
									>
										<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2M12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5Z"
											/>
										</svg>
										<span>Remote</span>
									</span>
								</div>
							</div>
							<p
								class="text-slate-600 dark:text-slate-400 text-sm mb-3 flex items-center space-x-1"
							>
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M9 11H7V9H9V11M13 11H11V9H13V11M17 11H15V9H17V11M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V8H19V19Z"
									/>
								</svg>
								<span>Aug 2019 - Jun 2025</span>
								<span class="hidden sm:inline text-slate-400">•</span>
								<span class="hidden sm:inline text-slate-500 dark:text-slate-400">6 yrs</span>
							</p>
							<div class="space-y-2">
								<p class="text-slate-700 dark:text-slate-300 leading-relaxed">
									Partnered with engineering teams to deliver secure products using a risk-based
									approach.
								</p>
								<div
									class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-100 dark:border-slate-700/50"
								>
									<p class="text-sm text-slate-600 dark:text-slate-400">
										<span class="font-medium text-slate-900 dark:text-white">Key achievements:</span
										>
										Led code reviews that identified CVEs for XSS, MITM, DoS, and SSRF vulnerabilities.
										Integrated security scanning into CI/CD pipelines and drove adoption of tools like
										Snyk, CodeQL, Semgrep, and Wiz. Mentored engineers and delivered solutions for authentication,
										monitoring, and supply chain security.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Mahindra Automotive -->
				<div
					class="group bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
				>
					<div class="flex items-start space-x-3 sm:space-x-4">
						<div
							class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
						>
							M
						</div>
						<div class="flex-1 min-w-0">
							<div class="mb-2">
								<h3 class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
									Software Engineer (Contractor)
								</h3>
								<div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1">
									<p class="text-red-600 dark:text-red-400 font-medium">Mahindra Automotive</p>
									<span class="hidden sm:inline text-slate-400">•</span>
									<span
										class="hidden sm:flex text-sm text-slate-500 dark:text-slate-400 items-center space-x-1"
									>
										<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2M12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5Z"
											/>
										</svg>
										<span>Auburn Hills, MI</span>
									</span>
								</div>
							</div>
							<p
								class="text-slate-600 dark:text-slate-400 text-sm mb-3 flex items-center space-x-1"
							>
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M9 11H7V9H9V11M13 11H11V9H13V11M17 11H15V9H17V11M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V8H19V19Z"
									/>
								</svg>
								<span>Dec 2016 - Aug 2019</span>
								<span class="hidden sm:inline text-slate-400">•</span>
								<span class="hidden sm:inline text-slate-500 dark:text-slate-400">2 yrs 9 mos</span>
							</p>
							<p class="text-slate-700 dark:text-slate-300 leading-relaxed">
								Developed applications using <span
									class="font-medium text-slate-900 dark:text-white">OpenFOAM</span
								> to orchestrate computational fluid dynamics (CFD) simulations for efficiency and cost
								savings.
							</p>
						</div>
					</div>
				</div>

				<!-- Web & Moore -->
				<div
					class="group bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
				>
					<div class="flex items-start space-x-3 sm:space-x-4">
						<div
							class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
						>
							W
						</div>
						<div class="flex-1 min-w-0">
							<div class="mb-2">
								<h3 class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
									Security Analyst
								</h3>
								<div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1">
									<p class="text-blue-600 dark:text-blue-400 font-medium">Web & Moore</p>
									<span class="hidden sm:inline text-slate-400">•</span>
									<span
										class="hidden sm:flex text-sm text-slate-500 dark:text-slate-400 items-center space-x-1"
									>
										<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2M12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5Z"
											/>
										</svg>
										<span>Remote</span>
									</span>
								</div>
							</div>
							<p
								class="text-slate-600 dark:text-slate-400 text-sm mb-3 flex items-center space-x-1"
							>
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M9 11H7V9H9V11M13 11H11V9H13V11M17 11H15V9H17V11M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V8H19V19Z"
									/>
								</svg>
								<span>Aug 2015 - Aug 2016</span>
								<span class="hidden sm:inline text-slate-400">•</span>
								<span class="hidden sm:inline text-slate-500 dark:text-slate-400">1 yr</span>
							</p>
							<p class="text-slate-700 dark:text-slate-300 leading-relaxed">
								Handled incident response activities for cloud infrastructure. Automated
								remediations, log analysis, and backups. Authored comprehensive security reports.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Education Section -->
		<div class="mb-8 sm:mb-12 lg:mb-16">
			<h2
				class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 lg:mb-8 text-center"
			>
				Education
			</h2>
			<div class="space-y-6 sm:space-y-8">
				<!-- Eastern Michigan University -->
				<div
					class="bg-white dark:bg-slate-900 rounded-lg sm:rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
				>
					<div class="flex items-start space-x-3 sm:space-x-4">
						<!-- University icon with graduation cap -->
						<div
							class="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0"
						>
							<svg class="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 3L1 9L12 15L21 11.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
								/>
							</svg>
						</div>

						<!-- Content -->
						<div class="flex-1 min-w-0">
							<h3 class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
								Eastern Michigan University
							</h3>
							<p class="text-green-600 dark:text-green-400 font-medium text-sm sm:text-base">
								Bachelor of Science in Information Assurance & Cyber Defense · <span
									class="hidden sm:inline">Ypsilanti, MI</span
								>
							</p>
							<p class="text-slate-600 dark:text-slate-400 text-sm mb-3 sm:mb-4">
								August 2013 - 2019
							</p>

							<!-- Enhanced content organization -->
							<div class="space-y-2 sm:space-y-3">
								<div class="flex items-start space-x-2">
									<div class="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
									<p class="text-slate-700 dark:text-slate-300 text-sm">
										Competed in attack and defense collegiate cyber defense competitions like
										<span class="font-medium text-slate-900 dark:text-white">ISTS</span> and
										<span class="font-medium text-slate-900 dark:text-white">CCDC</span>
									</p>
								</div>

								<div class="hidden sm:flex items-start space-x-2">
									<div class="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
									<p class="text-slate-700 dark:text-slate-300 text-sm">
										<span class="font-medium text-slate-900 dark:text-white">Activities:</span> Information
										Assurance Student Association, Women in Information Assurance Ally
									</p>
								</div>

								<div
									class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 mt-3 border border-slate-100 dark:border-slate-700/50"
								>
									<div class="flex items-start space-x-2">
										<svg
											class="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z"
											/>
										</svg>
										<p class="text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
											<span class="font-medium text-slate-900 dark:text-white"
												>Center of Academic Excellence</span
											>
											in Information Assurance<span class="hidden sm:inline"
												>, sponsored by the National Security Agency</span
											>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Projects Section -->
		<div class="mb-8 sm:mb-12 lg:mb-16">
			<h2
				class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center"
			>
				Notable Projects
			</h2>
			<p
				class="text-sm sm:text-base text-slate-600 dark:text-slate-400 text-center mb-6 sm:mb-8 max-w-2xl mx-auto"
			>
				A curated selection of open-source tools and libraries spanning security research,
				cryptography, and developer productivity
			</p>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				<!-- CLI for OpenAI -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
				>
					<div class="flex items-center mb-4">
						<div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142-.0852 4.783-2.7582a.7712.7712 0 0 0 .7806 0l5.8428 3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142.0852-4.7735 2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
								/>
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-slate-900 dark:text-white ml-3">
							CLI for OpenAI
						</h3>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-4">
						Command-line interface for OpenAI's GPT models with Ollama support. Includes
						conversation history, custom prompts, and multi-model support.
					</p>
					<a
						href="https://github.com/picatz/openai"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
							/>
						</svg>
						View on GitHub
					</a>
				</div>

				<!-- Go Taint Analysis -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
				>
					<div class="flex items-center mb-4">
						<div
							class="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center text-white"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M11.2 8.3L10.9 5L8.7 6.3c-.5.3-.9.2-1.1-.3s.2-.9.7-1.2L12 2.5c.3-.2.8-.2 1 0l3.8 2.2c.5.3.9.8.7 1.2s-.6.6-1.1.3L14.1 5l-.3 3.3c0 .4-.4.7-.8.7s-.8-.3-.8-.7zM7 9c.4 0 .8.3.8.7v4.6c0 .4-.4.7-.8.7s-.8-.3-.8-.7V9.7c0-.4.4-.7.8-.7zm10 0c.4 0 .8.3.8.7v4.6c0 .4-.4.7-.8.7s-.8-.3-.8-.7V9.7c0-.4.4-.7.8-.7zm-5 6c.4 0 .8.3.8.7v2.6c0 .4-.4.7-.8.7s-.8-.3-.8-.7v-2.6c0-.4.4-.7.8-.7z"
								/>
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-slate-900 dark:text-white ml-3">
							Go Taint Analysis
						</h3>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-4">
						Static analysis library for Go using SSA representation to track data flow. Detects SQL
						injection, XSS, and log injection vulnerabilities through control flow analysis.
					</p>
					<a
						href="https://github.com/picatz/taint"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
							/>
						</svg>
						View on GitHub
					</a>
				</div>

				<!-- Shodanz -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
				>
					<div class="flex items-center mb-4">
						<div
							class="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M6 2l2 4h8l2-4H6zM4.5 7L2 12l10 10L22 12l-2.5-5h-15zM12 19.5L5.5 12h13L12 19.5z"
								/>
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-slate-900 dark:text-white ml-3">Shodanz</h3>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-4">
						Ruby client for Shodan's API. Provides async streaming, exploit database access,
						honeypot detection, and real-time banner collection with error handling and rate
						limiting.
					</p>
					<a
						href="https://github.com/picatz/shodanz"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
							/>
						</svg>
						View on GitHub
					</a>
				</div>

				<!-- DoH -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
				>
					<div class="flex items-center mb-4">
						<div
							class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
								/>
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-slate-900 dark:text-white ml-3">DoH</h3>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-4">
						DNS over HTTPS client supporting Google, Cloudflare, and Quad9. Features concurrent
						query processing, JSON output, and Unix pipeline integration for DNS analysis.
					</p>
					<a
						href="https://github.com/picatz/doh"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
							/>
						</svg>
						View on GitHub
					</a>
				</div>

				<!-- JOSE -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
				>
					<div class="flex items-center mb-4">
						<div
							class="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center text-white"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-slate-900 dark:text-white ml-3">JOSE</h3>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-4">
						Go implementation of JSON Object Signing and Encryption standards. Supports HMAC, RSA,
						ECDSA, and EdDSA algorithms with RFC compliance for token generation and verification.
					</p>
					<a
						href="https://github.com/picatz/jose"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
							/>
						</svg>
						View on GitHub
					</a>
				</div>

				<!-- Cube -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
				>
					<div class="flex items-center mb-4">
						<div
							class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M18.9 6.9l-2.8-2.8c-.4-.4-1-.4-1.4 0L12 6.8 9.3 4.1c-.4-.4-1-.4-1.4 0L5.1 6.9c-.4.4-.4 1 0 1.4L7.8 11l-2.7 2.7c-.4.4-.4 1 0 1.4l2.8 2.8c.4.4 1 .4 1.4 0L12 15.2l2.7 2.7c.4.4 1 .4 1.4 0l2.8-2.8c.4-.4.4-1 0-1.4L16.2 11l2.7-2.7c.4-.4.4-1 0-1.4zM12 13c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"
								/>
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-slate-900 dark:text-white ml-3">Cube</h3>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-4">
						Chrome extension using the webRequest API for URL filtering. Blocks ads and trackers
						through pattern matching with network interception.
					</p>
					<a
						href="https://github.com/picatz/cube"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
							/>
						</svg>
						View on GitHub
					</a>
				</div>

				<!-- GitHub Profile Call to Action -->
				<div
					class="group bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-300 p-8 lg:col-span-3 md:col-span-2 relative overflow-hidden"
				>
					<!-- Background Pattern -->
					<div class="absolute inset-0 opacity-5 dark:opacity-10">
						<svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<pattern
									id="github-pattern"
									x="0"
									y="0"
									width="20"
									height="20"
									patternUnits="userSpaceOnUse"
								>
									<circle cx="1" cy="1" r="1" fill="currentColor" />
								</pattern>
							</defs>
							<rect width="100" height="100" fill="url(#github-pattern)" />
						</svg>
					</div>

					<!-- Header with Icon -->
					<div class="flex items-center mb-4 relative z-10">
						<div
							class="w-10 h-10 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300"
						>
							<svg
								class="w-6 h-6 text-white dark:text-slate-900"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
								/>
							</svg>
						</div>
						<h3 class="text-xl font-bold text-slate-900 dark:text-white">Explore More Projects</h3>
					</div>

					<!-- Description -->
					<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed relative z-10">
						These projects represent a selection from hundreds of repositories. Includes security
						research tools, vulnerability scanners, network utilities, browser extensions,
						cryptographic libraries, and experimental prototypes.
					</p>

					<!-- Call to Action Button -->
					<div class="relative z-10">
						<a
							href="https://github.com/picatz"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black dark:from-slate-700 dark:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
						>
							<svg
								class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
								/>
							</svg>
							<span>Check out @picatz on GitHub</span>
							<svg
								class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- CVEs & Security Research -->
		<div class="mb-8 sm:mb-12 lg:mb-16">
			<h2
				class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center"
			>
				CVEs & Security Research
			</h2>
			<p
				class="text-sm sm:text-base text-slate-600 dark:text-slate-400 text-center mb-6 sm:mb-8 max-w-3xl mx-auto"
			>
				Disclosed vulnerabilities and security research contributions with CVSS severity ratings
			</p>
			<div
				class="bg-white dark:bg-slate-900 rounded-lg sm:rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6"
			>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
					<!-- CVE-2020-25864 (Medium - 6.1) -->
					<a
						href="https://nvd.nist.gov/vuln/detail/CVE-2020-25864"
						target="_blank"
						rel="noopener noreferrer"
						class="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 border border-orange-200 dark:border-orange-700 rounded-lg p-4 hover:shadow-md hover:shadow-orange-200/50 dark:hover:shadow-orange-900/20 transition-all duration-300 cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
					>
						<div class="relative z-10 flex justify-between items-center">
							<span class="font-mono text-sm text-slate-700 dark:text-slate-300"
								>CVE-2020-25864</span
							>
							<span
								class="px-2 py-1 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-800/40 dark:to-orange-700/30 text-orange-800 dark:text-orange-200 rounded text-xs font-medium shadow-sm"
								>6.1</span
							>
						</div>
					</a>

					<!-- CVE-2020-10944 (Medium - 5.4) -->
					<a
						href="https://nvd.nist.gov/vuln/detail/CVE-2020-10944"
						target="_blank"
						rel="noopener noreferrer"
						class="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/10 border border-orange-200 dark:border-orange-700 rounded-lg p-4 hover:shadow-md hover:shadow-orange-200/50 dark:hover:shadow-orange-900/20 transition-all duration-300 cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
					>
						<div class="relative z-10 flex justify-between items-center">
							<span class="font-mono text-sm text-slate-700 dark:text-slate-300"
								>CVE-2020-10944</span
							>
							<span
								class="px-2 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-800/40 dark:to-yellow-800/30 text-orange-700 dark:text-orange-200 rounded text-xs font-medium shadow-sm"
								>5.4</span
							>
						</div>
					</a>

					<!-- CVE-2020-7218 (High - 7.5) -->
					<a
						href="https://nvd.nist.gov/vuln/detail/CVE-2020-7218"
						target="_blank"
						rel="noopener noreferrer"
						class="group relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10 border border-red-200 dark:border-red-700 rounded-lg p-4 hover:shadow-md hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-300 cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
					>
						<div class="relative z-10 flex justify-between items-center">
							<span class="font-mono text-sm text-slate-700 dark:text-slate-300">CVE-2020-7218</span
							>
							<span
								class="px-2 py-1 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-800/40 dark:to-red-700/30 text-red-800 dark:text-red-200 rounded text-xs font-medium shadow-sm"
								>7.5</span
							>
						</div>
					</a>

					<!-- CVE-2020-7219 (High - 7.5) -->
					<a
						href="https://nvd.nist.gov/vuln/detail/CVE-2020-7219"
						target="_blank"
						rel="noopener noreferrer"
						class="group relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10 border border-red-200 dark:border-red-700 rounded-lg p-4 hover:shadow-md hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-300 cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
					>
						<div class="relative z-10 flex justify-between items-center">
							<span class="font-mono text-sm text-slate-700 dark:text-slate-300">CVE-2020-7219</span
							>
							<span
								class="px-2 py-1 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-800/40 dark:to-red-700/30 text-red-800 dark:text-red-200 rounded text-xs font-medium shadow-sm"
								>7.5</span
							>
						</div>
					</a>

					<!-- CVE-2021-32575 (Medium - 6.7) -->
					<a
						href="https://nvd.nist.gov/vuln/detail/CVE-2021-32575"
						target="_blank"
						rel="noopener noreferrer"
						class="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 border border-orange-200 dark:border-orange-700 rounded-lg p-4 hover:shadow-md hover:shadow-orange-200/50 dark:hover:shadow-orange-900/20 transition-all duration-300 cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
					>
						<div class="relative z-10 flex justify-between items-center">
							<span class="font-mono text-sm text-slate-700 dark:text-slate-300"
								>CVE-2021-32575</span
							>
							<span
								class="px-2 py-1 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-800/40 dark:to-orange-700/30 text-orange-800 dark:text-orange-200 rounded text-xs font-medium shadow-sm"
								>6.7</span
							>
						</div>
					</a>

					<!-- CVE-2021-28156 (High - 7.5) -->
					<a
						href="https://nvd.nist.gov/vuln/detail/CVE-2021-28156"
						target="_blank"
						rel="noopener noreferrer"
						class="group relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10 border border-red-200 dark:border-red-700 rounded-lg p-4 hover:shadow-md hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-300 cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
					>
						<div class="relative z-10 flex justify-between items-center">
							<span class="font-mono text-sm text-slate-700 dark:text-slate-300"
								>CVE-2021-28156</span
							>
							<span
								class="px-2 py-1 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-800/40 dark:to-red-700/30 text-red-800 dark:text-red-200 rounded text-xs font-medium shadow-sm"
								>7.5</span
							>
						</div>
					</a>

					<!-- CVE-2022-30321 (High - 8.6) -->
					<a
						href="https://nvd.nist.gov/vuln/detail/CVE-2022-30321"
						target="_blank"
						rel="noopener noreferrer"
						class="group relative overflow-hidden bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/20 border border-red-300 dark:border-red-600 rounded-lg p-4 hover:shadow-md hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-300 cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
					>
						<div class="relative z-10 flex justify-between items-center">
							<span class="font-mono text-sm text-slate-700 dark:text-slate-300"
								>CVE-2022-30321</span
							>
							<span
								class="px-2 py-1 bg-gradient-to-r from-red-200 to-red-300 dark:from-red-700/50 dark:to-red-600/40 text-red-900 dark:text-red-100 rounded text-xs font-medium shadow-sm"
								>8.6</span
							>
						</div>
					</a>

					<!-- CVE-2022-30322 (High - 8.6) -->
					<a
						href="https://nvd.nist.gov/vuln/detail/CVE-2022-30322"
						target="_blank"
						rel="noopener noreferrer"
						class="group relative overflow-hidden bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/20 border border-red-300 dark:border-red-600 rounded-lg p-4 hover:shadow-md hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-300 cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
					>
						<div class="relative z-10 flex justify-between items-center">
							<span class="font-mono text-sm text-slate-700 dark:text-slate-300"
								>CVE-2022-30322</span
							>
							<span
								class="px-2 py-1 bg-gradient-to-r from-red-200 to-red-300 dark:from-red-700/50 dark:to-red-600/40 text-red-900 dark:text-red-100 rounded text-xs font-medium shadow-sm"
								>8.6</span
							>
						</div>
					</a>

					<!-- CVE-2022-30323 (High - 8.6) -->
					<a
						href="https://nvd.nist.gov/vuln/detail/CVE-2022-30323"
						target="_blank"
						rel="noopener noreferrer"
						class="group relative overflow-hidden bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/20 border border-red-300 dark:border-red-600 rounded-lg p-4 hover:shadow-md hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-300 cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
					>
						<div class="relative z-10 flex justify-between items-center">
							<span class="font-mono text-sm text-slate-700 dark:text-slate-300"
								>CVE-2022-30323</span
							>
							<span
								class="px-2 py-1 bg-gradient-to-r from-red-200 to-red-300 dark:from-red-700/50 dark:to-red-600/40 text-red-900 dark:text-red-100 rounded text-xs font-medium shadow-sm"
								>8.6</span
							>
						</div>
					</a>
				</div>

				<!-- Note on CVSS Scores -->
				<div
					class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4"
				>
					<div class="flex items-start space-x-3">
						<div class="text-amber-600 dark:text-amber-400 text-lg">⚠️</div>
						<div>
							<p class="text-sm text-amber-800 dark:text-amber-200 font-medium mb-1">
								A Note on CVSS Scores
							</p>
							<p class="text-xs text-amber-700 dark:text-amber-300">
								CVSS scores provide baseline severity ratings but have limited value in isolation.
								Effective vulnerability management requires contextualizing these scores within your
								specific environment, threat model, and risk tolerance to make informed security
								decisions.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Conference Talks & Presentations -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">
				Conference Talks & Presentations
			</h2>
			<p class="text-slate-600 dark:text-slate-400 text-center mb-8 max-w-3xl mx-auto">
				Speaking engagements covering security research, development practices, and emerging
				technologies
			</p>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<!-- Violent Ruby Talk -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 p-6 group"
				>
					<div class="flex items-start space-x-4 mb-4">
						<div
							class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8 5v14l11-7z" />
							</svg>
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
								Violent Ruby: A Talk for Hackers, Forensic Analysts, Penetration Testers and
								Security
							</h3>
							<p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Converge 2017</p>
						</div>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
						Deep dive into Ruby's potential for offensive security research. Explores attack
						methodologies, forensic capabilities, and penetration testing techniques using Ruby's
						powerful ecosystem for security professionals and researchers.
					</p>
					<a
						href="https://www.youtube.com/watch?v=Tea6D7uMC7w"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors duration-200"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
						Watch on YouTube
					</a>
				</div>

				<!-- Building with Generative AI -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 p-6 group"
				>
					<div class="flex items-start space-x-4 mb-4">
						<div
							class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
								/>
							</svg>
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
								Building with Generative AI
							</h3>
							<p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Local Security Meetup</p>
						</div>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
						Comprehensive exploration of generative AI integration in modern development workflows.
						Covers practical implementation strategies, security considerations, and real-world
						applications for leveraging AI tools in enterprise environments.
					</p>
					<a
						href="https://www.youtube.com/watch?v=sId-qdw_zuY"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
						Watch on YouTube
					</a>
				</div>

				<!-- Linters Talk -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 p-6 group"
				>
					<div class="flex items-start space-x-4 mb-4">
						<div
							class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
								Linters: Not just for belly buttons!
							</h3>
							<p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Local Security Meetup</p>
						</div>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
						Entertaining yet technical deep-dive into static analysis tools and code quality
						automation. Demonstrates the critical role of linting in security-focused development,
						with practical examples of catching vulnerabilities before they reach production.
					</p>
					<a
						href="https://www.youtube.com/watch?v=Ki_CZ--n6dA"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors duration-200"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
						Watch on YouTube
					</a>
				</div>

				<!-- DIY Network-based IDS -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 p-6 group"
				>
					<div class="flex items-start space-x-4 mb-4">
						<div
							class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
								/>
							</svg>
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
								DIY Network-based IDS
							</h3>
							<p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Local Security Meetup</p>
						</div>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
						Hands-on workshop for building custom network intrusion detection systems from scratch.
						Covers packet analysis, signature development, and deployment architectures with
						practical examples using open-source tools and custom implementations.
					</p>
					<a
						href="https://www.youtube.com/watch?v=WQGM70At-AE"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
						Watch on YouTube
					</a>
				</div>

				<!-- InSpec Compliance as Code -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 p-6 group"
				>
					<div class="flex items-start space-x-4 mb-4">
						<div
							class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
								/>
							</svg>
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
								InSpec Compliance as Code
							</h3>
							<p class="text-sm text-slate-500 dark:text-slate-400 mb-1">GrrCon 2018</p>
						</div>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
						Comprehensive framework for automating security compliance through Infrastructure as
						Code. Demonstrates InSpec's capabilities for continuous compliance monitoring, policy
						enforcement, and security automation across cloud and on-premises environments.
					</p>
					<a
						href="https://www.youtube.com/watch?v=rF-K-JwNPZU"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors duration-200"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
						Watch on YouTube
					</a>
				</div>

				<!-- Hack like a Gopher -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 p-6 group"
				>
					<div class="flex items-start space-x-4 mb-4">
						<div
							class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
								/>
							</svg>
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
								Hack like a Gopher
							</h3>
							<p class="text-sm text-slate-500 dark:text-slate-400 mb-1">BSides Detroit 2018</p>
						</div>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
						Comprehensive introduction to Go programming for offensive security applications.
						Demonstrates Go's strengths in building high-performance security tools, network
						scanners, and exploit development with practical code examples and real-world use cases.
					</p>
					<a
						href="https://www.youtube.com/watch?v=DM4w3HgV4ks"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
						Watch on YouTube
					</a>
				</div>

				<!-- Plotting Hackers -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 p-6 group"
				>
					<div class="flex items-start space-x-4 mb-4">
						<div
							class="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								/>
							</svg>
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
								Plotting Hackers, Visualizing Attack Patterns
							</h3>
							<p class="text-sm text-slate-500 dark:text-slate-400 mb-1">BSides Detroit 2017</p>
						</div>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
						Advanced techniques for transforming complex security data into actionable intelligence
						through visualization. Explores geographic mapping, timeline analysis, and pattern
						recognition methodologies to enhance threat detection and incident response
						capabilities.
					</p>
					<a
						href="https://www.youtube.com/watch?v=_qo779phGjU"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors duration-200"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
						Watch on YouTube
					</a>
				</div>

				<!-- Fuzzing Nomad with Nomad -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 p-6 group"
				>
					<div class="flex items-start space-x-4 mb-4">
						<div
							class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
								Fuzzing Nomad with Nomad
							</h3>
							<p class="text-sm text-slate-500 dark:text-slate-400 mb-1">HashiDays 2019</p>
						</div>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
						Innovative approach to testing HashiCorp Nomad's resilience using the platform itself to
						orchestrate fuzz testing workloads. Demonstrates how to leverage Nomad's orchestration
						capabilities for automated security testing and vulnerability discovery in distributed
						systems.
					</p>
					<a
						href="https://www.youtube.com/watch?v=2h3KtuNhPvU"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
						Watch on YouTube
					</a>
				</div>

				<!-- Gopher's Guide to the Universe -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 p-6 group"
				>
					<div class="flex items-start space-x-4 mb-4">
						<div
							class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
								Gopher's Guide to the Universe
							</h3>
							<p class="text-sm text-slate-500 dark:text-slate-400 mb-1">
								OWASP Oakland County 2020
							</p>
						</div>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
						Comprehensive exploration of Go programming language from a security perspective. Covers
						advanced Go concepts, security best practices, and practical applications for building
						robust security tools and applications in the Go ecosystem.
					</p>
					<a
						href="https://www.youtube.com/watch?v=IGIEMUfTTHs"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors duration-200"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
						Watch on YouTube
					</a>
				</div>

				<!-- Roku Roll: Rickrolling all the Rokus -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 p-6 group"
				>
					<div class="flex items-start space-x-4 mb-4">
						<div
							class="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
								Roku Roll: Rickrolling all the Rokus
							</h3>
							<p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Converge 2019</p>
						</div>
					</div>
					<p class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
						Creative security research demonstrating vulnerabilities in Roku streaming devices
						through an entertaining approach. Explores network-based attacks, device manipulation
						techniques, and the intersection of security research with popular culture and humor.
					</p>
					<a
						href="https://www.youtube.com/watch?v=TIWYGIn_YmU"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium transition-colors duration-200"
					>
						<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
						Watch on YouTube
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<Footer />
