import { BuyOnPhoneButton } from "@/src/components";
import CallButton from "@/src/components/callbutton/indedx";
import { HomePage } from "@/src/screens";




export default function Home() {
  return (
    <main className="overflow-hidden">
      <div className="z-auto">
      <HomePage/>
      </div>
    
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 ">
        <BuyOnPhoneButton />
      </div>

      <div className="fixed bottom-28 left-0 z-50">
        <CallButton/>
      </div>
    </main>
  );
}



