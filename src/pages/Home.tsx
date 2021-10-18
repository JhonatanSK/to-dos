import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data =  {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(prevState => [...prevState, data])
  }

  function handleToggleTaskDone(id: number) {
    const task = tasks.find(task => task.id === id)
    if (!task || task.done) return 

    task.done = true

    const data = tasks.filter(task => task.id !== id)
    setTasks([...data, task])
  }

  function handleRemoveTask(id: number) {
    const data = tasks.filter(task => task.id !== id)
    setTasks(data)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})