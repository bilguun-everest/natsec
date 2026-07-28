import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Guides from "@/components/Guides";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Leadership from "@/components/Leadership";
import MarketBoard from "@/components/MarketBoard";
import Research from "@/components/Research";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import UtilityBar from "@/components/UtilityBar";
import { getAllDisclosures, getBoards, getIndexTable } from "@/lib/mse";

/** Market data is pulled from mse.mn and refreshed every five minutes. */
export const revalidate = 300;

export default async function Home() {
  const [index, boards, disclosures] = await Promise.all([
    getIndexTable(),
    getBoards(),
    getAllDisclosures(),
  ]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <UtilityBar index={index} />
      <Header />

      <main id="main">
        <Hero
          index={index}
          movers={{ mn: boards.mn.stock.up, en: boards.en.stock.up }}
        />
        <MarketBoard boards={boards} disclosures={disclosures} />
        <About />
        <Leadership />
        <Achievements />
        <Services />
        <Stats />
        <Research />
        <Guides />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
