import PropTypes from 'prop-types'
import { useRef } from 'react'
import ReactPlayer from 'react-player'

function HeroSection({ page }) {
	const playerRef = useRef(null)

	const handleReady = player => {
		const iframe = player.getInternalPlayer()
		iframe.setPlaybackQuality('large') // 'large' corresponds to 480p
	}

	return (
		<>
			<section className="text-white aspect-[1.18/1] md:aspect-[16/9] relative -z-10 -my-14 bg-gradient-to-b">
				<img
					src="https://placehold.co/800x800/ff5900/white?text=Welcome!"
					alt=""
					className="w-full h-full object-cover object-right absolute top-0 left-0 -z-10"
				/>
				{page.heroVideo ? (
					<>
						<div
							className={`absolute -top-1 left-0 w-full h-[60px] bg-white transition-opacity duration-1000`}
						/>
						<div
							className={`absolute -bottom-1 left-0 w-full h-14 bg-white transition-opacity duration-1000`}
						/>

						<ReactPlayer
							ref={playerRef}
							url={`${page.heroVideo}`}
							playing
							loop
							muted
							width="100%"
							height="100%"
							onReady={handleReady} // Set quality when player is ready
							style={{
								pointerEvents: 'none'
							}}
							config={{
								youtube: {
									playerVars: {
										modestbranding: 1, // Minimal branding (removes YouTube logo)
										rel: 0, // No unrelated videos at the end
										showinfo: 0, // Hides title & uploader info (deprecated but try)
										fs: 0, // Disables fullscreen button
										iv_load_policy: 3, // Hides annotations
										disablekb: 1, // Disables keyboard controls
										playsinline: 1 // Plays video inline on mobile
									}
								}
							}}
						/>
					</>
				) : (
					<img src={page.heroImage} alt="" className="w-full h-full object-cover" />
				)}
				{/* <h1 className="text-7xl w-96 mb-3">{page.heroTitle}</h1> */}
				{/* <p className="text-xl">{page.heroSubtitle}</p> */}
			</section>
		</>
	)
}

HeroSection.propTypes = { page: PropTypes.object }

export default HeroSection
