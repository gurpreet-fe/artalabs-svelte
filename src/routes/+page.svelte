<script lang="ts">
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Navigation } from 'swiper/modules';
	import 'swiper/css';
	import emailjs from '@emailjs/browser';

	let aboutSection: HTMLElement;
	let servicesSection: HTMLElement;
	let servicesAside: HTMLElement;

	let workSection: HTMLElement;
	let templatesSection: HTMLElement;
	let templatesAside: HTMLElement;

	onMount(() => {
		new Swiper('.swiper', {
			modules: [Navigation],
			autoHeight: true,
			navigation: {
				prevEl: '.carousel-button-prev',
				nextEl: '.carousel-button-next',
			},
			spaceBetween: 20,
			slidesPerView: 'auto',
		});

		let navItemTriggers: Array<HTMLElement> = Array.from(
			document.querySelectorAll('[data-nav-item-trigger]')
		);
		let navItemTargets: Array<HTMLElement> = Array.from(
			document.querySelectorAll('[data-nav-item-target]')
		);

		for (let i = 0; i < navItemTriggers.length; i++) {
			const navItemValue = navItemTriggers[i].dataset.navItemTrigger;
			const navItemTrigger = navItemTriggers[i];
			const navItemTarget = navItemTargets.find((el) => el.dataset.navItemTarget === navItemValue)!;

			navItemTrigger.addEventListener('click', (ev) => {
				const triggerItemIndex = navItemTriggers.indexOf(navItemTrigger);
				const activeItemIndex = navItemTriggers.findIndex((el) =>
					el.classList.contains('bg-black')
				);

				if (activeItemIndex !== -1 && activeItemIndex !== triggerItemIndex) {
					navItemTriggers[activeItemIndex].classList.toggle('bg-black');
					navItemTriggers[activeItemIndex].classList.toggle('text-white');
					navItemTargets[activeItemIndex].classList.toggle('hidden');
				}

				navItemTrigger.classList.toggle('bg-black');
				navItemTrigger.classList.toggle('text-white');
				navItemTarget.classList.toggle('hidden');
			});
		}

		servicesAside.addEventListener('click', () => {
			servicesAside.classList.toggle('bg-black');
			servicesAside.classList.toggle('text-white');

			const icon = servicesAside.getElementsByTagName('i')[0];
			icon.classList.toggle('fa-arrow-left');
			icon.classList.toggle('fa-arrow-right');

			aboutSection.classList.toggle('hidden');
			servicesSection.classList.toggle('hidden');
		});

		templatesAside.addEventListener('click', () => {
			templatesAside.classList.toggle('bg-black');
			templatesAside.classList.toggle('text-white');

			const icon = templatesAside.getElementsByTagName('i')[0];
			icon.classList.toggle('fa-arrow-left');
			icon.classList.toggle('fa-arrow-right');

			workSection.classList.toggle('hidden');
			templatesSection.classList.toggle('hidden');
		});
	});

	function sendEmail(ev) {
		emailjs
			.sendForm(
				import.meta.env.VITE_EMAIL_SERVICE_ID,
				import.meta.env.VITE_EMAIL_TEMPLATE_ID,
				ev.target,
				import.meta.env.VITE_EMAIL_PUBLIC_KEY
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);
	}
</script>

