import React, { ChangeEvent, useEffect, useState } from 'react'

const Misc = () => {
    const [name, setName] = useState<string>("")
    const [isNameDefined, setIsNameDefined] = useState<boolean>(false);

    const verifyStorage = () => {
        const getItem = localStorage.getItem("name");
        if ((localStorage.getItem("name") === "") || (localStorage.getItem("name") === null )) {
            setIsNameDefined(false)
        }
        else {
            setIsNameDefined(true)
            setName(getItem as string)
        }
    }


    const setNameLocal = () => {
        localStorage.setItem("name", name);
        setIsNameDefined(true)
    }

    useEffect(() => {
        verifyStorage();
    }, [])
    

    useEffect(() => {
        console.log(name, isNameDefined)
    }, [name])

  return (
    <div className="misc">
        {!isNameDefined ? 
        <>
        <p className="miscText"> Hello, please enter your name. </p>
        <input className="miscInput" type="text" onChange={(event: any) => {
            setName(event.target.value)
        }} />
        <button className="miscButton" onClick={() => setNameLocal()}>Submit</button>
        </>
        :
        <>
        <p className="miscText"> Hello, {name} </p>
        </>
        }
    </div>
    )
}

export default Misc