"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  GlobeHemisphereEast,
  EnvelopeSimple,
  Factory,
  HardDrives,
  List,
  MapPinLine,
  PhoneCall,
  TShirt,
  X,
} from "@phosphor-icons/react";
import Preloader from "@/components/Preloader";

const sectors = [
  "Government institutions",
  "TNI and TNI AU",
  "Ministry of Defense",
  "BUMN",
  "Industrial operations",
  "Oil and gas services",
  "QHSE and manpower",
  "Flight simulator support",
];

type Lang = "id" | "en";

const copy = {
  en: {
    nav: [
      { label: "Company", href: "#company" },
      { label: "Work", href: "#capabilities" },
      { label: "Model", href: "#model" },
      { label: "Contact", href: "#contact" },
    ],
    startBrief: "Start brief",
    startRequirement: "Start requirement",
    hero: {
      kicker: "PT Nusa Perdana Cipta",
      titleA: "Mission",
      titleB: "Ready",
      body: "Integrated Technology, Defense, and Industrial Solutions.",
      primary: "View work",
      secondary: "Company profile",
      metaA: "Based in Bogor, Indonesia",
      metaB: "General trading / strategic supply",
      metaC: "Scroll signal active",
    },
    company: {
      kicker: "Company",
      title: "Built for the difficult brief.",
      body: "NPC connects procurement, manufacturing, defense-related supply, and IT infrastructure into one accountable operating channel.",
      cards: [
        ["General trading", "Institutional procurement and supply coordination."],
        ["Technical validation", "Specs, samples, documents, and delivery gates stay visible."],
        ["Field continuity", "Repeat orders, logistics updates, and operational support."],
      ],
    },
    work: {
      kicker: "Work surface",
      title: "Three lanes. One control room.",
      body: "Each capability is handled like a working desk: image proof, scope, documents, and field checkpoints stay readable from the first brief.",
      capabilities: [
        {
          eyebrow: "Uniform / Tactical Wear",
          title: "Technical apparel programs",
          text: "PDH, PDL, field uniforms, tactical garments, and institutional apparel produced against approved standards and delivery windows.",
          image: "/tactical_apparel.png",
          icon: TShirt,
        },
        {
          eyebrow: "Server / Network / Security",
          title: "IT infrastructure procurement",
          text: "Hardware, server rooms, networking, data security, and high-availability environments coordinated with accountable documentation.",
          image: "/server_infrastructure.png",
          icon: HardDrives,
        },
        {
          eyebrow: "Industrial / Defense Supply",
          title: "Manufacturing and operational supply",
          text: "Material sourcing, simulator support, industrial goods, and defense-sector requirements handled through visible checkpoints.",
          image: "/tactical_apparel.png",
          icon: Factory,
        },
      ],
    },
    model: {
      kicker: "Operating model",
      title: "No black box procurement.",
      body: "Every brief moves through a visible control path: scope is framed, partners are selected, proof is checked, and movement is tracked until handover.",
      rows: [
        ["01", "Frame", "Translate scope, standards, quantity, risk, and delivery location into a working procurement brief."],
        ["02", "Source", "Select production partners, vendors, materials, or hardware against the agreed technical criteria."],
        ["03", "Verify", "Run specification checks, documentation review, sample validation, and quality gates before release."],
        ["04", "Move", "Coordinate production, logistics, installation, handover, and repeat-order continuity with client teams."],
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Bring the hard spec.",
      body: "Start with scope, quantity, timeline, location, and required standard. NPC will map the path from sourcing to delivery.",
      fullName: "Full name",
      fullNamePlaceholder: "Your name",
      organization: "Organization",
      organizationPlaceholder: "Company or institution",
      requirementArea: "Requirement area",
      options: ["Technical apparel", "IT infrastructure", "General procurement"],
      scope: "Scope / description",
      scopePlaceholder: "Scope, quantity, timeline, location, standards.",
      submit: "Send secure request",
    },
    footer: {
      subtitle: "Integrated procurement partner",
      pdf: "Profile PDF",
    },
  },
  id: {
    nav: [
      { label: "Perusahaan", href: "#company" },
      { label: "Layanan", href: "#capabilities" },
      { label: "Model", href: "#model" },
      { label: "Kontak", href: "#contact" },
    ],
    startBrief: "Mulai brief",
    startRequirement: "Kirim kebutuhan",
    hero: {
      kicker: "PT Nusa Perdana Cipta",
      titleA: "Mission",
      titleB: "Ready",
      body: "Integrated Technology, Defense, and Industrial Solutions.",
      primary: "Lihat layanan",
      secondary: "Profil perusahaan",
      metaA: "Berbasis di Bogor, Indonesia",
      metaB: "General trading / strategic supply",
      metaC: "Sinyal scroll aktif",
    },
    company: {
      kicker: "Perusahaan",
      title: "Dibangun untuk brief yang sulit.",
      body: "NPC menghubungkan pengadaan, manufaktur, suplai terkait pertahanan, dan infrastruktur IT dalam satu kanal kerja yang akuntabel.",
      cards: [
        ["General trading", "Koordinasi pengadaan dan suplai untuk institusi."],
        ["Validasi teknis", "Spesifikasi, sampel, dokumen, dan gate pengiriman tetap terlihat."],
        ["Kontinuitas lapangan", "Repeat order, update logistik, dan dukungan operasional."],
      ],
    },
    work: {
      kicker: "Work surface",
      title: "Tiga jalur. Satu ruang kendali.",
      body: "Setiap layanan diperlakukan seperti meja kerja: bukti visual, scope, dokumen, dan checkpoint lapangan tetap mudah dibaca sejak brief pertama.",
      capabilities: [
        {
          eyebrow: "Uniform / Tactical Wear",
          title: "Program apparel teknis",
          text: "PDH, PDL, seragam lapangan, tactical garment, dan apparel institusi diproduksi mengikuti standar dan window pengiriman yang disetujui.",
          image: "/tactical_apparel.png",
          icon: TShirt,
        },
        {
          eyebrow: "Server / Network / Security",
          title: "Pengadaan infrastruktur IT",
          text: "Hardware, ruang server, jaringan, keamanan data, dan environment high-availability dikoordinasikan dengan dokumentasi yang jelas.",
          image: "/server_infrastructure.png",
          icon: HardDrives,
        },
        {
          eyebrow: "Industrial / Defense Supply",
          title: "Manufaktur dan suplai operasional",
          text: "Sourcing material, dukungan simulator, kebutuhan industri, dan suplai sektor pertahanan ditangani lewat checkpoint yang terlihat.",
          image: "/tactical_apparel.png",
          icon: Factory,
        },
      ],
    },
    model: {
      kicker: "Model operasi",
      title: "Pengadaan tanpa kotak hitam.",
      body: "Brief masuk ke satu jalur kontrol: scope dibaca, vendor dipilih, bukti dicek, lalu pergerakan barang dipantau sampai serah terima.",
      rows: [
        ["01", "Frame", "Ubah scope, standar, kuantitas, risiko, dan lokasi kirim menjadi brief pengadaan yang bisa dikerjakan."],
        ["02", "Source", "Pilih mitra produksi, vendor, material, atau hardware sesuai kriteria teknis yang disepakati."],
        ["03", "Verify", "Jalankan cek spesifikasi, review dokumen, validasi sampel, dan quality gate sebelum rilis."],
        ["04", "Move", "Koordinasikan produksi, logistik, instalasi, serah terima, dan repeat order dengan tim klien."],
      ],
    },
    contact: {
      kicker: "Kontak",
      title: "Bawa spek tersulit.",
      body: "Mulai dari scope, kuantitas, timeline, lokasi, dan standar yang dibutuhkan. NPC akan memetakan jalur dari sourcing sampai delivery.",
      fullName: "Nama lengkap",
      fullNamePlaceholder: "Nama Anda",
      organization: "Organisasi",
      organizationPlaceholder: "Perusahaan atau institusi",
      requirementArea: "Area kebutuhan",
      options: ["Apparel teknis", "Infrastruktur IT", "Pengadaan umum"],
      scope: "Scope / deskripsi",
      scopePlaceholder: "Scope, kuantitas, timeline, lokasi, standar.",
      submit: "Kirim permintaan aman",
    },
    footer: {
      subtitle: "Mitra pengadaan terintegrasi",
      pdf: "Profil PDF",
    },
  },
} as const;

function Mark({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/npc-mark.png"
      alt="NPC monogram"
      width={128}
      height={128}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}

function FloatingNav({
  visible,
  openMenu,
  lang,
  setLang,
  navItems,
  startBrief,
}: {
  visible: boolean;
  openMenu: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  navItems: readonly { label: string; href: string }[];
  startBrief: string;
}) {
  return (
    <motion.nav
      initial={false}
      animate={visible ? "shown" : "hidden"}
      variants={{
        shown: { opacity: 1, y: 0, scale: 1 },
        hidden: { opacity: 0, y: -28, scale: 0.98 },
      }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-1/2 top-5 z-50 w-[min(1220px,calc(100%-28px))] -translate-x-1/2 ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-label="Primary navigation"
    >
      <div className="nav-shell relative flex min-h-[78px] items-center justify-between gap-5 border border-white/14 bg-[#070907]/78 px-4 py-3 text-white shadow-[0_26px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:px-6">
        <a href="#top" className="group grid h-11 w-11 place-items-center border border-[#8aff61]/30 bg-[#8aff61]/8 transition duration-300 hover:border-[#8aff61] hover:bg-[#8aff61]/14" aria-label="Back to top">
          <Mark className="h-8 w-8 transition duration-300 group-hover:scale-110" />
        </a>

        <div className="nav-center-menu hidden items-center justify-center gap-4 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link relative inline-flex items-center px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/68 transition duration-300 hover:text-white lg:px-6"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          <div className="language-toggle flex items-center gap-1 border border-white/12 bg-black/22 p-1" aria-label="Language selector">
            {(["id", "en"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLang(option)}
                className={`inline-flex h-9 items-center gap-2 px-3 text-[10px] font-black uppercase tracking-[0.16em] transition ${
                  lang === option ? "bg-[#8aff61] text-[#061006]" : "text-white/58 hover:text-white"
                }`}
                aria-pressed={lang === option}
              >
                {option === "id" && <GlobeHemisphereEast size={14} weight="bold" />}
                {option.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden items-center gap-3 border-l border-[#8aff61]/35 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#061006] transition duration-300 hover:bg-[#8aff61] lg:inline-flex"
          >
            {startBrief}
            <ArrowUpRight size={15} weight="bold" />
          </a>
        </div>

        <button
          type="button"
          onClick={openMenu}
          className="grid h-11 w-11 place-items-center border border-white/16 text-white transition hover:border-[#8aff61] hover:text-[#8aff61] md:hidden"
          aria-label="Open menu"
        >
          <List size={21} />
        </button>
      </div>
    </motion.nav>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 42, clipPath: "inset(18% 0 0 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("id");
  const t = copy[lang];

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 850], [1, 1.12]);
  const heroShade = useTransform(scrollY, [0, 700], [0.2, 0.78]);
  const heroTextY = useTransform(scrollY, [0, 680], [0, -96]);
  const heroTextOpacity = useTransform(scrollY, [0, 580], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 170);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-[#0a0d0a] text-[#f5f3ea]">
      <Preloader onComplete={() => setLoading(false)} />

      <motion.header
        initial={false}
        animate={loading || scrolled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="pointer-events-none absolute left-0 right-0 top-0 z-40 flex justify-center px-5 pt-7"
      >
        <div className="hero-top-nav pointer-events-auto grid w-[min(1360px,calc(100%-48px))] grid-cols-1 items-center gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-28">
          <div className="hidden items-center justify-end gap-28 md:flex">
            {t.nav.slice(0, 2).map((item) => (
              <a key={item.href} href={item.href} className="hero-nav-link">
                {item.label}
              </a>
            ))}
          </div>
          <a href="#top" className="flex flex-col items-center gap-3 justify-self-center" aria-label="NPC">
            <Mark priority className="h-[72px] w-[72px] drop-shadow-[0_0_34px_rgba(103,255,83,0.38)] md:h-[92px] md:w-[92px]" />
            <span className="h-px w-24 origin-center bg-gradient-to-r from-transparent via-[#8aff61]/70 to-transparent" />
          </a>
          <div className="hidden items-center justify-start gap-28 md:flex">
            {t.nav.slice(2).map((item) => (
              <a key={item.href} href={item.href} className="hero-nav-link">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </motion.header>

      <FloatingNav
        visible={scrolled && !loading}
        openMenu={() => setMobileMenuOpen(true)}
        lang={lang}
        setLang={setLang}
        navItems={t.nav}
        startBrief={t.startBrief}
      />

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#070907]/96 px-5 py-6 text-white backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between">
              <Mark className="h-14 w-14" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="grid h-12 w-12 place-items-center border border-white/16"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {(["id", "en"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLang(option)}
                  className={`border px-4 py-4 text-left text-xs font-black uppercase tracking-[0.2em] ${
                    lang === option ? "border-[#8aff61] bg-[#8aff61] text-[#061006]" : "border-white/12 text-white/62"
                  }`}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="mt-14 grid">
              {t.nav.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index }}
                  className="border-t border-white/10 py-6 text-4xl font-black uppercase leading-none tracking-[-0.04em] text-white"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-10 inline-flex items-center justify-between bg-[#8aff61] px-5 py-4 text-xs font-black uppercase tracking-[0.24em] text-[#061006]"
              >
                {t.startRequirement}
                <ArrowRight size={17} weight="bold" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero-stage relative min-h-[100dvh] overflow-hidden bg-[#050705] text-white">
        <motion.video
          style={{ scale: heroScale }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="NPC operational visual background"
        >
          <source src="/videohero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
        <motion.div style={{ opacity: heroShade }} className="absolute inset-0 bg-[#020402]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_34%,rgba(138,255,97,0.2),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.24)_48%,rgba(0,0,0,0.86)_100%)]" />
        <div className="scanline absolute inset-0 opacity-[0.22]" />

        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="hero-content relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-[1420px] grid-rows-[1fr_auto] pb-24 pt-36 md:pb-28 md:pt-44"
        >
          <div className="grid content-end gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-end">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={loading ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="hero-kicker mb-6 max-w-max border-y border-[#8aff61]/35 py-2 font-black uppercase text-[#a9ff91]"
              >
                {t.hero.kicker}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 44, clipPath: "inset(0 0 100% 0)" }}
                animate={loading ? {} : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                transition={{ delay: 0.22, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="hero-title text-[clamp(3.1rem,8.8vw,8.9rem)] font-black uppercase leading-[0.9] tracking-[-0.025em]"
              >
                {t.hero.titleA}
                <span className="block pl-[0.1em] text-outline">{t.hero.titleB}</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={loading ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.75 }}
              className="max-w-xl justify-self-start border-l border-white/18 pl-5 md:justify-self-end"
            >
              <p className="text-balance text-base font-semibold leading-relaxed text-white md:text-xl">
                {t.hero.body}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#capabilities" className="group inline-flex items-center gap-3 bg-white px-5 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-[#061006] transition hover:bg-[#8aff61]">
                  {t.hero.primary}
                  <ArrowDown size={15} weight="bold" className="transition group-hover:translate-y-1" />
                </a>
                <a href="/Profil_Perusahaan_PT_Nusa_Perdana_Cipta_Elegan.pdf" className="inline-flex items-center gap-3 border border-white/18 px-5 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-white/78 transition hover:border-[#8aff61] hover:text-[#8aff61]">
                  {t.hero.secondary}
                  <ArrowUpRight size={15} weight="bold" />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="mt-14 grid gap-3 border-t border-white/12 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/54 md:grid-cols-3">
            <span>{t.hero.metaA}</span>
            <span className="md:text-center">{t.hero.metaB}</span>
            <span className="md:text-right">{t.hero.metaC}</span>
          </div>
        </motion.div>
      </section>

      <section id="company" className="company-section section-spacing section-pad section-block relative overflow-hidden bg-[#ece8dc] text-[#10140f]">
        <div className="absolute left-[-8vw] top-12 h-64 w-64 border border-[#10140f]/10" />
        <div className="company-frame mx-auto grid max-w-[1360px] gap-20 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="section-intro grid content-between gap-12">
            <div className="section-head">
              <p className="section-kicker company-kicker text-[#426d31]">{t.company.kicker}</p>
              <h2 className="max-w-4xl text-balance text-[clamp(2.2rem,4.8vw,5.15rem)] font-black uppercase leading-[1] tracking-[-0.018em]">
                {t.company.title}
              </h2>
            </div>
            <div className="company-profile-image relative mt-8 min-h-[360px] overflow-hidden border border-[#10140f]/12 bg-[#10140f]">
              <Image
                src="/company-profile-team.png"
                alt="NPC company profile team at an aircraft hangar"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10140f]/64 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 border-t border-white/18 pt-4 text-white">
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-[#8aff61]">Company profile</span>
                <span className="max-w-[14rem] text-right text-xs font-semibold uppercase tracking-[0.12em] text-white/76">Field-ready procurement partner</span>
              </div>
            </div>
          </Reveal>

          <div className="company-copy-panel grid content-between gap-16">
            <Reveal delay={0.08} className="company-lead-block">
              <p className="max-w-3xl text-lg font-semibold leading-loose text-[#1d241a] md:text-2xl">
                {t.company.body}
              </p>
            </Reveal>
            <div className="company-card-strip grid gap-px bg-[#10140f]/12 sm:grid-cols-3">
              {t.company.cards.map(([title, body], index) => (
                <Reveal key={title} delay={0.1 + index * 0.06} className="company-info-card bg-[#f4efe2]/82">
                  <h3 className="text-lg font-black uppercase leading-tight tracking-[-0.01em]">{title}</h3>
                  <p className="mt-6 text-sm leading-loose text-[#4f594a]">{body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="work-section section-spacing section-pad section-block relative bg-[#080b08] text-white">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="section-intro section-head-gap grid gap-10 md:grid-cols-[0.86fr_1.14fr] md:items-end">
            <div className="section-head">
              <p className="section-kicker text-[#8aff61]">{t.work.kicker}</p>
              <h2 className="text-[clamp(2.25rem,4.7vw,5rem)] font-black uppercase leading-[1] tracking-[-0.018em]">
                {t.work.title}
              </h2>
            </div>
            <p className="max-w-3xl text-base font-medium leading-loose text-white/64 md:text-lg">
              {t.work.body}
            </p>
          </Reveal>

          <div className="work-surface work-surface-horizontal grid gap-6 lg:grid-cols-3">
            {t.work.capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.08}>
                  <article className="capability-panel group flex h-full min-h-[590px] flex-col overflow-hidden border border-white/12 bg-[#11170f]">
                    <div className="relative min-h-[235px] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover opacity-70 saturate-[0.78] transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/58 via-black/10 to-transparent" />
                      <span className="absolute left-5 top-5 border border-[#8aff61]/40 bg-black/45 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8aff61] backdrop-blur-md">
                        0{index + 1} / lane
                      </span>
                    </div>
                    <div className="capability-panel-body relative flex flex-1 flex-col gap-8">
                      <div className="absolute right-7 top-7 text-white/12 transition duration-500 group-hover:text-[#8aff61]/35">
                        <Icon size={52} weight="thin" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-black uppercase tracking-[0.26em] text-[#8aff61]">{item.eyebrow}</p>
                        <h3 className="mt-7 max-w-2xl text-3xl font-black uppercase leading-[1.04] tracking-[-0.012em] md:text-[2.18rem] xl:text-[2.35rem]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-auto max-w-xl text-sm leading-loose text-white/66 md:text-base">{item.text}</p>
                      <div className="grid grid-cols-3 gap-px bg-white/10 font-mono text-[9px] font-black uppercase tracking-[0.14em] text-white/50">
                        {["Scope", "Docs", "Move"].map((label) => (
                          <span key={label} className="bg-[#0b120b]/86 px-3 py-3 text-center group-hover:text-[#8aff61]">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="model" className="model-section section-spacing section-pad section-block bg-[#f7f3e8] text-[#10140f]">
        <div className="mx-auto grid max-w-[1440px] gap-20 lg:grid-cols-[0.68fr_1.32fr]">
          <Reveal className="section-intro section-head">
            <p className="section-kicker text-[#426d31]">{t.model.kicker}</p>
            <h2 className="text-[clamp(2.15rem,4.8vw,5rem)] font-black uppercase leading-[1] tracking-[-0.018em]">
              {t.model.title}
            </h2>
            <p className="max-w-md text-base font-semibold leading-loose text-[#4f594a]">{t.model.body}</p>
          </Reveal>
          <Reveal delay={0.08} className="section-body-gap lg:mt-0">
            <div className="model-board relative overflow-hidden border border-[#10140f]/14 bg-[#f0eadb] text-[#10140f]">
              <div className="model-board-head grid gap-4 border-b border-[#10140f]/14 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-[#426d31]">Procurement flow</p>
                  <p className="mt-3 max-w-2xl text-sm leading-loose text-[#4f594a]">
                    One working sequence from requirement intake to handover, with each checkpoint visible.
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-px bg-[#10140f]/14 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#426d31]">
                  {["Scope", "Vendor", "Quality", "Handover"].map((label) => (
                    <span key={label} className="bg-[#f8f3e8] px-3 py-2 text-center">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="model-flow-line" />
              <div className="model-steps grid gap-5">
                {t.model.rows.map(([number, title, body], index) => (
                  <motion.article
                    key={title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ delay: index * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="model-step-card group grid min-h-[8.25rem] gap-6 border border-[#10140f]/12 bg-[#fbf7ed]/80 md:grid-cols-[4.5rem_9rem_1fr]"
                  >
                    <span className="font-mono text-xs font-black text-[#426d31]">{number}</span>
                    <h3 className="text-lg font-black uppercase tracking-[-0.01em] text-[#10140f]">{title}</h3>
                    <p className="max-w-2xl text-sm leading-loose text-[#4f594a]">{body}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="marquee-section overflow-hidden bg-[#090c09] py-12 text-white">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-black uppercase leading-none tracking-[-0.05em] text-white/12">
          {Array.from({ length: 2 }).map((_, loop) => (
            <div key={loop} className="flex gap-8">
              {sectors.map((sector) => (
                <span key={`${loop}-${sector}`} className="text-[clamp(3rem,8vw,8rem)]">{sector}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section section-spacing section-pad section-block relative overflow-hidden bg-[#10140f] text-white">
        <div className="absolute right-[-12vw] top-[-12vw] h-[42vw] w-[42vw] border border-[#8aff61]/14" />
        <div className="mx-auto grid max-w-[1440px] gap-20 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="section-intro flex flex-col justify-between gap-16">
            <div className="section-head">
              <p className="section-kicker text-[#8aff61]">{t.contact.kicker}</p>
              <h2 className="max-w-xl text-[clamp(2.25rem,4.9vw,5.2rem)] font-black uppercase leading-[1] tracking-[-0.018em]">
                {t.contact.title}
              </h2>
              <p className="max-w-lg text-lg leading-loose text-white/64">
                {t.contact.body}
              </p>
            </div>
            <div className="contact-info-block border-t border-white/12 text-sm text-white/68">
              <p className="flex gap-3"><EnvelopeSimple className="mt-0.5 text-[#8aff61]" size={19} /> info@npc-global.id</p>
              <p className="flex gap-3"><PhoneCall className="mt-0.5 text-[#8aff61]" size={19} /> +62 815-8935-333</p>
              <p className="flex max-w-lg gap-3 leading-relaxed"><MapPinLine className="mt-0.5 shrink-0 text-[#8aff61]" size={19} /> Ruko Vila Mutiara Lido No.12, Kel. Cijeruk, Cigombong, Bogor, Jawa Barat</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={(event) => event.preventDefault()} className="contact-plate grid gap-6 border border-white/12 bg-white/[0.045] backdrop-blur-xl">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/58">
                  {t.contact.fullName}
                  <input className="contact-input" type="text" placeholder={t.contact.fullNamePlaceholder} required />
                </label>
                <label className="grid gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/58">
                  {t.contact.organization}
                  <input className="contact-input" type="text" placeholder={t.contact.organizationPlaceholder} required />
                </label>
              </div>
              <div className="grid gap-3">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/58">{t.contact.requirementArea}</span>
                <div className="grid gap-3 md:grid-cols-3">
                  {t.contact.options.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelected(index)}
                      className={`border px-4 py-4 text-left text-[11px] font-black uppercase tracking-[0.16em] transition ${
                        selected === index
                          ? "border-[#8aff61] bg-[#8aff61] text-[#061006]"
                          : "border-white/12 bg-black/14 text-white/62 hover:border-white/32 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <label className="grid gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/58">
                {t.contact.scope}
                <textarea className="contact-input min-h-36 resize-none" placeholder={t.contact.scopePlaceholder} required />
              </label>
              <button type="submit" className="group inline-flex items-center justify-center gap-3 bg-white px-6 py-5 text-[11px] font-black uppercase tracking-[0.22em] text-[#061006] transition hover:bg-[#8aff61]">
                {t.contact.submit}
                <ArrowRight size={16} weight="bold" className="transition group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer border-t border-white/10 bg-[#080b08] px-5 text-white/58 md:px-8">
        <div className="site-footer-inner mx-auto flex max-w-[1440px] flex-col md:flex-row md:items-center md:justify-between">
          <div className="site-footer-brand flex items-center">
            <Mark className="h-11 w-11" />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-white">PT Nusa Perdana Cipta</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em]">{t.footer.subtitle}</p>
            </div>
          </div>
          <div className="site-footer-nav flex flex-wrap text-[11px] font-black uppercase tracking-[0.2em]">
            <a href="#company" className="transition hover:text-[#8aff61]">{t.nav[0].label}</a>
            <a href="#capabilities" className="transition hover:text-[#8aff61]">{t.nav[1].label}</a>
            <a href="/Profil_Perusahaan_PT_Nusa_Perdana_Cipta_Elegan.pdf" className="transition hover:text-[#8aff61]">{t.footer.pdf}</a>
            <a href="https://npc-global.id/" className="transition hover:text-[#8aff61]">npc-global.id</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
