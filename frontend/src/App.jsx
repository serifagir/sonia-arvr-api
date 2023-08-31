import React, { useEffect, useState } from 'react';

const App = () => {
        const [furnitures, setFurnitures] = useState([]);

        const fetchData = () => {
                fetch("http://localhost:8080/api/furniture")
                        .then(response => {
                                return response.json()
                        })
                        .then(data => {
                                setFurnitures(data)
                        })
        }
        useEffect(() => {
                fetchData()
        }, [])

        return (
        <div className="app-main bg-black">
                        <h1 className="text-white flex justify-center text-5xl p-5">Furnitures</h1>
                        <div className="furnitures-flex flex flex-col">
                                {furnitures.length > 0 && (
                                <div className="text-white flex flex-row max-sm:flex-col">
                                                {furnitures.map(furniture => (
                                                        <>
                                                        <div className="ring-4 ring-white m-5 w-48 max-sm:mx-auto">
                                                                <h1 className="text-white text-center my-5" key={furniture.id}>{furniture.name}</h1>
                                                                <img className="items-center flex mx-auto" src={furniture.textureUrl} key={furniture.id} width={150} height={150} />
                                                                        <p className="text-white text-center my-5 " key={furniture.id}>ID:{furniture.id}</p>
                                                                        <a className="w-48 flex justify-center my-5 text-yellow-500 font-extrabold text-2xl" href={furniture.modelUrl} key={furniture.id} >Model</a>
                                                        </div >
                                                        </>
                                        ))}
                                </div>
                        )}
                        </div>
                        
        </div>
  )
}

export default App;