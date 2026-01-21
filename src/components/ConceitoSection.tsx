import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ConceitoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/30" />
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block font-body text-sm uppercase tracking-widest text-primary mb-6">
              O Conceito
            </span>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight">
              O Caos Organizado.
            </h2>
            
            <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                A maioria dos profissionais tem ideias fervendo e competência de sobra, 
                mas tudo isso é ruído se não for direcionado.
              </p>
              
              <p>
                Na Vértice, forçamos o encontro entre a{" "}
                <span className="text-primary font-semibold">Arte (Imagem)</span> e a{" "}
                <span className="text-secondary font-semibold">Engenharia (Site)</span>. 
                O resultado não é apenas "bonito". É estratégico. É o ponto exato onde o 
                cliente entende seu valor sem você precisar falar.
              </p>
            </div>
            
            {/* Sub-features */}
            <div className="mt-10 space-y-6">
              <div className="border-l-2 border-primary/50 pl-6">
                <h3 className="font-display text-xl font-semibold mb-2">Fotografia Estratégica</h3>
                <p className="font-body text-muted-foreground">
                  Retratos que comunicam autoridade antes de você dizer uma palavra.
                </p>
              </div>
              
              <div className="border-l-2 border-secondary/50 pl-6">
                <h3 className="font-display text-xl font-semibold mb-2">Web Design Brutal</h3>
                <p className="font-body text-muted-foreground">
                  Performance, velocidade e conversão. Sem templates genéricos.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Right Visual - Triangle Concept */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Orbital circles */}
              <motion.div 
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-4 border border-primary/20 rounded-full" />
              </motion.div>
              
              <motion.div 
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-12 border border-secondary/20 rounded-full" />
              </motion.div>
              
              {/* Diagonal accent lines */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-0 right-0 w-1/2 h-[1px] bg-gradient-to-l from-primary/40 to-transparent transform rotate-45 origin-right" />
                <div className="absolute bottom-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-secondary/40 to-transparent transform -rotate-45 origin-left" />
              </div>
              
              {/* Central Triangle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 blur-xl">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-32 h-32 md:w-40 md:h-40"
                    >
                      <polygon
                        points="50,15 85,80 15,80"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                  
                  {/* Main triangle */}
                  <motion.svg
                    viewBox="0 0 100 100"
                    className="w-32 h-32 md:w-40 md:h-40"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <polygon
                      points="50,15 85,80 15,80"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2.5"
                    />
                  </motion.svg>
                </div>
              </div>
              
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
              >
                <span className="font-body text-xs uppercase tracking-[0.3em] text-primary/80">
                  Ponto de Convergência
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConceitoSection;
