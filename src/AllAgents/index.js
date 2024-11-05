import React from 'react'
import { useState } from 'react'
import { Filter } from './Filter/Filter'
import { AgentList } from './AgentList'


export const AllAgents = () => {
    const [filters, setFilters] = useState({
        category: 'Category',
        industry: 'Industry',
        pricingModel: 'Pricing',
        accessModel: 'Access',
      });
    
      const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
      };
  return (
    <div className='mt-20 flex flex-row' >
      <div>
        <Filter onFilterChange={handleFilterChange} />
      </div>
        <div>
            <AgentList filters={filters} />
        </div>
      
    </div>
  )
}
