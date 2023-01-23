import { useState, useEffect } from 'react';
import './App.css';
import AddItem from './components/AddItem';
import Footer from './components/Footer';
import Header from './components/Header';
import SearchItem from './components/SearchItem';
import Content from './rsc/Content';
import apiRequest from './components/ApiRequest'

function App() {

  const API_URL = 'http://localhost:3500/items'


  const [items, setItems ] = useState([]);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetcherror, setFetcherror] = useState(null)
  const [isloading , setIsloading] = useState(true)


  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Did not receive expected data")
        const listitems = await response.json();
        setItems(listitems)
        setFetcherror(null)
      }catch(err){
        setFetcherror(err.message);
      }finally{
        setIsloading(false)
      }
    }

    setTimeout(() => {
      (async()=>await fetchData())();
    }, 2000);


    
  },[])

  

 
  const addItem = async(item) =>{
    const id = items.length?items[items.length -1].id+1:1;
    const myNewItem = {id,checked:false,item};
    const listItems = [...items, myNewItem];
    setItems(listItems);
    const postOptions = {
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL,postOptions)
    if(result) setFetcherror(result)
  }

  const handleCheck = async(id)=>{
    const listItems = items.map((item)=> item.id===id?{...item,
    checked:!item.checked}:item)
    setItems(listItems);

    const myItem = listItems.filter((item)=>item.id === id);

    const updateOptions = {
      method:"PATCH",
      headers:{
        "Content-type":"application/json",
      },
      body:JSON.stringify({checked:myItem[0].checked})
    }

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest (reqUrl,updateOptions);
    if(result) setFetcherror(result);

    
  }

  const handleDelete = async(id)=>{
    const listItems = items.filter((item)=>item.id!==id);
    setItems(listItems)

    const reqUrl = `${API_URL}/${id}`
    const deleteOptions = {
      method:"DELETE"
    };
    const result = await apiRequest (reqUrl,deleteOptions);
    if(result) setFetcherror(result);

  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem)
    setNewItem('');
  }

  

  return (
    <div className="App">
     <Header title="groceries list"/>
     <AddItem handleSubmit={handleSubmit}
     newItem = {newItem}
     setNewItem = {setNewItem}/>
     <SearchItem search={search} setSearch={setSearch}/>
     <main> 
      {isloading && <p>Loading items...</p>}
      {fetcherror && <p style={{color:'red'}}>{`Error : ${fetcherror}`}</p>} 
      {!fetcherror && !isloading && <Content items={items.filter(item =>((item.item).toLowerCase()).includes(search.toLowerCase()))}
      handleCheck={handleCheck}
      handleDelete={handleDelete}/>
      }
     </main>
     <Footer length={items.length}/>
    </div>
  );
}

export default App;
