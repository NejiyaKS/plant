import { useState } from 'react'
import axios from 'axios'

function App() {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchImages = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.get(`https://trefle.io/api/v1/plants`, {
        params: { query },
        headers: {
          Authorization: `usr-svvpEIJB3oIPY_vyC_3kJ_SowbCdTCqoW6VFh_ShwA4`,
        },
      })
      setImages(response.data.results)
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🌿 Plant Image Gallery</h1>
      <form onSubmit={fetchImages} className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for plants..."
          className="px-4 py-2 border rounded-md w-64"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded shadow overflow-hidden">
            <img src={img.urls.small} alt={img.alt_description} className="w-full h-48 object-cover" />
            <p className="p-2 text-sm text-gray-700">{img.alt_description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App