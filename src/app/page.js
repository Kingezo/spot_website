"use client";
import { collection, addDoc } from "firebase/firestore";
import React, { useState, useRef } from "react";
import { Button } from "./componenents/Button";
import { db } from "./firebaseConfig";

const t = {
  en: {
    hero_tagline: "Save Money and Build Credit Today!",
    hero_cta: "Join the Waitlist",
    stat_users: "Active Users",
    stat_saved: "Saved by Members",
    how_title: "How It Works",
    pool_title: "Join a Pool",
    pool_body: "Create a pool of people you know to start saving, or jump into a pool with people with similar saving goals.",
    contribute_title: "Contribute & Receive",
    contribute_body: "Each cycle, contribute your set amount and receive a lump sum when it's your turn.",
    credit_title: "Build Credit",
    credit_body: "Subscribe to report payments to the 3 major credit bureaus and grow your credit score.",
    coming_soon: "Coming Soon",
    credit_banner_title: "Build Your Credit with On-Time Payments",
    credit_banner_body: "Spot helps users improve their credit by reporting on-time payments to major credit bureaus.",
    community_title: "More Than Saving Alone",
    community_body: "Spot turns saving into a shared goal. Members stay accountable, support each other, and take turns receiving a larger payout — giving some a boost today while helping everyone build toward their goals over time.",
    pools_title: "What People Call Money Pools Around the World",
    tradition_title: "A Tradition Built on Community",
    tradition_body: "Money pools are not new — they have existed for centuries across cultures as a way for people to save, support each other, and access larger sums of money without relying on banks. Known academically as ROSCAs, or Rotating Savings and Credit Associations, these groups work by having members contribute regularly and take turns receiving the full payout. At their core, they are built on trust, accountability, and community — the same principles Spot is bringing into a modern, transparent app experience.",
    video_title: "See Spot in Action",
    join_title: "Join Today!",
    join_subtitle: "Available on iOS and Android.",
    android_card_title: "Get early access on Android",
    android_card_body: "Spot is in private testing on Android. Drop your email and we'll add you to the list — you'll hear back within 24 hours.",
    android_sent: "You're on the list! We'll be in touch soon.",
    android_placeholder: "your@email.com",
    android_request: "Request Access",
    android_sending: "Sending…",
    android_error: "Something went wrong. Please try again.",
    waitlist_title: "Let Us Spot You!",
    waitlist_subtitle: "Stay up to date with the latest info, updates, and early access news.",
    waitlist_placeholder: "Your email",
    waitlist_cta: "Join Waitlist",
    waitlist_success: "Success! You've joined the waitlist.",
    waitlist_empty: "Please enter an email!",
    waitlist_error: "Error signing up. Please try again.",
  },
  es: {
    hero_tagline: "¡Ahorra dinero y construye crédito hoy!",
    hero_cta: "Únete a la lista de espera",
    stat_users: "Usuarios activos",
    stat_saved: "Ahorrado por miembros",
    how_title: "Cómo funciona",
    pool_title: "Únete a un grupo",
    pool_body: "Crea un grupo con personas que conoces para empezar a ahorrar, o únete a uno con metas similares.",
    contribute_title: "Contribuye y recibe",
    contribute_body: "Cada ciclo, aporta tu cantidad y recibe un pago mayor cuando llegue tu turno.",
    credit_title: "Construye crédito",
    credit_body: "Suscríbete para reportar pagos a las 3 principales agencias de crédito y mejora tu puntaje.",
    coming_soon: "Próximamente",
    credit_banner_title: "Construye tu crédito con pagos puntuales",
    credit_banner_body: "Spot ayuda a los usuarios a mejorar su crédito reportando pagos puntuales a las principales agencias.",
    community_title: "Más que ahorrar solo",
    community_body: "Spot convierte el ahorro en una meta compartida. Los miembros se mantienen responsables, se apoyan mutuamente y se turnan para recibir un pago mayor — dándole un impulso a algunos hoy mientras todos avanzan hacia sus metas.",
    pools_title: "Cómo llaman a las tandas alrededor del mundo",
    tradition_title: "Una tradición construida en comunidad",
    tradition_body: "Las tandas no son algo nuevo — han existido por siglos en distintas culturas como una forma de ahorrar, apoyarse mutuamente y acceder a sumas mayores de dinero sin depender de los bancos. Conocidas académicamente como ROSCAs, o Asociaciones de Ahorro y Crédito Rotativo, estos grupos funcionan con contribuciones regulares de sus miembros, quienes se turnan para recibir el pago completo. En esencia, se basan en la confianza, la responsabilidad y la comunidad — los mismos principios que Spot trae a una experiencia moderna y transparente.",
    video_title: "Mira Spot en acción",
    join_title: "¡Únete hoy!",
    join_subtitle: "Disponible en iOS y Android.",
    android_card_title: "Obtén acceso anticipado en Android",
    android_card_body: "Spot está en pruebas privadas en Android. Déjanos tu correo y te agregaremos a la lista — recibirás acceso en 24 horas.",
    android_sent: "¡Estás en la lista! Nos pondremos en contacto pronto.",
    android_placeholder: "tu@correo.com",
    android_request: "Solicitar acceso",
    android_sending: "Enviando…",
    android_error: "Algo salió mal. Por favor intenta de nuevo.",
    waitlist_title: "¡Déjanos ayudarte!",
    waitlist_subtitle: "Mantente al día con las últimas noticias, actualizaciones y acceso anticipado.",
    waitlist_placeholder: "Tu correo electrónico",
    waitlist_cta: "Unirse",
    waitlist_success: "¡Éxito! Te has unido a la lista de espera.",
    waitlist_empty: "Por favor ingresa un correo.",
    waitlist_error: "Error al registrarse. Por favor intenta de nuevo.",
  },
};

