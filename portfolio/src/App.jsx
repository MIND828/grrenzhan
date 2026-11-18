import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Strengths from "./components/Strengths";
import Contact from "./components/Contact";
import useReveal from "./hooks/useReveal";
import { useScrollRefresh } from "./hooks/useMotion";

export default function App() {
  useReveal();
  useScrollRefresh();

  return (
    <div className="relative min-h-screen bg-ink-950 text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Strengths />
        <Contact />
      </main>
    </div>
  );
}
