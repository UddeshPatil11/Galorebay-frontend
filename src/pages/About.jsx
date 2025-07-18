import { useState, useEffect, useCallback } from 'react'
import { db } from '../utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../sections/HeroSection'

function About() {
	const [page, setPage] = useState({})

	const getPage = useCallback(async () => {
		try {
			const docRef = doc(db, 'pages', 'v620Iab1bc5K4X3dNCdu')
			const snapshot = await getDoc(docRef)
			const data = snapshot.data()
			setPage(data)
		} catch {
			toast.error('Error!')
		}
	}, [])

	useEffect(() => {
		getPage()
	}, [getPage])

	return (
		<>
			<Helmet>
				<title>{page.metaTitle}</title>
				<meta name="description" content={page.metaDescription} />
			</Helmet>

			<main>
				<HeroSection />

				<section className="w-[85%] mx-auto py-16">
					<h1 className="text-primary font-medium text-3xl text-center mb-16 lg:text-5xl">Our Story</h1>

					<div className="flex flex-col gap-20 mb-20 lg:flex-row">
						<div className="text-justify lg:w-3/5">
							<p className="mb-5">
								Oh My Eyes launched in the spring of 2018 in Stockholm, Sweden by husband and wife duo
								Jonna and Christopher Hunt. Why sunglasses? Well, the narrative was driven by an accident
								that turned into an adventure: While out at sea, Christopher dropped his cus- tom-made
								sunglasses; his sister-in-law hired a diver who tried to retrieve this sunken treasure.
								This episode made the duo think about sunglasses and why they sometimes mean so much.
							</p>
							<p>
								So much so, that it led to almost an obsession to recreate the same feeling for others.
								The result? An eyewear brand where craftsmanship, pruium materials and maximum eye
								protection are the cornerstones, combined with an urge to protect the eyes of peo- ple
								that need it the most through a <u>One for One initiative.</u>
							</p>
						</div>
						<div className="lg:w-2/5">
							<img src="/images/1735879080.png" alt="" />
						</div>
					</div>

					<div className="flex flex-col gap-20 mb-20 lg:flex-row">
						<div className="text-justify lg:w-3/5">
							<h3 className="font-medium text-xl mb-5">MADE TO LAST</h3>
							<p className="mb-5">
								Oh My Eyes was born out of the idea to create a quality eyewear brand which goes against
								the fast-fashion cycle. One pair of pruium sunglasses will last a lifetime if taken care
								of.
							</p>
							<p className="mb-5">
								The company actively researches the best possible materials, always with sustainability in
								mind. The acetate is plant-based, made from the natural materials cotton and wood. And the
								cases are handmade from chrome-free leather in a family-run workshop in the heart of
								Småland, Sweden, known for its long tradition of craftsmanship.
							</p>
							<p>
								Oh My Eyes also encourages you to give life to your old sunglasses, regardless of brand,
								by joining the <u>One for One mission</u> and donating thu to people with albinism in
								Tanzania. As a thank you, 15% will be deducted off your order. Read more about how to
								participate here.
							</p>
						</div>
						<div className="lg:w-2/5">
							<img src="/images/1735879081.png" alt="" />
						</div>
					</div>

					<div className="flex flex-col gap-20 lg:flex-row">
						<div className="text-justify lg:w-3/5">
							<h3 className="font-medium text-xl mb-5">GET INSPIRED</h3>
							<p className="mb-5">
								Oh My Eyes sunglasses are inspired by Scandinavian modernism; moving away from the typical
								Scandinavian minimalism in favour of more shapes and colour to eyewear de- sign. First up
								to interpret the design brief was Italian eyewear designer Marco Galleani who has worked
								in the eyewear industry since the 1980s. He is renowned for his unique take on eyewear
								design and has created seven unisex frames. Read more about his take on{' '}
								<u>Scandinavian modernism</u>.
							</p>
							<p className="mb-5">
								Architecture is one such field the team has looked at for inspiration, and is envisioned
								in the photo art series <u>Modern Buildings</u> by Mårten Ryner who has captured the rich
								mod- ernist heritage in the brand&apos;s hometown Stockholm.
							</p>
							<p>
								Most importantly, Oh My Eyes is all about lifting your personality through cutting edge
								design. Meet some of the inspirational characters and their stories in the{' '}
								<u>online journal</u>.
							</p>
						</div>
						<div className="lg:w-2/5">
							<img src="/images/1735879082.png" alt="" />
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

export default About
