import { useRef, useState } from "react"
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [loadedVideos, setLoadedVideos] = useState(0)

    const totalVideos = 3
    const nextVideoRef = useRef<HTMLVideoElement>(null)
    const upcommingVideoIndex = (currentIndex % totalVideos) + 1;
    const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`

    const handleMiniVdClick = () => {
        setHasClicked(true)

        setCurrentIndex(upcommingVideoIndex)
    }
    const handleVideoLoaded = () => {
        setLoadedVideos(prev => prev + 1)
    }
    useGSAP(() => {
        if (hasClicked) {
            gsap.set("#next-video", {visibility: "visible"})

            gsap.to("#next-video", {
                transformOrigin: "center center",
                scale: 1,
                duration: 1,
                width: "100%",
                height: "100%",
                ease: "power1.inOut",
                onStart: () => void nextVideoRef.current?.play(),
            })
            gsap.from("#current-video", {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.5,
                ease: "power1.out",
            })
        }
    },{
        dependencies: [currentIndex],
        revertOnUpdate: true,
      })
    useGSAP(() => {
        gsap.set("#video-frame", {
           clipPath: 'polygon(14% 0%,72% 0%, 90% 90%, 0% 100%)',
           borderRadius: "0 0 40% 10%",
        })
        gsap.from("#video-frame", {
            clipPath: 'polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)',
            borderRadius: "0 0 0 0",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            }
        })
    },{
        dependencies: [currentIndex],
        revertOnUpdate: true,
      })
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
        <div id= 'video-frame' className="relative z-10 h-dvh w-screen bg-blue-50 rounded-lg overflow-hidden">
            <div className="">
                <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer rounded-lg overflow-hidden">
                    <div onClick={handleMiniVdClick} className="origin-center scale-50 opacity-0 transition-all duration-300 ease-in hover:scale-100 hover:opacity-100">
                        <video
                        loop={true}
                        ref={nextVideoRef}
                        src={getVideoSrc(upcommingVideoIndex)}
                        onLoadedData={handleVideoLoaded}
                        className="size-64 object-cover origin-center scale-150 object-center"
                        />
                    </div>
                </div>
                <video
                id="next-video"
                loop={true}
                autoPlay={true}
                ref={nextVideoRef}
                src={getVideoSrc(currentIndex)}
                className="absolute-center invisible absolute z-20     size-64 object-cover origin-center  object-center"
                onLoadedData={handleVideoLoaded}
                />
                <video 
                 src={getVideoSrc(currentIndex ===  totalVideos - 1? 1 : currentIndex + 1)}
                 autoPlay={true}
                 muted={true}
                 className="absolute left-0 top-0 size-full object-cover object-center"
                 onLoadedData={handleVideoLoaded}
                />
            </div>
            <h1 className="special-font hero-heading absolute  bottom-5 right-5 z-40 text-blue-75">
                G<b>a</b>ming
            </h1>
            <div className="absolute left-0 top-0 size-full">
                <div className="mt-24 px-5 sm-px-10">
                    <h2 className="special-font hero-heading text-blue-100">Redefi<b>n</b>e</h2>
                    <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter the metagame Layer <br />
                    unleash the play economy.
                    </p>
                    <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass="bg-yellow-300 flex-center gap-1" />
                </div>
            </div>
        </div>
        <h1 className="special-font hero-heading absolute  bottom-5 right-5 z-40 text-black">
                G<b>a</b>ming
            </h1>
    </div>
  )
}

export default Hero