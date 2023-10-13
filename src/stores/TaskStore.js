import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        isLoading: false
    }),
    getters: {
        favs() {
            return this.tasks.filter((item) => item.isFav === true)
        },
        favCount() {
            return this.tasks.reduce((acc, curr) => curr.isFav ? acc + 1 : acc, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    actions: {
        async getTask() {
            this.isLoading = true
            const res = await fetch(" http://localhost:3000/tasks")
            const data = await res.json()

            this.tasks = data
            this.isLoading = false
        },
        async addTask(task) {
            this.tasks.push(task)

            const res = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.error) {
                console.log(res.error)
            }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter((item) => item.id !== id)

            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "DELETE",
            })

            if (res.error) {
                console.log(res.error)
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find((item) => item.id === id)
            task.isFav = !task.isFav

            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ isFav: task.isFav }),
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.error) {
                console.log(res.error)
            }
        }
    }
})