<div class="md:hidden">
	<div class="mt-2 border-y">
		<div class="container">
			<h1 class=" text-center text-5xl">ARTA LABS</h1>
		</div>
	</div>

	<div>
		<div class="flex border-b">
			<section class=" p-3" bind:this={aboutSection}>
				<div class="mb-3 text-xs">
					<i class="fa-solid fa-circle fa-2xs" />
					About
				</div>
				<div>
					Arta Labs are a freelance Web Development & UI/UX Design lab based in the UK, crafting
					bespoke and functional experiences for clients worldwide.
				</div>
			</section>
			<section
				class="hidden w-[calc(100%-1.75rem)] flex-grow bg-black p-3 text-white"
				bind:this={servicesSection}>
				<div class="swiper">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<div class="mb-4">
								We specialise in producing high quality websites and designs for digital products.
							</div>
							<div class="mb-4">
								Depending on what you need, we can offer 4 different ways to work with us:
							</div>
							<div class="text-center">(Swiper left)</div>
						</div>
						<div class="swiper-slide">
							<p class="mb-4 font-bold">(01) Design Only</p>
							<p class="mb-4">
								Already have someone to implement your vision? If you just need a design we can
								help.
							</p>
							<p class="mb-4">
								<a href="">
									<span class="underline decoration-dotted underline-offset-8">Get in touch</span>
									<i class="fa-solid fa-arrow-right" />
								</a>
							</p>
						</div>
						<div class="swiper-slide">
							<p class="mb-4 font-bold">(02) Template</p>
							<p class="mb-4">
								Quickest wayt to get up and running. Choose from one of our pre-made templates and
								we can personalise it with your branding.
							</p>
							<p class="mb-4">
								<a href="">
									<span class="underline decoration-dotted underline-offset-8">
										Browse templates
									</span>
									<i class="fa-solid fa-arrow-right" />
								</a>
							</p>
						</div>
						<div class="swiper-slide">
							<p class="mb-4 font-bold">(03) Webflow</p>
							<p class="mb-4">
								If you would like a fully customised website, personalised exactly how you want from
								scratch, we can design and build it using Webflow.
							</p>
							<p class="mb-4">
								<a href="">
									<span class="underline decoration-dotted underline-offset-8">Get in touch </span>
									<i class="fa-solid fa-arrow-right" />
								</a>
							</p>
						</div>
						<div class="swiper-slide">
							<p class="mb-4 font-bold">(04) Coded</p>
							<p class="mb-4">
								If your project requires some more advanced backend work, we may be able to code it
								from scratch.
							</p>
							<p class="mb-4">
								<a href="">
									<span class="underline decoration-dotted underline-offset-8">Get in touch </span>
									<i class="fa-solid fa-arrow-right" />
								</a>
							</p>
						</div>
					</div>
				</div>
			</section>
			<aside
				class="ml-auto grid min-w-7 place-content-center border-l transition-all hover:cursor-pointer"
				bind:this={servicesAside}>
				<div class="vertical-lr flex rotate-180 items-center gap-2">
					Services
					<i class="fa-solid fa-arrow-right" />
				</div>
			</aside>
		</div>

		<div class="flex border-b">
			<section class=" w-[calc(100%-1.75rem)] flex-grow p-3" bind:this={workSection}>
				<div class="mb-3 text-xs">
					<i class="fa-solid fa-circle fa-2xs" />
					Our Work
				</div>
				<div class="swiper carousel-mobile">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<img class="rounded-2xl" src="images/lemonaid.png" style="" />
						</div>
						<div class="swiper-slide">
							<img class="rounded-2xl" src="images/architech.png" style="" />
						</div>
					</div>
				</div>
			</section>
			<section class="hidden h-64 bg-black px-3 py-10" bind:this={templatesSection}>
				<div class="flex h-full flex-col justify-between text-center text-white">
					<p class="mb-4 font-bold">Coming Soon!</p>
					<p class="mb-4">Templates are currently being prepared in our lab 🧪</p>
					<p class="mb-4">However, contact us if you still want to use this option.</p>
				</div>
			</section>

			<aside
				class="ml-auto grid min-w-7 place-content-center border-l transition-all"
				bind:this={templatesAside}>
				<div class="vertical-lr flex rotate-180 items-center gap-2">
					Templates
					<i class="fa-solid fa-arrow-right" />
				</div>
			</aside>
		</div>
	</div>

	<div class="flex">
		<section class="p-3">
			<div class="mb-3 text-xs">
				<i class="fa-solid fa-circle fa-2xs" />
				Contact
			</div>
			<div>Get in touch for a free quote!</div>
			<br />
			<div>
				Let us know about yourself and what you need so we can help recommend how best to help you
			</div>
		</section>
		<aside class="ml-auto grid min-w-7 place-content-center border-l">
			<a href="https://www.instagram.com/artalabs" target="_blank"
				><i class="fa-brands fa-instagram" /></a>
		</aside>
	</div>

	<div class="flex">
		<div class="flex-grow bg-black p-3 text-white">
			<form on:submit|preventDefault={sendEmail} class="flex flex-col gap-5">
				<div class="flex flex-col gap-1">
					<label for="name"> Name </label>
					<input
						type="text"
						name="name"
						id="name"
						class="w-full rounded-lg bg-neutral-900 p-2.5 text-sm"
						required />
				</div>

				<div class="flex flex-col gap-1">
					<label for="email"> E-Mail </label>
					<input
						type="text"
						name="email"
						id="email"
						class="w-full rounded-lg bg-neutral-900 p-2.5 text-sm"
						required />
				</div>
				<div class="flex flex-col gap-1">
					<label for="reason"> Reason/Service </label>
					<input
						type="text"
						name="reason"
						id="reason"
						class="w-full rounded-lg bg-neutral-900 p-2.5 text-sm"
						required />
				</div>
				<div class="flex flex-col gap-1">
					<label for="description"> Tell us about what you need (scope, timeline, budget): </label>
					<textarea
						name="description"
						id="description"
						cols="30"
						rows="10"
						class="w-full rounded-lg bg-neutral-900 p-2.5 text-sm"
						required />
				</div>
				<button type="submit" class="ml-auto">
					<span class="underline decoration-dotted underline-offset-8"> Submit </span>
					<i class="fa-solid fa-arrow-right" />
				</button>
			</form>
		</div>
		<aside class="ml-auto grid min-w-7 place-content-center border-l">
			<div class="vertical-lr flex rotate-180 items-center gap-2">
				<a href="mailto:contact.artalabs@gmail.com">contact.artalabs@gmail.com</a>
			</div>
		</aside>
	</div>
