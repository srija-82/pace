"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [schedule, setSchedule] = useState("");
  async function loadTasks() {
  const res = await fetch("/api/tasks");
  const data = await res.json();

  setTasks(data);
}

useEffect(() => {
  loadTasks();
}, []);

  async function createTask() {
    if (!title) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });

    const newTask = await res.json();

    setTasks([newTask, ...tasks]);
    setTitle("");
  }
  async function generateSchedule() {
  const res = await fetch("/api/generate", {
    method: "POST",
  });

  const data = await res.json();

  setSchedule(data.schedule);
}

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          PACE
        </h1>

        <div className="flex gap-4 mb-8">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task..."
            className="flex-1 p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

          <button
            onClick={createTask}
            className="bg-white text-black px-6 rounded-xl font-semibold"
          >
            Add
          </button>
        </div>
        <button
  onClick={generateSchedule}
  className="bg-blue-600 px-6 py-3 rounded-xl mb-8"
>
  Generate AI Schedule
</button>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-zinc-900 p-4 rounded-xl"
            >
              {task.title}
            </div>
          ))}
        </div>
      </div>
      {schedule && (
  <div className="mt-10 bg-zinc-900 p-6 rounded-2xl whitespace-pre-wrap">
    {schedule}
  </div>
)}
    </main>
  );
}
