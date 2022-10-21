
let episodes : Episode[] =[]

getEpisodes();

async function getEpisodes() {
  const fetch = require('node-fetch');
  try {
    const response = await fetch('https://rickandmortyapi.com/api/episode', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) throw new Error(`Error! status: ${response.status}`); 
    var result = await response.json();
    episodes = result.results;
    setCharacters();
    await getCharacters();
    console.log(episodes);
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

async function getCharacters(){
  episodes = 
  await Promise.all(
    episodes.map(async (episode) =>{
      var actualEpisode = episodes.find(x => x.id == episode.id)
      actualEpisode.characters = await getCharacterByIds(episode.characters)
      return actualEpisode
    })
  )
}

function mapIds(links : string[]) : string[]{
  return links.map(x => x.split("/")[5])
}

function setCharacters(){
  episodes = episodes.map(episode =>{ 
    var actualEpisode = episodes.find(x => x.id == episode.id)
    actualEpisode.characters = mapIds(episode.characters)
    return actualEpisode;
})
}

async function getCharacterByIds(ids : number[]){
  const fetch = require('node-fetch');
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${ids}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        
      },
    });
    if (!response.ok)  throw new Error(`Error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

export interface Episode {
  id : number,
  name : string,
  air_date: string,
  episode : string,
  characters : any[],
  url : string,
  created : string,
}

export interface Character{
  id : number,
  name : string,
  status : string,
  species : string,
}


