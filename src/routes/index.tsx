import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  Mic,
  Play,
  Home,
  Dumbbell,
  Apple,
  Activity,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Personal TrAIner — Tu entrenador con IA" },
      {
        name: "description",
        content:
          "Entrenamiento, nutrición y recuperación personalizados por IA. Diseño limpio, datos claros, resultados reales.",
      },
      { property: "og:title", content: "Personal TrAIner — Tu entrenador con IA" },
      {
        property: "og:description",
        content: "Entrenamiento, nutrición y recuperación personalizados por IA.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen w-full bg-surface-2">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-background">
        <Header />
        <main className="flex-1 space-y-5 px-5 pb-32 pt-2">
          <AICard />
          <BiometricGrid />
          <WorkoutCard />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

function BrandName({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      Personal Tr
      <span className="text-ai-gradient font-extrabold italic">AI</span>
      ner
    </span>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 glass">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 pb-3 pt-5">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Jueves · 25 jun
          </p>
          <BrandName className="block truncate text-[22px] leading-tight" />
        </div>
        <button
          aria-label="Perfil"
          className="shrink-0 rounded-full ring-1 ring-border transition active:scale-95"
        >
          <div className="grid h-10 w-10 place-items-center rounded-full bg-ai-soft text-[13px] font-semibold text-foreground">
            AR
          </div>
        </button>
      </div>
    </header>
  );
}

function AICard() {
  return (
    <section
      aria-label="Asistente de IA"
      className="relative overflow-hidden rounded-[28px] bg-ai-soft p-5 shadow-card"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-ai-gradient opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-ai-gradient opacity-20 blur-3xl" />

      <div className="relative flex items-center gap-2">
        <div className="grid h-7 w-7 place-items-center rounded-full bg-ai-gradient text-white shadow-soft">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
        </div>
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground/70">
          Tu IA · ahora
        </span>
      </div>

      <p className="relative mt-3 text-[17px] font-medium leading-snug text-foreground">
        Dormiste poco hoy. He adaptado tu rutina de fuerza para priorizar la{" "}
        <span className="text-ai-gradient font-semibold">recuperación</span>.
      </p>

      <div className="relative mt-5 flex items-center justify-between">
        <button className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-foreground/80 transition hover:text-foreground">
          Ver ajustes
          <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
        </button>
        <button
          aria-label="Hablar con IA"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-[13px] font-semibold text-background shadow-card transition active:scale-95"
        >
          <Mic className="h-4 w-4" strokeWidth={2.25} />
          Hablar con IA
        </button>
      </div>
    </section>
  );
}

function BiometricGrid() {
  return (
    <section aria-label="Resumen biométrico" className="grid grid-cols-3 gap-3">
      <MetricRing label="Recuperación" sub="VFC" value="78" unit="ms" pct={0.78} />
      <MetricRing label="Proteína" sub="hoy" value="92" unit="g" pct={0.55} />
      <MetricBars label="Esfuerzo" sub="semana" value="4/5" />
    </section>
  );
}

function MetricRing({
  label,
  sub,
  value,
  unit,
  pct,
}: {
  label: string;
  sub: string;
  value: string;
  unit: string;
  pct: number;
}) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct);
  return (
    <div className="rounded-2xl bg-card p-3.5 shadow-soft">
      <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 grid place-items-center">
        <div className="relative h-[68px] w-[68px]">
          <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
            <circle cx="32" cy="32" r={r} className="fill-none stroke-muted" strokeWidth="6" />
            <circle
              cx="32"
              cy="32"
              r={r}
              stroke="url(#aiRing)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={c}
              strokeDashoffset={offset}
            />
            <defs>
              <linearGradient id="aiRing" x1="0" y1="0" x2="64" y2="64">
                <stop offset="0%" stopColor="oklch(0.72 0.18 295)" />
                <stop offset="55%" stopColor="oklch(0.7 0.19 260)" />
                <stop offset="100%" stopColor="oklch(0.78 0.17 200)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center leading-none">
              <span className="text-[18px] font-bold tracking-tight text-foreground">{value}</span>
              <span className="ml-0.5 text-[10px] font-medium text-muted-foreground">{unit}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-1 text-center text-[10px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function MetricBars({ label, sub, value }: { label: string; sub: string; value: string }) {
  const bars = [0.6, 0.9, 0.4, 0.75, 0.5];
  return (
    <div className="rounded-2xl bg-card p-3.5 shadow-soft">
      <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 flex h-[68px] items-end justify-between gap-1.5 px-0.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-2 rounded-full bg-ai-gradient"
            style={{ height: `${h * 100}%`, opacity: 0.55 + h * 0.45 }}
          />
        ))}
      </div>
      <p className="mt-1 text-center text-[10px] text-muted-foreground">
        <span className="text-[13px] font-semibold text-foreground">{value}</span>{" "}
        <span>· {sub}</span>
      </p>
    </div>
  );
}

function WorkoutCard() {
  return (
    <section aria-label="Entrenamiento de hoy" className="rounded-[28px] bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Día 4 · Hoy
        </p>
        <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
          52 min
        </span>
      </div>

      <h2 className="mt-2 text-[24px] font-bold leading-tight tracking-tight text-foreground">
        Hipertrofia
        <br />
        <span className="text-muted-foreground">Tren Superior</span>
      </h2>

      <div className="mt-4 flex items-center gap-4 text-[12px] text-muted-foreground">
        <span>
          <span className="font-semibold text-foreground">8</span> ejercicios
        </span>
        <span className="h-1 w-1 rounded-full bg-border" />
        <span>
          <span className="font-semibold text-foreground">22</span> series
        </span>
        <span className="h-1 w-1 rounded-full bg-border" />
        <span className="inline-flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-foreground/60" />
          IA
        </span>
      </div>

      <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ai-gradient px-5 py-4 text-[15px] font-semibold text-white shadow-card transition active:scale-[0.99]">
        <Play className="h-4 w-4 fill-current" strokeWidth={0} />
        Iniciar Focus Mode
      </button>
    </section>
  );
}

function BottomNav() {
  const items = [
    { icon: Home, label: "Hoy", active: true },
    { icon: Dumbbell, label: "Rutinas", active: false },
    { icon: Apple, label: "Nutrición", active: false },
    { icon: Activity, label: "Progreso", active: false },
  ];
  return (
    <nav className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 pb-5 pt-2">
      <div className="glass pointer-events-auto flex items-center justify-around rounded-[28px] px-2 py-2 shadow-card">
        {items.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            aria-label={label}
            className="flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 transition active:scale-95"
          >
            <Icon
              className={
                active
                  ? "h-[22px] w-[22px] text-foreground"
                  : "h-[22px] w-[22px] text-muted-foreground"
              }
              strokeWidth={active ? 2.4 : 2}
            />
            <span
              className={
                "text-[10px] font-semibold tracking-wide " +
                (active ? "text-ai-gradient" : "text-muted-foreground")
              }
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}