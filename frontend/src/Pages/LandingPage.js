
// import { Raycast, Vercel, Retool, Remote, Arc } from "@/components/Logo"
import Button from "../Components/Button"
import { Sparkles } from "./Sparkles"
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <div className="mx-auto mt-32 w-screen max-w-2xl">
        <div className="text-center">
          <span className="text-center text-4xl font-bold text-indigo-300">Intergalactic Transmission Tool</span>

          <br /><br/><br/>

          <span className="text-center text-2xl font-sm text-white">Visualizing the challenges of deep-space data transmission with a focus on interference and error resilience.</span>
        </div>

        <div className="mt-14 grid grid-cols-5">
          {/* <Retool />

          <Vercel />

          <Remote />

          <Arc />

          <Raycast /> */}
        </div>
      </div>

      <div className="relative -mt-32 h-[300px] w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-zinc-900">
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>
      <p className="text-center text-white">Can a signal truly survive the journey across light-years without losing its essence?</p>
      <br/>
      <div className="flex justify-center">
      <Link to="/simulation"><Button/></Link>
      
      </div>


    </div>
  )
}
