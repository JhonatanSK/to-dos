import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = useCallback((newTaskTitle: string) => {
    const data =  {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(prevState => [...prevState, data])
  }, [setTasks])

  const handleToggleTaskDone = useCallback((id: number) => {
    let data = tasks;

    const updatedTasks = data.map(task => {
      if (task.id === id) {
        task.done = true
      }
      return task
    })

    setTasks(updatedTasks)
  }, [tasks, setTasks]) 

  const handleRemoveTask = useCallback((id: number) => {
    const data = tasks.filter(task => task.id !== id)
    setTasks(data)
  }, [tasks, setTasks])

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