// ── Design tokens ─────────────────────────────────────────────────────────────
const BG     = "#fdfcf8";
const RED    = "#c8102e";
const GOLD   = "#c8960a";
const BLUE   = "#1565c0";
const DARK   = "#111";
const BORDER = "#dfc050";

const serif  = "Georgia, 'Times New Roman', serif";
const impact = "Impact, 'Arial Black', sans-serif";
const sans   = "Arial, Helvetica, sans-serif";

// ── PageShell — single column, fills the page ─────────────────────────────────
export function PageShell({ children, bg = BG }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      backgroundColor: bg,
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      fontFamily: sans,
      position: "relative",
    }}>
      {/* Inner page shadow */}
      <div style={{
        position: "absolute", inset: 0,
        boxShadow: "inset 0 0 0 4px rgba(0,0,0,0.07)",
        pointerEvents: "none", zIndex: 100,
      }} />
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "clamp(8px, 1.5vw, 16px) clamp(10px, 2vw, 20px)",
        scrollbarWidth: "none",
      }}>
        {children}
      </div>
    </div>
  );
}

// ── Section header (red ribbon) ────────────────────────────────────────────────
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{
      background: `linear-gradient(90deg,#9b0a1e 0%,${RED} 40%,#9b0a1e 100%)`,
      borderRadius: 3, padding: "4px 12px", margin: "8px 0 5px",
      textAlign: "center", position: "relative",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    }}>
      <div style={{ position:"absolute",left:-5,top:"50%",transform:"translateY(-50%)",width:0,height:0,borderTop:"11px solid transparent",borderBottom:"11px solid transparent",borderRight:"7px solid #7a0817" }} />
      <div style={{ position:"absolute",right:-5,top:"50%",transform:"translateY(-50%)",width:0,height:0,borderTop:"11px solid transparent",borderBottom:"11px solid transparent",borderLeft:"7px solid #7a0817" }} />
      <p style={{ fontFamily:impact, fontSize:"clamp(0.68rem,1.6vw,0.88rem)", color:"#fff", letterSpacing:"0.07em", textTransform:"uppercase", lineHeight:1.2 }}>{title}</p>
      {subtitle && <p style={{ fontFamily:sans, fontSize:"clamp(0.5rem,1.1vw,0.62rem)", color:"rgba(255,255,255,0.85)", fontStyle:"italic" }}>{subtitle}</p>}
    </div>
  );
}

// ── Gold header ────────────────────────────────────────────────────────────────
function GoldHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{
      background:"linear-gradient(90deg,#b8860b 0%,#f5d020 50%,#b8860b 100%)",
      borderRadius:4, padding:"6px 12px", marginBottom:6, textAlign:"center",
    }}>
      <p style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(0.68rem,1.6vw,0.95rem)", fontWeight:700, fontStyle:"italic", color:"#1a0800", lineHeight:1.2 }}>{title}</p>
      <p style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(0.52rem,1.2vw,0.72rem)", color:BLUE, fontStyle:"italic" }}>{subtitle}</p>
    </div>
  );
}

// ── Menu item ─────────────────────────────────────────────────────────────────
function Item({ name, sub, price, price2, bold }:
  { name:string; sub?:string; price:string; price2?:string; bold?:boolean }) {
  return (
    <div style={{ marginBottom: 2 }}>
      <div style={{ display:"flex", alignItems:"baseline", gap:"3px" }}>
        <span style={{ fontFamily:serif, fontSize:"clamp(0.6rem,1.4vw,0.78rem)", fontWeight:bold?900:700, color:DARK, flexShrink:0 }}>{name}</span>
        <span style={{ flex:1, borderBottom:`1px dotted ${GOLD}`, margin:"0 3px 4px", minWidth:6 }} />
        {price2 ? (
          <>
            <span style={{ fontFamily:sans, fontSize:"clamp(0.52rem,1.2vw,0.7rem)", fontWeight:700, color:DARK, flexShrink:0 }}>{price}</span>
            <span style={{ width:8, borderBottom:`1px dotted ${GOLD}`, margin:"0 3px 4px" }} />
            <span style={{ fontFamily:sans, fontSize:"clamp(0.52rem,1.2vw,0.7rem)", fontWeight:700, color:DARK, flexShrink:0 }}>{price2}</span>
          </>
        ) : (
          <span style={{ fontFamily:sans, fontSize:"clamp(0.52rem,1.2vw,0.7rem)", fontWeight:700, color:DARK, flexShrink:0 }}>{price}</span>
        )}
      </div>
      {sub && <p style={{ fontFamily:sans, fontSize:"clamp(0.45rem,1.1vw,0.58rem)", color:BLUE, fontStyle:"italic", marginTop:-1, marginLeft:2 }}>{sub}</p>}
    </div>
  );
}

