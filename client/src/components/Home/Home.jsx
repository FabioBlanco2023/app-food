import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterRecipesByDiets, filterCreated, orderByHealth, orderByName } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import '../Home/HomeStyle.css'

export default function Home(){
    const dispatch = useDispatch()
    const allRecipes = useSelector ((state) => state.recipes) //con esta constante traeme todos los que esta en el estado de las recetas. El useSelector es lo mismo que hacer el mapStatetoProps
    const [currentPage, setCurrentPage] = useState(1) //useState es para estados locales, empieza en 1 porque siempre voy arrancar en 1 mis paginas
    const [RecipesPerPage, setRecipePerPage] = useState(9) //cuantos personajes quiero yo por pagina. 
    
    const [orden, setOrden] = useState('')

    const indexOfLastRecipe = currentPage * RecipesPerPage //en un principio sera 6
    const indexOfFirstRecipe = indexOfLastRecipe - RecipesPerPage
    const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe) //te divide un array dependiendo lo que este pasando por parametro

    const paginado = (pageNumber) =>{ //me ayuda al renderizado
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getRecipes()) //este dispatch es lo mismo que hacer el mapDispatchToProps. 
    }, [dispatch]) //el array es para que no se llame la funcion de forma infinita. 


    function handleClick(e){ //para resetear las recetas
        e.preventDefault(); //para que no se rompa
        dispatch(getRecipes());
    }

    function handlerFilteredByDiets(e){
        e.preventDefault();
        dispatch(filterRecipesByDiets(e.target.value)) //tomara lo que clickea el usuario
        setCurrentPage(1);
    }

    function handlerFilteredCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value)) //recordar esto es el payload lo del select
    }

    function HandlerOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden (`Ordenado ${e.target.value}`)
    }

    function HandlerOrderByHealth(e){
        e.preventDefault();
        dispatch(orderByHealth(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
    <div>
            <Link to = '/create'>Crear Receta</Link>
            <h1>RECETAS PARA TU BIENESTAR</h1>
            <button onClick={e => {handleClick(e)}}>
                Cargar todas las recetas
            </button>
            <SearchBar/>
        <div> 
            <select onChange={e=>HandlerOrderByName(e)}> 
                <option value="asc">Nombre Ascendente</option>
                <option value="desc">Nombre Descendente</option>
            </select>

            <select onChange={e=>HandlerOrderByHealth(e)}>
                <option value="healthScoreAll">All by Health Score</option>
                <option value="healthScoreAsc">Ascending Health Score</option>
                <option value="healthScoreDesc">Descending Health Score</option>
            </select>

            <select onChange={e=>handlerFilteredByDiets(e)}>
                <option value='All'>All Recipes</option>
                <option value='gluten free'>Gluten free</option>
                <option value='dairy free"'>Dairy free</option>
                <option value='ketogenic'>Ketogenic</option>
                <option value='lacto ovo vegetarian'>Lacto ovo vegetarian</option>
                <option value='vegan'>Vegan</option>
                <option value='pescatarian'>Pescatarian</option>
                <option value='paleolithic'>Paleolithic</option>
                <option value='primal'>Primal</option>
                <option value='fodmap friendly'>Fodmap friendly</option>
                <option value='whole 30'>Whole 30</option>
            </select>

            <select onChange={e=>handlerFilteredCreated(e)}>
                <option value='All'>Todos</option>
                <option value='Created'>Creados</option>
                <option value='Api'>Existentes</option>
            </select>
        <Paginado 
        RecipesPerPage={RecipesPerPage}
        allRecipes={allRecipes.length}
        paginado = {paginado}
        /> 
            {currentRecipe?.map((el) =>{ //este signo de pregunta es para preguntar si existe primeor y despues lo mapea
            return (
                <div className= 'cartas'>
                    <Link to={"/home/"+ el.id}>
                        <Card name={el.name} image={el.image} tiposDieta={el.tiposDieta}/>
                    </Link>
                </div>
            )
        })}

        </div>
    </div>
    )
}