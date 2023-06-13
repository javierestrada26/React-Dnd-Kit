import { useState } from "react"
import { DndContext,closestCenter } from "@dnd-kit/core"
import { SortableContext,verticalListSortingStrategy,arrayMove } from "@dnd-kit/sortable"
import { User } from "./User"




export const App = () => {

  const [people,setPeople] = useState([
    {name:'Javier',id:1},
    {name:'Emily',id:2},
    {name:'Santigo',id:3},
  ])

  const handleDragEnd =(event)=>{
    const {active,over}= event

    setPeople((people)=>{
      const oldIndex= people.findIndex(person => person.id === active.id)
      const newIndex = people.findIndex(person=> person.id === over.id)
  
      return arrayMove(people,oldIndex,newIndex)
    })

  }
  return (
    <div className="flex justify-center items-center">
      <div className="w-4/6">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
    >
        <h1 className="text-2xl font-bold">User List</h1>
        <SortableContext
        items={people}
        strategy={verticalListSortingStrategy}
      >
        {
          people.map((user)=>(
            <User user={user} key={user.id}/>
          ))
        }
      </SortableContext>

    </DndContext>
      </div>
    </div>
  )
}
