async function fetchData(){
    const res = await fetch("/getdata")

    const data = await res.json()

    console.log(data)

    let h2 = document.createElement("h2")

h2.innerHTML = data.name

document.getElementById("user").appendChild(h2)


}

fetchData()
          

