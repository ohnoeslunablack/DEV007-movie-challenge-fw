export const fetchData= async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
        
    // Opciones para la solicitud HTTP
    const options = {
        method: 'GET', // Metodo (Verbo) HTTP
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTU3ODgzOGQ1NGQ5NTA2MGU3NTY0ODJhMTA1MzJmNCIsInN1YiI6IjY0ZjAzNzkwNGIwYzYzMDBlMWQzZWYzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6DZoe6UNxp8X2MZRo7KC6GLiyHByLq2w5CZ480zmqwI'
        }
    };
    
    try { // Promesa
        // Realiza una solicitud HTTP GET a la URL de la API con las opciones especificadas
        const response = await fetch(url, options); //fetch consume la api con la url y las opciones
        const data = await response.json();         // Convierte la respuesta en un objeto JSON
        console.log(data, 20);                      // Muestra los datos en la consola de la busqueda realizada con la respuesta en json
        //setPeliculas(data.results);               // Establece el estado "peliculas" con los resultados obtenidos de la API
        return data.results;
    } catch (error) {                               // Devuelte la promesa error en caso de no cumplirse la solicitud
        console.error('Error:', error); 
    }
};

