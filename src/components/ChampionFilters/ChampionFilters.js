import './ChampionFilters.css'

export const ChampionFilters = ({ onFilterChange }) => {
  const filterContainer = document.createElement('div')
  filterContainer.className = 'champion-filters-container'

  filterContainer.innerHTML = "<h3 class='filter'>Search Champions</h3>"

  const nameInput = document.createElement('input')
  nameInput.placeholder = 'Search by name'
  nameInput.className = 'champion-filter-input'

  const roleInput = document.createElement('select')
  roleInput.className = 'champion-filter-input'
  const roles = [
    'All',
    'fighter',
    'mage',
    'support',
    'tank',
    'marksman',
    'assassin'
  ]

  roles.forEach((role) => {
    const option = document.createElement('option')
    option.value = role === 'All' ? '' : role
    option.textContent = role
    roleInput.appendChild(option)
  })

  const handleFilterChange = () => {
    const filters = {
      name: nameInput.value.toLowerCase(),
      role: roleInput.value
    }
    onFilterChange(filters)
  }

  nameInput.addEventListener('input', handleFilterChange)
  roleInput.addEventListener('change', handleFilterChange)

  filterContainer.appendChild(nameInput)
  filterContainer.appendChild(roleInput)

  return filterContainer
}
