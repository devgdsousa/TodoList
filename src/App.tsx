import { FormEvent, useState } from "react"
import {v4} from 'uuid'
import { Trash2 } from "lucide-react";
import "./styles/global.scss"

interface TodoList{
  descricao:string;
  completo:boolean;
  id:string;
}

function App() {
const [Todo, setTodo] = useState<TodoList[]>([
  {
    descricao:'comprar pão',
    completo:false,
    id:'12314'
  }
])

const[descricao,setDescricao] = useState<string>('');
const[filtros,setFiltros] = useState<'todos'|'paraFazer'|'completos'>(
  'todos'
)

function completarTodo(id:string){
setTodo((prev)=>{
  const novoValor = prev.map((Todo)=>{
    if (Todo.id === id){
      return{...Todo,completo:!Todo.completo}
    }
    return Todo
  })
  return novoValor
})
}

function adicionarTodo(evento:FormEvent){
  evento.preventDefault()
  if(!descricao) return alert('Favor preecher a Descrição!')
  setTodo((prev)=>[
  ...prev,
  {
    descricao:descricao,
    completo:false,
    id:v4()
  }
  ])
  setDescricao('')
}

function filtroTodos(filtro:string){
  if(filtro ==='todos') return Todo;
  if(filtro ==='paraFazer') return Todo.filter((Todo)=> Todo.completo === false);
  if(filtro ==='completos') return Todo.filter((Todo)=> Todo.completo === true);
}

function deletarTodo(id:string){
  setTodo((prev)=> prev.filter((Todo)=> Todo.id !== id))
}
  return (
   <div>
    <header>TodoList</header>
    <main className="container">
      <nav>
        <li onClick={()=> setFiltros('todos')} className={`${filtros ==='todos'? 'filtroAtivo':''}`}>Todos</li>
        <li onClick={()=> setFiltros('paraFazer')} className={`${filtros ==='paraFazer'? 'filtroAtivo':''}`}>Para Fazer</li>
        <li onClick={()=> setFiltros('completos')} className={`${filtros ==='completos'? 'filtroAtivo':''}`}>Completos</li>
      </nav>
      <form onSubmit={adicionarTodo}>
        <input type="text" placeholder="Adicionar Detalhes" value={descricao} onChange={(e)=> setDescricao(e.target.value)}/>
        <button>Adicionar</button>
      </form>

      <section className="todos-container">
       {Todo &&
        filtroTodos(filtros)?.map(({id,descricao,completo})=>(
       
          <div  key={id} className="todo-container">
             <div className="todo">
                <input type="checkbox" id={id} checked={completo} onChange={()=>completarTodo(id)}/>
                <label htmlFor={id}>{descricao}</label>
             </div>
             {filtros === 'completos' &&(
             <span onClick={()=> deletarTodo(id)}>
               <Trash2 size={24}/>
             </span>
             )}

          </div>
        ))}            
      </section>
    </main>
   </div>
  )
}

export default App
