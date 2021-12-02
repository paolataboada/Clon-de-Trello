import firebaseApp from './firebase'
import { getFirestore, ref, push, set, child, query, orderByChild, equalTo, onValue, remove } from 'firebase/firestore'

const db = getFirestore(firebaseApp)

// Referencia a colecciones
const boardsRef = ref(db, '/boards')
const listsRef = ref(db, '/lists')
const tasksRef = ref(db, '/tasks')

// Métodos que hacen las peticiones a la db
export default {
    // Obtener todos los paneles
    getBoardsByUser (userId = 1) {
        const queryUser = query(ref(boardsRef), orderByChild('owner'), equalTo(userId))

        return onValue(queryUser)
    },
    // Crea un nuevo panel
    postBoard (name) {
        const id = push(boardsRef).key
        const owner = 1 // unico usuario sin auth
        const board = { id, name, owner }

        return set(child(boardsRef, id), board)
            .then(() => board)
    },
    // Consulta a la ref de listas y busca por ID
    getListsFromBoard (boardId) {
        const queryList = query(ref(listsRef), orderByChild('board'), equalTo(boardId))

        return onValue(queryList)
    },
    // Añade un nuevo panel
    postList (board, name) {
        const id = push(listsRef).key
        const column = { id, name, board }

        return set(child(boardsRef, id), column)
            .then(() => column)
    },
    // Consulta a la ref de tareas y busca por ID
    getTasksFromList (listId) {
        const queryTask = query(ref(tasksRef), orderByChild('board'), equalTo(listId))

        return onValue(queryTask)
    },
    // Añade una nueva tarea
    postTask (list, title) {
        const id = push(tasksRef).key
        const task = { id, list, title, completed: false }

        return set(child(tasksRef, id), task)
            .then(() => task)
    },
    // Borra una tarea
    deleteTask (taskId) {
        return remove(child(tasksRef, taskId))
    },
    // Indica como completada una tarea
    completedTask (taskId) {
        const queryCompleted = query(ref(tasksRef), child(boardsRef, taskId), child(boardsRef, 'completed'))

        return onValue(queryCompleted, (snapshot) => snapshot.val(), (data) => set(queryCompleted, !data))
    }
}