</div>

<div class="hidden h-screen md:block">
	<div class="flex h-full flex-col">
		<div class="relative">
			<div class="border-b">
				<div class="">
					<div class="flex justify-end">
						<!-- <label class="relative inline-flex cursor-pointer items-center">
							<input type="checkbox" value="" class="peer sr-only" />
							<div
								class="dark:border-gray-600 peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-gray-800 peer-checked:after:translate-x-full peer-focus:outline-none rtl:peer-checked:after:-translate-x-full dark:bg-gray-200" />
						</label> -->
						<div>
							<div class="flex">
								<button class="px-6 py-1" data-nav-item-trigger="services">Services</button>
								<button class="px-6 py-1" data-nav-item-trigger="templates">Templates</button>
								<button class="px-6 py-1" data-nav-item-trigger="contact">Contact</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				class="absolute left-0 right-0 top-full z-[2] hidden bg-black py-10 text-white"
				data-nav-item-target="services">
				<div class="container mx-auto">
					<h2 class="text-6xl">Services</h2>
					<div class="mt-6 flex gap-x-10">
						<div class="flex-1">
							<div>
								We specialise in producing high quality websites and designs for digital products.
							</div>
							<br />
							<div>Depending on what you need, we can offer 4 different ways to work with us:</div>
						</div>
						<div class="flex-1">
							<div class="flex flex-col gap-y-4">
								<div><p class="font-bold">(01) Design Only</p></div>
								<div>
									Already have someone to implement your vision? If you just need a design we can
									help.
								</div>
								<div>
									<a href=""
										><span class="underline decoration-dotted underline-offset-8"
											>Get in touch
										</span><i class="fa-solid fa-arrow-right" /></a>
								</div>
							</div>
						</div>
						<div class="flex-1">
							<div class="flex flex-col gap-y-4">
								<div><p class="font-bold">(02) Template</p></div>
								<div>
									Quickest wayt to get up and running. Choose from one of our pre-made templates and
									we can personalise it with your branding.
								</div>
								<div>
									<a href=""
										><span class="underline decoration-dotted underline-offset-8"
											>Browse templates
										</span><i class="fa-solid fa-arrow-right" /></a>
								</div>
							</div>
						</div>
						<div class="flex-1">
							<div class="flex flex-col gap-y-4">
								<div><p class="font-bold">(03) Webflow</p></div>
								<div>
									If you would like a fully customised website, personalised exactly how you want
									from scratch, we can design and build it using Webflow.
								</div>
								<div>
									<a href=""
										><span class="underline decoration-dotted underline-offset-8"
											>Get in touch
										</span><i class="fa-solid fa-arrow-right" /></a>
								</div>
							</div>
						</div>
						<div class="flex-1">
							<div class="flex flex-col gap-y-4">
								<div><p class="font-bold">(04) Coded</p></div>
								<div>
									If your project requires some more advanced backend work, we may be able to code
									it from scratch.
								</div>
								<div>
									<a href=""
										><span class="underline decoration-dotted underline-offset-8"
											>Get in touch
										</span><i class="fa-solid fa-arrow-right" /></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="absolute left-0 right-0 top-full z-[2] hidden h-screen bg-black py-10 text-white"
				data-nav-item-target="templates">
				<div class="container mx-auto h-full">
					<div class="flex h-full flex-col">
						<div>
							<h2 class="text-6xl">Templates</h2>
							<div class="mt-6">
								<div>Quickest way to get up and running.</div>
								<br />
								<div>
									Choose from One of our pre-made templates and we can personalise it with your
									branding.
								</div>
							</div>
						</div>
						<div class="flex-grow">
							<div class="grid h-full place-content-center text-center">
								<div class="font-bold">Coming soon!</div>
								<br />
								<div>Templates are currently being prepared in our lab 🧪</div>
								<br />
								<div>However contact us if you still want to use this option</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="absolute left-0 right-0 top-full z-[2] hidden bg-black py-10 text-white"
				data-nav-item-target="contact">
				<div class="container mx-auto">
					<h2 class="text-6xl">Contact</h2>
					<div class="mt-6">
						<form on:submit|preventDefault={sendEmail} class="flex gap-x-10">
							<div class="flex-1">
								<div>Get in touch for a free quote!</div>
								<br />
								<div>
									Let us know about yourself and what you need, so we can help. Recommend our best
									to help you.
								</div>
							</div>

							<div class="flex-1">
								<div class="mb-5 flex flex-col gap-1">
									<label for="name2"> Name </label>
									<input
										type="text"
										name="name"
										id="name2"
										class="w-full rounded-lg bg-neutral-900 p-2.5 text-sm"
										required />
								</div>
								<div class="mb-5 flex flex-col gap-1">
									<label for="email2"> E-Mail </label>
									<input
										type="text"
										name="email"
										id="email2"
										class="w-full rounded-lg bg-neutral-900 p-2.5 text-sm"
										required />
								</div>
								<div class="mb-5 flex flex-col gap-1">
									<label for="reason2"> Reason / Service </label>
									<input
										type="text"
										name="reason"
										id="reason2"
										class="w-full rounded-lg bg-neutral-900 p-2.5 text-sm"
										required />
								</div>
							</div>

							<div class="flex-1">
								<div class="flex flex-col">
									<label for="description2" class="mb-1">
										Tell us about what you need (scope, timeline, budget):
									</label>
									<textarea
										name="description"
										id="description2"
										cols="30"
										rows="10"
										class="w-full rounded-lg bg-neutral-900 p-2.5 text-sm"
										required />
									<button type="submit" class="ml-auto mt-10">
										<span class="underline decoration-dotted underline-offset-8"> Submit </span>
										<i class="fa-solid fa-arrow-right" />
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<div>
			<div class="border-b">
				<div class="container mx-auto">
					<h1 class="text-center text-9xl">ARTA LABS</h1>
				</div>
			</div>
		</div>

		<div class="h-full">
			<div class="flex h-full pb-10 pt-5">
				<div class="flex-shrink-0 basis-1/3">
					<div class="h-full px-5">
						<div class="flex h-full flex-col">
							<div>
								<h4>
									<i class="fa-solid fa-circle fa-2xs" />
									About
								</h4>
							</div>
							<div>
								<h2 class="text-4xl">
									Arta Labs are a freelance Web Development & UI/UX Design lab based in the UK,
									crafting bespoke and functional experiences for clients worldwide.
								</h2>
							</div>
							<div class="mt-auto">
								<i class="fa-solid fa-circle fa-2xs" />
								Services
							</div>
							<div>
								<h2 class="text-4xl">(01)</h2>
							</div>
							<div class="mt-auto">
								<h2 class="text-4xl">Design Only</h2>
							</div>
							<div>
								<h3 class="text-2xl">
									Already have someone to implement your vision? If you just need a design we can
									help.
								</h3>
							</div>
						</div>
					</div>
				</div>
				<div class="basis-2/3">
					<div class="flex h-full flex-col pl-6">
						<h4>
							<i class="fa-solid fa-circle fa-2xs" />
							Our Work
						</h4>
						<div class="my-auto">
							<div class="swiper carousel-desktop">
								<div class="swiper-wrapper">
									<div class="swiper-slide">
										<img class="rounded-2xl" src="images/lemonaid.png" alt="" />
									</div>
									<div class="swiper-slide">
										<img class="rounded-2xl" src="images/architech.png" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div class="flex justify-between pr-6">
							<div>
								<a href="https://www.instagram.com/artalabs" target="_blank"
									><i class="fa-brands fa-instagram" /> @artalabs</a>
							</div>
							<div class="relative flex gap-x-5">
								<div class="carousel-button-prev hover:cursor-pointer">
									<i class="fa-solid fa-arrow-left" />
								</div>
								<div class="carousel-button-next hover:cursor-pointer">
									<i class="fa-solid fa-arrow-right" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.swiper {
		width: 100%;
		height: 100%;
	}

	.carousel-mobile .swiper-slide {
		width: 240px;
	}

	.carousel-desktop .swiper-slide {
		max-width: 35vw;
	}
</style>
