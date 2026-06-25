import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  Pause,
  Play,
  Mic,
  Dumbbell,
  Zap,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/focus")({
  head: () => ({
    meta: [
      { title: "Focus Mode — Personal TrAIner" },
      { name: "description", content: "Entrenamiento activo con IA" },
    ],
  }),
  component: FocusMode,
});

function FocusMode() {
  const [heartRate, setHeartRate] = useState(145);
  const [restTime, setRestTime] = useState(105);
  const [isResting, setIsResting] = useState(true);
  const [weight, setWeight] = useState(24);
  const [reps, setReps] = useState(8);
  const [rpe, setRpe] = useState(8.5);

  // Simulate heart rate fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => {
        const change = (Math.random() - 0.5) * 4;
        return Math.min(180, Math.max(100, Math.round(prev + change)));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Rest timer countdown
  useEffect(() => {
    if (!isResting) return;
    const interval = setInterval(() => {
      setRestTime((prev) => {
        if (prev <= 0) {
          setIsResting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isResting]);

  return (
    <div className="min-h-screen w-full bg-[oklch(0.08_0.02_260)]">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-background pb-8">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 space-y-4 px-5 pt-2">
          <BiometricCard heartRate={heartRate} />
          <InputBlocks
            weight={weight}
            setWeight={setWeight}
            reps={reps}
            setReps={setReps}
            rpe={rpe}
            setRpe={setRpe}
          />
          <RestCard
            restTime={restTime}
            isResting={isResting}
            setIsResting={setIsResting}
            setRestTime={setRestTime}
          />
        </main>

        {/* Floating CTA */}
        <FloatingCTA />
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
    <header className="sticky top-0 z-20 px-5 pb-3 pt-5">
      <div className="flex items-center justify-between">
        <button className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.08] text-white/80 backdrop-blur-sm transition active:scale-95">
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>

        <div className="text-center">
          <h1 className="text-[20px] font-bold leading-tight text-white">
            Press Militar
          </h1>
          <p className="text-[13px] text-white/50">Serie 3 de 4</p>
        </div>

        <button className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.08] text-white/80 backdrop-blur-sm transition active:scale-95">
          <Pause className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>
    </header>
  );
}

function BiometricCard({ heartRate }: { heartRate: number }) {
  const getZone = () => {
    if (heartRate < 120) return { label: "Recuperación", color: "text-blue-400", bg: "bg-blue-400/20" };
    if (heartRate < 140) return { label: "Aeróbico", color: "text-emerald-400", bg: "bg-emerald-400/20" };
    if (heartRate < 160) return { label: "Alta Intensidad", color: "text-orange-400", bg: "bg-orange-400/20" };
    return { label: "Máximo", color: "text-red-400", bg: "bg-red-400/20" };
  };

  const zone = getZone();

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-white/[0.06] p-5 backdrop-blur-xl">
      {/* Glassmorphism overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/[0.08]" />

      {/* Heart Rate Chart */}
      <div className="relative">
        <HeartRateChart heartRate={heartRate} />

        {/* BPM Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-1">
            <span className="text-[56px] font-bold leading-none tabular-nums text-white">
              {heartRate}
            </span>
            <span className="text-[18px] font-medium text-white/50">BPM</span>
          </div>

          {/* Zone Badge */}
          <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full ${zone.bg} px-3 py-1`}>
            <Zap className={`h-3.5 w-3.5 ${zone.color}`} strokeWidth={2.5} />
            <span className={`text-[12px] font-semibold ${zone.color}`}>
              Zona {zone.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeartRateChart({ heartRate }: { heartRate: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<number[]>(() =>
    Array.from({ length: 80 }, () => 0.5 + Math.random() * 0.3)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => {
        const newPoint = heartRate / 200 + (Math.random() - 0.5) * 0.15;
        return [...prev.slice(1), Math.max(0.1, Math.min(0.95, newPoint))];
      });
    }, 100);
    return () => clearInterval(interval);
  }, [heartRate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    gradient.addColorStop(0, "rgba(168, 85, 247, 0.3)");
    gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.15)");
    gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

    ctx.beginPath();
    ctx.moveTo(0, rect.height);

    points.forEach((point, i) => {
      const x = (i / (points.length - 1)) * rect.width;
      const y = rect.height - point * rect.height * 0.8 - rect.height * 0.1;

      if (i === 0) {
        ctx.lineTo(x, y);
      } else {
        const prevX = ((i - 1) / (points.length - 1)) * rect.width;
        const prevY = rect.height - points[i - 1] * rect.height * 0.8 - rect.height * 0.1;
        const cpX = (prevX + x) / 2;
        ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
      }
    });

    ctx.lineTo(rect.width, rect.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line on top
    ctx.beginPath();
    points.forEach((point, i) => {
      const x = (i / (points.length - 1)) * rect.width;
      const y = rect.height - point * rect.height * 0.8 - rect.height * 0.1;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        const prevX = ((i - 1) / (points.length - 1)) * rect.width;
        const prevY = rect.height - points[i - 1] * rect.height * 0.8 - rect.height * 0.1;
        const cpX = (prevX + x) / 2;
        ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
      }
    });

    const lineGradient = ctx.createLinearGradient(0, 0, rect.width, 0);
    lineGradient.addColorStop(0, "oklch(0.72 0.18 295)");
    lineGradient.addColorStop(0.5, "oklch(0.7 0.19 260)");
    lineGradient.addColorStop(1, "oklch(0.78 0.17 200)");

    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.stroke();
  }, [points]);

  return (
    <canvas
      ref={canvasRef}
      className="h-[180px] w-full opacity-90"
      style={{ filter: "blur(0.5px)" }}
    />
  );
}

function InputBlocks({
  weight,
  setWeight,
  reps,
  setReps,
  rpe,
  setRpe,
}: {
  weight: number;
  setWeight: (v: number) => void;
  reps: number;
  setReps: (v: number) => void;
  rpe: number;
  setRpe: (v: number) => void;
}) {
  return (
    <section className="grid grid-cols-3 gap-3">
      <InputBlock
        label="Peso"
        value={weight}
        step={0.5}
        onChange={setWeight}
        unit="kg"
        icon={<Dumbbell className="h-4 w-4" strokeWidth={2} />}
      />
      <InputBlock
        label="Reps"
        value={reps}
        step={1}
        onChange={setReps}
        unit=""
        icon={<Check className="h-4 w-4" strokeWidth={2.5} />}
      />
      <InputBlock
        label="RPE"
        value={rpe}
        step={0.5}
        onChange={setRpe}
        unit=""
        icon={<Zap className="h-4 w-4" strokeWidth={2.5} />}
      />
    </section>
  );
}

function InputBlock({
  label,
  value,
  step,
  onChange,
  unit,
  icon,
}: {
  label: string;
  value: number;
  step: number;
  onChange: (v: number) => void;
  unit: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-[24px] bg-white/[0.06] p-4 backdrop-blur-xl ring-1 ring-inset ring-white/[0.08]">
      <div className="text-white/40">{icon}</div>
      <div className="flex items-baseline gap-0.5">
        <span className="text-[28px] font-bold tabular-nums text-white">
          {value}
        </span>
        {unit && <span className="text-[13px] text-white/40">{unit}</span>}
      </div>
      <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">
        {label}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onChange(Math.max(0, value - step))}
          className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.08] text-white/70 transition active:scale-95 active:bg-white/[0.15]"
        >
          <span className="text-[18px] font-semibold">−</span>
        </button>
        <button
          onClick={() => onChange(value + step)}
          className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.08] text-white/70 transition active:scale-95 active:bg-white/[0.15]"
        >
          <span className="text-[18px] font-semibold">+</span>
        </button>
      </div>
    </div>
  );
}

function RestCard({
  restTime,
  isResting,
  setIsResting,
  setRestTime,
}: {
  restTime: number;
  isResting: boolean;
  setIsResting: (v: boolean) => void;
  setRestTime: (v: number) => void;
}) {
  const minutes = Math.floor(restTime / 60);
  const seconds = restTime % 60;
  const maxTime = 105;
  const progress = restTime / maxTime;

  return (
    <section className="rounded-[28px] bg-white/[0.06] p-5 backdrop-blur-xl ring-1 ring-inset ring-white/[0.08]">
      <div className="flex items-center justify-between gap-4">
        {/* Timer */}
        <div className="flex items-center gap-4">
          <div className="relative h-[72px] w-[72px] shrink-0">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 72 72">
              <circle
                cx="36"
                cy="36"
                r="32"
                stroke="white"
                strokeOpacity="0.08"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="36"
                cy="36"
                r="32"
                stroke="url(#restGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={2 * Math.PI * 32}
                strokeDashoffset={2 * Math.PI * 32 * (1 - progress)}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="restGradient" x1="0" y1="0" x2="72" y2="72">
                  <stop offset="0%" stopColor="oklch(0.72 0.18 295)" />
                  <stop offset="100%" stopColor="oklch(0.78 0.17 200)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <Play className="h-6 w-6 text-white/80" strokeWidth={2.5} />
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-[12px] font-medium text-white/40">
              Descanso IA
            </p>
            <p className="text-[22px] font-bold tabular-nums text-white">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* AI Message */}
        <div className="flex-1 text-right">
          <p className="text-[13px] leading-snug text-white/60">
            Recuperación cardíaca <span className="text-ai-gradient font-semibold">óptima</span>
          </p>
        </div>
      </div>

      {/* Audio Waveform Button */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setIsResting(!isResting)}
          className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2.5 text-[13px] font-medium text-white/70 transition active:scale-95"
        >
          {isResting ? (
            <>
              <Pause className="h-4 w-4" strokeWidth={2.5} />
              Pausar
            </>
          ) : (
            <>
              <Play className="h-4 w-4" strokeWidth={2.5} />
              Iniciar
            </>
          )}
        </button>

        <button className="group relative flex h-12 items-center justify-end gap-2 overflow-hidden rounded-full bg-ai-gradient px-4 pl-12 shadow-lg transition active:scale-95">
          {/* Animated waveform */}
          <div className="absolute left-4 flex h-6 items-center gap-[3px]">
            {[0.3, 0.7, 0.5, 0.9, 0.4, 0.6, 0.8, 0.45].map((h, i) => (
              <span
                key={i}
                className="w-[3px] origin-bottom rounded-full bg-white/90 animate-wave"
                style={{
                  height: `${h * 100}%`,
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}
          </div>
          <Mic className="h-5 w-5 text-white" strokeWidth={2.5} />
          <span className="text-[13px] font-semibold text-white">Hablar</span>
        </button>
      </div>
    </section>
  );
}

function FloatingCTA() {
  return (
    <div className="pointer-events-none fixed bottom-0 inset-x-0 z-30 px-5 pb-8 pt-4">
      <div className="pointer-events-auto mx-auto flex max-w-[440px] justify-center">
        <button className="inline-flex h-14 w-full max-w-[320px] items-center justify-center gap-2 rounded-full bg-ai-gradient px-8 text-[16px] font-semibold text-white shadow-[0_8px_32px_rgba(168,85,247,0.4)] transition active:scale-[0.98]">
          <Check className="h-5 w-5" strokeWidth={2.5} />
          Completar Serie
        </button>
      </div>
    </div>
  );
}