// ── Size columns ──────────────────────────────────────────────────────────────
function SizeHeader({ col1, col2 }: { col1:string; col2:string }) {
  return (
    <div style={{ display:"flex", justifyContent:"flex-end", gap:"clamp(10px,2.5vw,36px)", marginBottom:1 }}>
      <span style={{ fontFamily:sans, fontSize:"clamp(0.5rem,1.1vw,0.62rem)", fontWeight:900, color:RED }}>{col1}</span>
      <span style={{ fontFamily:sans, fontSize:"clamp(0.5rem,1.1vw,0.62rem)", fontWeight:900, color:RED }}>{col2}</span>
    </div>
  );
}

function Note({ text }: { text:string }) {
  return (
    <p style={{ fontFamily:sans, fontSize:"clamp(0.44rem,1vw,0.56rem)", fontStyle:"italic", color:BLUE, textAlign:"center", margin:"5px 0 3px", borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`, padding:"3px 0", lineHeight:1.4 }}>{text}</p>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COVER — Full-screen dark premium
// ═══════════════════════════════════════════════════════════════════════════════
export function CoverPage() {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      overflow: "hidden",
      background: "#7a0817",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cover.png"
        alt="Las Tejas — Bienvenidos"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// BACK COVER
// ═══════════════════════════════════════════════════════════════════════════════
export function BackCover() {
  return (
    <div style={{
      width:"100%", height:"100%",
      background:"linear-gradient(145deg,#1a0800 0%,#3a1000 50%,#1a0800 100%)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      position:"relative", overflow:"hidden",
    }}>
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:`repeating-linear-gradient(45deg,transparent,transparent 28px,rgba(180,80,0,0.04) 28px,rgba(180,80,0,0.04) 29px)` }} />
      <div style={{ position:"absolute", inset:"clamp(10px,2vw,20px)", border:"1.5px solid rgba(200,140,40,0.25)", borderRadius:3, pointerEvents:"none" }} />

      <div style={{ position:"relative", textAlign:"center", padding:"0 clamp(16px,4vw,40px)" }}>
        {/* Thank you */}
        <div style={{ background:`linear-gradient(90deg,#9b0a1e,${RED},#9b0a1e)`, borderRadius:6, padding:"clamp(10px,2vh,18px) clamp(16px,3vw,28px)", marginBottom:"clamp(12px,3vh,24px)", boxShadow:"0 4px 20px rgba(180,0,30,0.4)" }}>
          <p style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(0.9rem,2.5vw,1.4rem)", fontWeight:700, fontStyle:"italic", color:"#f5d020", lineHeight:1.2 }}>Muchas Gracias por Preferirnos</p>
          <p style={{ fontFamily:sans, fontSize:"clamp(0.6rem,1.5vw,0.8rem)", color:"rgba(255,255,255,0.8)", fontStyle:"italic" }}>Thank you for choosing us</p>
        </div>

        {/* Contact */}
        <div style={{ color:"rgba(220,155,50,0.7)" }}>
          <p style={{ fontFamily:sans, fontSize:"clamp(0.52rem,1.3vw,0.7rem)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>Para Eventos y Reservaciones</p>
          <p style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(1.2rem,4vw,2.2rem)", fontWeight:700, color:"#e8b248", letterSpacing:"0.04em", marginBottom:4 }}>8884 5598</p>
          <p style={{ fontFamily:sans, fontSize:"clamp(0.52rem,1.3vw,0.68rem)", color:"rgba(220,155,50,0.55)", marginBottom:4 }}>✉ las_tejas@yahoo.com</p>
          <div style={{ width:60, height:1, background:"rgba(200,140,40,0.3)", margin:"10px auto" }} />
          <p style={{ fontFamily:sans, fontSize:"clamp(0.52rem,1.3vw,0.68rem)", color:"rgba(220,155,50,0.5)" }}>📍 Puerto Salvador Allende, Managua</p>
          <p style={{ fontFamily:sans, fontSize:"clamp(0.55rem,1.3vw,0.7rem)", color:"rgba(220,155,50,0.5)", marginTop:4 }}>f /restaurantelasteja</p>
        </div>

        {/* Small logo */}
        <div style={{ marginTop:"clamp(14px,3vh,24px)", fontSize:"clamp(1.5rem,4vw,2.5rem)", opacity:0.6 }}>🏡</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE SPREAD 1 — LEFT: Entradas | RIGHT: Antojitos + Surtidos
// ═══════════════════════════════════════════════════════════════════════════════
export function P1Left() {
  return (
    <PageShell>
      <SectionHeader title="ENTRADAS / Entrées" />
      <Item name="Coctel de camarones" sub="Shrimp Cocktail" price="C$310.00" />
      <Item name="Ceviche de pescado (corvina)" sub="Fish Ceviche (Sea Bass)" price="C$250.00" />
      <Item name="Ceviche mixto (pescado y camarones)" sub="Mixed Ceviche (fish and shrimp)" price="C$290.00" />
      <Item name="Ceviche de camarones" sub="Shrimp Ceviche" price="C$310.00" />
      <div style={{ marginBottom:3 }}>
        <span style={{ fontFamily:serif, fontSize:"clamp(0.6rem,1.4vw,0.78rem)", fontWeight:700 }}>Ensalada Cesar / <em>Caesar Salad</em></span>
        <Item name="  Con Pollo / With chicken" price="C$220.00" />
        <Item name="  Sin pollo / Without chicken" price="C$160.00" />
      </div>
      <Item name="Tacos al pastor (orden de 3)" sub="Tacos al pastor (order comes with 3)" price="C$220.00" />
      <Item name="Nachos (Res o Pollo)" sub="Nachos (beef or chicken)" price="C$320.00" />
    </PageShell>
  );
}

export function P1Right() {
  return (
    <PageShell>
      <SectionHeader title="ANTOJITOS NICARAGÜENSES" subtitle="Nicaraguan appetizers" />
      <Item name="Vigorón / Vigorón" price="C$160.00" />
      <Item name="Chanchito con Yuca" sub="Yucca root with pork" price="C$180.00" />
      <Item name="Tajadas con queso" price="C$100.00" />
      <Item name="Tostones con queso frito" sub="Tostones with fried cheese" price="C$180.00" />
      <Item name="Tostones con Carne" sub="Tostones with beef" price="C$260.00" />
      <Item name="Tostones mixtos / Mixed Tostones" price="C$210.00" />
      <Item name="Cazuela de frijolitos molidos (queso frito, Tajadas)" sub="with fried cheese and plantain slices" price="C$160.00" />
      <Item name="Cazuela de frijolitos molidos (con tajadas)" sub="with fried plantain slices" price="C$100.00" />
      <Item name="Chorizo Criollo (4 unid con tortilla y chile)" sub="Chorizo Criollo (with tortilla and hot pepper)" price="C$110.00" />
      <Item name="Chorizada (Español arg. y alem.) con tortilla y chile criollo" price="C$300.00" />

      <SectionHeader title="SURTIDOS TÍPICOS LAS TEJAS" subtitle="Las tejas miscellaneous" />
      <div style={{ background:"linear-gradient(135deg,#f5d020 0%,#f5a623 100%)", borderRadius:5, padding:"6px 10px", marginTop:3 }}>
        <Item name="Para 6 personas / For 6 people" price="C$1,000.00" bold />
        <Item name="Para 4 personas / For 4 people" price="C$800.00" bold />
        <p style={{ fontFamily:sans, fontSize:"clamp(0.42rem,1vw,0.54rem)", color:"#333", fontStyle:"italic", lineHeight:1.4, margin:"3px 0 5px" }}>Acompañados: Fajitas res o pollo, gallo pinto, chorizo, tajadas, queso frito, tortilla frita, chanchito con yuca, ensalada, chicharrón, maduro y chile criollo.</p>
        <Item name="Para 2 persona / For 2 person" price="C$500.00" bold />
        <p style={{ fontFamily:sans, fontSize:"clamp(0.42rem,1vw,0.54rem)", color:"#333", fontStyle:"italic", lineHeight:1.4, marginTop:3 }}>Acompañados: Fajitas res o pollo, gallo pinto, chorizo, tajadas, ensalada, tortillas fritas.</p>
      </div>
    </PageShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE SPREAD 2 — LEFT: Especialidades Filete | RIGHT: Platos Fuertes
// ═══════════════════════════════════════════════════════════════════════════════
export function P2Left() {
  return (
    <PageShell>
      <GoldHeader title="Nuestras Especialidades en Filete de Exportacion" subtitle="our export fillet specialties" />
      <SizeHeader col1="8 ONZA" col2="12 ONZA" />
      <Item name="Filete las tejas (salsa de queso cheddar)" sub="Dipped in a exquisite Cheddar cheese sauce" price="C$560.00" price2="C$730.00" />
      <Item name="Tacón Alto (cebollas gratinadas)" sub="(with exquisite caramelized onions)" price="C$560.00" price2="C$730.00" />
      <Item name="Churrasco" price="C$560.00" price2="C$730.00" />
      <Item name="Jalapeño" price="C$560.00" price2="C$730.00" />
      <Item name="Filete Mignón (salsa de Champiñones)" sub="(Dipped in a mushroom sauce)" price="C$630.00" price2="C$790.00" />
      <Item name="Lomo de costilla" sub="Ribs Tenderloin" price="C$520.00" price2="C$680.00" />
      <Item name="Puyazo con gordo" price="C$520.00" price2="C$680.00" />
    </PageShell>
  );
}

export function P2Right() {
  return (
    <PageShell>
      <SectionHeader title="PLATOS FUERTES / ENTREES" />
      <SectionHeader title="ASADOS / Grill" />
      <SizeHeader col1="8 ONZA" col2="1 LB" />
      <Item name="Res / Steak" price="C$290.00" price2="C$460.00" />
      <Item name="Cerdo / Pork" price="C$260.00" price2="C$410.00" />
      <Item name="Pollo / Chicken" price="C$260.00" price2="C$410.00" />
      <Item name="Costilla de cerdo criolla" sub="Criolle baby back ribs" price="C$380.00" />
      <Item name="Costilla de cerdo BBQ" sub="BBQ baby back ribs" price="C$420.00" />
      <Item name="Brocheta de res" sub="Steak skewers" price="C$310.00" />
      <Item name="Brocheta de pollo" sub="Chicken skewers (with refried beans)" price="C$290.00" />
      <Item name="Filete de cerdo" sub="Pork Fillet (with beans)" price="C$360.00" />

      <SectionHeader title="RES / Beef" />
      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:1 }}>
        <span style={{ fontFamily:sans, fontSize:"clamp(0.5rem,1.1vw,0.62rem)", fontWeight:900, color:RED }}>8 ONZA</span>
      </div>
      <Item name="Bistec encebollado / Steak Ranchero" price="C$310.00" />
      <Item name="Fajitas de res clásica / Classic Steak Fajitas" price="C$300.00" />
      <Item name="Fajitas mixtas / Mixed Fajitas" price="C$310.00" />
      <Item name="Fajitas en salsa jalapeña" price="C$320.00" />
      <Item name="Fajitas en salsa de hongos" price="C$320.00" />
      <Note text="Todos los platos van acompañados de arroz, ensalada de lechuga, papa frita o tostones · All dishes accompanied by rice, lettuce salad, French Fries or tostones" />
    </PageShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE SPREAD 3 — LEFT: Pollo | RIGHT: Mariscos + Infantil + Para Compartir
// ═══════════════════════════════════════════════════════════════════════════════
export function P3Left() {
  return (
    <PageShell>
      <SectionHeader title="POLLO / Chicken" />
      <Item name="Sopa de pollo (arroz y tortilla)" sub="Chicken soup (Accompanied by rice and tortilla)" price="C$250.00" />
      <Item name="Filete de pollo a la plancha" sub="Grilled chicken fillet" price="C$320.00" />
      <Item name="Filete de pollo en salsa blanca con hongos" sub="Chicken Fillet in white sauce with mushrooms" price="C$390.00" />
      <Item name="Filete de pollo en salsa jalapeña" sub="Chicken Fillet in jalapeña sauce" price="C$390.00" />
      <Item name="Deditos de pollo (salsa rosada)" sub="Chicken fingers (pink sauce)" price="C$300.00" />
      <Item name="Fajitas de pollo en salsa jalapeña" sub="Chicken Fajitas in jalapeña sauce" price="C$310.00" />
      <Item name="Fajitas de pollo clásicas" sub="Classic Chicken Fajitas" price="C$310.00" />
      <Item name="Alitas en salsa picante" sub="Spicy Chicken wings" price="C$330.00" />
      <Item name="Alitas BBQ / BBQ chicken wings" price="C$380.00" />
      <Note text="Todos los platos van acompañados de arroz, ensalada, papa frita o tostones" />
    </PageShell>
  );
}

export function P3Right() {
  return (
    <PageShell>
      <SectionHeader title="MARISCOS / Seafood" />
      <Item name="Filete de corvina a la plancha (Empanizado y/o al ajillo)" sub="Sea Bass Fillet (Ajillo, Grilled or Fried)" price="C$390.00" />
      <Item name="Filete Corvina a la meuniere" sub="Sea Bass a la meuniere" price="C$460.00" />
      <Item name="Filete Corvina (en salsa blanca de alcaparras)" sub="Sea Bass (in white capers sauce)" price="C$460.00" />
      <Item name="Deditos de pescado / Fish fingers" price="C$300.00" />
      <Item name="Camarones (al ajillo y/o empanizados)" sub="Shrimps (ajillo or fried)" price="C$490.00" />
      <Item name="Camarones (en salsa jalapeña)" sub="Shrimps (in jalapeña sauce)" price="C$550.00" />
      <Item name="Sopa marinera / marinera soup" price="C$550.00" />
      <Item name="Pargo Entero (1.5 lbs. En salsa a la Tipitapa)" sub="Regular Snapper (1.5 Lbs Whole In Tipitapa sauce)" price="C$850.00" />
      <Note text="Todos los platos van acompañados de arroz, ensalada, papa frita o tostones" />

      <SectionHeader title="INFANTIL / Kid" />
      <Item name="Deditos de pollo (6 uds.) Chicken fingers (6 pieces)" price="C$200.00" />
      <Item name="Deditos de pescado (6 uds.) Fish fingers (6 pieces)" price="C$200.00" />
      <p style={{ fontFamily:sans, fontSize:"clamp(0.46rem,1.1vw,0.58rem)", color:BLUE, fontStyle:"italic", textAlign:"center", margin:"2px 0 6px" }}>Served with rice, French Fries and tomato sauce</p>

      <SectionHeader title="PARA COMPARTIR" subtitle="To share" />
      <Item name="Alitas (12 uds. picante o bbq) Chicken Wings" price="C$520.00" />
      <p style={{ fontFamily:sans, fontSize:"clamp(0.46rem,1.1vw,0.58rem)", color:BLUE, fontStyle:"italic", textAlign:"center", marginTop:2 }}>Acompañados de papas fritas / Come with french fries</p>
    </PageShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE SPREAD 4 — LEFT: Cervezas + Cocteles | RIGHT: Licores
// ═══════════════════════════════════════════════════════════════════════════════
export function P4Left() {
  return (
    <PageShell>
      <SectionHeader title="CERVEZAS / Beer" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 10px" }}>
        <div>
          <p style={{ fontFamily:sans, fontSize:"clamp(0.55rem,1.3vw,0.7rem)", fontWeight:900, color:RED, marginBottom:2 }}>NACIONALES</p>
          <Item name="Toña" price="C$60.00" />
          <Item name="Victoria" price="C$60.00" />
          <Item name="Victoria Frost" price="C$55.00" />
          <Item name="Lata" price="C$70.00" />
          <p style={{ fontFamily:sans, fontSize:"clamp(0.55rem,1.3vw,0.7rem)", fontWeight:900, color:RED, margin:"5px 0 2px" }}>INTERNACIONALES</p>
          <Item name="Miller Lite" price="C$70.00" />
          <Item name="Heineken" price="C$120.00" />
          <Item name="Sol" price="C$120.00" />
          <Item name="Corona" price="C$120.00" />
        </div>
        <div>
          <p style={{ fontFamily:sans, fontSize:"clamp(0.55rem,1.3vw,0.7rem)", fontWeight:900, color:RED, marginBottom:2 }}>RTD</p>
          <Item name="Smirnoff Ice" sub="Red, Raspberry, Green Apple, Light" price="C$120.00" />
          <Item name="Bliss: Frutas Mixtas" price="C$120.00" />
          <Item name="Bamboo: Daiquiri Fresa, Mojito" price="C$90.00" />
          <p style={{ fontFamily:sans, fontSize:"clamp(0.55rem,1.3vw,0.7rem)", fontWeight:900, color:RED, margin:"5px 0 2px" }}>HARD SELTZER</p>
          <Item name="Adán y Eva" sub="Frutos Rojos, Limón Jengibre, Coco Limón, Maracuyá y Piña, Durazno Rosé con Vodka." price="C$70.00" />
        </div>
      </div>

      <div style={{ textAlign:"center", fontSize:"clamp(1.6rem,4vw,2.6rem)", margin:"5px 0 2px", lineHeight:1 }}>🍹🍸🍊</div>

      <SectionHeader title="COCTELES / Cocktails" />
      <Item name="Margarita / Margarita" price="C$160.00" />
      <Item name="Daiquiri / Daiquiri" price="C$160.00" />
      <Item name="Piña Colada / Piña Colada" price="C$160.00" />
      <Item name="Mix Michelada / Mix Michelada" price="C$45.00" />
    </PageShell>
  );
}

export function P4Right() {
  return (
    <PageShell>
      <SectionHeader title="LICORES EXTRANJEROS" subtitle="Foreign Liquors" />
      <SizeHeader col1="1/2" col2="1/4" />
      <Item name="Tequila" price="C$1,600.00" price2="C$750.00" />
      <Item name="Chivas Rigal" price="C$1,600.00" price2="C$800.00" />
      <Item name="Johnnie Walker Negro" price="C$1,400.00" price2="C$700.00" />
      <Item name="Johnnie Walker Rojo" price="C$1,200.00" price2="C$600.00" />
      <Item name="Vodka" sub="(Absolut, Stolichnaya, Finlandia)" price="C$1,000.00" price2="C$500.00" />

      <SectionHeader title="LICORES NACIONALES" subtitle="Nicaraguan Liquors" />
      <SizeHeader col1="1/2" col2="1/4" />
      <Item name="Gran Reserv 7 años" price="C$420.00" price2="C$270.00" />
      <Item name="Añejo Clásico 5 años" price="C$270.00" price2="C$140.00" />
      <Item name="Extra Lite" price="C$320.00" price2="C$160.00" />
      <Item name="Ultra Lite" price="C$320.00" price2="C$160.00" />
      <Item name="Centenario 12 años" price="C$900.00" price2="C$500.00" />
      <Item name="Centenario 18 años" price="C$1,000.00" price2="C$600.00" />
    </PageShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE SPREAD 5 — LEFT: Extras + Postres + Bebidas Caliente | RIGHT: Bebidas Frías
// ═══════════════════════════════════════════════════════════════════════════════
export function P5Left() {
  return (
    <PageShell>
      <SectionHeader title="EXTRAS / Extras" />
      <Item name="Gallo pinto / Gallo pinto" price="C$40.00" />
      <Item name="Frijolitos molidos / Refried beans" price="C$40.00" />
      <Item name="Tostones / Tostones" price="C$45.00" />
      <Item name="Tajadas de plátano / Fried plantain slices" price="C$45.00" />
      <Item name="Maduro frito / Whole fried ripe plantain" price="C$45.00" />
      <Item name="Queso frito / Fried cheese" price="C$40.00" />
      <Item name="Papas fritas / French fries" price="C$70.00" />
      <Item name="Chorizo Parrillero (2 Uds.) / Grilled chorizo" price="C$95.00" />
      <Item name="Chorizo criollo (2 Uds.) / Criollo chorizo" price="C$45.00" />
      <Item name="Tortillas (2) / Tortillas (2)" price="C$20.00" />
      <Item name="Galleta soda / Crackers" price="C$10.00" />
      <Item name="Pico de gallo / Pico de gallo" price="C$25.00" />

      <SectionHeader title="POSTRES / Desserts" />
      <Item name="Tres Leches / Three milk cake" price="C$120.00" />
      <Item name="Flan de Coco / Coconut Flan" price="C$120.00" />

      <SectionHeader title="BEBIDA CALIENTE / Hot drinks" />
      <Item name="Café negro / Expresso" price="C$40.00" />
      <Item name="Café con leche / Latte" price="C$60.00" />
      <Item name="Té / Tea" price="C$80.00" />
    </PageShell>
  );
}

export function P5Right() {
  return (
    <PageShell>
      <SectionHeader title="BEBIDA FRÍAS / Soft drinks" />
      <Item name="Agua (Fuente Pura 600ml) / Water 600ml" price="C$45.00" />
      <Item name="Refrescos Naturales / (Natural juices)" price="C$80.00" />
      <Item name="Fruit punch" price="C$90.00" />
      <Item name="Cacao" price="C$90.00" />
      <Item name="Hi-C Fruta" price="C$35.00" />
      <Item name="Hi-C Té" price="C$35.00" />
      <Item name="Gatorade" price="C$60.00" />
      <Item name="Gaseosas 12 onzas" price="C$40.00" />
      <Item name="Gaseosas lata zero" price="C$50.00" />

      {/* Closing */}
      <div style={{
        background:`linear-gradient(90deg,#9b0a1e,${RED},#9b0a1e)`,
        borderRadius:6, padding:"clamp(8px,1.8vw,14px)", marginTop:10,
        textAlign:"center", boxShadow:"0 4px 16px rgba(180,0,30,0.4)",
      }}>
        <p style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(0.85rem,2vw,1.25rem)", fontWeight:700, fontStyle:"italic", color:"#f5d020", lineHeight:1.2 }}>Muchas Gracias por Preferirnos</p>
        <p style={{ fontFamily:sans, fontSize:"clamp(0.55rem,1.3vw,0.75rem)", color:"rgba(255,255,255,0.85)", fontStyle:"italic" }}>Thank you for choosing us</p>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8, flexWrap:"wrap", gap:4 }}>
          <div style={{ textAlign:"left" }}>
            <p style={{ fontFamily:sans, fontSize:"clamp(0.48rem,1.1vw,0.6rem)", color:"#f5d020", fontWeight:700, textTransform:"uppercase" }}>"Para Eventos y Promociones"</p>
            <p style={{ fontFamily:sans, fontSize:"clamp(1rem,2.5vw,1.4rem)", color:"#fff", fontWeight:900 }}>8884 5598</p>
            <p style={{ fontFamily:sans, fontSize:"clamp(0.48rem,1.1vw,0.6rem)", color:"rgba(255,255,255,0.8)" }}>✉ las_tejas@yahoo.com</p>
          </div>
          <div style={{ textAlign:"right" }}>
            <p style={{ fontFamily:sans, fontSize:"clamp(0.48rem,1.1vw,0.6rem)", color:"rgba(255,255,255,0.8)" }}>Síguenos / Follow us</p>
            <p style={{ fontFamily:sans, fontSize:"clamp(0.65rem,1.5vw,0.85rem)", color:"#fff", fontWeight:700 }}>f /restaurantelasteja</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
