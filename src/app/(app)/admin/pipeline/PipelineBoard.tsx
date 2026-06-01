"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from "@dnd-kit/core";
import type { Stage } from "@prisma/client";
import { ALL_STAGES, STAGE_LABELS } from "@/lib/stages";
import { moveStageAction } from "@/lib/actions/application";

export type PipelineCard = {
  id: string;
  fullName: string;
  vacancyTitle: string;
  clientName: string | null;
  stage: Stage;
  country: string | null;
};

function Card({ card }: { card: PipelineCard }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: card.id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50 }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab touch-none rounded-xl border border-stone-200 bg-white p-3 shadow-sm active:cursor-grabbing ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <p className="text-sm font-semibold text-ink-900">{card.fullName}</p>
      <p className="mt-0.5 text-xs text-stone-500">{card.vacancyTitle}</p>
      {card.clientName && <p className="mt-0.5 text-[11px] text-stone-400">Client · {card.clientName}</p>}
      <Link
        href={`/admin/candidates/${card.id}`}
        onPointerDown={(e) => e.stopPropagation()}
        className="mt-2 inline-block text-xs font-medium text-brand-600 hover:text-brand-700"
      >
        View profile →
      </Link>
    </div>
  );
}

function Column({ stage, cards }: { stage: Stage; cards: PipelineCard[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  return (
    <div
      ref={setNodeRef}
      className={`flex w-64 shrink-0 flex-col rounded-2xl border p-3 transition-colors ${
        isOver ? "border-brand-400 bg-brand-50" : "border-stone-200 bg-stone-50"
      }`}
    >
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-stone-600">
          {STAGE_LABELS[stage]}
        </span>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs text-stone-500">{cards.length}</span>
      </div>
      <div className="space-y-2">
        {cards.map((c) => (
          <Card key={c.id} card={c} />
        ))}
      </div>
    </div>
  );
}

export function PipelineBoard({ initialCards }: { initialCards: PipelineCard[] }) {
  const [cards, setCards] = useState(initialCards);
  const [, startTransition] = useTransition();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function onDragEnd(e: DragEndEvent) {
    const id = String(e.active.id);
    const overStage = e.over?.id as Stage | undefined;
    if (!overStage) return;
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, stage: overStage } : c)));
    startTransition(() => {
      void moveStageAction(id, overStage);
    });
  }

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {ALL_STAGES.map((stage) => (
          <Column key={stage} stage={stage} cards={cards.filter((c) => c.stage === stage)} />
        ))}
      </div>
    </DndContext>
  );
}
