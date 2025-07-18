import { useState, useEffect, useCallback } from 'react'
import { db } from '../utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../sections/HeroSection'

function AboutTwo() {
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
				<HeroSection heroImage={page.heroImage} />

				<section className="w-[85%] mx-auto pt-20 pb-40">
					<h2 className="text-primary font-medium text-4xl text-center mb-16">Company Overview</h2>
					<div className="rounded-[40px] shadow-[0_0_12px_-5px_rgba(0,0,0,0.25)] grid lg:grid-cols-3">
						<div className="text-center py-10 lg:py-16 border-r border-b">
							<h3 className="text-secondary font-medium text-2xl">Company Name</h3>
							<p className="text-primary text-base">Galorebay Optix (India)</p>
						</div>

						<div className="text-center py-10 lg:py-16 border-r border-b">
							<h3 className="text-secondary font-medium text-2xl">Year of Foundation</h3>
							<p className="text-primary text-base">2008</p>
						</div>
						<div className="text-center py-10 lg:py-16 border-[#E0E0E0] border-b">
							<h3 className="text-secondary font-medium text-2xl">Headquarters</h3>
							<p className="text-primary text-base">New Delhi, India</p>
						</div>
						<div className="text-center py-10 lg:py-16 border-r border-b lg:border-b-0">
							<h3 className="text-secondary font-medium text-2xl">Markets Serving</h3>
							<p className="text-primary text-base">India, Maldives, Srilanka</p>
						</div>
						<div className="text-center py-10 lg:py-16 border-r border-b lg:border-b-0">
							<h3 className="text-secondary font-medium text-2xl">Industry</h3>
							<p className="text-primary text-base">Eyewear – Spectacles & Sunglasses</p>
						</div>
						<div className="text-center py-10 lg:py-16 border-b lg:border-b-0">
							<h3 className="text-secondary font-medium text-2xl">Website</h3>
							<p className="text-primary text-base">www.galorebayoptix.com</p>
						</div>
					</div>
				</section>

				<section className="w-[85%] mx-auto text-center pb-40">
					<h2 className="text-primary font-medium text-4xl mb-6">Description</h2>
					<p className="text-[#383838] max-w-3xl mx-auto mb-36">
						Galorebay Optix (India) is committed to delivering high-quality, stylish eyewear that
						seamlessly blends fashion and functionality. Our extensive range includes prescription glasses
						and trendy sunglasses designed to enhance vision while reflecting personal style. By offering
						cutting-edge designs and superior comfort, we aim to set new standards in the eyewear
						industry.
					</p>
					<div className="rounded-[40px] shadow-[0_0_12px_-5px_rgba(0,0,0,0.25)] grid lg:grid-cols-2">
						<article className="text-center py-10 lg:py-16 border-r border-b lg:border-b-0">
							<h3 className="text-secondary font-medium text-4xl mb-5">Mission Statement</h3>
							<p className="text-[#383838] max-w-sm mx-auto">
								&quot;To provide customers with stylish, high-quality eyewear that combines fashion,
								functionality, and affordability.&quot;
							</p>
						</article>
						<article className="text-center py-10 lg:py-16">
							<h3 className="text-secondary font-medium text-4xl mb-5">Vision Statement</h3>
							<p className="text-[#383838] max-w-sm mx-auto">
								&quot;To become a leading brand in the eyewear industry by offering innovative and stylish
								solutions that cater to the diverse needs of customers worldwide.&quot;
							</p>
						</article>
					</div>
				</section>

				<section className="bg-[#F9F9F9] py-10">
					<div className="w-[90%] mx-auto">
						<h2 className="text-[#F9F9F9] font-semibold text-5xl lg:text-8xl uppercase [-webkit-text-stroke:1px_#242099] mb-10">
							Products & Services
						</h2>
						<div className="bg-[#E9E9E9] p-8 rounded-2xl flex flex-col items-center gap-5 mb-10 lg:flex-row">
							<div className="lg:w-[40%] flex flex-col items-center">
								<div className="max-w-80">
									<h3 className="text-primary font-medium text-2xl mb-2">Frame Glasses</h3>
									<p className="text-[#383838]">
										A variety of frames catering to different face shapes and personal styles, including
										classic, modern, bold, and minimalist designs.
									</p>
								</div>
							</div>
							<div className="lg:w-[60%]">
								<img
									src="/images/1741602601-frame-glass.jpg"
									alt=""
									className="w-full h-80 object-cover object-right rounded-3xl"
								/>
							</div>
						</div>
						<div className="bg-[#E9E9E9] p-8 rounded-2xl flex flex-col items-center gap-5 mb-10 lg:flex-row">
							<div className="lg:w-[60%]">
								<img
									src="/images/1741602602-sunglass.jpg"
									alt=""
									className="w-full h-80 object-cover object-right rounded-3xl"
								/>
							</div>
							<div className="lg:w-[40%] flex flex-col items-center">
								<div className="max-w-80">
									<h3 className="text-primary font-medium text-2xl mb-2">Sunglasses</h3>
									<p className="text-[#383838]">
										Stylish options for all occasions, featuring polarized lenses, UV protection, and
										high-fashion designs.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="text-center w-[85%] mx-auto py-20">
					<h2 className="text-primary font-medium text-4xl mb-10">Featured Brands</h2>
					<div className="p-10 rounded-[40px] shadow-[0_0_12px_-5px_rgba(0,0,0,0.25)] grid lg:grid-cols-4">
						<article className="p-10 border-b flex flex-col items-center group gap-3">
							<img src="/images/1741603201.png" alt="" className="w-48 h-20 object-contain" />
							<img
								src="/images/1739293636-feather.png"
								alt=""
								className="lg:grayscale lg:w-32 h-8 object-contain group-hover:grayscale-0"
							/>
							<p className="text-[#383838] max-w-40">
								Premium titanium frames with IP and gold plating; registered in the USA and India.
							</p>
						</article>
						<article className="p-10 border-b flex flex-col items-center group gap-3">
							<img src="/images/1741603202.png" alt="" className="w-48 h-20 object-contain" />
							<img
								src="/images/1739293690-galorebay.png"
								alt=""
								className="lg:grayscale lg:w-32 h-8 object-contain group-hover:grayscale-0"
							/>
							<p className="text-[#383838] max-w-40">
								High-quality metal frames for men and women; 100% made in South Korea, registered in South
								Korea and India.
							</p>
						</article>
						<article className="p-10 flex flex-col items-center group gap-3">
							<img src="/images/1741603203.png" alt="" className="w-48 h-20 object-contain" />
							<img
								src="/images/1739293727-john-karter.png"
								alt=""
								className="lg:grayscale lg:w-32 h-8 object-contain group-hover:grayscale-0"
							/>
							<p className="text-[#383838] max-w-40">
								Trendy unisex frames and sunglasses, tailored to the preferences of the younger
								generation.
							</p>
						</article>
						<article className="p-10 border-b flex flex-col items-center group gap-3">
							<img src="/images/1741603204.png" alt="" className="w-48 h-20 object-contain" />
							<img
								src="/images/1739293752-kidstar.png"
								alt=""
								className="lg:grayscale lg:w-32 h-8 object-contain group-hover:grayscale-0"
							/>
							<p className="text-[#383838] max-w-40">
								Durable and safe frames for kids, made with TR and acetate materials.
							</p>
						</article>
						<article className="p-10 flex flex-col items-center group gap-3">
							<img src="/images/1741603205.png" alt="" className="w-48 h-20 object-contain" />
							<img
								src="/images/1739293795-caron.png"
								alt=""
								className="lg:grayscale lg:w-32 h-8 object-contain group-hover:grayscale-0"
							/>
							<p className="text-[#383838] max-w-40">
								Designer spectacle frames offering fashionable designs at economical prices.
							</p>
						</article>
						<article className="p-10 border-b flex flex-col items-center group gap-3">
							<img src="/images/1741603206.png" alt="" className="w-48 h-20 object-contain" />
							<img
								src="/images/1739293804-red-grapes.png"
								alt=""
								className="lg:grayscale lg:w-32 h-8 object-contain group-hover:grayscale-0"
							/>
							<p className="text-[#383838] max-w-40">Eco-friendly acetate frames, made in India.</p>
						</article>
						<article className="p-10 flex flex-col items-center group gap-3">
							<img src="/images/1741603207.png" alt="" className="w-48 h-20 object-contain" />
							<img
								src="/images/1739293816-cashier-deluxe.png"
								alt=""
								className="lg:grayscale lg:w-32 h-8 object-contain group-hover:grayscale-0"
							/>
							<p className="text-[#383838] max-w-40">
								Affordable TR frames manufactured in India, ideal for economical mass-market consumption.
							</p>
						</article>
					</div>
				</section>

				<section className="w-[85%] mx-auto pb-20">
					<h2 className="text-primary font-medium text-4xl text-center">Company History</h2>
					<div className="border-secondary border-t-2 grid lg:grid-cols-6 gap-5 my-10 lg:my-72">
						<article className="relative">
							<div className="flex flex-col items-center lg:absolute top-0">
								<span className="bg-primary w-4 h-4 rounded-full"></span>
								<span className="border-primary border-dashed border-l-2 h-10"></span>
								<span className="bg-primary w-2 h-2 rounded-full"></span>
							</div>
							<div className="flex flex-col gap-1 lg:absolute top-20">
								<h3 className="text-secondary font-medium text-2xl">2008</h3>
								<p className="text-[#383838]">
									Founded with a focus on fashionable, affordable eyewear and launched Galorebay,
									manufactured in South Korea.
								</p>
							</div>
						</article>
						<article className="relative">
							<div className="flex flex-col items-center lg:absolute bottom-0 lg:rotate-180">
								<span className="bg-primary w-4 h-4 rounded-full"></span>
								<span className="border-primary border-dashed border-l-2 h-10"></span>
								<span className="bg-primary w-2 h-2 rounded-full"></span>
							</div>
							<div className="flex flex-col lg:flex-col-reverse gap-1 lg:absolute bottom-20">
								<h3 className="text-secondary font-medium text-2xl">2010</h3>
								<p className="text-[#383838]">
									Introduced Feather Titanium for premium customers and Caron for affordable, fashionable
									designs.
								</p>
							</div>
						</article>
						<article className="relative">
							<div className="flex flex-col items-center lg:absolute top-0">
								<span className="bg-primary w-4 h-4 rounded-full"></span>
								<span className="border-primary border-dashed border-l-2 h-10"></span>
								<span className="bg-primary w-2 h-2 rounded-full"></span>
							</div>
							<div className="flex flex-col gap-1 lg:absolute top-20">
								<h3 className="text-secondary font-medium text-2xl">2014</h3>
								<p className="text-[#383838]">
									Launched Red Grapes to promote eco-friendly, Made-in-India acetate products, and Cashier
									for budget-friendly eyewear.
								</p>
							</div>
						</article>
						<article className="relative">
							<div className="flex flex-col items-center lg:absolute bottom-0 lg:rotate-180">
								<span className="bg-primary w-4 h-4 rounded-full"></span>
								<span className="border-primary border-dashed border-l-2 h-10"></span>
								<span className="bg-primary w-2 h-2 rounded-full"></span>
							</div>
							<div className="flex flex-col lg:flex-col-reverse gap-1 lg:absolute bottom-20">
								<h3 className="text-secondary font-medium text-2xl">2018</h3>
								<p className="text-[#383838]">
									Addressed the market gap for high-quality kids eyewear by launching Kid Star.
								</p>
							</div>
						</article>
						<article className="relative">
							<div className="flex flex-col items-center lg:absolute top-0">
								<span className="bg-primary w-4 h-4 rounded-full"></span>
								<span className="border-primary border-dashed border-l-2 h-10"></span>
								<span className="bg-primary w-2 h-2 rounded-full"></span>
							</div>
							<div className="flex flex-col gap-1 lg:absolute top-20">
								<h3 className="text-secondary font-medium text-2xl">2022</h3>
								<p className="text-[#383838]">
									Introduced John Karter to cater to young customers seeking international-style designer
									frames and sunglasses.
								</p>
							</div>
						</article>
						<article className="relative">
							<div className="flex flex-col items-center lg:absolute bottom-0 lg:rotate-180">
								<span className="bg-primary w-4 h-4 rounded-full"></span>
								<span className="border-primary border-dashed border-l-2 h-10"></span>
								<span className="bg-primary w-2 h-2 rounded-full"></span>
							</div>
							<div className="flex flex-col lg:flex-col-reverse gap-1 lg:absolute bottom-20">
								<h3 className="text-secondary font-medium text-2xl">2023</h3>
								<p className="text-[#383838]">
									Taken distributorship of Thelios brand (Tom ford, Porsche Eyewear, etc..) for Delhi.
								</p>
							</div>
						</article>
					</div>
				</section>

				<section className="bg-[#F9F9F9] py-10">
					<div className="w-[90%] mx-auto">
						<h2 className="text-[#F9F9F9] font-semibold text-5xl lg:text-8xl uppercase [-webkit-text-stroke:1px_#242099] mb-10">
							Leadership Team
						</h2>
						<div className="grid lg:grid-cols-2 gap-10">
							<article className="bg-[#E9E9E9] p-3 md:p-8 rounded-2xl flex gap-7">
								<div className="w-1/2">
									<img
										src="/images/1741602901-hardayal-singh.jpg"
										alt=""
										className="h-full object-cover rounded-xl"
									/>
								</div>
								<div className="w-1/2 flex flex-col">
									<h3 className="text-secondary font-medium text-2xl md:mb-auto">Founder</h3>
									<h4 className="text-primary font-medium md:text-2xl mb-2">Mr. Hardayal Singh</h4>
									<p className="text-[#383838]">
										With extensive experience in the eyewear industry since 1980.
									</p>
								</div>
							</article>
							<article className="bg-[#E9E9E9] p-3 md:p-8 rounded-2xl flex gap-7">
								<div className="w-1/2">
									<img
										src="/images/1741602901-anit-singh-thukral.jpg"
										alt=""
										className="h-full object-cover rounded-xl"
									/>
								</div>
								<div className="w-1/2 flex flex-col">
									<h3 className="text-secondary font-medium text-2xl md:mb-auto">CEO</h3>
									<h4 className="text-primary font-medium md:text-2xl mb-2">Mr. Anit Singh Thukral</h4>
									<p className="text-[#383838]">
										Joined the eyewear industry in 2004 and later co-founded Galorebay Optix (India)
										October 2008 with his father.
									</p>
								</div>
							</article>
						</div>
					</div>
				</section>

				<section className="text-center w-[85%] mx-auto py-20">
					<h2 className="text-primary font-medium text-4xl mb-10">Values & Culture</h2>
					<div className="rounded-[40px] shadow-[0_0_12px_-5px_rgba(0,0,0,0.25)] grid lg:grid-cols-3">
						<article className="text-center p-10 border-r">
							<h3 className="text-secondary font-medium text-2xl mb-2">Quality</h3>
							<p className="text-[#383838] max-w-52 mx-auto">
								&quot;To provide customers with stylish, high-quality eyewear that combines fashion,
								functionality, and affordability.&quot;
							</p>
						</article>
						<article className="text-center p-10 border-r">
							<h3 className="text-secondary font-medium text-2xl mb-2">Service After Sales</h3>
							<p className="text-[#383838] max-w-52 mx-auto">
								Ensuring reliable post-sales support for our optician partners.
							</p>
						</article>
						<article className="text-center p-10">
							<h3 className="text-secondary font-medium text-2xl mb-2">Style</h3>
							<p className="text-[#383838] max-w-52 mx-auto">
								Crafting designs that allow customers to express their unique personalities and fashion
								preferences.
							</p>
						</article>
					</div>
				</section>

				<section className="text-center w-[85%] mx-auto pb-20">
					<h2 className="text-primary font-medium text-4xl mb-10">Market & Target Audience</h2>
					<div className="rounded-[40px] shadow-[0_0_12px_-5px_rgba(0,0,0,0.25)] grid lg:grid-cols-2">
						<article className="text-center p-10 border-r">
							<h3 className="text-secondary font-medium text-2xl mb-2">Target Market</h3>
							<p className="text-[#383838] max-w-sm mx-auto">
								Fashion-conscious individuals, professionals, and sports enthusiasts. Local, national, and
								international markets.
							</p>
						</article>
						<article className="text-center p-10 border-r">
							<h3 className="text-secondary font-medium text-2xl mb-2">Target Age Groups</h3>
							<p className="text-[#383838] max-w-sm mx-auto">
								Kids, young adults, and seniors, ensuring a wide reach across all demographics and genders
								through diverse product offerings.
							</p>
						</article>
					</div>
				</section>

				<section className="bg-[#F9F9F9] py-10 mb-20">
					<div className="w-[85%] mx-auto">
						<h2 className="text-[#F9F9F9] font-semibold text-4xl lg:text-8xl uppercase [-webkit-text-stroke:1px_#242099] mb-10">
							Contact <br /> Information
						</h2>
					</div>
					<div className=" grid lg:grid-cols-3">
						<article className="text-center p-10 border-r ">
							<h3 className="text-secondary font-medium text-2xl mb-2">Office Address</h3>
							<p className="text-[#383838] max-w-48 mx-auto">
								1/33 Mall Road, Tilak Nagar, New Delhi-110018, India
							</p>
						</article>
						<article className="text-center p-10 border-r ">
							<h3 className="text-secondary font-medium text-2xl mb-2">Customer Care</h3>
							<p className="text-[#383838] max-w-48 mx-auto">+91-6363406363</p>
						</article>
						<article className="text-center p-10 ">
							<h3 className="text-secondary font-medium text-2xl mb-2">Email</h3>
							<p className="text-[#383838] max-w-48 mx-auto">info@galorebayoptix.com</p>
						</article>
						{/* <article className="text-center p-10 border-r">
							<h3 className="text-secondary font-medium text-2xl mb-2">Website</h3>
							<p className="text-[#383838] max-w-48 mx-auto">www.galorebayoptix.com</p>
						</article>
						<article className="text-center p-10 border-r">
							<h3 className="text-secondary font-medium text-2xl mb-2">Key Contact</h3>
							<p className="text-[#383838] max-w-48 mx-auto">Mr. Anit Singh Thukral</p>
						</article>
						<article className="text-center p-10 border-r">
							<h3 className="text-secondary font-medium text-2xl mb-2">Mobile</h3>
							<p className="text-[#383838] max-w-48 mx-auto">+91-9818674844</p>
						</article> */}
					</div>
				</section>
			</main>
		</>
	)
}

export default AboutTwo
