function HeroSection({ heroImage }) {
	return (
		<>
			<section>
				<div>
					<img
						src={heroImage || "/images/Logo.jpg"}
						alt=""
						className="w-full"
					/>
				</div>
			</section>
		</>
	)
}

export default HeroSection
