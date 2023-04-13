import React, { ChangeEvent, useEffect, useState } from 'react'
import { AiOutlineCloseSquare, AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai'

type ItemProps = {
    title: string,
    description: string,
    dateTime: any
}


const AddTaskContext = React.createContext<{ onAddTask: () => void }>({ onAddTask: () => { } })

const TaskAddedContext = React.createContext<{
    onTaskAdded: () => void
}>({ onTaskAdded: () => { }})

function AddTask() {
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [isTaskAdded, setIsTaskAdded] = useState<boolean>(false);


    const { onAddTask } = React.useContext(AddTaskContext) 
    var { onTaskAdded } = React.useContext(TaskAddedContext)

    onTaskAdded = () => {
        setIsTaskAdded(!isTaskAdded)
    }
    
    const handleTitle = (event: any) => {
        var target = event.target.value
        if (target.length > 3) {
            setTitle(target)
        }
    }
    const handleDescription = (event: any) => {
        var target = event.target.value;
        if (target.length > 3) {
            setDescription(event.target.value)
        }
    }
    


    const handleAddTask = () => {
    if (description && description.length > 3 && title && title!.length > 3) {
        let items: ItemProps[] = [];
        const storedItems = localStorage.getItem("test");
        if (storedItems !== "" && storedItems !== null) {
            items = JSON.parse(storedItems);
        }
        const item = {
            title,
            description, 
            dateTime: new Date().toLocaleString()
        };
        items.push(item as ItemProps);
        localStorage.setItem("test", JSON.stringify(items));
        onAddTask();
        onTaskAdded();
        }
    }

    return (
        <div className="addTask">
            <p className="addTask__title"> Title </p>
            <input className="addTask__inputTitle" type="text" onChange={(e: ChangeEvent) => handleTitle(e)}/>
            <p className="addTask__title"> Description </p>
            <textarea onChange={(e: ChangeEvent) => handleDescription(e)} className="addTask__inputDescription" />
            <button className="addTask__button" onClick={() => handleAddTask()}> Add task </button>
        </div>
    )
}


const ToDoList = ({ onAddTask }: any) => {

    const [addTask, setAddTask] = useState(false)
    const [items, setItems] = useState<ItemProps[]>(JSON.parse(localStorage.getItem("test") as string)
    )

    const [taskAdded, setTaskAdded] = useState(false);

    const handleTaskAdded = () => {
        setTaskAdded(!taskAdded)
    }
    
    const removeTasks = () => {
        localStorage.removeItem("test")
        handleTaskAdded();
    }

    const handleAddTask = () => {
        setAddTask(!addTask) 
    }

    const handleIconFunc = (num: number) => {
        const itemsFiltered = items.filter((item: ItemProps, index: number) => {
            if (index !== num) {
                return item
            }
        }
        )
        
        localStorage.setItem("test", JSON.stringify(itemsFiltered))
setItems(itemsFiltered)
    }

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem("test") as string))
    }, [taskAdded]);

    return (
    <AddTaskContext.Provider value={{ onAddTask: handleTaskAdded }}>
    <TaskAddedContext.Provider value={{ onTaskAdded: handleTaskAdded}}>
    <div className="todolist">
        <div className="todolistContainer">
            <div className="todolistOptions">
                <div className="todolistOptions__add" onClick={() => handleAddTask()}>
                    <p> Add a task </p>
                    <AiOutlineFileAdd className="icon icon1"/>
                </div>
                <div className="todolistOptions__remove" onClick={() => removeTasks()}>
                    <p> Remove tasks </p>
                    <AiOutlineDelete className="icon icon2" />
                </div>
            </div>
            {addTask ? <AddTask /> : 
            <>
                {items && items.length > 0 ? items.reverse().map((item: ItemProps, index: number) => {
                    return (
                            <div className="todolistItem" key={index}>
                                <div className="iconContainer">
                                <AiOutlineCloseSquare className="icon" onClick={() => handleIconFunc(index)}/>
                                </div>
                                <p className="todolistItem__title"> {item.title} </p>
                                <p className="todolistItem__description"> {item.description} </p>
                                <p className="todolistItem__dateTime"> {item.dateTime} </p>
                            </div>
                    )
                }
                ) : <p className="todolistItem__noTask">  No tasks &#127866;</p>}
            </>
            }
        </div>
    </div>
    </TaskAddedContext.Provider>
    </AddTaskContext.Provider>
    )
}

export default ToDoList