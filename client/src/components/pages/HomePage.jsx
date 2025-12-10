import React from 'react'
import Navbar from '../shared/Navbar'
import PropertyCard from './components/PropertyCard'
import FilterArea from './components/FilterArea'

const HomePage = () => {
  return (
    <>
    <Navbar />
<div className="max-w-2xl md:max-w-5xl lg:max-w-7xl mx-auto px-5">

  <FilterArea onFilter={(filters) => console.log(filters)} />

  <div className="bg-purple-400 my-5">
    <PropertyCard />
  </div>

</div>

    </>
  )
}

export default HomePage
