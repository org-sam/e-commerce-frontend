import { ArrowRight, Boxes, Zap, Cloud } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative py-16 md:py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
          <Zap className="h-4 w-4 text-primary" />
          <span className="font-mono text-sm text-primary">
            Estudo de Arquitetura de Microsserviços
          </span>
        </div>

        {/* Title */}
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          E-Commerce{' '}
          <span className="text-gradient">Lab</span>
          <br />
          <span className="text-muted-foreground">Loja de Infraestrutura em Nuvem</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Um ecossistema heterogêneo de microsserviços com múltiplas linguagens,
          brokers de mensageria e tipos de armazenamento AWS. Construído para aprendizado e validação.
        </p>

        {/* Tech Stack Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: Cloud, label: 'AWS EKS' },
            { icon: Boxes, label: 'PostgreSQL + MongoDB' },
            { icon: ArrowRight, label: 'SQS • RabbitMQ • Kafka' },
          ].map((item, index) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 transition-all duration-300 hover:border-primary/50"
            >
              <item.icon className="h-4 w-4 text-primary" />
              <span className="font-mono text-sm text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Service Flow Diagram */}
        <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-border bg-card/50 p-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Fluxo de Eventos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="rounded-lg bg-primary/20 px-3 py-1.5 font-medium text-primary">
              Frontend
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="rounded-lg bg-accent/20 px-3 py-1.5 font-medium text-accent">
              Order Service
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="rounded-lg bg-success/20 px-3 py-1.5 font-medium text-success">
              Catalog
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="rounded-lg bg-warning/20 px-3 py-1.5 font-medium text-warning">
              Notification
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="rounded-lg bg-secondary px-3 py-1.5 font-medium text-secondary-foreground">
              Analytics
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
