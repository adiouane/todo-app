'use client';

import { Layout } from '@/components/layout/Layout';
import { TodoForm } from '@/components/todos/TodoForm';
import { TodoList } from '@/components/todos/TodoList';

export default function Home() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <TodoForm />
        <TodoList />
      </div>
    </Layout>
  );
}