export default function Home() {
  const [lang, setLang] = useState("en");
  const c = t[lang];

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const [androidOpen, setAndroidOpen] = useState(false);
  const [androidEmail, setAndroidEmail] = useState("");
  const [androidStatus, setAndroidStatus] = useState("");

  const handleAndroidRequest = async () => {
    if (!androidEmail) return;
    setAndroidStatus("sending");
    try {
      await addDoc(collection(db, "spot_android_testers"), {
        email: androidEmail,
        createdAt: new Date(),
      });
      setAndroidStatus("sent");
      setAndroidEmail("");
    } catch {
      setAndroidStatus("error");
    }
  };

  const handleSignUp = async () => {
    if (!email) { setStatus(c.waitlist_empty); return; }
    try {
      await addDoc(collection(db, "spot_waitlist"), { email, createdAt: new Date() });
      setStatus(c.waitlist_success);
      setEmail("");
    } catch {
      setStatus(c.waitlist_error);
    }
  };

  const waitlistRef = useRef(null);
  const scrollToWaitlist = () => waitlistRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col items-center">

      {/* Language toggle */}
      <div className="w-full flex justify-end px-6 py-3 bg-white border-b border-gray-100">
        <button
          onClick={() => setLang(lang === "en" ? "es" : "en")}
          className="text-sm font-semibold px-4 py-1.5 rounded-full border transition hover:bg-gray-50"
          style={{ borderColor: "#007260", color: "#007260" }}
        >
          {lang === "en" ? "Español" : "English"}
        </button>
      </div>

      {/* Hero */}
      <section className="w-full text-center py-20 bg-green-600 text-white px-6">
        <h1 className="text-5xl font-extrabold mb-4">Spot</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">{c.hero_tagline}</p>
        <Button onClick={scrollToWaitlist} className="bg-white text-green-600 px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition">
          {c.hero_cta}
        </Button>
      </section>

      {/* Social Proof */}
      <section className="w-full bg-white border-b border-gray-100 py-5 px-6">
        <div className="flex justify-center gap-10 flex-wrap">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-green-700">100+</p>
            <p className="text-sm text-gray-500">{c.stat_users}</p>
          </div>
          <div className="w-px bg-gray-200 self-stretch hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl font-extrabold text-green-700">$5,000+</p>
            <p className="text-sm text-gray-500">{c.stat_saved}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-8 w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-700">{c.how_title}</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-700">{c.pool_title}</h3>
            <p className="text-gray-700">{c.pool_body}</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-700">{c.contribute_title}</h3>
            <p className="text-gray-700">{c.contribute_body}</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-700">{c.credit_title}</h3>
            <p className="text-gray-700">{c.credit_body}</p>
          </div>
        </div>
      </section>

      {/* Credit Building */}
      <section className="bg-green-600 py-16 px-8 text-center text-white w-full">
        <span className="inline-block bg-white text-green-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          {c.coming_soon}
        </span>
        <h2 className="text-3xl font-bold mb-4">{c.credit_banner_title}</h2>
        <p className="text-lg max-w-2xl mx-auto">{c.credit_banner_body}</p>
      </section>

      {/* More Than Saving Alone */}
      <section className="py-16 px-8 text-center w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-green-700">{c.community_title}</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">{c.community_body}</p>
      </section>

      {/* Money Pools Around the World */}
      {(() => {
        const pools = [
          { name: "Tanda", region: "Mexico / Latin America" },
          { name: "Susu / Sou-Sou / Osusu", region: "West Africa & Caribbean" },
          { name: "Esusu", region: "Nigeria / West Africa" },
          { name: "Pardna / Partner / Pardner", region: "Caribbean" },
          { name: "Chama", region: "East Africa" },
          { name: "Hagbad", region: "Somali communities" },
          { name: "Stokvel", region: "South Africa" },
          { name: "Equb / Ekub", region: "Ethiopia" },
          { name: "Hui", region: "China / Chinese communities" },
          { name: "Hụi / Hội", region: "Vietnam" },
          { name: "Paluwagan", region: "Philippines" },
          { name: "Kameti / Committee", region: "Pakistan / India" },
          { name: "Chit Fund", region: "India" },
          { name: "Kye / Gye", region: "Korea" },
          { name: "Tanomoshi-ko / Mujin", region: "Japan" },
          { name: "Cundina", region: "Mexico / Mexican-American communities" },
          { name: "Consórcio", region: "Brazil" },
          { name: "Cuchubal", region: "Guatemala" },
          { name: "Junta / Pandero", region: "Peru" },
          { name: "Merry-go-round", region: "Kenya / East Africa" },
        ];
        return (
          <section className="w-full bg-gray-50 py-16 border-t border-gray-100">
            <div className="max-w-4xl mx-auto text-center px-6 mb-12">
              <h2 className="text-3xl font-bold mb-10 text-green-700">{c.pools_title}</h2>
              <h3 className="text-2xl font-bold mb-4 text-green-700">{c.tradition_title}</h3>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">{c.tradition_body}</p>
            </div>
            <div className="overflow-hidden w-full">
              <div className="flex gap-4 animate-ticker" style={{ width: "max-content" }}>
                {[...pools, ...pools].map((p, i) => (
                  <div key={i} className="flex-shrink-0 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm text-left" style={{ minWidth: "160px" }}>
                    <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{p.region}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Demo Video */}
      <section className="py-16 px-8 w-full max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-700">{c.video_title}</h2>
        <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/rqZkkxpVd94"
            title="Spot Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Join Today */}
      <section className="w-full bg-gray-50 py-16 px-6 text-center border-t border-gray-100">
        <h2 className="text-3xl font-bold mb-2 text-green-700">{c.join_title}</h2>
        <p className="text-gray-500 mb-10 text-lg">{c.join_subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-sm mx-auto">
          <a
            href="https://testflight.apple.com/join/Ack2ueKr"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-white shadow-md transition active:opacity-80"
            style={{ backgroundColor: "#39B68D" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            iOS
          </a>

          <button
            onClick={() => setAndroidOpen((o) => !o)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-white shadow-md transition active:opacity-80"
            style={{ backgroundColor: "#39B68D" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 15.341a.75.75 0 0 1-.75.75H7.227a.75.75 0 0 1-.75-.75V9.75h11.046v5.591ZM6.477 8.25V6.568a5.523 5.523 0 0 1 11.046 0V8.25H6.477Zm-1.5 0h-.75A1.5 1.5 0 0 0 2.727 9.75v3a1.5 1.5 0 0 0 1.5 1.5h.75V8.25Zm16.546 0h-.75v6h.75a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5ZM9 5.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm6 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM8.25 18v1.5a.75.75 0 0 0 1.5 0V18h-1.5Zm6 0v1.5a.75.75 0 0 0 1.5 0V18h-1.5Z" />
            </svg>
            Android
          </button>
        </div>

        {androidOpen && (
          <div className="mt-6 max-w-sm mx-auto bg-white border border-gray-200 rounded-2xl px-6 py-6 shadow-md text-left">
            <p className="text-sm font-semibold text-gray-900 mb-1">{c.android_card_title}</p>
            <p className="text-sm text-gray-500 mb-4">{c.android_card_body}</p>

            {androidStatus === "sent" ? (
              <p className="text-sm font-semibold" style={{ color: "#007260" }}>{c.android_sent}</p>
            ) : (
              <>
                <input
                  type="email"
                  placeholder={c.android_placeholder}
                  value={androidEmail}
                  onChange={(e) => setAndroidEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAndroidRequest()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <button
                  onClick={handleAndroidRequest}
                  disabled={androidStatus === "sending"}
                  className="w-full py-2 rounded-lg text-sm font-semibold text-white transition active:opacity-80 disabled:opacity-50"
                  style={{ backgroundColor: "#007260" }}
                >
                  {androidStatus === "sending" ? c.android_sending : c.android_request}
                </button>
                {androidStatus === "error" && (
                  <p className="text-xs text-red-500 mt-2">{c.android_error}</p>
                )}
              </>
            )}
          </div>
        )}
      </section>

      {/* Join Waitlist */}
      <section ref={waitlistRef} className="text-center py-16 bg-gray-100 w-full">
        <h2 className="text-3xl font-bold mb-4 text-green-700">{c.waitlist_title}</h2>
        <p className="text-lg text-gray-700 mb-6">{c.waitlist_subtitle}</p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder={c.waitlist_placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-md w-72"
          />
          <Button
            onClick={handleSignUp}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg ml-2 hover:bg-green-700 transition"
          >
            {c.waitlist_cta}
          </Button>
        </div>
        {status && <p className="mt-4 text-green-600">{status}</p>}
      </section>

    </div>
  );
}
