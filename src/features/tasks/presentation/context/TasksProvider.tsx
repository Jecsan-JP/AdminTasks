// src/features/tasks/presentation/context/TasksContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

interface TasksContextType {
  refreshTasks: () => void;
  isRefreshing: boolean;
  refreshTrigger: number;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshTasks = useCallback(() => {
    console.log('Iniciando actualización de tareas...');
    setIsRefreshing(true);
    setRefreshTrigger(prev => {
      console.log('Actualizando refreshTrigger:', prev + 1);
      return prev + 1;
    });
    // Simulamos un pequeño delay para asegurar que el estado se actualice
    setTimeout(() => {
      console.log('Finalizando actualización de tareas');
      setIsRefreshing(false);
    }, 100);
  }, []);

  return (
    <TasksContext.Provider value={{ refreshTasks, isRefreshing, refreshTrigger }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext debe ser usado dentro de TasksProvider');
  }
  return context;
};