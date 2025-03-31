interface FiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export default function Filters({ filter, setFilter }: FiltersProps) {
  const filters = ['daily', 'weekly', 'all-time']

  return (
    <div className="flex space-x-4 bg-gray-800 p-2 rounded-lg">
      {filters.map((item) => (
        <button
          key={item}
          className={`px-4 py-2 rounded-lg transition ${
            filter === item ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => setFilter(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  )
}
