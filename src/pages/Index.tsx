import { motion } from "framer-motion";
import Footer from "../components/common/Footer/Footer";
import Guide from "../components/common/guides/Guide";
import Header from "../components/common/Header/Header";
import Sites from "../components/common/feature/CircuitsFeature/sitesFeature/SitesFeature";
import Welcome from "../components/common/welcomeImge/Welcom";
import CircuitsFeature from "../components/common/feature/CircuitsFeature/CircuitsFeature";
import SitesFeature from "../components/common/feature/CircuitsFeature/sitesFeature/SitesFeature";

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const SectionWrapper = ({ children, delay = 0 }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

const Index = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Header />
        <main>
          <SectionWrapper delay={0}>
            <section id="welcome"><Welcome /></section>
          </SectionWrapper>

          <SectionWrapper delay={0.1}>
            <section id="sites"><SitesFeature /></section>
          </SectionWrapper>

          <SectionWrapper delay={0.1}>
            <section id="circuits"><CircuitsFeature /></section>
          </SectionWrapper>

          <SectionWrapper delay={0.1}>
            <section id="guides"><Guide /></section>
          </SectionWrapper>

          <SectionWrapper delay={0}>
            <section id="footer"><Footer /></section>
          </SectionWrapper>
        </main>
      </motion.div>
    </div>
  );
};

export default Index;