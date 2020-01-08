import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'



class App extends React.Component {
 
  state = {
    pets: [],
    filters: {
      type: 'all'
    }
  }

  onChangeType=(pet)=>{
    this.setState({
      filters: {
        type: pet
      }
    })
  }



  onFindPetsClick=()=>{
    console.log("clicked")
    if (this.state.filters.type == "all") {
      fetch('/api/pets')
      .then( response => {
        return response.json()
      })
      .then( response => {
        this.setState({
          pets: response
        })
      })
    }
    else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then( response => {
        return response.json()
      })
      .then( response => {
        this.setState({
          pets: response
        })
      })
    }
  }


  onAdoptPet=(adoptId) => {
    console.log("clicked")
    const newPets = this.state.pets.map(pet => {
     return pet.id == adoptId ? {...pet, isAdopted: true} : pet
    })
    this.setState({
      pets: newPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
export default App
